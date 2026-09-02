/**
 * Song Hành — AI Travel Assistant Logic (Vanilla JS)
 */

/* ============ 1. MOCK DATA ============ */
const DEPARTURE_GROUPS = [
  {
    label: 'Thành phố / Thị xã',
    options: ['TP. Quy Nhơn', 'TP. Pleiku', 'Thị xã An Nhơn', 'Thị xã Hoài Nhơn', 'Thị xã An Khê', 'Thị xã Ayun Pa']
  },
  {
    label: 'Huyện / Thị trấn',
    options: ['Huyện Phù Cát', 'Huyện Phù Mỹ', 'Huyện Tuy Phước', 'Huyện Tây Sơn', 'Huyện Vân Canh', 'Huyện Chư Sê', 'Huyện Đak Đoa', 'Huyện Iagrai', 'Huyện Chư Prông', 'Huyện Chư Păh', 'Huyện KBang', 'Huyện Đak Pơ', 'Huyện Kông Chro']
  },
  {
    label: 'Cảng hàng không & Ga tàu',
    options: ['Sân bay Phù Cát (UIH)', 'Sân bay Pleiku (PXU)', 'Ga Diêu Trì', 'Ga Quy Nhơn']
  },
  {
    label: 'Phường / Xã phổ biến',
    options: ['Phường Quang Trung (Quy Nhơn)', 'Phường Hội Phú (Pleiku)', 'Xã Nhơn Lý', 'Xã Nhơn Hải']
  }
];

