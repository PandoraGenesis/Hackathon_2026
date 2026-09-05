/**
 * Song Hành — AI Travel Assistant Logic (Vanilla JS)
 */

/* ============ 1. MOCK DATA ============ */
const VIETNAM_PROVINCES = [
  {
    label: 'Miền Bắc',
    options: [
      'Hà Nội', 'Lai Châu', 'Điện Biên', 'Sơn La', 'Lạng Sơn', 'Quảng Ninh', 'Cao Bằng',
      'Tuyên Quang', 'Lào Cai', 'Thái Nguyên',
      'Phú Thọ', 'Bắc Ninh', 'Hưng Yên',
      'Hải Phòng', 'Ninh Bình'
    ]
  },
  {
    label: 'Miền Trung & Tây Nguyên',
    options: [
      'Huế', 'Thanh Hóa', 'Nghệ An', 'Hà Tĩnh', 'Quảng Trị',
      'Đà Nẵng', 'Quảng Ngãi', 'Gia Lai',
      'Đắk Lắk', 'Khánh Hòa', 'Lâm Đồng'
    ]
  },
  {
    label: 'Miền Nam',
    options: [
      'Đồng Nai', 'Hồ Chí Minh',
      'Tây Ninh', 'Đồng Tháp', 'Vĩnh Long',
      'Cần Thơ', 'Cà Mau', 'An Giang'
    ]
  }
];

const DESTINATION_LOCATIONS = {
  'Tuyên Quang': ['Tuyên Quang', 'Huyện Sơn Dương', 'Hà Giang', 'Huyện Đồng Văn', 'Huyện Mèo Vạc'],
  'Lào Cai': ['Lào Cai', 'Thị xã Sa Pa', 'Huyện Bắc Hà', 'Yên Bái', 'Thị xã Nghĩa Lộ', 'Huyện Mù Cang Chải'],
  'Thái Nguyên': ['Thái Nguyên', 'Phổ Yên', 'Huyện Đại Từ', 'Bắc Kạn', 'Huyện Ba Bể'],
  'Phú Thọ': ['Việt Trì', 'Vĩnh Yên', 'Thị xã Tam Đảo', 'Hòa Bình', 'Huyện Mai Châu'],
  'Bắc Ninh': ['Bắc Ninh', 'Từ Sơn', 'Bắc Giang', 'Huyện Việt Yên', 'Huyện Lục Ngạn'],
  'Hưng Yên': ['Hưng Yên', 'Thị xã Mỹ Hào', 'Khu đô thị Ecopark', 'Thái Bình', 'Huyện Tiền Hải'],
  'Hải Phòng': ['Hải Phòng', 'Huyện Cát Hải', 'Hải Dương', 'Chí Linh'],
  'Ninh Bình': ['Ninh Bình', 'Huyện Hoa Lư', 'Huyện Gia Viễn', 'Phủ Lý', 'Nam Định'],
  'Quảng Trị': ['Đông Hà', 'Thị xã Quảng Trị', 'Huyện Vĩnh Linh', 'Đồng Hới', 'Huyện Bố Trạch'],
  'Đà Nẵng': ['Đà Nẵng', 'Huyện Hòa Vang', 'Hội An', 'Tam Kỳ', 'Thị xã Điện Bàn'],
  'Quảng Ngãi': ['Quảng Ngãi', 'Thị xã Đức Phổ', 'Huyện Bình Sơn (Lý Sơn)', 'Kon Tum', 'Huyện Đắk Hà', 'Huyện Măng Đen'],
  'Gia Lai': ['Pleiku', 'Thị xã An Khê', 'Huyện Chư Sê', 'Quy Nhơn', 'Thị xã An Nhơn', 'Huyện Tây Sơn'],
  'Đắk Lắk': ['Buôn Ma Thuột', 'Thị xã Buôn Hồ', 'Huyện Krông Pắc', 'Tuy Hòa', 'Thị xã Sông Cầu'],
  'Khánh Hòa': ['Nha Trang', 'Cam Ranh', 'Huyện đảo Trường Sa', 'Phan Rang - Tháp Chàm', 'Huyện Ninh Hải'],
  'Lâm Đồng': ['Đà Lạt', 'Bảo Lộc', 'Gia Nghĩa', 'Phan Thiết', 'Thị xã La Gi'],
  'Đồng Nai': ['Biên Hòa', 'Long Khánh', 'Huyện Nhơn Trạch', 'Đồng Xoài', 'Thị xã Bình Long'],
  'Hồ Chí Minh': ['Hồ Chí Minh', 'Thủ Đức', 'Huyện Cần Giờ', 'Vũng Tàu', 'Thủ Dầu Một', 'Huyện Côn Đảo'],
  'Tây Ninh': ['Tây Ninh', 'Thị xã Trảng Bàng', 'Thị xã Hòa Thành', 'Tân An', 'Huyện Bến Lức'],
  'Đồng Tháp': ['Cao Lãnh', 'Sa Đéc', 'Hồng Ngự', 'Mỹ Tho', 'Thị xã Cai Lậy'],
  'Vĩnh Long': ['Vĩnh Long', 'Thị xã Bình Minh', 'Bến Tre', 'Huyện Châu Thành', 'Trà Vinh'],
  'Cần Thơ': ['Cần Thơ', 'Huyện Phong Điền', 'Sóc Trăng', 'Vị Thanh'],
  'Cà Mau': ['Cà Mau', 'Huyện Năm Căn', 'Huyện Ngọc Hiển', 'Bạc Liêu', 'Thị xã Giá Rai'],
  'An Giang': ['Long Xuyên', 'Châu Đốc', 'Thị xã Tịnh Biên', 'Rạch Giá', 'Phú Quốc', 'Hà Tiên']
};

