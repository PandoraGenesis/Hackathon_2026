/**
 * VNFinder — điều hướng 5 mục (Giới thiệu, Maps, Lịch trình, Guide, Check-in)
 * Vanilla JS, không phụ thuộc framework — chỉ ẩn/hiện panel tương ứng.
 */
(function () {
  var tabs = document.querySelectorAll('.sh-tab');
  var panels = document.querySelectorAll('.sh-panel');

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
})();
