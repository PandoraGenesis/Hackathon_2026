// region-filter.js — Lọc vùng miền (Destinations Filter)
// (được tách ra từ khối <script> inline trong index.html)
document.addEventListener("DOMContentLoaded", function () {
  var filterBtns = document.querySelectorAll('#region-filter-bar .ora-filter-btn');
  var tourCards = document.querySelectorAll('#dest-grid .ora-tour-card');

  if (filterBtns.length > 0 && tourCards.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Cập nhật trạng thái nút
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        var filter = btn.getAttribute('data-filter');

        // Lọc các thẻ
        tourCards.forEach(function (card) {
          if (filter === 'all' || card.getAttribute('data-region') === filter) {
            card.style.display = 'block';
            // Reset animation
            card.style.animation = 'none';
            card.offsetHeight; /* trigger reflow */
            card.style.animation = null;
          } else {
            card.style.display = 'none';
          }
        });

        // Xử lý thẻ intro (Khung giới thiệu miền)
        var introCards = document.querySelectorAll('#dest-grid .ora-region-intro');
        introCards.forEach(function (intro) {
          if (filter !== 'all' && intro.getAttribute('data-intro-region') === filter) {
            intro.classList.add('active');
          } else {
            intro.classList.remove('active');
          }
        });
      });
    });
  }
});