function getDistrictsForProvince(provinceName) {
  if (DESTINATION_LOCATIONS[provinceName]) {
    return DESTINATION_LOCATIONS[provinceName];
  }
  return ['Trung tâm khu vực', 'Vùng ven', 'Các huyện lân cận'];
}

const DESTINATIONS = []; // Removed, now using ALL_DESTINATIONS from data.js

const PREFERENCES_MAP = {
  bien: 'Coastal',
  nuirung: 'Highland',
  amthuc: 'Urban',
  disan: 'Heritage',
  songnuoc: 'Delta',
  vanhoa: 'Culture',
  camtrai: 'Highland',
  checkin: 'Urban',
  sinhthai: 'Delta',
  giaitri: 'Coastal'
};

/* ============ 2. DOM Elements ============ */
const inputDays = document.getElementById('days');
const btnMinus = document.getElementById('btn-minus');
const btnPlus = document.getElementById('btn-plus');
const presetBtns = document.querySelectorAll('.preset-btn');

const cbTrigger = document.getElementById('departure-trigger');
const cbText = document.getElementById('departure-text');
const cbDropdown = document.getElementById('departure-dropdown');
const cbSearch = document.getElementById('departure-search');
const cbClear = document.getElementById('departure-clear');
const cbList = document.getElementById('departure-list');
const cbChevron = document.getElementById('departure-chevron');

const destText = document.getElementById('destination-text');
const destDropdown = document.getElementById('destination-dropdown');
const destSearch = document.getElementById('destination-search');
const destClear = document.getElementById('destination-clear');
const destList = document.getElementById('destination-list');
const destChevron = document.getElementById('destination-chevron');
const destTrigger = document.getElementById('destination-trigger');
const destAzEl = document.getElementById('dest-loc-az');
const destBubbleEl = document.getElementById('dest-loc-az-bubble');

const tagButtons = document.querySelectorAll('.tag');
const generateBtn = document.getElementById('generate-btn');
const resultSection = document.getElementById('result');
const smartDistanceAlert = document.getElementById('smart-distance-alert');

// A-Z Initialization for Destination
if (destAzEl) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  let html = letters.map(l => `<button type="button" class="az-btn" data-letter="${l}">${l}</button>`).join('');
  destAzEl.innerHTML = html;

  let isDraggingDestAZ = false;

  function handleDestAZMove(e) {
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const target = document.elementFromPoint(clientX, clientY);

    if (target && target.classList.contains('az-btn')) {
      const letter = target.getAttribute('data-letter');

      if (destBubbleEl) {
        destBubbleEl.textContent = letter;
        const targetRect = target.getBoundingClientRect();
        const topPos = targetRect.top + targetRect.height / 2;
        destBubbleEl.style.position = 'fixed';
        destBubbleEl.style.top = `${topPos}px`;
        destBubbleEl.style.left = `${targetRect.left - 60}px`;
        destBubbleEl.classList.add('show');
      }

      if (isDraggingDestAZ || e.type === 'touchmove' || e.type === 'pointerdown') {
        const groupTarget = destList.querySelector(`[data-group="${letter}"]`);
        if (groupTarget) {
          destAzEl.parentElement.scrollTo({ top: groupTarget.offsetTop, behavior: 'instant' });
        }
      }
    }
  }

  destAzEl.addEventListener('pointerdown', (e) => {
    isDraggingDestAZ = true;
    handleDestAZMove(e);
  });
  window.addEventListener('pointerup', () => {
    isDraggingDestAZ = false;
    if (destBubbleEl) destBubbleEl.classList.remove('show');
  });
  destAzEl.addEventListener('pointermove', handleDestAZMove);
  destAzEl.addEventListener('touchmove', handleDestAZMove, { passive: true });

  // Keep the A-Z bar synced when the user scrolls the name list directly
  // (instead of dragging on the A-Z bar itself).
  function syncDestAZWithList() {
    if (isDraggingDestAZ || destAzEl.style.display === 'none') return;

    const listRect = destList.getBoundingClientRect();
    let activeLetter = null;
    destList.querySelectorAll('[data-group]').forEach(group => {
      if (group.getBoundingClientRect().top - listRect.top <= 8) {
        activeLetter = group.getAttribute('data-group');
      }
    });
    if (!activeLetter) return;

    const azBtn = destAzEl.querySelector(`[data-letter="${activeLetter}"]`);
    if (!azBtn) return;

    const azRect = destAzEl.getBoundingClientRect();
    const btnRect = azBtn.getBoundingClientRect();
    if (btnRect.top < azRect.top || btnRect.bottom > azRect.bottom) {
      destAzEl.scrollTo({
        top: azBtn.offsetTop - destAzEl.clientHeight / 2 + azBtn.clientHeight / 2,
        behavior: 'instant'
      });
    }
  }
  destList.addEventListener('scroll', syncDestAZWithList, { passive: true });
}

/* ============ 3. STATE ============ */
let state = {
  duration: '',
  departure: '',
  destination: '',
  destLevel: 1,
  destProvince: '',
  isCbOpen: false,
  isDestOpen: false,
  selectedPrefs: ['bien']
};

/* ============ 4. LOGIC ============ */

