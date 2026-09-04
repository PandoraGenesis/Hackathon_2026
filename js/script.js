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
    if (e.type === 'touchmove' && e.cancelable) e.preventDefault();

    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const target = document.elementFromPoint(clientX, clientY);

    if (target && target.classList.contains('az-btn')) {
      const letter = target.getAttribute('data-letter');

      if (destBubbleEl) {
        destBubbleEl.textContent = letter;
        const targetRect = target.getBoundingClientRect();
        const azRect = destAzEl.getBoundingClientRect();
        const topPos = targetRect.top - azRect.top + targetRect.height / 2;
        destBubbleEl.style.top = `${topPos}px`;
        destBubbleEl.classList.add('show');
      }

      if (isDraggingDestAZ || e.type === 'touchmove' || e.type === 'pointerdown') {
        const groupTarget = destList.querySelector(`[data-group="${letter}"]`);
        if (groupTarget) {
          destList.scrollTo({ top: groupTarget.offsetTop, behavior: 'instant' });
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
  destAzEl.addEventListener('touchmove', handleDestAZMove, { passive: false });
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
inputDays.addEventListener('change', (e) => updateDuration(parseInt(e.target.value) || 1));

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
    
    // Generate itinerary grouped by day
    state.generatedItinerary = {};
    for (let day = 1; day <= state.duration; day++) {
        const shuffled = [...filtered].sort(() => 0.5 - Math.random());
        const numItems = Math.floor(Math.random() * 3) + 2; // 2 to 4 items
        state.generatedItinerary[day] = shuffled.slice(0, Math.min(numItems, shuffled.length));
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
      <h2 style="margin: 0;">Lịch Trình Đề Xuất</h2>
      <button type="button" class="save-itinerary-btn" onclick="alert('Đã lưu lịch trình thành công!')">
        <i data-lucide="bookmark" style="width:18px; height:18px;"></i> Lưu lịch trình
      </button>
    </div>
  `;

  // Week Selector (Only if >= 14 days)
  if (totalDays >= 14) {
    const totalWeeks = Math.ceil(totalDays / 7);
    html += `
      <div class="timeline-panel" style="margin-top: 1.5rem;">
        <h3>Tuần</h3>
        <div class="timeline-scroll">
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
    <div class="timeline-panel" style="margin-top: ${totalDays >= 14 ? '1rem' : '1.5rem'}; margin-bottom: 2rem;">
      <h3>Ngày</h3>
      <div class="timeline-scroll">
  `;
  
  let startDay = 1;
  let endDay = totalDays;
  if (totalDays >= 14) {
    startDay = (state.selectedWeek - 1) * 7 + 1;
    endDay = Math.min(state.selectedWeek * 7, totalDays);
  }

  for (let d = startDay; d <= endDay; d++) {
    const isActive = (d === state.selectedDay);
    html += `<button type="button" class="circle-btn has-data ${isActive ? 'active' : ''}" data-day="${d}">${d}</button>`;
  }
  
  html += `
      </div>
    </div>
  `;

  // Destination Grid for Selected Day
  const dayItinerary = state.generatedItinerary[state.selectedDay] || [];
  
  html += `<div class="destination-grid" style="opacity: 0; animation: fadeIn 0.3s forwards;">`;
  if (dayItinerary.length === 0) {
      html += `<div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--slate-soft);">Chưa có hoạt động nào cho ngày này.</div>`;
  } else {
      dayItinerary.forEach(dest => {
        html += `
          <div class="destination-card">
            <div class="dest-image-wrap">
              <img src="${dest.image}" alt="${dest.name}">
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
                <p>${dest.tips}</p>
              </div>
            </div>
          </div>
        `;
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
