/**
 * js/i18n-auto.js
 * ---------------------------------------------------------------------
 * Dịch tự động phần nội dung ĐỘNG (món ăn / địa danh / mô tả do hệ thống
 * sinh ra trong tab Lịch trình) sang tiếng Anh khi người dùng chuyển ngôn
 * ngữ — không cần khai báo sẵn từng câu trong js/i18n.js.
 *
 * Cách hoạt động:
 * - Bất kỳ đoạn text nào cần dịch tự động được bọc trong 1 phần tử có
 *   class "i18n-dyn", giữ nguyên bản gốc tiếng Việt trong data-vi.
 * - Khi chuyển sang "en": nếu bản dịch đã có trong cache (bộ nhớ hoặc
 *   localStorage) thì hiển thị ngay; nếu chưa có, gọi API dịch máy
 *   (MyMemory Translation API, miễn phí, hỗ trợ CORS) rồi cập nhật nội
 *   dung khi có kết quả, đồng thời lưu cache để lần sau không cần gọi lại.
 * - Khi chuyển về "vn": luôn khôi phục lại đúng bản gốc trong data-vi,
 *   không cần gọi API nên tức thời.
 * - Một MutationObserver theo dõi khu vực kết quả (#result): mỗi khi
 *   lịch trình được tạo/render lại, nội dung mới sẽ tự dịch ngay nếu
 *   trang đang ở chế độ tiếng Anh.
 *
 * Muốn thêm nội dung động cần dịch tự động ở nơi khác trong trang: chỉ
 * cần bọc phần tử bằng class "i18n-dyn" + thuộc tính data-vi, không cần
 * sửa gì thêm ở file này.
 */

const AUTO_I18N_CACHE_KEY = 'vnfinder_auto_i18n_cache_v1';
let autoI18nCache = {};
try {
  autoI18nCache = JSON.parse(localStorage.getItem(AUTO_I18N_CACHE_KEY) || '{}');
} catch (e) {
  autoI18nCache = {};
}

function saveAutoI18nCache() {
  try {
    localStorage.setItem(AUTO_I18N_CACHE_KEY, JSON.stringify(autoI18nCache));
  } catch (e) {
    // Bỏ qua nếu localStorage đầy hoặc bị trình duyệt chặn
  }
}

async function translateTextAuto(text) {
  const key = text.trim();
  if (!key) return text;
  if (autoI18nCache[key]) return autoI18nCache[key];

  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(key)}&langpair=vi|en`;
    const res = await fetch(url);
    const data = await res.json();
    const translated = (data && data.responseData && data.responseData.translatedText)
      ? data.responseData.translatedText
      : key;
    autoI18nCache[key] = translated;
    saveAutoI18nCache();
    return translated;
  } catch (e) {
    console.error('Lỗi dịch tự động:', e);
    return key; // Nếu lỗi mạng: tạm giữ nguyên bản gốc
  }
}

// Áp dụng dịch tự động cho toàn bộ phần tử .i18n-dyn bên trong `root`
function applyAutoTranslation(root, lang) {
  if (!root) return;
  const nodes = root.querySelectorAll('.i18n-dyn');
  nodes.forEach(async (el) => {
    const original = el.getAttribute('data-vi');
    if (!original) return;

    if (lang === 'vn') {
      el.textContent = original;
      return;
    }

    // lang === 'en'
    if (autoI18nCache[original]) {
      el.textContent = autoI18nCache[original];
    } else {
      const translated = await translateTextAuto(original);
      // Chỉ cập nhật nếu người dùng chưa chuyển lại về tiếng Việt trong lúc chờ kết quả
      if (document.documentElement.lang === 'en') {
        el.textContent = translated;
      }
    }
  });
}

// Theo dõi khu vực kết quả lịch trình: nội dung mới sinh ra sẽ tự dịch ngay
// nếu trang đang ở chế độ tiếng Anh (ví dụ: tạo lịch trình trong lúc đang xem bản EN).
function observeDynamicContent(container) {
  if (!container) return;
  const observer = new MutationObserver(() => {
    if (document.documentElement.lang === 'en') {
      applyAutoTranslation(container, 'en');
    }
  });
  observer.observe(container, { childList: true, subtree: true });
}

document.addEventListener('DOMContentLoaded', () => {
  const resultSection = document.getElementById('result');
  if (resultSection) observeDynamicContent(resultSection);
});