// A. Duration Stepper
function updateDuration(val) {
  val = Math.max(1, Math.min(30, val));
  state.duration = val;
  inputDays.value = val;

  presetBtns.forEach(btn => {
    if (parseInt(btn.dataset.days) === val) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  checkWeatherAlert();
}

btnMinus.addEventListener('click', () => updateDuration(state.duration - 1));
btnPlus.addEventListener('click', () => updateDuration(state.duration + 1));

// Khi rời khỏi ô (change): KHÔNG tự điền về 1 nếu người dùng cố tình xóa trống.
// Chỉ cập nhật khi có số hợp lệ được nhập vào.
inputDays.addEventListener('change', (e) => {
  if (e.target.value === '') return; // để trống thì giữ trống, không tự nhảy số
  const parsed = parseInt(e.target.value, 10);
  if (isNaN(parsed)) {
    e.target.value = '';
    return;
  }
  updateDuration(parsed);
});

presetBtns.forEach(btn => {
  btn.addEventListener('click', () => updateDuration(parseInt(btn.dataset.days)));
});

// B. Combobox Departure
function renderComboboxList(filterText = '') {
  let html = '';
  VIETNAM_PROVINCES.forEach(group => {
    const filteredOpts = group.options.filter(o => o.toLowerCase().includes(filterText.toLowerCase()));
    if (filteredOpts.length > 0) {
      html += `<div class="combobox-group">
                 <div class="combobox-group-label">${group.label}</div>`;
      filteredOpts.forEach(opt => {
        const isSelected = opt === state.departure;
        html += `<button type="button" class="combobox-option ${isSelected ? 'selected' : ''}" data-value="${opt}">
                   <span>${opt}</span>
                   ${isSelected ? `<i data-lucide="check" class="check-icon"></i>` : ''}
                 </button>`;
      });
      html += `</div>`;
    }
  });

  if (!html) {
    html = `<div style="padding: 1rem; text-align: center; color: var(--slate-soft); font-size: 0.9rem;">Không tìm thấy khu vực nào</div>`;
  }

  cbList.innerHTML = html;
  window.lucide.createIcons();

  // Attach events
  const opts = cbList.querySelectorAll('.combobox-option');
  opts.forEach(opt => {
    opt.addEventListener('click', () => {
      state.departure = opt.dataset.value;
      cbText.textContent = state.departure;
      cbText.style.color = 'var(--ink)';
      closeCombobox();
    });
  });
}

function renderDestinationList(filterText = '') {
  let html = '';

  if (state.destLevel === 1) {
    if (destAzEl) destAzEl.style.display = 'flex';

    // Level 1: Choose Province, group by A-Z
    let allProvinces = [];
    VIETNAM_PROVINCES.forEach(group => {
      allProvinces.push(...group.options);
    });

    // Filter and Sort
    const filteredOpts = allProvinces.filter(o => o.toLowerCase().includes(filterText.toLowerCase()));
    filteredOpts.sort((a, b) => {
      let cleanA = a;
      let cleanB = b;
      return cleanA.localeCompare(cleanB, 'vi');
    });

    const grouped = {};
    filteredOpts.forEach(opt => {
      let cleanOpt = opt;
      let letter = cleanOpt.charAt(0).toUpperCase();
      if (letter === 'Đ') letter = 'Đ';
      else if (!/[A-Z]/.test(letter)) letter = '#';
      if (!grouped[letter]) grouped[letter] = [];
      grouped[letter].push(opt);
    });

    const sortedKeys = Object.keys(grouped).sort((a, b) => {
      if (a === '#') return 1;
      if (b === '#') return -1;
      return a.localeCompare(b, 'vi');
    });

    sortedKeys.forEach(key => {
      html += `<div class="loc-group" data-group="${key}">
                 <div class="loc-group-title" style="padding: 0.25rem 1rem; font-weight: 700; color: var(--accent); background: #f8fafc;">${key}</div>`;
      grouped[key].forEach(opt => {
        const isSelected = opt === state.destProvince;
        const hasDistricts = DESTINATION_LOCATIONS[opt] ? true : false;
        html += `<button type="button" class="loc-item level-1-opt ${isSelected ? 'selected' : ''}" data-value="${opt}" style="width: 100%; text-align: left; padding: 0.75rem 1rem; border: none; background: transparent; cursor: pointer; color: var(--ink); border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: flex-start; gap: 8px;">
                   ${hasDistricts ? `<i data-lucide="chevron-right" style="width: 16px; height: 16px; color: var(--slate);"></i>` : `<span style="width: 16px; display: inline-block;"></span>`}
                   <span>${opt}</span>
                 </button>`;
      });
      html += `</div>`;
    });
  } else {
    if (destAzEl) destAzEl.style.display = 'none';
    // Level 2: Choose District
    html += `<div style="padding: 10px 12px; border-bottom: 1px solid var(--border); display: flex; align-items: center; gap: 8px; cursor: pointer; color: var(--slate-soft); transition: background 0.2s;" id="dest-back-btn" onmouseover="this.style.background='#F1F5F9'" onmouseout="this.style.background='transparent'">
               <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i>
               <span style="font-weight: 600; font-size: 0.9rem;">${state.destProvince}</span>
             </div>`;

    const districts = getDistrictsForProvince(state.destProvince);
    const filteredOpts = districts.filter(o => o.toLowerCase().includes(filterText.toLowerCase()));

    if (filteredOpts.length > 0) {
      filteredOpts.forEach(opt => {
        const fullVal = `${opt}, ${state.destProvince}`;
        const isSelected = fullVal === state.destination;
        html += `<button type="button" class="loc-item level-2-opt ${isSelected ? 'selected' : ''}" data-value="${opt}" style="width: 100%; text-align: left; padding: 0.75rem 1rem; border: none; background: transparent; cursor: pointer; color: var(--ink); border-bottom: 1px solid #f1f5f9; display: flex; align-items: center; justify-content: flex-start; gap: 8px;">
                   ${isSelected ? `<i data-lucide="check" class="check-icon" style="width: 16px; height: 16px;"></i>` : `<span style="width: 16px; display: inline-block;"></span>`}
                   <span>${opt}</span>
                 </button>`;
      });
    }
  }

  if (!html) {
    html = `<div style="padding: 1rem; text-align: center; color: var(--slate-soft); font-size: 0.9rem;">Không tìm thấy khu vực nào</div>`;
  }

  destList.innerHTML = html;
  window.lucide.createIcons();

  // Attach events
  if (state.destLevel === 1) {
    const opts = destList.querySelectorAll('.level-1-opt');
    opts.forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const val = opt.dataset.value;
        state.destProvince = val;

        if (DESTINATION_LOCATIONS[val]) {
          state.destLevel = 2;
          destSearch.value = '';
          renderDestinationList();
          destSearch.focus();
        } else {
          state.destination = val;
          destText.textContent = state.destination;
          destText.style.color = 'var(--ink)';
          closeDestCombobox();
          checkWeatherAlert();
        }
      });
    });
  } else {
    const backBtn = document.getElementById('dest-back-btn');
    if (backBtn) {
      backBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        state.destLevel = 1;
        destSearch.value = '';
        renderDestinationList();
        destSearch.focus();
      });
    }

    const opts = destList.querySelectorAll('.level-2-opt');
    opts.forEach(opt => {
      opt.addEventListener('click', () => {
        const district = opt.dataset.value;
        state.destination = `${district}, ${state.destProvince}`;
        destText.textContent = state.destination;
        destText.style.color = 'var(--ink)';
        closeDestCombobox();
        checkWeatherAlert();
      });
    });
  }
}

