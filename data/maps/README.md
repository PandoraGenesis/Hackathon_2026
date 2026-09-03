# Dữ liệu bản đồ (data/maps)

Dữ liệu ranh giới hành chính dùng cho tab **Maps** của VNFinder.

## Cấu trúc

```
data/maps/
  provinces.geojson     34 tỉnh, thành phố trực thuộc trung ương (cấp 1)
  islands.geojson       2 đặc khu Hoàng Sa (Đà Nẵng) & Trường Sa (Khánh Hòa), tách riêng
  wards/{code}.geojson  Toàn bộ xã/phường/đặc khu của 1 tỉnh (cấp 2), 1 file / tỉnh
                         — {code} là mã tỉnh 2 chữ số, vd. wards/52.geojson = Gia Lai
```

Mỗi feature có `properties`: `code`, `name`, `nameEn`, `fullName`, `fullNameEn`,
`codeName`, `areaKm2`, `postalCode`…

## Nguồn dữ liệu

Ranh giới hành chính được lấy và đơn giản hóa (giảm số điểm ~90%, làm tròn
tọa độ 4 chữ số thập phân để giảm dung lượng cho web) từ:

- **Kho dữ liệu:** [thanglequoc/vietnamese-provinces-database](https://github.com/thanglequoc/vietnamese-provinces-database)
  (giấy phép MIT, tác giả Thăng Lê Quốc)
- **Nguồn gốc GIS:** [Bản đồ tham chiếu đơn vị hành chính Việt Nam](https://sapnhap.bando.com.vn)
  — Nhà xuất bản Tài nguyên Môi trường và Bản đồ Việt Nam, Bộ Nông nghiệp và
  Môi trường
- Phản ánh cơ cấu hành chính **2 cấp (Tỉnh → Xã/Phường/Đặc khu)** áp dụng từ
  01/07/2025 theo Nghị quyết 202/2025/QH15 — Việt Nam không còn cấp
  quận/huyện, nên bước 2 của bản đồ (nhấp vào 1 tỉnh) hiển thị thẳng danh
  sách xã/phường/đặc khu, là cấp hành chính con trực tiếp của tỉnh.

## Bản đồ nền chi tiết (bước 3)

Ở bước 3 (nhấp vào 1 xã/phường/đặc khu), bản đồ nền chi tiết (đường sá,
địa danh…) dùng tile của **[OpenStreetMap](https://www.openstreetmap.org/copyright)**
qua `tile.openstreetmap.org` — miễn phí cho lưu lượng nhỏ/vừa (dự án học
tập, thi cử). Nếu triển khai thật với lượng truy cập lớn, nên đổi sang một
nhà cung cấp tile có hạn mức riêng (MapTiler, Mapbox, Stadia Maps…) để
tuân thủ [chính sách sử dụng](https://operations.osmfoundation.org/policies/tiles/)
của OpenStreetMap.
