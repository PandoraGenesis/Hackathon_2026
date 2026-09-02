/**
 * Song Hàng — logic sinh lịch trình
 *
 * GHI CHÚ: Phần dưới đây dùng một bộ dữ liệu điểm đến tĩnh cùng luật
 * logic viết sẵn (đúng theo ràng buộc địa lý: không ghép hai vùng
 * cách xa nhau vào một ngày, cảnh báo nếu số ngày quá ít mà chọn cả
 * hai vùng). Đây là bản demo chạy được ngay trên GitHub Pages, không
 * cần backend. Khi có API AI thật (ví dụ endpoint Dify), có thể thay
 * nội dung hàm buildItinerary() bằng một lệnh gọi fetch() tới endpoint
 * đó và giữ nguyên toàn bộ phần render bên dưới.
 */

/* ============ 1. Dữ liệu điểm đến (knowledge base tĩnh) ============ */
const DESTINATIONS = {
  bien: [
    { name: "Kỳ Co", tags: ["phieuluu"], desc: "Vịnh nước trong xanh, đi ca-nô hoặc leo núi để tới, hợp buổi sáng sớm tránh nắng gắt." },
    { name: "Eo Gió", tags: ["phieuluu"], desc: "Mỏm đá nhìn ra biển, gió lớn quanh năm, ngắm bình minh hoặc hoàng hôn đều đẹp." },
    { name: "Ghềnh Ráng – Tiên Sa", tags: [], desc: "Bãi đá Trứng và khu mộ Hàn Mặc Tử, hợp đi bộ chậm rãi vào buổi chiều." },
    { name: "Cù Lao Xanh", tags: ["phieuluu"], desc: "Đảo nhỏ ngoài khơi, lặn ngắm san hô, hải đăng cổ — dành cho hành trình còn dư ngày." },
    { name: "Tháp Đôi", tags: [], desc: "Cụm tháp Chăm cổ ngay trong thành phố, ghé nhanh buổi sáng trước khi ra biển." },
    { name: "Ẩm thực Quy Nhơn", tags: ["amthuc"], desc: "Bún chả cá, bánh xèo tôm nhảy, hải sản tươi ở khu chợ đêm ven biển." },
  ],
  caonguyen: [
    { name: "Biển Hồ (Tơ Nưng)", tags: [], desc: "Hồ nước ngọt giữa cao nguyên, mặt nước phẳng lặng, đẹp nhất lúc còn sương sớm." },
    { name: "Thác K50 (Hang Én)", tags: ["phieuluu"], desc: "Thác nước giữa rừng nguyên sinh, đường vào khá xa nên nên dành trọn nửa ngày." },
    { name: "Làng văn hoá Bahnar, Jrai", tags: [], desc: "Nhà rông truyền thống, cồng chiêng, tìm hiểu đời sống bản địa Tây Nguyên." },
    { name: "Đồi chè Bàu Cạn", tags: [], desc: "Đồi chè trải dài tít tắp, view đẹp nhất lúc nắng sáng còn dịu." },
    { name: "Núi lửa Chư Đang Ya", tags: ["phieuluu"], desc: "Miệng núi lửa đã tắt, leo bộ khoảng một giờ, đẹp nhất mùa hoa dã quỳ." },
    { name: "Ẩm thực Pleiku", tags: ["amthuc"], desc: "Phở khô Gia Lai và cà phê phin — món phải thử khi ghé cao nguyên." },
  ],
};

const REGION_LABEL = {
  bien: "Cụm biển",
  caonguyen: "Cụm cao nguyên",
};

/* ============ 2. Lấy phần tử DOM ============ */
const form = document.getElementById("planner-form");
const resultSection = document.getElementById("result");
const resultContainer = document.getElementById("result-container");

/* ============ 3. Xử lý submit form & áp dụng luật logic ============ */
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const days = parseInt(document.getElementById("days").value, 10) || 1;
  const start = document.getElementById("start").value;
  const interests = Array.from(
    form.querySelectorAll('input[name="interest"]:checked')
  ).map((input) => input.value);

  runPlanner(days, interests, start);
});

function runPlanner(days, interests, start) {
  const regions = [];
  if (interests.includes("bien")) regions.push("bien");
  if (interests.includes("caonguyen")) regions.push("caonguyen");

  // Nếu khách chỉ chọn ẩm thực/phiêu lưu mà chưa nêu rõ vùng nào,
  // lấy điểm xuất phát làm mặc định hợp lý nhất.
  if (regions.length === 0) {
    regions.push(start === "pleiku" ? "caonguyen" : "bien");
  }

  const secondaryTags = interests.filter(
    (tag) => tag === "amthuc" || tag === "phieuluu"
  );

  // Luật cứng: dưới 3 ngày mà chọn cả hai vùng thì không sinh lịch
  // trình trộn lẫn — cảnh báo và để khách tự chọn một vùng.
  if (regions.length === 2 && days < 3) {
    renderWarning(days, secondaryTags);
    return;
  }

  const plan = buildItinerary(days, regions, start, secondaryTags);
  renderItinerary(plan);
}

