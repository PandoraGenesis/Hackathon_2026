# Song Hàng

Trợ lý lên lịch trình cho vùng Quy Nhơn – Gia Lai sau sáp nhập. Người dùng nhập số ngày, sở thích và điểm xuất phát; trang web gợi ý lịch trình chia theo cụm biển và cụm cao nguyên, không bao giờ ghép hai vùng cách xa nhau vào cùng một ngày.

## Cấu trúc file

- `index.html` — toàn bộ nội dung và bố cục trang: header, hero (hai mảng màu đại diện hai vùng), phần câu chuyện hai vùng, form lên lịch trình, khu vực kết quả, footer.
- `css/style.css` — toàn bộ giao diện, chia theo section bằng comment: biến màu/font, reset, layout dùng chung, header, hero, câu chuyện, form, kết quả/lịch trình, footer, responsive.
- `js/script.js` — dữ liệu điểm đến tĩnh, xử lý submit form, luật kiểm tra hợp lý về mặt di chuyển (cảnh báo nếu dưới 3 ngày mà chọn cả hai vùng), và phần render kết quả ra giao diện.

## Chạy thử

Mở trực tiếp `index.html` bằng trình duyệt, hoặc bật GitHub Pages cho repo này (Settings → Pages → chọn nhánh `main`, thư mục root).

## Ghi chú

Phần "AI" hiện tại là bộ luật logic viết sẵn trong `js/script.js`, chạy được ngay không cần backend — phù hợp để demo trên GitHub Pages. Khi có endpoint AI thật (ví dụ từ Dify), thay nội dung hàm `buildItinerary()` bằng một lệnh gọi API tới endpoint đó và giữ nguyên phần render.
