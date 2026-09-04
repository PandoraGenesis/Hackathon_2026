const ALL_DESTINATIONS = [
  {
    "id": "loc_1",
    "name": "Điểm check-in nổi tiếng Hà Nội",
    "province": "Hà Nội",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_2",
    "name": "Đặc sản ẩm thực Hà Nội",
    "province": "Hà Nội",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_3",
    "name": "Di tích lịch sử văn hóa Hà Nội",
    "province": "Hà Nội",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_4",
    "name": "Điểm check-in nổi tiếng Lai Châu",
    "province": "Lai Châu",
    "cluster": "Highland",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_5",
    "name": "Đặc sản ẩm thực Lai Châu",
    "province": "Lai Châu",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_6",
    "name": "Di tích lịch sử văn hóa Lai Châu",
    "province": "Lai Châu",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_7",
    "name": "Điểm check-in nổi tiếng Điện Biên",
    "province": "Điện Biên",
    "cluster": "Highland",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_8",
    "name": "Đặc sản ẩm thực Điện Biên",
    "province": "Điện Biên",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_9",
    "name": "Di tích lịch sử văn hóa Điện Biên",
    "province": "Điện Biên",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_10",
    "name": "Điểm check-in nổi tiếng Sơn La",
    "province": "Sơn La",
    "cluster": "Highland",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_11",
    "name": "Đặc sản ẩm thực Sơn La",
    "province": "Sơn La",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_12",
    "name": "Di tích lịch sử văn hóa Sơn La",
    "province": "Sơn La",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_13",
    "name": "Điểm check-in nổi tiếng Lạng Sơn",
    "province": "Lạng Sơn",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_14",
    "name": "Đặc sản ẩm thực Lạng Sơn",
    "province": "Lạng Sơn",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_15",
    "name": "Di tích lịch sử văn hóa Lạng Sơn",
    "province": "Lạng Sơn",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_16",
    "name": "Điểm check-in nổi tiếng Quảng Ninh",
    "province": "Quảng Ninh",
    "cluster": "Coastal",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_17",
    "name": "Đặc sản ẩm thực Quảng Ninh",
    "province": "Quảng Ninh",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_18",
    "name": "Di tích lịch sử văn hóa Quảng Ninh",
    "province": "Quảng Ninh",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_19",
    "name": "Điểm check-in nổi tiếng Cao Bằng",
    "province": "Cao Bằng",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_20",
    "name": "Đặc sản ẩm thực Cao Bằng",
    "province": "Cao Bằng",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_21",
    "name": "Di tích lịch sử văn hóa Cao Bằng",
    "province": "Cao Bằng",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_22",
    "name": "Điểm check-in nổi tiếng Tuyên Quang",
    "province": "Tuyên Quang",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_23",
    "name": "Đặc sản ẩm thực Tuyên Quang",
    "province": "Tuyên Quang",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_24",
    "name": "Di tích lịch sử văn hóa Tuyên Quang",
    "province": "Tuyên Quang",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_25",
    "name": "Điểm check-in nổi tiếng Lào Cai",
    "province": "Lào Cai",
    "cluster": "Highland",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_26",
    "name": "Đặc sản ẩm thực Lào Cai",
    "province": "Lào Cai",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_27",
    "name": "Di tích lịch sử văn hóa Lào Cai",
    "province": "Lào Cai",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_28",
    "name": "Điểm check-in nổi tiếng Thái Nguyên",
    "province": "Thái Nguyên",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_29",
    "name": "Đặc sản ẩm thực Thái Nguyên",
    "province": "Thái Nguyên",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_30",
    "name": "Di tích lịch sử văn hóa Thái Nguyên",
    "province": "Thái Nguyên",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_31",
    "name": "Điểm check-in nổi tiếng Phú Thọ",
    "province": "Phú Thọ",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_32",
    "name": "Đặc sản ẩm thực Phú Thọ",
    "province": "Phú Thọ",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_33",
    "name": "Di tích lịch sử văn hóa Phú Thọ",
    "province": "Phú Thọ",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_34",
    "name": "Điểm check-in nổi tiếng Bắc Ninh",
    "province": "Bắc Ninh",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_35",
    "name": "Đặc sản ẩm thực Bắc Ninh",
    "province": "Bắc Ninh",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_36",
    "name": "Di tích lịch sử văn hóa Bắc Ninh",
    "province": "Bắc Ninh",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_37",
    "name": "Điểm check-in nổi tiếng Hưng Yên",
    "province": "Hưng Yên",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_38",
    "name": "Đặc sản ẩm thực Hưng Yên",
    "province": "Hưng Yên",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_39",
    "name": "Di tích lịch sử văn hóa Hưng Yên",
    "province": "Hưng Yên",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_40",
    "name": "Điểm check-in nổi tiếng Hải Phòng",
    "province": "Hải Phòng",
    "cluster": "Coastal",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_41",
    "name": "Đặc sản ẩm thực Hải Phòng",
    "province": "Hải Phòng",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_42",
    "name": "Di tích lịch sử văn hóa Hải Phòng",
    "province": "Hải Phòng",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_43",
    "name": "Điểm check-in nổi tiếng Ninh Bình",
    "province": "Ninh Bình",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_44",
    "name": "Đặc sản ẩm thực Ninh Bình",
    "province": "Ninh Bình",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_45",
    "name": "Di tích lịch sử văn hóa Ninh Bình",
    "province": "Ninh Bình",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_46",
    "name": "Điểm check-in nổi tiếng Huế",
    "province": "Huế",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_47",
    "name": "Đặc sản ẩm thực Huế",
    "province": "Huế",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_48",
    "name": "Di tích lịch sử văn hóa Huế",
    "province": "Huế",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_49",
    "name": "Điểm check-in nổi tiếng Thanh Hóa",
    "province": "Thanh Hóa",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_50",
    "name": "Đặc sản ẩm thực Thanh Hóa",
    "province": "Thanh Hóa",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_51",
    "name": "Di tích lịch sử văn hóa Thanh Hóa",
    "province": "Thanh Hóa",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_52",
    "name": "Điểm check-in nổi tiếng Nghệ An",
    "province": "Nghệ An",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_53",
    "name": "Đặc sản ẩm thực Nghệ An",
    "province": "Nghệ An",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_54",
    "name": "Di tích lịch sử văn hóa Nghệ An",
    "province": "Nghệ An",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_55",
    "name": "Điểm check-in nổi tiếng Hà Tĩnh",
    "province": "Hà Tĩnh",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_56",
    "name": "Đặc sản ẩm thực Hà Tĩnh",
    "province": "Hà Tĩnh",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_57",
    "name": "Di tích lịch sử văn hóa Hà Tĩnh",
    "province": "Hà Tĩnh",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_58",
    "name": "Điểm check-in nổi tiếng Quảng Trị",
    "province": "Quảng Trị",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_59",
    "name": "Đặc sản ẩm thực Quảng Trị",
    "province": "Quảng Trị",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_60",
    "name": "Di tích lịch sử văn hóa Quảng Trị",
    "province": "Quảng Trị",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_61",
    "name": "Điểm check-in nổi tiếng Đà Nẵng",
    "province": "Đà Nẵng",
    "cluster": "Coastal",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_62",
    "name": "Đặc sản ẩm thực Đà Nẵng",
    "province": "Đà Nẵng",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_63",
    "name": "Di tích lịch sử văn hóa Đà Nẵng",
    "province": "Đà Nẵng",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_64",
    "name": "Điểm check-in nổi tiếng Quảng Ngãi",
    "province": "Quảng Ngãi",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_65",
    "name": "Đặc sản ẩm thực Quảng Ngãi",
    "province": "Quảng Ngãi",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_66",
    "name": "Di tích lịch sử văn hóa Quảng Ngãi",
    "province": "Quảng Ngãi",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_67",
    "name": "Điểm check-in nổi tiếng Gia Lai",
    "province": "Gia Lai",
    "cluster": "Highland",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_68",
    "name": "Đặc sản ẩm thực Gia Lai",
    "province": "Gia Lai",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_69",
    "name": "Di tích lịch sử văn hóa Gia Lai",
    "province": "Gia Lai",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_70",
    "name": "Điểm check-in nổi tiếng Đắk Lắk",
    "province": "Đắk Lắk",
    "cluster": "Highland",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_71",
    "name": "Đặc sản ẩm thực Đắk Lắk",
    "province": "Đắk Lắk",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_72",
    "name": "Di tích lịch sử văn hóa Đắk Lắk",
    "province": "Đắk Lắk",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_73",
    "name": "Điểm check-in nổi tiếng Khánh Hòa",
    "province": "Khánh Hòa",
    "cluster": "Coastal",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_74",
    "name": "Đặc sản ẩm thực Khánh Hòa",
    "province": "Khánh Hòa",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_75",
    "name": "Di tích lịch sử văn hóa Khánh Hòa",
    "province": "Khánh Hòa",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_76",
    "name": "Điểm check-in nổi tiếng Lâm Đồng",
    "province": "Lâm Đồng",
    "cluster": "Highland",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_77",
    "name": "Đặc sản ẩm thực Lâm Đồng",
    "province": "Lâm Đồng",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_78",
    "name": "Di tích lịch sử văn hóa Lâm Đồng",
    "province": "Lâm Đồng",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_79",
    "name": "Điểm check-in nổi tiếng Đồng Nai",
    "province": "Đồng Nai",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_80",
    "name": "Đặc sản ẩm thực Đồng Nai",
    "province": "Đồng Nai",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_81",
    "name": "Di tích lịch sử văn hóa Đồng Nai",
    "province": "Đồng Nai",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_82",
    "name": "Điểm check-in nổi tiếng Hồ Chí Minh",
    "province": "Hồ Chí Minh",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_83",
    "name": "Đặc sản ẩm thực Hồ Chí Minh",
    "province": "Hồ Chí Minh",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_84",
    "name": "Di tích lịch sử văn hóa Hồ Chí Minh",
    "province": "Hồ Chí Minh",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_85",
    "name": "Điểm check-in nổi tiếng Tây Ninh",
    "province": "Tây Ninh",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_86",
    "name": "Đặc sản ẩm thực Tây Ninh",
    "province": "Tây Ninh",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_87",
    "name": "Di tích lịch sử văn hóa Tây Ninh",
    "province": "Tây Ninh",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_88",
    "name": "Điểm check-in nổi tiếng Đồng Tháp",
    "province": "Đồng Tháp",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_89",
    "name": "Đặc sản ẩm thực Đồng Tháp",
    "province": "Đồng Tháp",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_90",
    "name": "Di tích lịch sử văn hóa Đồng Tháp",
    "province": "Đồng Tháp",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_91",
    "name": "Điểm check-in nổi tiếng Vĩnh Long",
    "province": "Vĩnh Long",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_92",
    "name": "Đặc sản ẩm thực Vĩnh Long",
    "province": "Vĩnh Long",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_93",
    "name": "Di tích lịch sử văn hóa Vĩnh Long",
    "province": "Vĩnh Long",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_94",
    "name": "Điểm check-in nổi tiếng Cần Thơ",
    "province": "Cần Thơ",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_95",
    "name": "Đặc sản ẩm thực Cần Thơ",
    "province": "Cần Thơ",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_96",
    "name": "Di tích lịch sử văn hóa Cần Thơ",
    "province": "Cần Thơ",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_97",
    "name": "Điểm check-in nổi tiếng Cà Mau",
    "province": "Cà Mau",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_98",
    "name": "Đặc sản ẩm thực Cà Mau",
    "province": "Cà Mau",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_99",
    "name": "Di tích lịch sử văn hóa Cà Mau",
    "province": "Cà Mau",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_100",
    "name": "Điểm check-in nổi tiếng An Giang",
    "province": "An Giang",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "📸 Sống ảo & Check-in",
      "🌿 Sinh thái & Thiên nhiên"
    ],
    "duration": "2-3 giờ",
    "hours": "07:00 - 17:00",
    "tips": "Nên đi vào buổi sáng sớm để có những bức ảnh đẹp nhất."
  },
  {
    "id": "loc_101",
    "name": "Đặc sản ẩm thực An Giang",
    "province": "An Giang",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "1-2 giờ",
    "hours": "06:00 - 22:00",
    "tips": "Thử các món ăn địa phương tại chợ truyền thống."
  },
  {
    "id": "loc_102",
    "name": "Di tích lịch sử văn hóa An Giang",
    "province": "An Giang",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử & Di sản",
      "🪕 Văn hóa địa phương"
    ],
    "duration": "Nửa ngày",
    "hours": "08:00 - 17:00",
    "tips": "Nên thuê hướng dẫn viên địa phương để hiểu rõ hơn về lịch sử."
  },
  {
    "id": "loc_103",
    "name": "Phố cổ Hà Nội",
    "province": "Hà Nội",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực",
      "🏛️ Lịch Sử"
    ],
    "duration": "Nửa ngày",
    "hours": "Cả ngày",
    "tips": "Dạo quanh 36 phố phường, thưởng thức phở, bún chả và cà phê trứng."
  },
  {
    "id": "loc_104",
    "name": "Văn Miếu - Quốc Tử Giám",
    "province": "Hà Nội",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử"
    ],
    "duration": "2 giờ",
    "hours": "08:00 - 17:00",
    "tips": "Trường đại học đầu tiên của Việt Nam, mua chữ cầu may mắn."
  },
  {
    "id": "loc_105",
    "name": "Chợ Bến Thành",
    "province": "Hồ Chí Minh",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🍜 Ẩm Thực"
    ],
    "duration": "2 giờ",
    "hours": "06:00 - 18:00",
    "tips": "Thưởng thức ẩm thực đường phố và mua sắm quà lưu niệm."
  },
  {
    "id": "loc_106",
    "name": "Dinh Độc Lập",
    "province": "Hồ Chí Minh",
    "cluster": "Heritage",
    "image": "https://images.unsplash.com/photo-1518164007874-972d5b610c41?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🏛️ Lịch Sử"
    ],
    "duration": "2-3 giờ",
    "hours": "08:00 - 16:30",
    "tips": "Tìm hiểu về lịch sử hiện đại Việt Nam."
  },
  {
    "id": "loc_107",
    "name": "Bà Nà Hills",
    "province": "Đà Nẵng",
    "cluster": "Urban",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🎢 Vui chơi & Giải trí",
      "📸 Sống ảo"
    ],
    "duration": "1 ngày",
    "hours": "07:00 - 22:00",
    "tips": "Check-in Cầu Vàng và tham gia các trò chơi Fantasy Park."
  },
  {
    "id": "loc_108",
    "name": "Vịnh Hạ Long",
    "province": "Quảng Ninh",
    "cluster": "Coastal",
    "image": "https://images.unsplash.com/photo-1542273917363-3b1817f69a5d?auto=format&fit=crop&q=80&w=800",
    "tags": [
      "🌊 Biển đảo & Vịnh",
      "🌿 Sinh thái"
    ],
    "duration": "1-2 ngày",
    "hours": "Cả ngày",
    "tips": "Thuê du thuyền để trải nghiệm ngủ đêm trên vịnh."
  }
];