/* ============ 4. Sinh lịch trình theo cụm ============ */
function buildItinerary(days, regions, start, secondaryTags) {
  const order =
    regions.length === 2
      ? start === "pleiku"
        ? ["caonguyen", "bien"]
        : ["bien", "caonguyen"]
      : regions;

  const blocks = splitDays(days, order.length);
  const plan = [];
  let dayNumber = 1;

  order.forEach((region, index) => {
    const blockDays = blocks[index];
    const picks = pickDestinations(region, blockDays, secondaryTags);
    picks.forEach((destinations) => {
      plan.push({ day: dayNumber, region, destinations });
      dayNumber++;
    });
  });

  return plan;
}

// Chia số ngày thành các cụm liền kề — không bao giờ xen kẽ vùng
// trong cùng một ngày.
function splitDays(days, blockCount) {
  if (blockCount === 1) return [days];
  const first = Math.ceil(days / 2);
  return [first, days - first];
}

// Ưu tiên điểm đến khớp với sở thích phụ (ẩm thực / phiêu lưu),
// cho 1-2 điểm mỗi ngày tuỳ số ngày còn lại trong cụm đó.
function pickDestinations(region, blockDays, secondaryTags) {
  const pool = [...DESTINATIONS[region]].sort((a, b) => {
    const aMatch = a.tags.some((tag) => secondaryTags.includes(tag)) ? 1 : 0;
    const bMatch = b.tags.some((tag) => secondaryTags.includes(tag)) ? 1 : 0;
    return bMatch - aMatch;
  });

  const perDayCount = pool.length >= blockDays * 2 ? 2 : 1;
  const days = [];
  let cursor = 0;

  for (let i = 0; i < blockDays; i++) {
    const items = [];
    for (let j = 0; j < perDayCount; j++) {
      items.push(pool[cursor % pool.length]);
      cursor++;
    }
    days.push(items);
  }

  return days;
}

/* ============ 5. Render kết quả ra giao diện ============ */
function renderWarning(days) {
  resultContainer.innerHTML = `
    <h2 class="result-heading">Lịch trình này hơi gấp</h2>
    <div class="warning-card">
      <h3>Chỉ ${days} ngày mà đi cả hai vùng thì hơi vội</h3>
      <p>Quy Nhơn và Pleiku cách nhau khoảng 180–200km, tương đương 4 giờ lái xe. Với ${days} ngày, phần lớn thời gian sẽ dành để di chuyển thay vì trải nghiệm. Chúng tôi gợi ý chỉ nên chọn một vùng để đi trọn vẹn, hoặc tăng số ngày lên ít nhất 3.</p>
      <div class="warning-card__actions">
        <button type="button" class="btn btn--outline" data-force-region="bien">Chỉ chọn vùng biển</button>
        <button type="button" class="btn btn--outline" data-force-region="caonguyen">Chỉ chọn vùng cao nguyên</button>
      </div>
    </div>
  `;
  resultSection.hidden = false;
  attachForceRegionHandlers(days);
  scrollToResult();
}

/* ============ 6. Nút chọn nhanh khi có cảnh báo ============ */
function attachForceRegionHandlers(days) {
  resultContainer.querySelectorAll("[data-force-region]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const region = btn.getAttribute("data-force-region");
      const start = document.getElementById("start").value;
      const secondaryTags = Array.from(
        form.querySelectorAll('input[name="interest"]:checked')
      )
        .map((input) => input.value)
        .filter((tag) => tag === "amthuc" || tag === "phieuluu");

      const plan = buildItinerary(days, [region], start, secondaryTags);
      renderItinerary(plan);
    });
  });
}

function renderItinerary(plan) {
  const cards = plan
    .map(
      (day) => `
    <li class="day-card day-card--${day.region}">
      <span class="day-card__marker">${day.day}</span>
      <span class="day-card__badge">${REGION_LABEL[day.region]}</span>
      <p class="day-card__places">${day.destinations.map((d) => d.name).join(" · ")}</p>
      <p>${day.destinations.map((d) => d.desc).join(" ")}</p>
    </li>
  `
    )
    .join("");

  resultContainer.innerHTML = `
    <h2 class="result-heading">Hành trình gợi ý của bạn</h2>
    <p class="result-sub">${plan.length} ngày, sắp xếp theo từng cụm địa lý — không có ngày nào đi cả hai vùng.</p>
    <ol class="itinerary">${cards}</ol>
  `;
  resultSection.hidden = false;
  scrollToResult();
}

function scrollToResult() {
  resultSection.scrollIntoView({ behavior: "smooth", block: "start" });
}
