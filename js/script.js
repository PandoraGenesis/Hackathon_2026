/**
 * Song Hành — logic sinh lịch trình + render giao diện
 *
 * GHI CHÚ: Phần dưới đây dùng một bộ dữ liệu điểm đến tĩnh cùng luật
 * logic viết sẵn (không ghép hai vùng cách xa nhau vào một ngày, tự
 * động rút gọn về một vùng nếu số ngày quá ít). Đây là bản demo chạy
 * được ngay trên GitHub Pages, không cần backend. Khi có API AI thật
 * (ví dụ endpoint Dify), thay nội dung hàm buildItinerary() bằng một
 * lệnh gọi fetch() tới endpoint đó và giữ nguyên phần render bên dưới.
 */

/* ============ 1. Dữ liệu điểm đến (knowledge base tĩnh) ============ */
const REGION_META = {
  quynhon: { label: "Quy Nhơn", badgeText: "🌊 Quy Nhơn", border: "#1565C0", tint: "#E3F2FD" },
  gialai: { label: "Gia Lai", badgeText: "⛰️ Gia Lai", border: "#C62828", tint: "#FDECEC" },
  transit: { label: "Di chuyển", badgeText: "🚗 Di chuyển QL19", border: "#E65100", tint: "#FFF3E0" },
};

const DESTINATIONS = {
  quynhon: [
    { tag: "bien", icon: "waves", title: "Kỳ Co", desc: "Vịnh biển nước trong xanh như ngọc, lặn ngắm san hô hoặc tắm biển giữa những mỏm đá granite." },
    { tag: "bien", icon: "waves", title: "Eo Gió", desc: "Mỏm đá nhô ra biển, gió lộng quanh năm — điểm ngắm bình minh được yêu thích nhất Quy Nhơn." },
    { tag: "bien", icon: "waves", title: "Cù Lao Xanh", desc: "Đảo nhỏ ngoài khơi, nước trong đến mức nhìn thấy đáy, hợp cho một buổi lặn ngắm san hô trọn vẹn." },
    { tag: "general", icon: "map-pin", title: "Ghềnh Ráng – Tiên Sa", desc: "Bãi đá Trứng độc đáo và khu mộ thi sĩ Hàn Mặc Tử, đẹp nhất vào lúc hoàng hôn." },
    { tag: "general", icon: "map-pin", title: "Tháp Đôi", desc: "Cụm tháp Chăm cổ hơn 800 năm tuổi ngay trong lòng thành phố, ghé nhanh trong buổi sáng." },
    { tag: "amthuc", icon: "utensils", title: "Bún rạm & hải sản Quy Nhơn", desc: "Bún rạm đồng, bánh xèo tôm nhảy, hải sản tươi ngay tại khu chợ đêm ven biển." },
    { tag: "general", icon: "map-pin", title: "Tự do dạo phố biển", desc: "Đi dạo dọc đường Xuân Diệu ven biển, ngồi quán cà phê nhìn hoàng hôn, hoặc mua hải sản khô làm quà." },
  ],
  gialai: [
    { tag: "general", icon: "mountain", title: "Biển Hồ (Tơ Nưng)", desc: "Hồ nước ngọt giữa cao nguyên, mặt nước phẳng lặng như gương — đẹp nhất lúc còn sương sớm." },
    { tag: "caphe", icon: "coffee", title: "Đồi chè Bàu Cạn", desc: "Đồi chè xanh mướt trải dài tít tắp, xen giữa là những hàng muồng hoa vàng cổ thụ." },
    { tag: "thac", icon: "mountain", title: "Thác K50 (Hang Én)", desc: "Một trong những thác nước đẹp và hoang sơ nhất Tây Nguyên, sâu trong rừng nguyên sinh Kon Chư Răng." },
    { tag: "thac", icon: "mountain", title: "Núi lửa Chư Đang Ya", desc: "Miệng núi lửa đã tắt hàng triệu năm, leo bộ khoảng một giờ — rực rỡ nhất vào mùa hoa dã quỳ." },
    { tag: "vanhoa", icon: "music", title: "Làng văn hóa Bahnar, Jrai", desc: "Nhà rông truyền thống, nghe cồng chiêng Tây Nguyên — di sản văn hóa phi vật thể của nhân loại." },
    { tag: "amthuc", icon: "utensils", title: "Phở khô Gia Lai (2 tô) & cà phê Pleiku", desc: "Một tô phở khô, một tô nước dùng riêng, kèm ly cà phê phin đậm đà — món phải thử khi ghé cao nguyên." },
    { tag: "general", icon: "mountain", title: "Tự do khám phá Pleiku", desc: "Dạo quanh Quảng trường Đại Đoàn Kết, ghé chùa Minh Thành, hoặc nghỉ tại quán cà phê view đồi thông." },
  ],
};