const DESTINATIONS = [
  // Coastal Cluster (Quy Nhơn)
  { id: 'kyco', name: 'Kỳ Co', cluster: 'Coastal', image: 'https://images.unsplash.com/photo-1559586616-361e18714958?auto=format&fit=crop&q=80&w=800', tags: ['🌊 Biển Đảo'], duration: '3-4 giờ', hours: '08:00 - 17:00', tips: 'Nên đi cano từ sáng sớm để ngắm san hô đẹp nhất. Nhớ mang theo kem chống nắng.' },
  { id: 'eogio', name: 'Eo Gió', cluster: 'Coastal', image: 'https://images.unsplash.com/photo-1549473889-14f410d83298?auto=format&fit=crop&q=80&w=800', tags: ['🌊 Biển Đảo'], duration: '1-2 giờ', hours: '06:00 - 18:00', tips: 'Nơi ngắm bình minh và hoàng hôn tuyệt đẹp với con đường đi bộ ven biển.' },
  { id: 'culaoxanh', name: 'Cù Lao Xanh', cluster: 'Coastal', image: 'https://images.unsplash.com/photo-1574887309990-281b376d29d3?auto=format&fit=crop&q=80&w=800', tags: ['🌊 Biển Đảo'], duration: 'Nửa ngày', hours: '07:00 - 16:00', tips: 'Hòn đảo ngọc hoang sơ, cần đi cano khoảng 30 phút từ bến tàu Hàm Tử.' },
  { id: 'ghenhrang', name: 'Ghềnh Ráng Tiên Sa', cluster: 'Coastal', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800', tags: ['🌊 Biển Đảo'], duration: '2 giờ', hours: 'Cả ngày', tips: 'Tham quan bãi tắm Hoàng Hậu, viếng mộ thi sĩ Hàn Mặc Tử.' },
  { id: 'thapbanhit', name: 'Tháp Bánh Ít', cluster: 'Coastal', image: 'https://images.unsplash.com/photo-1600868153470-4f51e0892f39?auto=format&fit=crop&q=80&w=800', tags: ['🏛️ Văn Hóa Chăm Pa'], duration: '1.5 giờ', hours: '07:00 - 17:30', tips: 'Cụm tháp Chăm pa cổ đẹp và quy mô lớn nhất còn sót lại.' },
  { id: 'honkho', name: 'Hòn Khô', cluster: 'Coastal', image: 'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?auto=format&fit=crop&q=80&w=800', tags: ['🌊 Biển Đảo'], duration: '2-3 giờ', hours: '08:00 - 17:00', tips: 'Biển êm, có con đường xuyên biển tuyệt đẹp khi thủy triều rút.' },
  { id: 'baixep', name: 'Bãi Xép', cluster: 'Coastal', image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&q=80&w=800', tags: ['🌊 Biển Đảo'], duration: '2 giờ', hours: 'Cả ngày', tips: 'Bối cảnh phim "Tôi thấy hoa vàng trên cỏ xanh", yên bình và lãng mạn.' },
  { id: 'btquangtrung', name: 'Bảo tàng Quang Trung', cluster: 'Coastal', image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&q=80&w=800', tags: ['🏛️ Văn Hóa'], duration: '2 giờ', hours: '07:00 - 17:00', tips: 'Xem biểu diễn võ thuật Tây Sơn và trống trận hào hùng.' },
  { id: 'thapdoi', name: 'Tháp Đôi', cluster: 'Coastal', image: 'https://images.unsplash.com/photo-1590487988256-9ed24133863e?auto=format&fit=crop&q=80&w=800', tags: ['🏛️ Văn Hóa Chăm Pa'], duration: '1 giờ', hours: '07:00 - 17:00', tips: 'Nằm ngay trung tâm thành phố Quy Nhơn, tiện di chuyển.' },
  { id: 'damthinai', name: 'Đầm Thị Nại', cluster: 'Coastal', image: 'https://images.unsplash.com/photo-1510312305653-8ed496efae77?auto=format&fit=crop&q=80&w=800', tags: ['🌊 Biển Đảo'], duration: '1 giờ', hours: 'Cả ngày', tips: 'Cây cầu vượt biển dài nhất Việt Nam (trước khi có cầu Tân Vũ).' },
  { id: 'longsong', name: 'Tiểu chủng viện Lòng Sông', cluster: 'Coastal', image: 'https://images.unsplash.com/photo-1548625361-ec853039d912?auto=format&fit=crop&q=80&w=800', tags: ['🏛️ Văn Hóa'], duration: '1 giờ', hours: '08:00 - 17:00', tips: 'Kiến trúc Gothic cổ kính đẹp như trời Âu giữa lòng Bình Định.' },
  { id: 'hoanghau', name: 'Bãi tắm Hoàng Hậu', cluster: 'Coastal', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800', tags: ['🌊 Biển Đảo'], duration: '1.5 giờ', hours: 'Cả ngày', tips: 'Bãi đá trứng độc đáo, từng là nơi tắm dành riêng cho Nam Phương Hoàng Hậu.' },
  { id: 'doicat', name: 'Đồi cát Phương Mai', cluster: 'Coastal', image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?auto=format&fit=crop&q=80&w=800', tags: ['⛰️ Cao Nguyên'], duration: '1 giờ', hours: 'Sáng sớm / Chiều mát', tips: 'Thích hợp trượt cát và ngắm cảnh. Rất nắng gắt vào buổi trưa.' },

  // Highland Cluster (Gia Lai)
  { id: 'bienho', name: 'Biển Hồ T\'Nưng', cluster: 'Highland', image: 'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&q=80&w=800', tags: ['⛰️ Cao Nguyên'], duration: '2 giờ', hours: '06:00 - 18:00', tips: 'Đôi mắt Pleiku, mặt hồ trong xanh như ngọc bích quanh năm.' },
  { id: 'chudangya', name: 'Núi lửa Chư Đăng Ya', cluster: 'Highland', image: 'https://images.unsplash.com/photo-1611080352820-227bb3098319?auto=format&fit=crop&q=80&w=800', tags: ['⛰️ Cao Nguyên'], duration: '2-3 giờ', hours: 'Cả ngày', tips: 'Vào tháng 11, hoa dã quỳ nở rộ nhuộm vàng cả ngọn núi lửa.' },
  { id: 'bienhoche', name: 'Biển Hồ Chè & Hàng thông', cluster: 'Highland', image: 'https://images.unsplash.com/photo-1521798365611-66df3b364402?auto=format&fit=crop&q=80&w=800', tags: ['☕ Cà Phê'], duration: '1.5 giờ', hours: 'Sáng sớm', tips: 'Hàng thông trăm tuổi được mệnh danh là con đường Hàn Quốc.' },
  { id: 'phucuong', name: 'Thác Phú Cường', cluster: 'Highland', image: 'https://images.unsplash.com/photo-1432405972618-fc40814d22ea?auto=format&fit=crop&q=80&w=800', tags: ['⛰️ Cao Nguyên'], duration: '2-3 giờ', hours: '07:00 - 17:00', tips: 'Thác nước hùng vĩ nhất Gia Lai, chảy trên nền nham thạch cổ.' },
  { id: 'k50', name: 'Thác K50 (Kon Chư Răng)', cluster: 'Highland', image: 'https://images.unsplash.com/photo-1502784444187-359ac188053e?auto=format&fit=crop&q=80&w=800', tags: ['⛰️ Cao Nguyên'], duration: '1 ngày', hours: 'Cả ngày', tips: 'Cần có người dẫn đường, trekking đường rừng khám phá vẻ đẹp hoang sơ.' },
  { id: 'minhthanh', name: 'Chùa Minh Thành', cluster: 'Highland', image: 'https://images.unsplash.com/photo-1601007238210-22c66d8f8d68?auto=format&fit=crop&q=80&w=800', tags: ['🏛️ Văn Hóa'], duration: '1.5 giờ', hours: '07:00 - 17:00', tips: 'Ngôi chùa mang đậm kiến trúc Nhật Bản và Đài Loan tuyệt đẹp.' },
  { id: 'daidoanket', name: 'Quảng trường Đại Đoàn Kết', cluster: 'Highland', image: 'https://images.unsplash.com/photo-1577903875324-1fbc8ed2cf91?auto=format&fit=crop&q=80&w=800', tags: ['🏛️ Văn Hóa'], duration: '1 giờ', hours: 'Cả ngày', tips: 'Trái tim của Pleiku, nơi có tượng đài Bác Hồ lớn nhất Việt Nam.' },
  { id: 'cohong', name: 'Đồi cỏ hồng Giao Thủy', cluster: 'Highland', image: 'https://images.unsplash.com/photo-1508688461413-568ebcdce323?auto=format&fit=crop&q=80&w=800', tags: ['⛰️ Cao Nguyên'], duration: '1.5 giờ', hours: 'Tháng 11-12', tips: 'Check-in tuyệt đẹp vào sáng sớm khi sương còn đọng trên lá.' },
  { id: 'pleikep', name: 'Làng văn hóa Plei Kép', cluster: 'Highland', image: 'https://images.unsplash.com/photo-1520113117462-1130e9d6d3fc?auto=format&fit=crop&q=80&w=800', tags: ['🪕 Văn Hóa Tây Nguyên'], duration: '2-3 giờ', hours: 'Cả ngày', tips: 'Khám phá nhà rông, văn hóa cồng chiêng và thưởng thức rượu cần.' },
  { id: 'konkakinh', name: 'Vườn quốc gia Kon Ka Kinh', cluster: 'Highland', image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800', tags: ['⛰️ Cao Nguyên'], duration: '1 ngày', hours: 'Cả ngày', tips: 'Nóc nhà của Gia Lai, đa dạng sinh học, thích hợp trekking.' },
  { id: 'hamrong', name: 'Núi Hàm Rồng', cluster: 'Highland', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', tags: ['⛰️ Cao Nguyên'], duration: '2 giờ', hours: 'Cả ngày', tips: 'Trạm phát sóng, có thể ngắm toàn cảnh Pleiku từ trên cao.' }
];

const PREFERENCES_MAP = {
  bien: 'Coastal',
  thiennhien: 'Highland',
  caphe: 'Highland',
  vanhoatn: 'Highland',
  vanhoacp: 'Coastal'
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

const tagButtons = document.querySelectorAll('.tag');
const generateBtn = document.getElementById('generate-btn');
const resultSection = document.getElementById('result');
const smartDistanceAlert = document.getElementById('smart-distance-alert');

/* ============ 3. STATE ============ */
let state = {
  duration: 3,
  departure: 'TP. Quy Nhơn',
  isCbOpen: false,
  selectedPrefs: ['bien', 'caphe']
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
  
  checkSmartDistanceAlert();
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
  DEPARTURE_GROUPS.forEach(group => {
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
      closeCombobox();
    });
  });
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

cbTrigger.addEventListener('click', toggleCombobox);
cbSearch.addEventListener('input', (e) => {
  const val = e.target.value;
  cbClear.hidden = val.length === 0;
  renderComboboxList(val);
});
cbClear.addEventListener('click', () => {
  cbSearch.value = '';
  cbClear.hidden = true;
  renderComboboxList();
  cbSearch.focus();
});

// Close outside click
document.addEventListener('click', (e) => {
  if (!document.getElementById('departure-container').contains(e.target)) {
    closeCombobox();
  }
});

// C. Tags and Alert Logic
function checkSmartDistanceAlert() {
  if (state.duration >= 3) {
    smartDistanceAlert.hidden = true;
    return;
  }
  
  const prefClusters = state.selectedPrefs.map(p => PREFERENCES_MAP[p]);
  const hasCoastal = prefClusters.includes('Coastal');
  const hasHighland = prefClusters.includes('Highland');
  
  if (hasCoastal && hasHighland) {
    smartDistanceAlert.hidden = false;
  } else {
    smartDistanceAlert.hidden = true;
  }
}

tagButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tag = btn.dataset.tag;
    btn.classList.toggle("active");
    if (state.selectedPrefs.includes(tag)) {
      state.selectedPrefs = state.selectedPrefs.filter(t => t !== tag);
    } else {
      state.selectedPrefs.push(tag);
    }
    checkSmartDistanceAlert();
  });
});

// Init tags and alert
checkSmartDistanceAlert();

// D. Generate Logic
generateBtn.addEventListener("click", () => {
  if (state.selectedPrefs.length === 0) return;
  
  generateBtn.disabled = true;
  generateBtn.innerHTML = `<i data-lucide="loader-circle" class="cta-icon spin"></i><span>Đang phân tích & tối ưu...</span>`;
  window.lucide.createIcons();

  setTimeout(() => {
    const prefClusters = state.selectedPrefs.map(p => PREFERENCES_MAP[p]);
    const filtered = DESTINATIONS.filter(d => prefClusters.includes(d.cluster));
    
    // Shuffle
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const itemCount = Math.min(Math.max(state.duration * 2, 3), 8);
    const itinerary = shuffled.slice(0, itemCount);
    
    renderResult(itinerary);

    generateBtn.disabled = false;
    generateBtn.innerHTML = `<i data-lucide="sparkles" class="cta-icon"></i><span>Tạo Lịch Trình Ngay</span>`;
    window.lucide.createIcons();
  }, 1200);
});

/* ============ 5. Render ============ */
function renderResult(itinerary) {
  let html = `
    <div class="result-header">
      <h2>Lịch Trình Đề Xuất Của Bạn</h2>
      <p>Dựa trên ${state.duration} ngày khởi hành từ ${state.departure}, hệ thống đã gợi ý các điểm đến lý tưởng nhất.</p>
    </div>
    <div class="destination-grid">
  `;
  
  itinerary.forEach(dest => {
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
            <div><i data-lucide="map" class="meta-icon"></i> ${dest.cluster === 'Coastal' ? 'Bình Định' : 'Gia Lai'}</div>
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
  
  html += `</div>`;
  
  resultSection.innerHTML = html;
  resultSection.hidden = false;
  window.lucide.createIcons();
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============ 6. Khởi tạo ============ */
window.lucide.createIcons();