function toggleCombobox() {
  state.isCbOpen = !state.isCbOpen;
  if (state.isCbOpen) {
    cbDropdown.hidden = false;
    cbChevron.classList.add('open');
    renderComboboxList();
    cbSearch.focus();
  } else {
    cbDropdown.hidden = true;
    cbChevron.classList.remove('open');
  }
}

function closeCombobox() {
  state.isCbOpen = false;
  cbDropdown.hidden = true;
  cbChevron.classList.remove('open');
}

/* 
  Departure combobox logic is now handled by js/location.js 
  cbTrigger.addEventListener('click', toggleCombobox);
  cbSearch.addEventListener('input', ...);
  cbClear.addEventListener('click', ...);
*/

// Close outside click
document.addEventListener('click', (e) => {
  if (document.getElementById('departure-container') && !document.getElementById('departure-container').contains(e.target)) {
    closeCombobox();
  }
  if (document.getElementById('destination-container') && !document.getElementById('destination-container').contains(e.target)) {
    closeDestCombobox();
  }
});

function toggleDestCombobox() {
  state.isDestOpen = !state.isDestOpen;

  // Close departure dropdown if open
  const depDropdown = document.getElementById('departure-dropdown');
  if (depDropdown && !depDropdown.hidden) {
    depDropdown.hidden = true;
  }

  if (state.isDestOpen) {
    destDropdown.hidden = false;
    destChevron.classList.add('open');
    if (!state.destProvince) {
      state.destLevel = 1; // Default to level 1 if no province selected
    }
    renderDestinationList(destSearch.value);
    destSearch.focus();
  } else {
    destDropdown.hidden = true;
    destChevron.classList.remove('open');
  }
}

function closeDestCombobox() {
  state.isDestOpen = false;
  destDropdown.hidden = true;
  destChevron.classList.remove('open');
}
window.closeDestCombobox = closeDestCombobox;

if (destTrigger) destTrigger.addEventListener('click', toggleDestCombobox);
if (destSearch) {
  destSearch.addEventListener('input', (e) => {
    const val = e.target.value;
    destClear.hidden = val.length === 0;
    renderDestinationList(val);
  });
}
if (destClear) {
  destClear.addEventListener('click', () => {
    destSearch.value = '';
    destClear.hidden = true;
    renderDestinationList();
    destSearch.focus();
  });
}

