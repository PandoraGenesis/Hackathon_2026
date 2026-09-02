# Song Hành

Trợ lý lên lịch trình cho vùng Quy Nhơn – Gia Lai sau sáp nhập. Người dùng nhập số ngày, sở thích và điểm xuất phát; trang web gợi ý lịch trình chia theo cụm biển và cụm cao nguyên, không bao giờ ghép hai vùng cách xa nhau vào cùng một ngày.

## Cấu trúc file

Bắt buộc giữ đúng cấu trúc thư mục sau trên GitHub — trang web dùng đường dẫn tương đối (`css/style.css`, `js/script.js`) nên nếu hai thư mục con bị đưa lệch chỗ, trang sẽ mất toàn bộ giao diện và không chạy được form:

```
(thư mục repo)
├── index.html
├── css/
│   └── style.css
└── js/
    └── script.js
```

- `index.html` — toàn bộ nội dung và bố cục trang: header, hero (hai mảng màu đại diện hai vùng), phần câu chuyện hai vùng, form lên lịch trình, khu vực kết quả, footer.
- `css/style.css` — toàn bộ giao diện, chia theo section bằng comment: biến màu/font, reset, layout dùng chung, header, hero, câu chuyện, form, kết quả/lịch trình, footer, responsive.
- `js/script.js` — dữ liệu điểm đến tĩnh, xử lý submit form, luật kiểm tra hợp lý về mặt di chuyển (cảnh báo nếu dưới 3 ngày mà chọn cả hai vùng), và phần render kết quả ra giao diện.

## Chạy thử

Mở trực tiếp `index.html` bằng trình duyệt, hoặc bật GitHub Pages cho repo này (Settings → Pages → chọn nhánh `main`, thư mục root).

## Nếu web lên nhưng mất giao diện (chữ đen trắng, không có màu)

Đây gần như luôn là do thư mục `css` hoặc `js` không được tải lên đúng chỗ, chứ không phải lỗi trong code. Cách kiểm tra và sửa:

1. Mở trang web đã deploy, bấm **F12** để mở DevTools, qua tab **Console** hoặc **Network**. Nếu thấy dòng đỏ báo `style.css` hoặc `script.js` là `404 Not Found`, tức là đúng nguyên nhân này.
2. Vào repo trên GitHub, kiểm tra đúng cấu trúc thư mục như ở trên — đặc biệt là phải có **thư mục con** `css` chứa `style.css` bên trong, không phải `style.css` nằm cùng cấp với `index.html`. Tương tự với `js/script.js`.
3. Nếu bạn tải file lên bằng nút **Add file → Upload files** trên GitHub và kéo thả từng file lẻ, GitHub sẽ không tự tạo thư mục — kết quả là `style.css` bị nằm ở gốc repo thay vì trong `css/`. Cách sửa: hoặc kéo cả thư mục `css` và `js` (không phải từng file bên trong) vào ô upload, hoặc khi upload từng file, gõ thẳng đường dẫn đầy đủ vào ô tên file, ví dụ gõ `css/style.css` — GitHub sẽ tự tạo thư mục `css`.
4. Cách chắc chắn nhất là dùng Git từ máy: `git add .` rồi `git commit` và `git push` toàn bộ thư mục cùng lúc, thay vì upload thủ công từng file trên web.

## Ghi chú

Phần "AI" hiện tại là bộ luật logic viết sẵn trong `js/script.js`, chạy được ngay không cần backend — phù hợp để demo trên GitHub Pages. Khi có endpoint AI thật (ví dụ từ Dify), thay nội dung hàm `buildItinerary()` bằng một lệnh gọi API tới endpoint đó và giữ nguyên phần render.