const TIME_SLOTS = ["07:30", "12:30", "18:00"];

/* ============ 2. Luật sinh lịch trình ============ */
function sortPool(pool, selectedInterests) {
  return pool
    .map((item, i) => ({ item, i }))
    .sort((a, b) => {
      const aScore = selectedInterests.includes(a.item.tag) ? 1 : 0;
      const bScore = selectedInterests.includes(b.item.tag) ? 1 : 0;
      if (aScore !== bScore) return bScore - aScore;
      return a.i - b.i;
    })
    .map((x) => x.item);
}

function splitDays(days) {
  const first = Math.ceil(days / 2);
  return [first, days - first];
}

function buildItinerary(days, departure, selectedInterests) {
  const regionsWanted = [];
  if (selectedInterests.includes("bien")) regionsWanted.push("quynhon");
  if (["caphe", "thac", "vanhoa"].some((t) => selectedInterests.includes(t))) {
    regionsWanted.push("gialai");
  }

  const giaLaiDeparture = departure === "TP. Pleiku" || departure === "Sân bay Pleiku (PXU)";
  const regions = regionsWanted.length > 0 ? regionsWanted : [giaLaiDeparture ? "gialai" : "quynhon"];

  // Luật cứng: dưới 3 ngày mà chọn cả hai vùng thì không sinh lịch
  // trình trộn lẫn — tự động rút gọn về vùng gần điểm khởi hành hơn.
  const showWarning = regions.length === 2 && days < 3;

  let orderedRegions = regions;
  if (regions.length === 2) {
    orderedRegions = giaLaiDeparture ? ["gialai", "quynhon"] : ["quynhon", "gialai"];
  }
  if (showWarning) {
    orderedRegions = [giaLaiDeparture ? "gialai" : "quynhon"];
  }

  const blocks = orderedRegions.length === 2 ? splitDays(days) : [days];
  const dayCards = [];
  let dayNumber = 1;

  orderedRegions.forEach((region, blockIndex) => {
    const pool = sortPool(DESTINATIONS[region], selectedInterests);
    const blockDays = blocks[blockIndex];
    const isSecondBlock = blockIndex === 1;
    let cursor = 0;

    for (let i = 0; i < blockDays; i++) {
      const isTransitDay = isSecondBlock && i === 0;
      let activities;

      if (isTransitDay) {
        const arrival = pool[cursor % pool.length];
        cursor++;
        const otherRegion = orderedRegions[0];
        activities = [
          {
            time: "06:00",
            icon: "map-pin",
            title: `Khởi hành từ ${REGION_META[otherRegion].label}`,
            desc: "Điểm dừng cuối trong chặng vừa qua, sắp xếp hành lý cho chặng tiếp theo.",
          },
          {
            time: "06:30",
            icon: "car",
            title: "Di chuyển theo Quốc lộ 19",
            desc: "Khoảng 180–200km, tương đương 4 giờ chạy xe, băng qua đèo An Khê nối liền vùng biển và cao nguyên.",
          },
          { time: "11:30", icon: arrival.icon, title: arrival.title, desc: arrival.desc },
        ];
      } else {
        activities = TIME_SLOTS.map((time) => {
          const item = pool[cursor % pool.length];
          cursor++;
          return { time, icon: item.icon, title: item.title, desc: item.desc };
        });
      }

      dayCards.push({ dayNumber, region: isTransitDay ? "transit" : region, activities });
      dayNumber++;
    }
  });

  let strategyText;
  if (showWarning) {
    const fallbackLabel = REGION_META[orderedRegions[0]].label;
    strategyText = `Với chỉ ${days} ngày mà chọn cả hai vùng, phần lớn thời gian sẽ dành cho việc di chuyển thay vì trải nghiệm. Hệ thống đã tự động tập trung toàn bộ lịch trình vào ${fallbackLabel} — vùng gần điểm xuất phát của bạn hơn — để chuyến đi trọn vẹn nhất có thể.`;
  } else if (orderedRegions.length === 2) {
    const [a, b] = orderedRegions;
    strategyText = `Lịch trình chia thành 2 chặng liền mạch: ${blocks[0]} ngày ở ${REGION_META[a].label}, ${blocks[1]} ngày ở ${REGION_META[b].label}, nối bằng một chặng di chuyển khoảng 4 giờ qua Quốc lộ 19. Không có ngày nào bị xáo trộn giữa hai vùng.`;
  } else {
    strategyText = `Tập trung trọn ${days} ngày khám phá ${REGION_META[orderedRegions[0]].label} để chuyến đi trọn vẹn và không phải di chuyển xa.`;
  }

  return { showWarning, warningDays: days, strategyText, days: dayCards };
}

