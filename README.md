# Song Hành

Trợ lý du lịch AI kết nối Quy Nhơn – Gia Lai. Người dùng chọn số ngày (thanh trượt), điểm khởi hành, và các thẻ sở thích; trang web gợi ý lịch trình theo từng ngày, chia rõ theo vùng biển và vùng cao nguyên, có cảnh báo và tự động rút gọn nếu số ngày không đủ để đi cả hai vùng.

## Cấu trúc file

```
(thư mục repo)
├── index.html
├── style.css
└── script.js
```

Cả ba file nằm cùng cấp, không có thư mục con — giữ đúng cấu trúc phẳng này khi upload lên GitHub để tránh lỗi mất giao diện do sai đường dẫn (`index.html` gọi thẳng `style.css` và `script.js`).

- `index.html` — toàn bộ nội dung và bố cục trang: hero header, form nhập liệu (thanh trượt số ngày, dropdown điểm khởi hành, thẻ sở thích, nút CTA), khu vực kết quả (được `script.js` render vào), footer.
- `style.css` — toàn bộ giao diện, chia theo section bằng comment: biến màu/font, reset, layout dùng chung, hero, form, thẻ sở thích, nút CTA + hiệu ứng spinner, khối cảnh báo/chiến lược, lưới thẻ ngày + dòng thời gian, footer, responsive.
- `script.js` — dữ liệu điểm đến tĩnh, luật sinh lịch trình (không ghép hai vùng cách xa nhau vào một ngày, tự rút gọn khi thiếu ngày), xử lý sự kiện cho thanh trượt/dropdown/thẻ sở thích/nút tạo lịch trình, và phần render kết quả ra giao diện.

## Icon

Trang dùng [Lucide](https://lucide.dev) qua CDN (`<script src="https://unpkg.com/lucide@latest">` trong `index.html`) — không cần cài gì thêm. Icon được khai báo bằng `<i data-lucide="tên-icon">`, sau đó `lucide.createIcons()` trong `script.js` sẽ thay chúng bằng SVG thật. Mỗi lần `script.js` chèn nội dung mới (ví dụ khu vực kết quả), hàm này được gọi lại để icon mới cũng hiển thị.

## Chạy thử

Mở trực tiếp `index.html` bằng trình duyệt, hoặc bật GitHub Pages cho repo (Settings → Pages → chọn nhánh `main`, thư mục root).

## Nếu web lên nhưng mất giao diện

Mở trang đã deploy, bấm **F12** → tab **Console** hoặc **Network**, tìm dòng đỏ báo `404 Not Found` cho `style.css` hoặc `script.js` — dấu hiệu file bị đặt sai vị trí so với đường dẫn trong `index.html`. Cách chắc chắn nhất để tránh lặp lại lỗi này: dùng Git từ máy (`git add . && git commit && git push`) thay vì upload thủ công từng file trên GitHub.

## Ghi chú

Phần "AI" hiện tại là bộ luật logic viết sẵn trong `script.js`, chạy được ngay không cần backend — phù hợp để demo trên GitHub Pages. Khi có endpoint AI thật (ví dụ từ Dify), thay nội dung hàm `buildItinerary()` bằng một lệnh gọi API tới endpoint đó và giữ nguyên phần render.
