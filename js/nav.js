/**
 * VNFinder — điều hướng 5 mục (Giới thiệu, Maps, Lịch trình, Guide, Check-in)
 * Vanilla JS, không phụ thuộc framework — chỉ ẩn/hiện panel tương ứng.
 */
(function () {
  var tabs = document.querySelectorAll('.sh-tab');
  var panels = document.querySelectorAll('.sh-panel');
  var gioiThieuPanel = document.getElementById('panel-gioi-thieu');

  function activate(panelId, updateHash) {
    panels.forEach(function (panel) {
      panel.hidden = panel.id !== panelId;
    });

    tabs.forEach(function (tab) {
      var isActive = tab.dataset.panel === panelId;
      tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });

    if (updateHash) {
      history.replaceState(null, '', '#' + panelId);
    }

    if (panelId === 'panel-gioi-thieu') {
      fitBlockHeadings();
    }
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activate(tab.dataset.panel, true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Mở đúng tab theo hash trên URL (nếu có), mặc định là Giới thiệu
  var initialId = window.location.hash ? window.location.hash.slice(1) : 'panel-gioi-thieu';
  if (!document.getElementById(initialId)) {
    initialId = 'panel-gioi-thieu';
  }
  activate(initialId, false);

  if (window.lucide) {
    window.lucide.createIcons();
  }

  /**
   * Giữ tiêu đề mỗi khối luôn nằm trên một hàng: nếu bản thân chữ dài hơn
   * cột chứa nó (ở cỡ chữ mặc định trong CSS), tự giảm dần font-size cho
   * tới khi vừa đúng một hàng — thay vì để trình duyệt tự xuống hàng.
   */
  function fitBlockHeadings() {
    if (!gioiThieuPanel || gioiThieuPanel.hidden) return;

    document.querySelectorAll('.sh-block__heading').forEach(function (heading) {
      heading.style.fontSize = ''; // về lại cỡ chữ mặc định (clamp trong CSS) trước khi đo
      var available = heading.parentElement.clientWidth;
      if (!available) return;

      var size = parseFloat(window.getComputedStyle(heading).fontSize);
      var minSize = 15; // px — sàn để chữ không bị bé quá mức đọc được

      while (heading.scrollWidth > available && size > minSize) {
        size -= 1;
        heading.style.fontSize = size + 'px';
      }
    });
  }

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(fitBlockHeadings, 150);
  });
})();