// C. Tags and Alert Logic
function checkWeatherAlert() {
  const weatherAlert = document.getElementById('weather-alert');
  const weatherDesc = document.getElementById('weather-alert-desc');
  const startDateInput = document.getElementById('start-date');
  const endDateInput = document.getElementById('end-date');

  if (!weatherAlert || !weatherDesc || !startDateInput || !endDateInput) return;

  const startDate = startDateInput.value;
  const endDate = endDateInput.value;
  const dest = state.destination;

  if (startDate && endDate && dest) {
    weatherAlert.hidden = false;
    weatherDesc.innerHTML = `Dự báo thời tiết tại <b>${dest}</b> từ <b>${startDate}</b> đến <b>${endDate}</b>:
      <ul style="margin-top: 4px; padding-left: 20px; margin-bottom: 0;">
        <li>Thời tiết dự kiến khá đẹp, trời nắng ráo</li>
        <li>Nhiệt độ dao động 24 - 30°C</li>
        <li>Rất thích hợp cho các hoạt động trải nghiệm ngoài trời</li>
      </ul>`;

    // Render daily forecast
    const rightCol = document.getElementById('weather-daily-forecast');
    if (rightCol) {
      let dailyHtml = '';
      const icons = ['sun', 'cloud-sun', 'cloud-rain', 'sun', 'cloud'];
      const colors = ['#f59e0b', '#f59e0b', '#3b82f6', '#f59e0b', '#94a3b8'];
      const temps = ['30°C', '28°C', '25°C', '29°C', '27°C'];

      let [d, m, y] = startDate.split('/');
      let currentDate = new Date(y, m - 1, d);
      let daysToShow = state.duration || 3;

      for (let i = 0; i < daysToShow; i++) {
        let displayDate = `${currentDate.getDate().toString().padStart(2, '0')}/${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;
        let icon = icons[i % icons.length];
        let color = colors[i % colors.length];
        let temp = temps[i % temps.length];

        dailyHtml += `
          <div style="text-align: center; flex: 0 0 auto; min-width: 48px;">
            <p style="font-size: 0.75rem; font-weight: 600; margin-bottom: 8px; color: rgba(230, 81, 0, 0.7);">${displayDate}</p>
            <i data-lucide="${icon}" style="width: 24px; height: 24px; color: ${color}; margin: 0 auto;"></i>
            <p style="font-size: 0.9rem; font-weight: 700; margin-top: 8px; color: var(--warn);">${temp}</p>
          </div>
        `;
        currentDate.setDate(currentDate.getDate() + 1);
      }
      rightCol.innerHTML = dailyHtml;
      window.lucide.createIcons({ root: rightCol });
    }
  } else {
    weatherAlert.hidden = true;
  }
}

const startDateEl = document.getElementById('start-date');
const endDateEl = document.getElementById('end-date');

if (window.flatpickr && window.flatpickr.l10ns && window.flatpickr.l10ns.vn) {
  window.flatpickr.l10ns.vn.months.longhand = [
    "Tháng 1", "Tháng 2", "Tháng 3", "Tháng 4", "Tháng 5", "Tháng 6",
    "Tháng 7", "Tháng 8", "Tháng 9", "Tháng 10", "Tháng 11", "Tháng 12"
  ];
}

const flatpickrConfig = {
  dateFormat: "d/m/Y",
  locale: "vn",
  disableMobile: true,
  onReady: function (selectedDates, dateStr, instance) {
    const btnContainer = document.createElement("div");
    btnContainer.className = "flatpickr-buttons";
    btnContainer.innerHTML = `
      <button type="button" class="btn-clear">Clear</button>
      <button type="button" class="btn-today">Today</button>
    `;
    instance.calendarContainer.appendChild(btnContainer);

    btnContainer.querySelector('.btn-clear').addEventListener('click', () => {
      instance.clear();
      instance.close();
      checkWeatherAlert();
    });
    btnContainer.querySelector('.btn-today').addEventListener('click', () => {
      instance.setDate(new Date());
      instance.close();
      checkWeatherAlert();
    });

    const numInputWrapper = instance.calendarContainer.querySelector('.numInputWrapper');
    if (numInputWrapper) {
      numInputWrapper.style.display = 'none';

      const yearSelect = document.createElement("select");
      yearSelect.className = "flatpickr-monthDropdown-months flatpickr-year-select";

      const currentYear = new Date().getFullYear();
      for (let i = currentYear - 5; i <= currentYear + 10; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.text = i;
        yearSelect.appendChild(option);
      }
      yearSelect.value = instance.currentYear;

      yearSelect.addEventListener("change", function (e) {
        instance.currentYearElement.value = e.target.value;
        instance.changeYear(e.target.value);
      });

      numInputWrapper.parentNode.insertBefore(yearSelect, numInputWrapper.nextSibling);
    }
  },
  onYearChange: function (selectedDates, dateStr, instance) {
    const yearSelect = instance.calendarContainer.querySelector('.flatpickr-year-select');
    if (yearSelect) {
      yearSelect.value = instance.currentYear;
    }
  },
  onChange: function () {
    checkWeatherAlert();
  }
};

if (startDateEl) flatpickr(startDateEl, flatpickrConfig);
if (endDateEl) flatpickr(endDateEl, flatpickrConfig);

tagButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tag = btn.dataset.tag;
    btn.classList.toggle("active");
    if (state.selectedPrefs.includes(tag)) {
      state.selectedPrefs = state.selectedPrefs.filter(t => t !== tag);
    } else {
      state.selectedPrefs.push(tag);
    }
    checkWeatherAlert();
  });
});

// Init tags and alert
checkWeatherAlert();

/* ============ DYNAMIC ITINERARY DATA ============ */
const DYNAMIC_PLACES = {
  'Hà Nội': {
    visit: ['Hồ Hoàn Kiếm & Đền Ngọc Sơn', 'Văn Miếu - Quốc Tử Giám', 'Khu phố cổ Hà Nội', 'Hoàng thành Thăng Long', 'Lăng Chủ tịch Hồ Chí Minh', 'Bảo tàng Dân tộc học'],
    food: [
      { name: 'Thưởng thức Phở Hà Nội', dishes: ['Phở bò', 'Quẩy nóng', 'Trà đá'] },
      { name: 'Khám phá ẩm thực Phố cổ', dishes: ['Bún chả', 'Nem cua bể', 'Trà chanh'] },
      { name: 'Ăn vặt chiều Hà Nội', dishes: ['Cà phê trứng', 'Bún ốc nguội', 'Bánh tôm Hồ Tây'] }
    ]
  },
  'Hồ Chí Minh': {
    visit: ['Chợ Bến Thành', 'Dinh Độc Lập', 'Nhà thờ Đức Bà & Bưu điện TP', 'Phố đi bộ Nguyễn Huệ', 'Bảo tàng Chứng tích Chiến tranh', 'Địa đạo Củ Chi'],
    food: [
      { name: 'Ẩm thực Sài Thành', dishes: ['Cơm tấm sườn bì chả', 'Canh khổ qua', 'Trà đá'] },
      { name: 'Món ngon đường phố', dishes: ['Bánh mì Huỳnh Hoa', 'Gỏi cuốn', 'Nước sâm'] },
      { name: 'Đặc sản chợ đêm', dishes: ['Ốc nhồi thịt', 'Cút lộn xào me', 'Hủ tiếu Nam Vang'] }
    ]
  },
  'Đà Nẵng': {
    visit: ['Bà Nà Hills', 'Bán đảo Sơn Trà & Chùa Linh Ứng', 'Cầu Rồng & Chợ đêm Sơn Trà', 'Ngũ Hành Sơn', 'Biển Mỹ Khê', 'Công viên Châu Á (Asia Park)'],
    food: [
      { name: 'Đặc sản Đà Nẵng', dishes: ['Mì Quảng', 'Bánh tráng cuốn thịt heo', 'Chè Liên'] },
      { name: 'Hải sản biển Mỹ Khê', dishes: ['Mực nhảy hấp', 'Chíp chíp xấp sả', 'Tôm nướng muối ớt'] },
      { name: 'Ăn vặt buổi chiều', dishes: ['Bánh xèo bún thịt nướng', 'Nem lụi', 'Sữa đậu nành'] }
    ]
  }
};

const GENERIC_PREFIXES = {
  visit: ['Khám phá', 'Tham quan', 'Check-in tại', 'Dạo quanh', 'Tìm hiểu văn hóa tại'],
  places: ['Bảo tàng văn hóa', 'Chợ trung tâm', 'Khu du lịch sinh thái', 'Quảng trường thành phố', 'Làng nghề truyền thống', 'Đền chùa cổ', 'Công viên quốc gia', 'Khu phố mua sắm'],
  night_visit: ['Hòa mình vào', 'Dạo bước', 'Khám phá', 'Trải nghiệm', 'Tận hưởng'],
  night_places: ['Khu phố đêm', 'Chợ đêm', 'Phố đi bộ', 'Khu ẩm thực đường phố', 'Quán Bar/Pub sôi động', 'Bến thuyền đêm', 'Khu vui chơi giải trí đêm', 'Chợ đêm hải sản'],
  food_verbs: ['Thưởng thức ẩm thực', 'Khám phá đặc sản', 'Trải nghiệm món ngon', 'Ăn tối tại nhà hàng địa phương'],
  dishes: ['Bún hải sản', 'Gỏi nộm đặc sản', 'Bánh canh chả cá', 'Cơm gà xé', 'Bánh xèo', 'Nem nướng', 'Hải sản tươi sống', 'Lẩu mắm đặc trưng', 'Thịt nướng xiên que', 'Chè thập cẩm']
};

async function fetchWikiImage(query) {
  try {
    let url = `https://vi.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrlimit=1&prop=pageimages&piprop=thumbnail|original&pithumbsize=800&format=json&origin=*`;
    let res = await fetch(url);
    let data = await res.json();
    if (data.query && data.query.pages) {
      const page = Object.values(data.query.pages)[0];
      if (page) {
        if (page.thumbnail) return page.thumbnail.source;
        if (page.original) return page.original.source;
      }
    }
    
    // Nếu không tìm thấy, thử tìm với từ khóa ngắn hơn
    if (query.split(' ').length > 2) {
      const shortQuery = query.split(' ').slice(0, 2).join(' ');
      url = `https://vi.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(shortQuery)}&gsrlimit=1&prop=pageimages&piprop=thumbnail|original&pithumbsize=800&format=json&origin=*`;
      res = await fetch(url);
      data = await res.json();
      if (data.query && data.query.pages) {
        const page = Object.values(data.query.pages)[0];
        if (page) {
          if (page.thumbnail) return page.thumbnail.source;
          if (page.original) return page.original.source;
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
  // Fallback
  return 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Ha_Long_Bay_-_Vietnam.jpg/800px-Ha_Long_Bay_-_Vietnam.jpg';
}

const GRAY_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNlMmU4ZjAiLz48L3N2Zz4=';

function generateDynamicSession(province, sessionType = 'day') {
  let visitItems = [];
  let foodItems = [];
  
  const specificData = DYNAMIC_PLACES[province];
  
  if (sessionType === 'noon') {
    const shuffledDishes = [...GENERIC_PREFIXES.dishes].sort(() => 0.5 - Math.random());
    for (let i = 0; i < 3; i++) {
      const verb = GENERIC_PREFIXES.food_verbs[Math.floor(Math.random() * GENERIC_PREFIXES.food_verbs.length)];
      foodItems.push({
        name: `${verb} ${province}`,
        province: province,
        tags: ['🍛 Ăn Trưa', '🔥 Đặc sản'],
        image: GRAY_PLACEHOLDER,
        keyword: `${shuffledDishes[i] || verb}`,
        duration: '45 phút',
        hours: '11:00 - 14:00',
        tips: `Gợi ý món ăn: **${shuffledDishes[i] || 'Đặc sản địa phương'}**`
      });
    }
  } else if (sessionType === 'evening') {
    // Nightlife visit (1 item)
    const prefix = GENERIC_PREFIXES.night_visit[Math.floor(Math.random() * GENERIC_PREFIXES.night_visit.length)];
    const place = GENERIC_PREFIXES.night_places[Math.floor(Math.random() * GENERIC_PREFIXES.night_places.length)];
    visitItems.push({
      name: `${prefix} ${place} ${province}`,
      province: province,
      tags: ['🌃 Sống về đêm', '🎉 Vui chơi'],
      image: GRAY_PLACEHOLDER,
      keyword: `${place} ${province}`,
      duration: '1-2 giờ',
      hours: '18:00 - 23:00',
      tips: `Gợi ý: Trải nghiệm không khí nhộn nhịp, rực rỡ sắc màu về đêm.`
    });

    // 3 Food items for the evening
    const shuffledDishes = [...GENERIC_PREFIXES.dishes].sort(() => 0.5 - Math.random());
    for (let i = 0; i < 3; i++) {
      const verb = GENERIC_PREFIXES.food_verbs[Math.floor(Math.random() * GENERIC_PREFIXES.food_verbs.length)];
      foodItems.push({
        name: `${verb} ${province}`,
        province: province,
        tags: ['🍜 Ẩm Thực Tối', '🔥 Đặc sản'],
        image: GRAY_PLACEHOLDER,
        keyword: `${shuffledDishes[i] || verb}`,
        duration: '1 giờ',
        hours: '18:00 - 22:00',
        tips: `Gợi ý món chính: **${shuffledDishes[i] || 'Đặc sản địa phương'}**`
      });
    }
  } else if (specificData) {
    const numVisits = Math.random() > 0.5 ? 2 : 1;
    const shuffledVisits = [...specificData.visit].sort(() => 0.5 - Math.random());
    visitItems = shuffledVisits.slice(0, numVisits).map(name => ({
      name: name,
      province: province,
      tags: ['📸 Sống ảo & Check-in', '🌿 Khám phá'],
      image: GRAY_PLACEHOLDER,
      keyword: name,
      duration: '2-3 giờ',
      hours: '08:00 - 17:00',
      tips: 'Gợi ý: Mang theo máy ảnh và trang phục thoải mái.'
    }));
    
    const randomFood = specificData.food[Math.floor(Math.random() * specificData.food.length)];
    foodItems.push({
      name: randomFood.name,
      province: province,
      tags: ['🍜 Ẩm Thực'],
      image: GRAY_PLACEHOLDER,
      keyword: randomFood.name,
      duration: '1-2 giờ',
      hours: '06:00 - 22:00',
      tips: `Thực đơn 3 món gợi ý: **${randomFood.dishes.join(', ')}**`
    });
  } else {
    const numVisits = Math.random() > 0.5 ? 2 : 1;
    for(let i = 0; i < numVisits; i++) {
      const prefix = GENERIC_PREFIXES.visit[Math.floor(Math.random() * GENERIC_PREFIXES.visit.length)];
      const place = GENERIC_PREFIXES.places[Math.floor(Math.random() * GENERIC_PREFIXES.places.length)];
      visitItems.push({
        name: `${prefix} ${place} ${province}`,
        province: province,
        tags: ['📸 Sống ảo & Check-in', '🪕 Khám phá'],
        image: GRAY_PLACEHOLDER,
        keyword: `${place} ${province}`,
        duration: '2-3 giờ',
        hours: 'Mở cửa cả ngày',
        tips: `Gợi ý: Tìm hiểu thêm về lịch sử ${province} tại đây.`
      });
    }
    
    const verb = GENERIC_PREFIXES.food_verbs[Math.floor(Math.random() * GENERIC_PREFIXES.food_verbs.length)];
    const shuffledDishes = [...GENERIC_PREFIXES.dishes].sort(() => 0.5 - Math.random());
    const selectedDishes = shuffledDishes.slice(0, 3);
    foodItems.push({
      name: `${verb} ${province}`,
      province: province,
      tags: ['🍜 Ẩm Thực'],
      image: GRAY_PLACEHOLDER,
      keyword: `${selectedDishes[0] || verb}`,
      duration: '1-2 giờ',
      hours: '06:00 - 22:00',
      tips: `Thực đơn 3 món gợi ý: **${selectedDishes.join(', ')}**`
    });
  }
  
  return [...visitItems, ...foodItems];
}

// D. Generate Logic
generateBtn.addEventListener("click", () => {
  if (!state.duration || !state.departure || !state.destination || !startDateEl.value || !endDateEl.value) {
    alert("Vui lòng điền đầy đủ các thông tin: Ngày đến/đi, Số ngày, Điểm khởi hành và Điểm đến trước khi tạo lịch trình.");
    return;
  }
  if (state.selectedPrefs.length === 0) {
    alert("Vui lòng chọn ít nhất một sở thích trải nghiệm.");
    return;
  }

  generateBtn.disabled = true;
  generateBtn.innerHTML = `<i data-lucide="loader-circle" class="cta-icon spin"></i><span>Đang phân tích & tối ưu...</span>`;
  window.lucide.createIcons();

  setTimeout(() => {
    const prefClusters = state.selectedPrefs.map(p => PREFERENCES_MAP[p]);

    // Extract exact province string if it contains districts
    const provinceStr = state.destProvince || state.destination.split(',').pop().trim();

    // Try to match destination province, fallback to all if none matched
    let localDests = ALL_DESTINATIONS.filter(d => d.province === provinceStr);
    if (localDests.length === 0) localDests = ALL_DESTINATIONS;

    let filtered = localDests.filter(d => prefClusters.includes(d.cluster));
    if (filtered.length === 0) filtered = localDests;

    // Generate itinerary grouped by day and session
    state.generatedItinerary = {};
    for (let day = 1; day <= state.duration; day++) {
      state.generatedItinerary[day] = {
        morning: generateDynamicSession(provinceStr, 'morning'),
        noon: generateDynamicSession(provinceStr, 'noon'),
        afternoon: generateDynamicSession(provinceStr, 'afternoon'),
        evening: generateDynamicSession(provinceStr, 'evening')
      };
    }

    state.selectedWeek = 1;
    state.selectedDay = 1;

    renderResult();

    generateBtn.disabled = false;
    generateBtn.innerHTML = `<i data-lucide="sparkles" class="cta-icon"></i><span>Tạo Lịch Trình Ngay</span>`;
    window.lucide.createIcons();
  }, 1200);
});

/* ============ 5. Render ============ */
function renderResult() {
  const totalDays = state.duration || 1;
  let html = `
    <div class="result-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
      <div style="flex: 1; min-width: 120px;"></div>
      <h2 style="margin: 0; text-align: center; white-space: nowrap;">Lịch Trình Đề Xuất</h2>
      <div style="flex: 1; display: flex; justify-content: flex-end; min-width: 120px;">
        <button type="button" class="save-itinerary-btn" onclick="alert('Đã lưu lịch trình thành công!')">
          <i data-lucide="bookmark" style="width:18px; height:18px;"></i> Lưu lịch trình
        </button>
      </div>
    </div>
  `;

  // Week Selector (Only if >= 14 days)
  if (totalDays >= 14) {
    const totalWeeks = Math.ceil(totalDays / 7);
    html += `
      <div class="timeline-panel timeline-box" style="margin-top: 1.5rem;">
        <h3>Tuần</h3>
        <div class="timeline-scroll center-scroll">
    `;
    for (let w = 1; w <= totalWeeks; w++) {
      const isActive = (w === state.selectedWeek);
      html += `<button type="button" class="week-btn ${isActive ? 'active' : ''}" data-week="${w}">Tuần ${w}</button>`;
    }
    html += `
        </div>
      </div>
    `;
  }

  // Day Selector
  html += `
    <div class="timeline-panel timeline-box" style="margin-top: ${totalDays >= 14 ? '1rem' : '1.5rem'}; margin-bottom: 2rem;">
      <h3>Ngày</h3>
      <div class="timeline-scroll center-scroll">
  `;

  let startDay = 1;
  let endDay = totalDays;
  if (totalDays >= 14) {
    startDay = (state.selectedWeek - 1) * 7 + 1;
    endDay = Math.min(state.selectedWeek * 7, totalDays);
  }

  for (let d = startDay; d <= endDay; d++) {
    const isActive = (d === state.selectedDay);
    html += `<button type="button" class="circle-btn ${isActive ? 'active' : ''}" data-day="${d}">${d}</button>`;
  }

  html += `
      </div>
    </div>
  `;

  // Destination Grid for Selected Day
  const dayItinerary = state.generatedItinerary[state.selectedDay] || {};

  html += `<div style="opacity: 0; animation: fadeIn 0.3s forwards;">`;
  if (!dayItinerary.morning) {
    html += `<div style="text-align:center; padding:3rem; color:var(--slate-soft);">Chưa có hoạt động nào cho ngày này.</div>`;
  } else {
    const sessions = [
      { id: 'morning', title: '🌅 Buổi Sáng', data: dayItinerary.morning },
      { id: 'noon', title: '🍲 Buổi Trưa', data: dayItinerary.noon },
      { id: 'afternoon', title: '☀️ Buổi Chiều', data: dayItinerary.afternoon },
      { id: 'evening', title: '🌙 Buổi Tối', data: dayItinerary.evening }
    ];

    sessions.forEach(session => {
      let gradient = '';
      if (session.id === 'morning') gradient = 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)';
      else if (session.id === 'noon') gradient = 'linear-gradient(135deg, #34d399 0%, #10b981 100%)';
      else if (session.id === 'afternoon') gradient = 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)';
      else if (session.id === 'evening') gradient = 'linear-gradient(135deg, #818cf8 0%, #4f46e5 100%)';

      html += `
        <div style="
          margin: 2.5rem 0 1.5rem;
          padding: 1rem 1.5rem;
          background: ${gradient};
          color: white;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        ">
          <h3 style="margin: 0; font-size: 1.25rem; font-weight: 700; color: white;">${session.title}</h3>
        </div>
      `;
      html += `<div class="destination-grid">`;
      session.data.forEach(dest => {
        html += `
          <div class="destination-card">
            <div class="dest-image-wrap">
              <img src="${dest.image}" alt="${dest.name}" data-keyword="${dest.keyword || dest.name}" class="dynamic-dest-img">
              <div class="dest-overlay"></div>
              <div class="dest-tags">
                ${dest.tags.map(t => `<span>${t}</span>`).join('')}
              </div>
              <h3 class="dest-title">${dest.name}</h3>
            </div>
            <div class="dest-body">
              <div class="dest-meta">
                <div><i data-lucide="clock" class="meta-icon"></i> ${dest.duration}</div>
                <div><i data-lucide="map" class="meta-icon"></i> ${dest.province}</div>
              </div>
              <div class="dest-hours">
                <h4>Giờ mở cửa</h4>
                <p>${dest.hours}</p>
              </div>
              <div class="dest-tips">
                <h4><i data-lucide="info" class="tips-icon"></i> Local Tips</h4>
                <p>${dest.tips.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</p>
              </div>
            </div>
          </div>
        `;
      });
      html += `</div>`;
    });
  }
  html += `</div>`;

  // Add simple fade animation
  if (!document.getElementById('fade-anim-style')) {
    const style = document.createElement('style');
    style.id = 'fade-anim-style';
    style.innerHTML = `@keyframes fadeIn { to { opacity: 1; } }`;
    document.head.appendChild(style);
  }

  resultSection.innerHTML = html;
  resultSection.hidden = false;
  window.lucide.createIcons();

  if (!state.isRerendering) {
    resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  state.isRerendering = false;

  // Tải hình ảnh bất đồng bộ từ Wikipedia
  document.querySelectorAll('.dynamic-dest-img').forEach(async (img) => {
    const keyword = img.getAttribute('data-keyword');
    if (keyword) {
      const actualImgUrl = await fetchWikiImage(keyword);
      if (actualImgUrl) {
        img.src = actualImgUrl;
      }
    }
  });

  // Events for Week and Day buttons
  const weekBtns = resultSection.querySelectorAll('.week-btn');
  weekBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.selectedWeek = parseInt(e.target.getAttribute('data-week'));
      state.selectedDay = (state.selectedWeek - 1) * 7 + 1;
      state.isRerendering = true;
      renderResult();
    });
  });

  const dayBtns = resultSection.querySelectorAll('.circle-btn');
  dayBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      state.selectedDay = parseInt(e.target.getAttribute('data-day'));
      state.isRerendering = true;
      renderResult();
    });
  });
}

/* ============ 6. Khởi tạo ============ */
window.lucide.createIcons();
