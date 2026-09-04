/* ============================================================
   MAPS — bản đồ Việt Nam tương tác 3 bước, dùng Leaflet.js
   (CDN được nạp trong index.html) + dữ liệu GeoJSON tĩnh trong
   thư mục data/maps/.

   3 bước:
     1) Toàn quốc  — 34 tỉnh/thành + 2 quần đảo Hoàng Sa, Trường Sa
     2) Tỉnh/Thành — toàn bộ xã/phường/đặc khu của tỉnh đó, tên
        hiện thường trực (không cần hover)
     3) Xã/Phường/Đặc khu — bản đồ chi tiết (nền OpenStreetMap)
        khoanh vùng ranh giới khu vực đã chọn

   Nguồn dữ liệu ranh giới: thanglequoc/vietnamese-provinces-database
   (giấy phép mở, xem README trong thư mục data/maps/).

   LƯU Ý: trang phải chạy qua HTTP (vd. GitHub Pages, hoặc
   `python3 -m http.server` lúc phát triển) vì fetch() không đọc
   được file cục bộ qua giao thức file:// (bị chặn CORS).
   ============================================================ */

(function () {
  'use strict';

  var DATA = {
    provinces: 'data/maps/provinces.geojson',
    islands: 'data/maps/islands.geojson',
    searchIndex: 'data/maps/search-index.json',
    wardsDir: 'data/maps/wards/'
  };

  // Mã 2 đơn vị đặc khu hải đảo — được tách file riêng (islands.geojson)
  // để không làm lệch khung nhìn khi hiển thị Đà Nẵng / Khánh Hòa.
  var ISLAND_CODES = { '20333': '48', '22736': '56' };

  // Khung nhìn đất liền sát hơn với tọa độ thật (Cà Mau ~8.5, Hà Giang ~23.4, Lai Châu ~102.1, Khánh Hòa ~109.5)
  // để bản đồ tự fit to hơn trong khung chứa.
  var MAINLAND_BOUNDS = [[8.4, 102.1], [23.5, 109.6]];

  // Padding khi fit khung nhìn toàn quốc: chừa thêm chỗ bên phải (right: 120px) 
  // để không bị các thẻ Hoàng Sa / Trường Sa che khuất.
  var COUNTRY_FIT_OPTIONS = {
    paddingTopLeft: [10, 10],      // [left, top]
    paddingBottomRight: [120, 10]  // [right, bottom]
  };

  var OSM_TILE_URL = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  var OSM_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors';

  // Bảng màu tươi, nhiều sắc để phân biệt các mảng liền kề — độ bão hòa
  // cao hơn bản trước để nhìn rực rỡ, sinh động hơn trên nền kem ngà.
  var PALETTE = [
    '#e63946', '#f4a300', '#2a9d8f', '#e76f51', '#3a86ff',
    '#ff6b6b', '#06d6a0', '#ffb703', '#8338ec', '#43aa8b',
    '#fb8500', '#4cc9f0', '#f15bb5', '#588157', '#ee9b00', '#5e60ce'
  ];

  // Các đảo nhỏ ven bờ — hình dạng đã có sẵn trong provinces.geojson
  // (là một phần MultiPolygon của tỉnh chủ quản) nhưng không có nhãn
  // riêng vì mỗi tỉnh chỉ có 1 tooltip đặt ở trọng tâm. Thêm nhãn điểm
  // riêng cho các đảo được biết đến nhiều, giống bản đồ tham chiếu.
  var SMALL_ISLANDS = [
    { name: 'Đ. Cô Tô', lat: 21.03, lon: 107.77 },
    { name: 'Đ. Cát Bà', lat: 20.80, lon: 107.05 },
    { name: 'Đ. Bạch Long Vĩ', lat: 20.13, lon: 107.72 },
    { name: 'Đ. Cồn Cỏ', lat: 17.17, lon: 107.33 },
    { name: 'Đ. Lý Sơn', lat: 15.38, lon: 109.13 },
    { name: 'Đ. Phú Quý', lat: 10.51, lon: 108.93 },
    { name: 'Đ. Côn Sơn', lat: 8.69, lon: 106.60 },
    { name: 'Đảo Phú Quốc', lat: 10.22, lon: 103.97 }
  ];

  // Vĩ độ đại diện thật của 2 quần đảo — dùng để canh ô chú thích
  // Hoàng Sa / Trường Sa ngang đúng tầm vĩ độ của chúng trên bản đồ
  // (kinh độ bỏ qua, ô luôn ghim sát mép phải khung bản đồ).
  var HOANG_SA_LAT = 16.5;
  var TRUONG_SA_LAT = 9.3;

  var els = {};
  var map = null;
  var mapInited = false;
  var activeLayer = null;   // layer GeoJSON đang hiển thị (tỉnh hoặc xã)
  var smallIslandLayer = null; // nhãn các đảo nhỏ ven bờ, chỉ ở cấp Toàn quốc
  var tileLayer = null;     // chỉ tồn tại ở cấp chi tiết (bước 3)
  var boundaryLayer = null; // viền khu vực chi tiết ở cấp chi tiết
  var lastAction = null;    // hàm để gọi lại khi nhấn "Thử lại"
  var isFileProtocol = window.location.protocol === 'file:';
  var userInteractedMap = false; // true khi người dùng đã tự kéo/zoom bằng tay

  var cache = {
    provinces: null,
    islands: null,
    searchIndex: null,
    wardsByProvince: {}
  };

  var state = {
    level: 'country',       // 'country' | 'province' | 'ward'
    provinceCode: null,
    provinceName: null,
    wardCode: null,
    wardName: null
  };

  /* ---------------------- Tiện ích chung ---------------------- */

  function qs(id) { return document.getElementById(id); }

  function hashCode(str) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
      hash |= 0;
    }
    return hash;
  }

  function hexToRgb(hex) {
    var v = parseInt(hex.slice(1), 16);
    return [(v >> 16) & 255, (v >> 8) & 255, v & 255];
  }

  function lighten(hex, amount) {
    var rgb = hexToRgb(hex);
    var out = rgb.map(function (c) { return Math.round(c + (255 - c) * amount); });
    return 'rgb(' + out.join(',') + ')';
  }

  function colorForCode(code, light) {
    var base = PALETTE[Math.abs(hashCode(String(code))) % PALETTE.length];
    return light ? lighten(base, 0.22) : base;
  }

  function formatArea(km2) {
    if (!km2 && km2 !== 0) return '';
    return km2.toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + ' km²';
  }

  function normalize(str) {
    return (str || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/gi, 'd')
      .toLowerCase()
      .trim();
  }

  function fetchJSON(url) {
    return fetch(url).then(function (res) {
      if (!res.ok) throw new Error('Không tải được ' + url + ' (HTTP ' + res.status + ')');
      return res.json();
    });
  }

  function setLoading(isLoading, message, isError) {
    if (!els.loading) return;
    els.loading.hidden = !isLoading;
    els.loading.classList.toggle('is-error', !!isError);
    if (message) els.loading.querySelector('span').textContent = message;
    els.loadingRetry.hidden = !isError || isFileProtocol || !lastAction;
  }

  function showFetchError(err, retryFn) {
    console.error(err);
    lastAction = retryFn || null;
    if (isFileProtocol) {
      setLoading(true,
        'Trang đang mở qua file:// nên trình duyệt chặn tải dữ liệu bản đồ (lỗi CORS). ' +
        'Hãy chạy qua một máy chủ cục bộ — ví dụ mở Terminal tại thư mục dự án rồi chạy "python3 -m http.server" ' +
        'hoặc dùng tiện ích Live Server của VS Code — rồi mở lại bằng http://localhost. ' +
        'Khi deploy lên GitHub Pages sẽ không gặp lỗi này.',
        true);
    } else {
      setLoading(true, 'Không tải được dữ liệu bản đồ. Vui lòng kiểm tra kết nối và thử lại.', true);
    }
  }

  /* ---------------------- Nạp dữ liệu (có cache) ---------------------- */

  // Cache theo PROMISE (không chỉ theo kết quả) để nếu tải trước (prefetch
  // lúc hover tab) và tải thật (lúc click) xảy ra gần nhau, chỉ có đúng 1
  // request được gửi đi — request thứ hai dùng lại promise đang chạy dở.
  function loadProvinces() {
    if (!cache.provinces) {
      cache.provinces = fetchJSON(DATA.provinces).catch(function (err) {
        cache.provinces = null; // cho phép thử lại nếu lỗi
        throw err;
      });
    }
    return cache.provinces;
  }

  function loadIslands() {
    if (!cache.islands) {
      cache.islands = fetchJSON(DATA.islands).catch(function (err) {
        cache.islands = null;
        throw err;
      });
    }
    return cache.islands;
  }

  function loadWards(provinceCode) {
    if (!cache.wardsByProvince[provinceCode]) {
      cache.wardsByProvince[provinceCode] = fetchJSON(DATA.wardsDir + provinceCode + '.geojson').catch(function (err) {
        delete cache.wardsByProvince[provinceCode];
        throw err;
      });
    }
    return cache.wardsByProvince[provinceCode];
  }

  function loadSearchIndex() {
    if (!cache.searchIndex) {
      cache.searchIndex = fetchJSON(DATA.searchIndex).then(function (data) {
        return data.map(function (e) {
          e._key = normalize(e.name);
          return e;
        });
      }).catch(function (err) {
        cache.searchIndex = null;
        throw err;
      });
    }
    return cache.searchIndex;
  }

  function prefetchCountryData() {
    loadProvinces().catch(function () { });
    loadIslands().catch(function () { });
  }

  /* ---------------------- Khởi tạo bản đồ Leaflet ---------------------- */

  function ensureMap() {
    if (mapInited) return;
    map = L.map(els.mapEl, {
      zoomControl: true,
      attributionControl: true,
      minZoom: 4,
      maxZoom: 18
    });
    map.attributionControl.setPrefix(false);
    map.on('zoomend', updateLabelScale);
    map.on('zoomend moveend', positionIslandCards);
    mapInited = true;

    // Từ lúc người dùng tự kéo/zoom bằng tay thì thôi, không tự canh lại
    // khung nhìn nữa (xem ResizeObserver bên dưới) — tránh giật ngược bản
    // đồ về giữa khi họ đang chủ động xem một góc khác.
    ['mousedown', 'touchstart', 'wheel', 'dblclick'].forEach(function (evt) {
      els.mapEl.addEventListener(evt, function () { userInteractedMap = true; }, { passive: true });
    });

    // Bù cho trường hợp Leaflet đo kích thước khung chứa NGAY LÚC khung đó
    // chưa kịp hiện hết cỡ (vd. dữ liệu 34 tỉnh đã được prefetch sẵn lúc rê
    // chuột vào tab Maps, nên lúc bấm vào, Promise trả về gần như tức thì —
    // có khi nhanh hơn cả lúc panel Maps kịp hiện ra đủ to). fitBounds tính
    // theo kích thước đo sai (nhỏ hơn thật) khiến bản đồ hiện nhỏ hơn khung
    // rất nhiều ở lần vào đầu tiên. Theo dõi kích thước THẬT của khung chứa
    // bản đồ bằng ResizeObserver, hễ đổi (và người dùng chưa tự thao tác)
    // thì đo lại + canh lại khung nhìn cho khớp kích thước mới nhất.
    if ('ResizeObserver' in window) {
      var lastW = 0, lastH = 0;
      var ro = new ResizeObserver(function () {
        var w = els.mapEl.clientWidth, h = els.mapEl.clientHeight;
        if (!w || !h || (w === lastW && h === lastH)) return;
        lastW = w; lastH = h;
        map.invalidateSize();
        if (!userInteractedMap) refitCurrentView();
      });
      ro.observe(els.mapEl);
    }
  }

  // Canh lại khung nhìn hiện tại theo đúng cấp đang xem — tách riêng để
  // dùng chung cho lúc mới render (bước 1/2/3) VÀ lúc ResizeObserver ở
  // trên phát hiện khung chứa đổi kích thước thật.
  function refitCurrentView() {
    if (!map) return;
    if (state.level === 'country') {
      map.fitBounds(MAINLAND_BOUNDS, COUNTRY_FIT_OPTIONS);
    } else if (state.level === 'province' && activeLayer) {
      map.fitBounds(activeLayer.getBounds(), { padding: [18, 18] });
    } else if (state.level === 'ward' && boundaryLayer) {
      map.fitBounds(boundaryLayer.getBounds(), { padding: [24, 24], maxZoom: 14 });
    }
  }

  function clearLayers() {
    if (activeLayer) { map.removeLayer(activeLayer); activeLayer = null; }
    if (boundaryLayer) { map.removeLayer(boundaryLayer); boundaryLayer = null; }
    if (tileLayer) { map.removeLayer(tileLayer); tileLayer = null; }
    if (smallIslandLayer) { map.removeLayer(smallIslandLayer); smallIslandLayer = null; }
  }

  // Vẽ nhãn các đảo nhỏ ven bờ (chỉ hiện ở cấp Toàn quốc)
  function renderSmallIslandLabels() {
    var group = L.layerGroup();
    SMALL_ISLANDS.forEach(function (isl) {
      var marker = L.circleMarker([isl.lat, isl.lon], {
        radius: 2.2,
        color: '#023e8a',
        weight: 1,
        fillColor: '#3a86ff',
        fillOpacity: 0.95,
        interactive: false
      });
      marker.bindTooltip(isl.name, {
        permanent: true,
        direction: 'right',
        offset: [3, 0],
        className: 'vnmap-label vnmap-islet-label'
      });
      group.addLayer(marker);
    });
    smallIslandLayer = group.addTo(map);
  }

  // Canh 2 ô chú thích Hoàng Sa / Trường Sa: ở cấp Toàn quốc, KHÔNG ghim
  // cứng vào mép phải khung nữa — mà bám theo đúng vị trí bờ biển thật
  // trên bản đồ, giống bố cục bản đồ tham chiếu. Nhờ phép chiếu Mercator
  // của Leaflet (trục X chỉ phụ thuộc kinh độ, trục Y chỉ phụ thuộc vĩ độ,
  // độc lập với nhau), lấy kinh độ ở rìa đông của MAINLAND_BOUNDS — coi
  // như ngay sát bờ biển — để tính X dùng chung cho cả 2 ô, cộng thêm 1
  // khoảng hở nhỏ ra phía biển; còn Y thì vẫn tính theo đúng vĩ độ thật
  // của từng quần đảo như trước, để chúng nằm ngang tầm Đà Nẵng / Khánh
  // Hòa. Cả 2 trục đều được tính lại mỗi khi zoom/kéo bản đồ (gọi từ sự
  // kiện 'zoomend moveend' ở ensureMap), nên 2 ô tự trôi theo bờ biển
  // thay vì dính cứng 1 chỗ; nếu bám sát bờ mà tràn ra ngoài khung thì
  // mới lùi lại gần mép để không bị cắt hình.
  // Ở cấp tỉnh (chỉ 1 ô liên quan) thì vẫn ghim cố định góc dưới-phải cho
  // đơn giản. Trên layout gọn của điện thoại (xem @media trong maps.css)
  // thì nhường hẳn việc canh vị trí cho CSS, chỉ xoá style inline cũ đi.
  function positionIslandCards() {
    if (!map || els.islands.hidden) return;
    var hsCard = els.islands.querySelector('[data-island="hoang-sa"]');
    var tsCard = els.islands.querySelector('[data-island="truong-sa"]');
    var isCompact = window.matchMedia('(max-width: 640px)').matches;

    if (state.level === 'country' && !isCompact) {
      var mapSize = map.getSize();
      var half = 40;
      var gap = 20;         // khoảng hở giữa bờ biển và ô, để không dính sát bờ
      var edgeMargin = 8;   // không để ô tràn ra ngoài khung bản đồ
      var coastLon = MAINLAND_BOUNDS[1][1]; // rìa đông đất liền — dùng chung cho cả 2 ô
      var coastX = map.latLngToContainerPoint([0, coastLon]).x;

      [[hsCard, HOANG_SA_LAT], [tsCard, TRUONG_SA_LAT]].forEach(function (pair) {
        var card = pair[0];
        if (!card || card.hidden) return;
        var y = map.latLngToContainerPoint([pair[1], coastLon]).y;
        y = Math.max(half, Math.min(mapSize.y - half, y));
        var cardW = card.offsetWidth || 170;
        var x = Math.max(edgeMargin, Math.min(mapSize.x - cardW - edgeMargin, coastX + gap));
        card.style.top = y + 'px';
        card.style.bottom = 'auto';
        card.style.left = x + 'px';
        card.style.right = 'auto';
      });
    } else if (state.level === 'country') {
      [hsCard, tsCard].forEach(function (card) {
        if (!card) return;
        card.style.top = '';
        card.style.bottom = '';
        card.style.left = '';
        card.style.right = '';
      });
    } else {
      [hsCard, tsCard].forEach(function (card) {
        if (!card) return;
        card.style.top = 'auto';
        card.style.bottom = '14px';
        card.style.left = '';
        card.style.right = '';
      });
    }
  }

  // Cỡ chữ nhãn tên tỉnh/xã co giãn theo mức zoom hiện tại, để lúc xem
  // toàn quốc (zoom thấp, nhiều tỉnh nhỏ chen nhau) chữ đủ nhỏ để không
  // đè lên nhau, còn lúc zoom vào gần thì chữ lớn dần cho dễ đọc.
  function updateLabelScale() {
    if (!map) return;
    var z = map.getZoom();
    var size = Math.max(8, Math.min(15, Math.round(z * 1.15)));
    els.mapEl.style.setProperty('--vnmap-label-size', size + 'px');
  }

  /* ---------------------- Bước 1: Toàn quốc ---------------------- */

  function renderCountry() {
    state.level = 'country';
    state.provinceCode = null;
    state.provinceName = null;
    state.wardCode = null;
    state.wardName = null;
    userInteractedMap = false; // vào lại 1 khung nhìn mới — cho phép auto-fit lại

    setLoading(true, 'Đang tải bản đồ 34 tỉnh, thành phố…');
    hideInfo();

    Promise.all([loadProvinces(), loadIslands()]).then(function (results) {
      var provincesData = results[0];
      clearLayers();
      map.invalidateSize();

      activeLayer = L.geoJSON(provincesData, {
        style: function (feature) {
          return {
            color: '#fffaf0',
            weight: 1.3,
            fillColor: colorForCode(feature.properties.code),
            fillOpacity: 0.92
          };
        },
        onEachFeature: function (feature, layer) {
          var p = feature.properties;
          layer.bindTooltip(p.name, {
            permanent: true,
            direction: 'center',
            className: 'vnmap-label'
          });
          layer.on('mouseover', function () { layer.setStyle({ weight: 2.6 }); layer.bringToFront(); });
          layer.on('mouseout', function () { layer.setStyle({ weight: 1.3 }); });
          layer.on('click', function () {
            renderProvince(p.code, p.name, p);
          });
        }
      }).addTo(map);

      refitCurrentView();
      updateLabelScale();
      renderSmallIslandLabels();
      renderIslandInsets(results[1], null);
      positionIslandCards();
      renderBreadcrumb();
      setLoading(false);
    }).catch(function (err) { showFetchError(err, renderCountry); });
  }

  /* ---------------------- Bước 2: Tỉnh / Thành phố ---------------------- */

  function renderProvince(code, name, ownProps) {
    state.level = 'province';
    state.provinceCode = code;
    state.provinceName = name;
    state.wardCode = null;
    state.wardName = null;
    userInteractedMap = false; // vào lại 1 khung nhìn mới — cho phép auto-fit lại

    setLoading(true, 'Đang tải xã, phường của ' + name + '…');
    renderBreadcrumb();

    // Nếu chưa có sẵn properties của chính tỉnh này (vd. vào từ ô tìm
    // kiếm thay vì bấm trực tiếp trên bản đồ), tra trong danh sách tỉnh
    // đã cache để lấy diện tích / mã bưu chính hiển thị ở panel thông tin.
    var ownFeaturePromise = ownProps
      ? Promise.resolve(ownProps)
      : loadProvinces().then(function (data) {
        var f = data.features.find(function (x) { return x.properties.code === code; });
        return f ? f.properties : null;
      });

    Promise.all([loadWards(code), loadIslands(), ownFeaturePromise]).then(function (results) {
      var wardsData = results[0];
      var islandsData = results[1];
      var provinceProps = results[2];

      // Với Đà Nẵng (48) / Khánh Hòa (56): tách riêng đặc khu hải đảo
      // ra khỏi lớp chính để không làm khung nhìn bị kéo dạt ra biển xa.
      var mainFeatures = wardsData.features.filter(function (f) {
        return !ISLAND_CODES.hasOwnProperty(f.properties.code);
      });
      var islandFeature = wardsData.features.find(function (f) {
        return ISLAND_CODES.hasOwnProperty(f.properties.code) && ISLAND_CODES[f.properties.code] === code;
      });

      clearLayers();
      map.invalidateSize();

      activeLayer = L.geoJSON({ type: 'FeatureCollection', features: mainFeatures }, {
        style: function (feature) {
          return {
            color: '#fffaf0',
            weight: 1,
            fillColor: colorForCode(feature.properties.code, true),
            fillOpacity: 0.88
          };
        },
        onEachFeature: function (feature, layer) {
          var p = feature.properties;
          // Hiện tên ngay trên bản đồ, thường trực — không cần hover.
          layer.bindTooltip(p.name, {
            permanent: true,
            direction: 'center',
            className: 'vnmap-label vnmap-label--ward'
          });
          layer.on('mouseover', function () { layer.setStyle({ weight: 2.4 }); layer.bringToFront(); });
          layer.on('mouseout', function () { layer.setStyle({ weight: 1 }); });
          layer.on('click', function () {
            renderWardDetail(p.code, p.fullName || p.name, code, name);
          });
        }
      }).addTo(map);

      refitCurrentView();
      updateLabelScale();

      // Nếu tỉnh này có đặc khu hải đảo, hiện lại đúng 1 ô nhỏ tương ứng
      renderIslandInsets(islandsData, islandFeature ? code : null);
      positionIslandCards();

      // Panel thông tin về chính tỉnh đang xem (giống panel ở cấp xã)
      if (provinceProps) showInfo(provinceProps, 'Việt Nam');
      else hideInfo();

      setLoading(false);
    }).catch(function (err) { showFetchError(err, function () { renderProvince(code, name, ownProps); }); });
  }

  /* ---------------------- Bước 3: Xã / Phường / Đặc khu chi tiết ---------------------- */

  function renderWardDetail(code, name, provinceCode, provinceName) {
    state.level = 'ward';
    state.provinceCode = provinceCode;
    state.provinceName = provinceName;
    state.wardCode = code;
    state.wardName = name;
    userInteractedMap = false; // vào lại 1 khung nhìn mới — cho phép auto-fit lại

    setLoading(true, 'Đang tải bản đồ chi tiết ' + name + '…');
    renderBreadcrumb();
    els.islands.hidden = true;

    var findFeature = function () {
      if (ISLAND_CODES.hasOwnProperty(code)) {
        return loadIslands().then(function (data) {
          return data.features.find(function (f) { return f.properties.code === code; });
        });
      }
      return loadWards(provinceCode).then(function (data) {
        return data.features.find(function (f) { return f.properties.code === code; });
      });
    };

    findFeature().then(function (feature) {
      clearLayers();
      map.invalidateSize();

      tileLayer = L.tileLayer(OSM_TILE_URL, {
        maxZoom: 18,
        attribution: OSM_ATTR
      }).addTo(map);

      if (feature) {
        boundaryLayer = L.geoJSON(feature, {
          style: {
            color: '#e63946',
            weight: 3,
            fillColor: '#e63946',
            fillOpacity: 0.12
          }
        }).addTo(map);
        refitCurrentView();
      }

      showInfo(feature ? feature.properties : null, provinceName);
      setLoading(false);
    }).catch(function (err) {
      showFetchError(err, function () { renderWardDetail(code, name, provinceCode, provinceName); });
    });
  }

  /* ---------------------- Ô nhỏ Hoàng Sa / Trường Sa ---------------------- */

  function svgFromMultiPolygon(geometry, size) {
    var pts = [];
    geometry.coordinates.forEach(function (poly) {
      poly[0].forEach(function (pt) { pts.push(pt); });
    });
    var lons = pts.map(function (p) { return p[0]; });
    var lats = pts.map(function (p) { return p[1]; });
    var minLon = Math.min.apply(null, lons), maxLon = Math.max.apply(null, lons);
    var minLat = Math.min.apply(null, lats), maxLat = Math.max.apply(null, lats);
    var pad = size * 0.14;
    var span = Math.max(maxLon - minLon, maxLat - minLat) || 1;
    var scale = (size - pad * 2) / span;

    var toXY = function (lon, lat) {
      var x = pad + (lon - minLon) * scale;
      var y = size - (pad + (lat - minLat) * scale); // lật trục Y
      return [x, y];
    };

    var dots = geometry.coordinates.map(function (poly) {
      var ring = poly[0];
      var cx = 0, cy = 0;
      ring.forEach(function (pt) { cx += pt[0]; cy += pt[1]; });
      cx /= ring.length; cy /= ring.length;
      var xy = toXY(cx, cy);
      return '<circle cx="' + xy[0].toFixed(1) + '" cy="' + xy[1].toFixed(1) + '" r="2.1" fill="#0077b6" />';
    }).join('');

    return '<rect x="0" y="0" width="' + size + '" height="' + size + '" fill="#eaf4fb" rx="10" />' + dots;
  }

  function renderIslandInsets(islandsData, onlyForProvince) {
    if (!islandsData) { els.islands.hidden = true; return; }

    var showAll = state.level === 'country';
    var visibleFeatures = islandsData.features.filter(function (f) {
      if (showAll) return true;
      return onlyForProvince && f.properties.provinceCode === onlyForProvince;
    });

    els.islands.hidden = visibleFeatures.length === 0;
    if (visibleFeatures.length === 0) return;

    ['hoang-sa', 'truong-sa'].forEach(function (slug) {
      var card = els.islands.querySelector('[data-island="' + slug + '"]');
      // codeName trong dữ liệu dùng gạch dưới (hoang_sa) — chuẩn hoá về
      // gạch ngang để so khớp với data-island trong HTML.
      var feature = islandsData.features.find(function (f) {
        return f.properties.codeName.replace(/_/g, '-') === slug;
      });
      var isVisible = feature && visibleFeatures.indexOf(feature) !== -1;
      card.hidden = !isVisible;
      if (!isVisible) return;

      var svgEl = card.querySelector('svg');
      svgEl.innerHTML = svgFromMultiPolygon(feature.geometry, 100);
      var areaEl = card.querySelector('.vnmap-island-area');
      if (areaEl) areaEl.textContent = '~' + formatArea(feature.properties.areaKm2);
      card.onclick = function () {
        renderWardDetail(feature.properties.code, feature.properties.fullName, feature.properties.provinceCode, feature.properties.provinceName);
      };
    });
  }

  /* ---------------------- Breadcrumb & panel thông tin ---------------------- */

  function renderBreadcrumb() {
    var parts = [];
    parts.push({ label: 'Toàn quốc', active: state.level === 'country', onClick: renderCountry });

    if (state.provinceCode) {
      parts.push({
        label: state.provinceName,
        active: state.level === 'province',
        onClick: function () { renderProvince(state.provinceCode, state.provinceName); }
      });
    }
    if (state.wardCode) {
      parts.push({ label: state.wardName, active: true, onClick: null });
    }

    els.breadcrumb.innerHTML = '';
    parts.forEach(function (part, i) {
      if (i > 0) {
        var sep = document.createElement('span');
        sep.className = 'vnmap-crumb-sep';
        sep.textContent = '›';
        els.breadcrumb.appendChild(sep);
      }
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'vnmap-crumb' + (part.active ? ' is-active' : '');
      btn.textContent = part.label;
      if (part.onClick) btn.addEventListener('click', part.onClick);
      else btn.disabled = true;
      els.breadcrumb.appendChild(btn);
    });

    els.backBtn.hidden = state.level === 'country';
  }

  function showInfo(props, eyebrow) {
    if (!props) { hideInfo(); return; }
    var metaLines = [];
    if (props.areaKm2) metaLines.push('<strong>Diện tích:</strong> ' + formatArea(props.areaKm2));
    var postal = props.postalCode || props.postalCodePrefix;
    if (postal) metaLines.push('<strong>Mã bưu chính:</strong> ' + postal);

    els.infoBody.innerHTML =
      '<p class="vnmap-info-eyebrow">' + eyebrow + '</p>' +
      '<h3 class="vnmap-info-name">' + (props.fullName || props.name) + '</h3>' +
      '<p class="vnmap-info-meta">' + metaLines.join('<br>') + '</p>';
    els.info.hidden = false;
  }

  function hideInfo() {
    els.info.hidden = true;
  }

  /* ---------------------- Điều hướng quay lại ---------------------- */

  function goBack() {
    if (state.level === 'ward') {
      renderProvince(state.provinceCode, state.provinceName);
    } else if (state.level === 'province') {
      renderCountry();
    }
  }

  /* ---------------------- Ô tìm kiếm tỉnh / xã theo tên ---------------------- */

  function setupSearch() {
    var input = els.searchInput;
    var results = els.searchResults;
    var clearBtn = els.searchClear;
    var activeIndex = -1;
    var currentMatches = [];

    function renderResults(matches) {
      currentMatches = matches;
      activeIndex = -1;
      if (matches.length === 0) {
        results.innerHTML = '<p class="vnmap-search-empty">Không tìm thấy kết quả phù hợp.</p>';
        results.hidden = false;
        return;
      }
      results.innerHTML = matches.map(function (m, i) {
        var meta = m.t === 'p' ? 'Tỉnh, thành phố' : m.pn;
        return '<button type="button" class="vnmap-search-item" data-index="' + i + '">' +
          '<span class="vnmap-search-item-name">' + m.name + '</span>' +
          '<span class="vnmap-search-item-meta">' + meta + '</span>' +
          '</button>';
      }).join('');
      results.hidden = false;
    }

    function selectMatch(m) {
      if (!m) return;
      input.value = m.name;
      results.hidden = true;
      if (m.t === 'p') {
        renderProvince(m.code, m.name);
      } else {
        renderWardDetail(m.code, m.name, m.pc, m.pn);
      }
    }

    function runSearch(query) {
      var key = normalize(query);
      clearBtn.hidden = query.length === 0;
      if (key.length < 1) { results.hidden = true; return; }
      loadSearchIndex().then(function (index) {
        var matches = index.filter(function (e) { return e._key.indexOf(key) !== -1; }).slice(0, 20);
        renderResults(matches);
      }).catch(function (err) { showFetchError(err); });
    }

    var debounceTimer = null;
    input.addEventListener('input', function () {
      clearTimeout(debounceTimer);
      var value = input.value;
      debounceTimer = setTimeout(function () { runSearch(value); }, 120);
    });

    input.addEventListener('keydown', function (e) {
      var items = results.querySelectorAll('.vnmap-search-item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, items.length - 1);
        items.forEach(function (it, i) { it.classList.toggle('is-active', i === activeIndex); });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        items.forEach(function (it, i) { it.classList.toggle('is-active', i === activeIndex); });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIndex >= 0 && currentMatches[activeIndex]) selectMatch(currentMatches[activeIndex]);
        else if (currentMatches[0]) selectMatch(currentMatches[0]);
      } else if (e.key === 'Escape') {
        results.hidden = true;
      }
    });

    results.addEventListener('click', function (e) {
      var btn = e.target.closest('.vnmap-search-item');
      if (!btn) return;
      selectMatch(currentMatches[parseInt(btn.dataset.index, 10)]);
    });

    clearBtn.addEventListener('click', function () {
      input.value = '';
      clearBtn.hidden = true;
      results.hidden = true;
      input.focus();
    });

    document.addEventListener('click', function (e) {
      if (!els.search.contains(e.target)) results.hidden = true;
    });
  }

  /* ---------------------- Khởi động ---------------------- */

  function bootstrap() {
    els = {
      mapEl: qs('vnmap-map'),
      loading: qs('vnmap-loading'),
      loadingRetry: qs('vnmap-loading-retry'),
      breadcrumb: qs('vnmap-breadcrumb'),
      backBtn: qs('vnmap-back'),
      islands: qs('vnmap-islands'),
      info: qs('vnmap-info'),
      infoBody: qs('vnmap-info-body'),
      infoClose: qs('vnmap-info-close'),
      search: qs('vnmap-search'),
      searchInput: qs('vnmap-search-input'),
      searchClear: qs('vnmap-search-clear'),
      searchResults: qs('vnmap-search-results')
    };

    if (!els.mapEl) return; // panel Maps không tồn tại trên trang này

    els.backBtn.addEventListener('click', goBack);
    els.infoClose.addEventListener('click', hideInfo);
    els.loadingRetry.addEventListener('click', function () { if (lastAction) lastAction(); });
    setupSearch();

    var started = false;
    function activate() {
      ensureMap();
      if (!started) {
        started = true;
        renderCountry();
      }
      setTimeout(function () { map.invalidateSize(); }, 60);
    }

    var mapsTab = document.querySelector('.sh-tab[data-panel="panel-maps"]');
    if (mapsTab) {
      mapsTab.addEventListener('click', activate);
      // Tải trước dữ liệu 34 tỉnh + đảo ngay khi rê chuột/chạm vào tab
      // Maps — thường xảy ra trước lúc bấm vài trăm mili-giây, nên khi
      // click thật thì dữ liệu đã có sẵn (hoặc đang tải dở, dùng chung).
      ['mouseenter', 'focus', 'touchstart'].forEach(function (evt) {
        mapsTab.addEventListener(evt, prefetchCountryData, { once: true, passive: true });
      });
      // Nếu tab Maps đã được chọn sẵn khi tải trang (vd. đến từ URL/hash)
      if (mapsTab.getAttribute('aria-selected') === 'true') activate();
    } else {
      // Không tìm thấy nav — vẫn khởi tạo để bản đồ dùng được độc lập
      activate();
    }

    // Dự phòng: nếu người dùng chưa từng hover/chạm tab Maps trước khi
    // bấm (vd. gõ phím Tab để chuyển focus, hoặc vào thẳng bằng #panel-maps),
    // vẫn tải trước lúc trình duyệt rảnh, không cạnh tranh với render trang.
    if ('requestIdleCallback' in window) {
      requestIdleCallback(prefetchCountryData, { timeout: 2000 });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