/* ============ 3. Lấy phần tử DOM & trạng thái ============ */
const daysInput = document.getElementById("days");
const daysValue = document.getElementById("days-value");
const departureSelect = document.getElementById("departure");
const tagButtons = document.querySelectorAll(".tag");
const generateBtn = document.getElementById("generate-btn");
const resultSection = document.getElementById("result");

let selectedInterests = Array.from(tagButtons)
  .filter((btn) => btn.classList.contains("active"))
  .map((btn) => btn.dataset.tag);

/* ============ 4. Sự kiện tương tác ============ */
daysInput.addEventListener("input", () => {
  daysValue.textContent = daysInput.value;
});

tagButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tag = btn.dataset.tag;
    btn.classList.toggle("active");
    selectedInterests = selectedInterests.includes(tag)
      ? selectedInterests.filter((t) => t !== tag)
      : [...selectedInterests, tag];
  });
});

generateBtn.addEventListener("click", () => {
  generateBtn.disabled = true;
  generateBtn.innerHTML = `<i data-lucide="loader-circle" class="cta-icon spin"></i><span>Đang tạo lịch trình...</span>`;
  window.lucide.createIcons();

  setTimeout(() => {
    const days = Number(daysInput.value);
    const departure = departureSelect.value;
    const result = buildItinerary(days, departure, selectedInterests);
    renderResult(result);

    generateBtn.disabled = false;
    generateBtn.innerHTML = `<i data-lucide="sparkles" class="cta-icon"></i><span>Tạo Lịch Trình Thông Minh</span>`;
    window.lucide.createIcons();
  }, 900);
});

/* ============ 5. Render kết quả ra giao diện ============ */
function renderDayCard(day) {
  const meta = REGION_META[day.region];
  const activities = day.activities
    .map(
      (act, idx) => `
      <li>
        <div class="day-timeline__icon-col">
          <div class="day-timeline__icon" style="background:${meta.tint}">
            <i data-lucide="${act.icon}" class="activity-icon" style="color:${meta.border}"></i>
          </div>
          ${idx < day.activities.length - 1 ? '<div class="day-timeline__line"></div>' : ""}
        </div>
        <div>
          <div class="day-timeline__time"><i data-lucide="clock" class="clock-icon"></i>${act.time}</div>
          <p class="day-timeline__title">${act.title}</p>
          <p class="day-timeline__desc">${act.desc}</p>
        </div>
      </li>`
    )
    .join("");

  return `
    <div class="day-card" style="border-left-color:${meta.border}">
      <div class="day-card__top">
        <span class="day-card__number">Ngày ${day.dayNumber}</span>
        <span class="day-card__badge" style="background:${meta.tint};color:${meta.border}">${meta.badgeText}</span>
      </div>
      <ul class="day-timeline">${activities}</ul>
    </div>`;
}

function renderResult(result) {
  let html = "";

  if (result.showWarning) {
    html += `
      <div class="warning-box">
        <i data-lucide="alert-triangle" class="warn-icon"></i>
        <div>
          <h3>Chỉ ${result.warningDays} ngày mà đi cả hai vùng thì hơi vội</h3>
          <p>Quy Nhơn và Pleiku cách nhau khoảng 180–200km, tương đương 4 giờ chạy xe qua Quốc lộ 19. ${result.strategyText}</p>
        </div>
      </div>`;
  }

  html += `
    <div class="strategy-box">
      <i data-lucide="route" class="strategy-icon"></i>
      <div>
        <h3>Chiến lược lịch trình</h3>
        <p>${result.strategyText}</p>
      </div>
    </div>
    <div class="day-grid">${result.days.map(renderDayCard).join("")}</div>`;

  resultSection.innerHTML = html;
  resultSection.hidden = false;
  window.lucide.createIcons();
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ============ 6. Khởi tạo icon lúc tải trang ============ */
window.lucide.createIcons();
