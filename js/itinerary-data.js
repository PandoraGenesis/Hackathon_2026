/* =====================================================================
   js/itinerary-data.js
   ---------------------------------------------------------------------
   Dữ liệu ẩm thực + địa danh dùng để sinh "Lịch Trình Đề Xuất" trong tab
   Lịch trình, chia theo 4 buổi/ngày: Sáng - Trưa - Chiều - Tối.

   BA TẦNG DỮ LIỆU (từ chi tiết nhất đến dự phòng):

   1) ITINERARY_DATA  — dữ liệu RIÊNG cho từng điểm đến cấp 2 (huyện/thị xã/
      thành phố cụ thể) hoặc cấp 1 đối với những tỉnh app chưa chia huyện
      (Hà Nội, Huế, Quảng Ninh...). Khoá đúng bằng chuỗi mà js/script.js
      dùng cho `state.destination` — tức là:
        - "Tên huyện/thị xã, Tên tỉnh"  (ví dụ "Pleiku, Gia Lai")
        - hoặc chỉ "Tên tỉnh"           (ví dụ "Hà Nội")

   2) PROVINCE_FALLBACK — dữ liệu chung cấp tỉnh, dùng khi một huyện/thị xã
      cụ thể CHƯA có mục riêng trong ITINERARY_DATA. Đây vẫn là món ăn và
      địa danh THẬT của tỉnh đó (không phải nội dung ghép ngẫu nhiên).

   3) GENERIC_FALLBACK — phương án cuối cùng, chỉ dùng khi không khớp được
      với cả hai tầng trên.

   CẤU TRÚC MỖI MỤC:
   {
     breakfast:      [{ dish, desc, keyword }, ...],
     morningVisit:   [{ name, desc, keyword, tips }, ...],
     lunch:          [{ dish, desc, keyword }, ...],
     afternoonVisit: [{ name, desc, keyword, tips }, ...],
     dinner:         [{ dish, desc, keyword }, ...],
     nightlife:      [{ name, desc, keyword, tips }, ...]
   }

   `keyword` dùng để tìm ảnh minh hoạ thật trên Wikipedia lúc chạy (xem
   fetchWikiImage trong js/script.js) — nên đặt tên riêng, cụ thể, dễ tra.

   Muốn bổ sung thêm điểm đến: chỉ cần thêm một mục mới vào ITINERARY_DATA
   theo đúng khoá "Huyện/Thị xã, Tỉnh", không cần sửa gì ở js/script.js.
   ===================================================================== */

const GENERIC_FALLBACK = {
  breakfast: [
    { dish: 'Phở bò', desc: 'Món ăn sáng phổ biến khắp Việt Nam, nước dùng ninh xương thơm.', keyword: 'Phở' },
    { dish: 'Bánh mì', desc: 'Bánh mì giòn kẹp thịt, pate, rau thơm — tiện lợi cho buổi sáng.', keyword: 'Bánh mì Việt Nam' }
  ],
  morningVisit: [
    { name: 'Chợ trung tâm', desc: 'Ghé chợ trung tâm để cảm nhận nhịp sống và đặc sản địa phương.', keyword: 'chợ Việt Nam', tips: 'Đi sớm để chợ còn tươi và đông vui nhất.' }
  ],
  lunch: [
    { dish: 'Cơm tấm', desc: 'Cơm tấm sườn bì chả, món trưa quen thuộc dễ tìm ở mọi nơi.', keyword: 'Cơm tấm' }
  ],
  afternoonVisit: [
    { name: 'Công viên trung tâm', desc: 'Dạo bộ, ngắm cảnh và nghỉ chân sau buổi trưa.', keyword: 'công viên Việt Nam', tips: 'Buổi chiều mát là thời điểm dễ chịu để đi bộ.' }
  ],
  dinner: [
    { dish: 'Lẩu hải sản', desc: 'Bữa tối ấm cúng với lẩu hải sản hoặc lẩu gà lá giang tuỳ vùng.', keyword: 'lẩu Việt Nam' }
  ],
  nightlife: [
    { name: 'Phố ẩm thực đêm', desc: 'Dạo một vòng khu phố về đêm, thưởng thức đồ ăn vặt địa phương.', keyword: 'chợ đêm Việt Nam', tips: 'Mang theo tiền mặt lẻ, nhiều quán vỉa hè không nhận chuyển khoản.' }
  ]
};

/* =====================================================================
   PROVINCE_FALLBACK — 23 tỉnh có chia cấp 2 trong DESTINATION_LOCATIONS
   ===================================================================== */
const PROVINCE_FALLBACK = {

  'Tuyên Quang': {
    breakfast: [
      { dish: 'Bánh gai Tuyên Quang', desc: 'Bánh nếp lá gai nhân đậu xanh dừa, đặc sản mang đi làm quà.', keyword: 'Bánh gai Tuyên Quang' },
      { dish: 'Cháo ấu tẩu', desc: 'Cháo nấu từ củ ấu tẩu và chân giò, món sáng đặc trưng vùng núi phía Bắc.', keyword: 'Cháo ấu tẩu' },
      { dish: 'Xôi ngũ sắc', desc: 'Xôi nếp nhuộm màu tự nhiên từ lá cây rừng, món sáng của đồng bào vùng cao.', keyword: 'Xôi ngũ sắc' }
    ],
    morningVisit: [
      { name: 'Thành nhà Mạc', desc: 'Di tích thành cổ giữa lòng thành phố Tuyên Quang.', keyword: 'Thành nhà Mạc Tuyên Quang', tips: 'Kết hợp tham quan khu phố cổ quanh thành.' },
      { name: 'Núi Cấm - Đền Hạ Tuyên Quang', desc: 'Cụm đền linh thiêng ven sông Lô, không khí yên tĩnh.', keyword: 'Đền Hạ Tuyên Quang', tips: 'Ăn mặc lịch sự khi vào khu vực đền.' }
    ],
    lunch: [
      { dish: 'Vịt bầu Minh Hương', desc: 'Vịt nuôi thả tự nhiên, thịt chắc, thường chế biến nướng hoặc quay.', keyword: 'Vịt bầu Tuyên Quang' },
      { dish: 'Cơm lam', desc: 'Cơm nếp nướng trong ống tre, thơm mùi tre nứa vùng cao.', keyword: 'Cơm lam' },
      { dish: 'Thịt trâu gác bếp', desc: 'Thịt trâu hun khói, ăn kèm tương ớt, đặc sản vùng núi phía Bắc.', keyword: 'Thịt trâu gác bếp' }
    ],
    afternoonVisit: [
      { name: 'Suối khoáng Mỹ Lâm', desc: 'Khu tắm khoáng nóng thư giãn, phù hợp nghỉ chiều.', keyword: 'Suối khoáng Mỹ Lâm', tips: 'Nên đặt chỗ trước vào cuối tuần.' },
      { name: 'Công viên Núi Dùm', desc: 'Không gian xanh mát ngay ven thành phố Tuyên Quang.', keyword: 'Núi Dùm Tuyên Quang', tips: 'Thích hợp đi bộ ngắm hoàng hôn.' }
    ],
    dinner: [
      { dish: 'Vịt bầu quay', desc: 'Vịt bầu Minh Hương quay da giòn, món tối đãi khách quen thuộc.', keyword: 'Vịt quay Tuyên Quang' },
      { dish: 'Măng nhồi thịt', desc: 'Măng rừng nhồi thịt băm hấp hoặc kho, món dân dã vùng núi.', keyword: 'Măng nhồi thịt' },
      { dish: 'Rau rừng thập cẩm', desc: 'Các loại rau rừng luộc hoặc xào, ăn kèm nước chấm đặc trưng.', keyword: 'rau rừng Tây Bắc' }
    ],
    nightlife: [
      { name: 'Phố đi bộ ven sông Lô', desc: 'Không gian đi bộ, quán cà phê ven sông về đêm.', keyword: 'sông Lô Tuyên Quang', tips: 'Cuối tuần thường có thêm gian hàng ẩm thực đường phố.' }
    ]
  },

  'Lào Cai': {
    breakfast: [
      { dish: 'Phở chua Lào Cai', desc: 'Phở trộn vị chua ngọt, ăn kèm lạc rang và rau thơm.', keyword: 'Phở chua Lào Cai' },
      { dish: 'Bánh cuốn Lào Cai', desc: 'Bánh cuốn tráng mỏng, ăn kèm nước chấm và giò.', keyword: 'Bánh cuốn Lào Cai' },
      { dish: 'Thắng cố', desc: 'Món hầm truyền thống của người Mông, thường ăn cùng rượu ngô.', keyword: 'Thắng cố' }
    ],
    morningVisit: [
      { name: 'Chợ Cốc Lếu', desc: 'Chợ trung tâm thành phố Lào Cai, gần cửa khẩu quốc tế.', keyword: 'Chợ Cốc Lếu', tips: 'Có thể đi bộ ra cửa khẩu Lào Cai gần đó.' },
      { name: 'Đền Thượng Lào Cai', desc: 'Ngôi đền linh thiêng thờ Trần Hưng Đạo, view sông Nậm Thi.', keyword: 'Đền Thượng Lào Cai', tips: 'Ăn mặc kín đáo khi vào đền.' }
    ],
    lunch: [
      { dish: 'Cá suối nướng', desc: 'Cá bắt từ suối vùng cao, nướng than kèm gia vị núi rừng.', keyword: 'Cá suối nướng Tây Bắc' },
      { dish: 'Lợn cắp nách', desc: 'Thịt lợn bản nhỏ nuôi thả rông, chế biến hấp hoặc nướng.', keyword: 'Lợn cắp nách' },
      { dish: 'Xôi bảy màu', desc: 'Xôi nếp nương nhuộm bảy sắc tự nhiên của người Tày, Nùng.', keyword: 'Xôi bảy màu' }
    ],
    afternoonVisit: [
      { name: 'Cầu Kiều Lào Cai', desc: 'Cây cầu biên giới nối hai bờ sông Nậm Thi.', keyword: 'Cầu Kiều Lào Cai', tips: 'Mang giấy tờ tuỳ thân nếu muốn ra khu vực cửa khẩu.' },
      { name: 'Bảo tàng tỉnh Lào Cai', desc: 'Tìm hiểu văn hoá các dân tộc vùng biên giới Tây Bắc.', keyword: 'Bảo tàng Lào Cai', tips: 'Vé vào cửa thường miễn phí hoặc rất rẻ.' }
    ],
    dinner: [
      { dish: 'Lẩu cá tầm Sa Pa', desc: 'Lẩu cá tầm nuôi vùng cao, nước dùng chua cay đậm đà.', keyword: 'Lẩu cá tầm Sa Pa' },
      { dish: 'Nhộng ong xào măng chua', desc: 'Món đặc sản vùng núi phía Bắc, vị béo bùi lạ miệng.', keyword: 'Nhộng ong xào măng' },
      { dish: 'Thịt lợn bản nướng', desc: 'Thịt lợn bản ướp mắc khén, nướng than hoa thơm lừng.', keyword: 'Thịt lợn bản nướng' }
    ],
    nightlife: [
      { name: 'Chợ đêm Lào Cai', desc: 'Khu chợ đêm nhỏ gần trung tâm, bán đồ nướng và thổ cẩm.', keyword: 'chợ đêm Lào Cai', tips: 'Trời vùng cao về đêm khá lạnh, nên mang áo khoác.' }
    ]
  },

  'Thái Nguyên': {
    breakfast: [
      { dish: 'Bánh chưng Bờ Đậu', desc: 'Bánh chưng làng nghề nổi tiếng ven quốc lộ 3, dẻo thơm.', keyword: 'Bánh chưng Bờ Đậu' },
      { dish: 'Cơm lam Thái Nguyên', desc: 'Cơm nếp nướng ống tre, ăn kèm muối vừng hoặc thịt nướng.', keyword: 'Cơm lam Thái Nguyên' },
      { dish: 'Bánh cuốn trứng', desc: 'Bánh cuốn tráng mỏng nhân trứng, ăn kèm chả và nước chấm.', keyword: 'Bánh cuốn trứng' }
    ],
    morningVisit: [
      { name: 'Đồi chè Tân Cương', desc: 'Vùng chè đặc sản nổi tiếng nhất Thái Nguyên, đồi chè xanh mướt.', keyword: 'Đồi chè Tân Cương', tips: 'Nên đi sớm để tránh nắng và chụp ảnh đẹp.' },
      { name: 'Bảo tàng Văn hoá các dân tộc Việt Nam', desc: 'Không gian trưng bày văn hoá 54 dân tộc ngay tại thành phố.', keyword: 'Bảo tàng Văn hóa các dân tộc Việt Nam', tips: 'Dành khoảng 1-2 giờ để tham quan đầy đủ.' }
    ],
    lunch: [
      { dish: 'Cơm lam Thái Nguyên', desc: 'Ăn kèm cá suối hoặc thịt nướng đúng kiểu vùng chè.', keyword: 'Cơm lam Thái Nguyên' },
      { dish: 'Bánh trứng kiến', desc: 'Bánh nếp nhân trứng kiến đen, đặc sản dịp cuối xuân.', keyword: 'Bánh trứng kiến' },
      { dish: 'Nem chua Đại Từ', desc: 'Nem chua lên men tự nhiên, vị chua nhẹ đặc trưng.', keyword: 'Nem chua Đại Từ' }
    ],
    afternoonVisit: [
      { name: 'Hồ Núi Cốc', desc: 'Hồ nước nhân tạo lớn gắn với truyền thuyết nàng Công chàng Cốc.', keyword: 'Hồ Núi Cốc', tips: 'Có thể đi thuyền tham quan các đảo nhỏ giữa hồ.' },
      { name: 'ATK Định Hoá', desc: 'Khu di tích lịch sử cách mạng thời kháng chiến chống Pháp.', keyword: 'ATK Định Hóa Thái Nguyên', tips: 'Phù hợp cho chuyến đi tìm hiểu lịch sử.' }
    ],
    dinner: [
      { dish: 'Gà đồi nướng mật ong', desc: 'Gà thả đồi nướng mật ong, thịt săn chắc thơm ngọt.', keyword: 'Gà đồi nướng' },
      { dish: 'Cá kho Thái Nguyên', desc: 'Cá kho niêu đất kiểu Bắc Bộ, đậm đà đưa cơm.', keyword: 'Cá kho niêu đất' },
      { dish: 'Trà Tân Cương', desc: 'Kết thúc bữa tối bằng chén trà nõn Tân Cương thơm đượm.', keyword: 'Trà Tân Cương' }
    ],
    nightlife: [
      { name: 'Phố đi bộ Hồ Núi Cốc', desc: 'Không gian đi dạo, ẩm thực nhẹ ven hồ về đêm.', keyword: 'Hồ Núi Cốc về đêm', tips: 'Trời tối ở khu vực đồi núi khá lạnh, nên mang áo ấm.' }
    ]
  },

  'Phú Thọ': {
    breakfast: [
      { dish: 'Bánh tai Phú Thọ', desc: 'Bánh gạo tẻ nhân thịt hình tai, món sáng dân dã đất Tổ.', keyword: 'Bánh tai Phú Thọ' },
      { dish: 'Cọ ỏm', desc: 'Quả cọ luộc/ỏm béo bùi, ăn cùng cơm hoặc riêng như món sáng.', keyword: 'Cọ ỏm Phú Thọ' },
      { dish: 'Xôi cọ', desc: 'Xôi nếp trộn thịt quả cọ, món sáng đặc trưng trung du.', keyword: 'Xôi cọ' }
    ],
    morningVisit: [
      { name: 'Đền Hùng', desc: 'Khu di tích lịch sử Đền Hùng, cội nguồn dân tộc Việt Nam.', keyword: 'Đền Hùng', tips: 'Chuẩn bị sức khoẻ vì phải leo khá nhiều bậc thang.' },
      { name: 'Bảo tàng Hùng Vương', desc: 'Trưng bày hiện vật liên quan thời đại Hùng Vương.', keyword: 'Bảo tàng Hùng Vương', tips: 'Kết hợp tham quan cùng khu di tích Đền Hùng.' }
    ],
    lunch: [
      { dish: 'Thịt chua Thanh Sơn', desc: 'Thịt lợn lên men chua tự nhiên, ăn kèm lá sung, lá ổi.', keyword: 'Thịt chua Thanh Sơn' },
      { dish: 'Rêu đá nướng', desc: 'Rêu suối gói lá dong nướng, đặc sản người Mường Phú Thọ.', keyword: 'Rêu đá nướng' },
      { dish: 'Cá lăng sông Đà', desc: 'Cá lăng thịt chắc, thường chế biến om chuối đậu hoặc nướng.', keyword: 'Cá lăng sông Đà' }
    ],
    afternoonVisit: [
      { name: 'Đầm Ao Châu', desc: 'Hồ nước tự nhiên rộng lớn với nhiều đảo nhỏ, cảnh sắc yên bình.', keyword: 'Đầm Ao Châu', tips: 'Có thể thuê thuyền dạo quanh các đảo.' },
      { name: 'Khu di tích Văn Lang', desc: 'Không gian tái hiện đời sống thời Hùng Vương.', keyword: 'Khu di tích Văn Lang Phú Thọ', tips: 'Phù hợp cho gia đình có trẻ nhỏ tìm hiểu lịch sử.' }
    ],
    dinner: [
      { dish: 'Cá kho tương', desc: 'Cá kho tương làng nghề trung du, vị đậm đà đặc trưng.', keyword: 'Cá kho tương Phú Thọ' },
      { dish: 'Gà nhiều cựa', desc: 'Giống gà đặc sản vùng đất Tổ, thịt dai ngọt.', keyword: 'Gà nhiều cựa Phú Thọ' },
      { dish: 'Bánh sắn', desc: 'Bánh sắn hấp hoặc nướng, món quê dân dã miền trung du.', keyword: 'Bánh sắn Phú Thọ' }
    ],
    nightlife: [
      { name: 'Quảng trường Hùng Vương', desc: 'Không gian sinh hoạt cộng đồng về đêm tại thành phố Việt Trì.', keyword: 'Quảng trường Hùng Vương Việt Trì', tips: 'Vào mùa lễ hội Đền Hùng khu vực này rất đông vui.' }
    ]
  },

  'Bắc Ninh': {
    breakfast: [
      { dish: 'Bánh phu thê Đình Bảng', desc: 'Bánh nếp trong suốt nhân đậu xanh dừa, gói lá dong đẹp mắt.', keyword: 'Bánh phu thê Đình Bảng' },
      { dish: 'Bánh khúc làng Diềm', desc: 'Xôi khúc nhân đậu xanh thịt mỡ, gói lá chuối thơm.', keyword: 'Bánh khúc Bắc Ninh' },
      { dish: 'Bún riêu cua', desc: 'Bún riêu cua đồng chua thanh, món sáng phổ biến vùng Kinh Bắc.', keyword: 'Bún riêu cua' }
    ],
    morningVisit: [
      { name: 'Chùa Dâu', desc: 'Ngôi chùa cổ nhất Việt Nam, trung tâm Phật giáo Kinh Bắc xưa.', keyword: 'Chùa Dâu Bắc Ninh', tips: 'Kết hợp tham quan chùa Bút Tháp gần đó.' },
      { name: 'Chùa Phật Tích', desc: 'Ngôi chùa cổ với tượng Phật A Di Đà bằng đá lớn.', keyword: 'Chùa Phật Tích', tips: 'Có thể leo núi Phật Tích phía sau chùa.' }
    ],
    lunch: [
      { dish: 'Bánh tẻ làng Chờ', desc: 'Bánh gạo tẻ nhân thịt mộc nhĩ, gói lá dong hình thuôn dài.', keyword: 'Bánh tẻ làng Chờ' },
      { dish: 'Nem Bùi Ninh Xá', desc: 'Nem thính từ thịt và bì lợn, ăn kèm lá sung.', keyword: 'Nem Bùi Bắc Ninh' },
      { dish: 'Cháo cá làng Chài', desc: 'Cháo cá sông Đuống nấu nhuyễn, thơm gừng và hành phi.', keyword: 'Cháo cá Bắc Ninh' }
    ],
    afternoonVisit: [
      { name: 'Đền Đô', desc: 'Đền thờ tám vị vua nhà Lý tại Đình Bảng.', keyword: 'Đền Đô Bắc Ninh', tips: 'Nên tìm hiểu trước lịch sử nhà Lý để chuyến đi thêm ý nghĩa.' },
      { name: 'Làng tranh Đông Hồ', desc: 'Làng nghề tranh dân gian nổi tiếng khắp cả nước.', keyword: 'Tranh Đông Hồ', tips: 'Có thể mua tranh làm quà lưu niệm.' }
    ],
    dinner: [
      { dish: 'Gà Hồ', desc: 'Giống gà quý hiếm của làng Hồ, thịt thơm chắc.', keyword: 'Gà Hồ Bắc Ninh' },
      { dish: 'Bánh đúc riêu cua', desc: 'Bánh đúc lạc chấm riêu cua, món tối dân dã.', keyword: 'Bánh đúc riêu cua' },
      { dish: 'Chả rươi', desc: 'Chả từ con rươi, món đặc sản theo mùa vùng đồng bằng Bắc Bộ.', keyword: 'Chả rươi' }
    ],
    nightlife: [
      { name: 'Nghe quan họ trên thuyền', desc: 'Trải nghiệm hát quan họ Bắc Ninh trên thuyền sông Cầu.', keyword: 'Quan họ Bắc Ninh', tips: 'Thường tổ chức theo đoàn hoặc dịp lễ hội, nên hỏi trước lịch diễn.' }
    ]
  },

  'Hưng Yên': {
    breakfast: [
      { dish: 'Bánh cuốn Phú Thị', desc: 'Bánh cuốn tráng tay mỏng, chấm nước mắm cà cuống đặc trưng.', keyword: 'Bánh cuốn Phú Thị' },
      { dish: 'Bún thang lươn', desc: 'Bún thang biến tấu với lươn đồng, nước dùng thanh ngọt.', keyword: 'Bún thang lươn' },
      { dish: 'Chè sen long nhãn', desc: 'Chè hạt sen bọc long nhãn, món sáng thanh mát vùng nhãn lồng.', keyword: 'Chè sen long nhãn Hưng Yên' }
    ],
    morningVisit: [
      { name: 'Phố Hiến', desc: 'Khu phố cổ từng là thương cảng sầm uất thời phong kiến.', keyword: 'Phố Hiến', tips: 'Đi bộ tham quan các đền chùa cổ trong khu vực.' },
      { name: 'Chùa Chuông', desc: 'Ngôi chùa cổ tiêu biểu của Phố Hiến xưa.', keyword: 'Chùa Chuông Hưng Yên', tips: 'Kiến trúc đẹp, thích hợp chụp ảnh vào buổi sáng.' }
    ],
    lunch: [
      { dish: 'Gà Đông Tảo', desc: 'Giống gà chân to đặc hữu Hưng Yên, thịt dai ngọt.', keyword: 'Gà Đông Tảo' },
      { dish: 'Ếch om Phượng', desc: 'Ếch om chuối đậu kiểu làng Phượng, nước sánh đậm đà.', keyword: 'Ếch om Phượng Hưng Yên' },
      { dish: 'Bún cá rô đồng', desc: 'Bún cá rô đồng rán giòn, nước dùng chua nhẹ.', keyword: 'Bún cá rô đồng' }
    ],
    afternoonVisit: [
      { name: 'Văn Miếu Xích Đằng', desc: 'Văn miếu cổ của trấn Sơn Nam xưa, kiến trúc cổ kính.', keyword: 'Văn Miếu Xích Đằng', tips: 'Phù hợp cho ai yêu thích lịch sử, kiến trúc cổ.' },
      { name: 'Vườn nhãn lồng Hưng Yên', desc: 'Tham quan vườn nhãn đặc sản trứ danh của tỉnh.', keyword: 'Nhãn lồng Hưng Yên', tips: 'Mùa nhãn chín rơi vào khoảng tháng 7-8 hằng năm.' }
    ],
    dinner: [
      { dish: 'Gà Đông Tảo hầm thuốc bắc', desc: 'Món bồi bổ nổi tiếng, chân gà to giòn sụn.', keyword: 'Gà Đông Tảo hầm' },
      { dish: 'Tương Bần', desc: 'Nước chấm/tương lên men trứ danh, dùng kèm nhiều món luộc.', keyword: 'Tương Bần Hưng Yên' },
      { dish: 'Ếch om Phượng', desc: 'Ăn kèm bún tươi và rau thơm, đậm chất đồng bằng Bắc Bộ.', keyword: 'Ếch om Phượng' }
    ],
    nightlife: [
      { name: 'Phố cổ Phố Hiến về đêm', desc: 'Đi dạo khu phố cổ với ánh đèn lồng nhẹ nhàng.', keyword: 'Phố Hiến về đêm', tips: 'Không gian khá yên tĩnh, phù hợp tản bộ thư giãn.' }
    ]
  },

  'Hải Phòng': {
    breakfast: [
      { dish: 'Bánh đa cua Hải Phòng', desc: 'Bánh đa đỏ nấu cua đồng, rau muống, chả lá lốt.', keyword: 'Bánh đa cua Hải Phòng' },
      { dish: 'Bún cá cay', desc: 'Bún cá chiên giòn, nước dùng cay nhẹ đặc trưng đất Cảng.', keyword: 'Bún cá cay Hải Phòng' },
      { dish: 'Bánh mì cay', desc: 'Bánh mì que nhỏ chấm tương ớt, món sáng đặc trưng Hải Phòng.', keyword: 'Bánh mì cay Hải Phòng' }
    ],
    morningVisit: [
      { name: 'Dải trung tâm thành phố Hải Phòng', desc: 'Dạo quanh khu phố Pháp cổ và Nhà hát lớn thành phố.', keyword: 'Nhà hát lớn Hải Phòng', tips: 'Kết hợp chụp ảnh kiến trúc Pháp cổ dọc các tuyến phố.' },
      { name: 'Đền Nghè', desc: 'Đền thờ nữ tướng Lê Chân, người khai sinh đất Hải Phòng.', keyword: 'Đền Nghè Hải Phòng', tips: 'Nên ăn mặc lịch sự khi vào khu vực đền.' }
    ],
    lunch: [
      { dish: 'Bánh đa cua', desc: 'Đặc sản trưa quen thuộc nhất của người Hải Phòng.', keyword: 'Bánh đa cua' },
      { dish: 'Nem cua bể', desc: 'Nem rán nhân cua bể, tôm, thịt — vỏ giòn rụm.', keyword: 'Nem cua bể' },
      { dish: 'Cháo khoái', desc: 'Cháo đặc sánh với hành phi, đậu phộng và bánh đa vụn.', keyword: 'Cháo khoái Hải Phòng' }
    ],
    afternoonVisit: [
      { name: 'Đồ Sơn', desc: 'Bãi biển gần trung tâm thành phố, có tháp Tường Long.', keyword: 'Đồ Sơn Hải Phòng', tips: 'Cuối tuần khu vực này khá đông khách du lịch.' },
      { name: 'Cầu Rồng biển Hải Phòng (cầu Hoàng Văn Thụ)', desc: 'Cây cầu biểu tượng mới, đẹp về chiều hoàng hôn.', keyword: 'Cầu Hoàng Văn Thụ Hải Phòng', tips: 'Thời điểm hoàng hôn là đẹp nhất để ngắm cầu.' }
    ],
    dinner: [
      { dish: 'Hải sản Hải Phòng', desc: 'Hải sản tươi sống chế biến đa dạng: hấp, nướng, rang muối.', keyword: 'Hải sản Hải Phòng' },
      { dish: 'Lẩu cua đồng', desc: 'Lẩu cua đồng nấu cùng riêu, đậu phụ và rau muống.', keyword: 'Lẩu cua đồng' },
      { dish: 'Ốc Hải Phòng', desc: 'Các món ốc xào, hấp sả đậm vị, ăn kèm bánh đa.', keyword: 'Ốc Hải Phòng' }
    ],
    nightlife: [
      { name: 'Chợ đêm Hải Phòng', desc: 'Khu ẩm thực đường phố sôi động về đêm quanh trung tâm.', keyword: 'Chợ đêm Hải Phòng', tips: 'Thử thêm bánh mì cay tại các quán vỉa hè quen thuộc.' }
    ]
  },

  'Ninh Bình': {
    breakfast: [
      { dish: 'Cơm cháy Ninh Bình', desc: 'Cơm cháy giòn rụm, chấm cùng nước sốt tim cật hoặc dê.', keyword: 'Cơm cháy Ninh Bình' },
      { dish: 'Bún mọc Ninh Bình', desc: 'Bún mọc nước dùng ninh xương thanh ngọt, ăn kèm giò mọc.', keyword: 'Bún mọc' },
      { dish: 'Bánh đa cua Ninh Bình', desc: 'Phiên bản bánh đa cua vùng đồng bằng, dễ ăn buổi sáng.', keyword: 'Bánh đa cua' }
    ],
    morningVisit: [
      { name: 'Tràng An', desc: 'Quần thể danh thắng sông nước, hang động nổi tiếng, đi thuyền len lỏi qua các hang.', keyword: 'Tràng An Ninh Bình', tips: 'Nên đi từ sớm để tránh nắng và đông người khi chèo thuyền.' },
      { name: 'Chùa Bái Đính', desc: 'Quần thể chùa lớn với nhiều tượng Phật và hành lang La Hán.', keyword: 'Chùa Bái Đính', tips: 'Diện tích rất rộng, nên chuẩn bị giày thoải mái để đi bộ.' }
    ],
    lunch: [
      { dish: 'Thịt dê núi Ninh Bình', desc: 'Dê núi thả tự nhiên, chế biến tái chanh, nướng hoặc hấp.', keyword: 'Thịt dê núi Ninh Bình' },
      { dish: 'Cơm cháy', desc: 'Ăn kèm nước sốt dê hoặc tim cật, đặc sản trứ danh.', keyword: 'Cơm cháy Ninh Bình' },
      { dish: 'Ốc núi Ninh Bình', desc: 'Ốc núi đá vôi, thịt giòn dai, hấp sả hoặc xào.', keyword: 'Ốc núi Ninh Bình' }
    ],
    afternoonVisit: [
      { name: 'Tam Cốc - Bích Động', desc: 'Đi thuyền ngắm cánh đồng lúa hai bên bờ sông Ngô Đồng.', keyword: 'Tam Cốc Ninh Bình', tips: 'Mùa lúa chín (tháng 5-6) là thời điểm đẹp nhất.' },
      { name: 'Hang Múa', desc: 'Leo núi ngắm toàn cảnh Tam Cốc từ trên cao.', keyword: 'Hang Múa Ninh Bình', tips: 'Cần leo khá nhiều bậc thang, nên mang giày thể thao.' }
    ],
    dinner: [
      { dish: 'Dê núi hấp', desc: 'Thịt dê hấp lá cách hoặc sả, chấm tương gừng đặc trưng.', keyword: 'Dê núi hấp' },
      { dish: 'Nem Yên Mạc', desc: 'Nem chua lên men từ thịt và bì lợn, ăn kèm lá sung.', keyword: 'Nem Yên Mạc' },
      { dish: 'Rượu Kim Sơn', desc: 'Rượu nếp truyền thống nổi tiếng của Ninh Bình.', keyword: 'Rượu Kim Sơn' }
    ],
    nightlife: [
      { name: 'Phố cổ Hoa Lư về đêm', desc: 'Không gian yên bình quanh cố đô Hoa Lư, ít ồn ào.', keyword: 'Cố đô Hoa Lư', tips: 'Phù hợp cho những ai thích nghỉ ngơi tĩnh lặng hơn là về đêm sôi động.' }
    ]
  },

  'Quảng Trị': {
    breakfast: [
      { dish: 'Cháo bột cá lóc', desc: 'Cháo bột gạo cá lóc, món sáng đặc trưng miền Trung.', keyword: 'Cháo bột cá lóc' },
      { dish: 'Bánh ướt Phương Lang', desc: 'Bánh ướt mềm mỏng, chấm nước mắm nguyên chất.', keyword: 'Bánh ướt Quảng Trị' },
      { dish: 'Bánh khoái Quảng Trị', desc: 'Bánh khoái giòn nhân tôm thịt giá đỗ, ăn kèm rau sống.', keyword: 'Bánh khoái Quảng Trị' }
    ],
    morningVisit: [
      { name: 'Thành cổ Quảng Trị', desc: 'Di tích lịch sử chiến tranh nổi tiếng, nơi tưởng niệm chiến sĩ.', keyword: 'Thành cổ Quảng Trị', tips: 'Nên tìm hiểu trước bối cảnh lịch sử 81 ngày đêm để chuyến đi ý nghĩa hơn.' },
      { name: 'Địa đạo Vịnh Mốc', desc: 'Hệ thống địa đạo từng che chở người dân thời chiến.', keyword: 'Địa đạo Vịnh Mốc', tips: 'Đường trong địa đạo khá hẹp, nên chọn trang phục gọn nhẹ.' }
    ],
    lunch: [
      { dish: 'Bún hến Mai Xá', desc: 'Bún hến xào, nước hến chua nhẹ, ăn kèm bánh tráng.', keyword: 'Bún hến Quảng Trị' },
      { dish: 'Cháo vạc giường', desc: 'Món cháo đặc sản với bánh vạc giường dai mềm.', keyword: 'Cháo vạc giường' },
      { dish: 'Lòng sả Đông Hà', desc: 'Lòng heo xào sả ớt, ăn kèm cơm hoặc bánh tráng.', keyword: 'Lòng sả Quảng Trị' }
    ],
    afternoonVisit: [
      { name: 'Cầu Hiền Lương - Sông Bến Hải', desc: 'Biểu tượng lịch sử chia cắt hai miền một thời.', keyword: 'Cầu Hiền Lương', tips: 'Kết hợp tham quan Kỳ đài và cụm di tích đôi bờ.' },
      { name: 'Nghĩa trang liệt sĩ Trường Sơn', desc: 'Nghĩa trang lớn tưởng niệm các anh hùng liệt sĩ.', keyword: 'Nghĩa trang liệt sĩ Trường Sơn', tips: 'Nên giữ thái độ trang nghiêm khi tham quan.' }
    ],
    dinner: [
      { dish: 'Cháo bột cá lóc', desc: 'Phiên bản buổi tối đậm đà hơn, thêm nhiều rau thơm.', keyword: 'Cháo bột cá lóc Quảng Trị' },
      { dish: 'Đẻn biển Cửa Việt', desc: 'Đặc sản hải sản lạ miệng vùng biển Cửa Việt.', keyword: 'Đẻn biển Cửa Việt' },
      { dish: 'Hải sản Cửa Việt', desc: 'Hải sản tươi từ cảng cá Cửa Việt, chế biến nướng hoặc hấp.', keyword: 'Hải sản Cửa Việt' }
    ],
    nightlife: [
      { name: 'Bờ sông Thạch Hãn về đêm', desc: 'Thả đèn hoa đăng, không gian tưởng niệm nhẹ nhàng về đêm.', keyword: 'Sông Thạch Hãn', tips: 'Vào các dịp lễ lớn, khu vực này thường tổ chức thả hoa đăng.' }
    ]
  },

  'Đà Nẵng': {
    breakfast: [
      { dish: 'Mì Quảng', desc: 'Sợi mì vàng, nước lèo sánh ít, ăn kèm bánh tráng và đậu phộng.', keyword: 'Mì Quảng' },
      { dish: 'Bánh xèo Đà Nẵng', desc: 'Bánh xèo nhỏ giòn, cuốn bánh tráng rau sống chấm mắm nêm.', keyword: 'Bánh xèo Đà Nẵng' },
      { dish: 'Bún mắm Đà Nẵng', desc: 'Bún ăn cùng mắm nêm và thịt luộc, hương vị đậm đà miền Trung.', keyword: 'Bún mắm Đà Nẵng' }
    ],
    morningVisit: [
      { name: 'Bán đảo Sơn Trà', desc: 'Bán đảo xanh với chùa Linh Ứng và voọc chà vá chân nâu.', keyword: 'Bán đảo Sơn Trà', tips: 'Đi sớm để tránh nắng khi leo các cung đường ngắm cảnh.' },
      { name: 'Ngũ Hành Sơn', desc: 'Cụm 5 ngọn núi đá vôi với hang động và chùa cổ.', keyword: 'Ngũ Hành Sơn', tips: 'Có thể đi thang máy lên núi nếu ngại leo bộ.' }
    ],
    lunch: [
      { dish: 'Mì Quảng ếch', desc: 'Biến tấu mì Quảng với ếch đồng, vị lạ miệng đặc trưng.', keyword: 'Mì Quảng ếch' },
      { dish: 'Bún chả cá Đà Nẵng', desc: 'Bún nước dùng ngọt thanh từ cá, chả cá chiên vàng.', keyword: 'Bún chả cá Đà Nẵng' },
      { dish: 'Gỏi cá Nam Ô', desc: 'Gỏi cá trích tươi trộn thính, ăn kèm bánh tráng và rau rừng.', keyword: 'Gỏi cá Nam Ô' }
    ],
    afternoonVisit: [
      { name: 'Cầu Rồng', desc: 'Biểu tượng thành phố, phun lửa/nước vào tối cuối tuần.', keyword: 'Cầu Rồng Đà Nẵng', tips: 'Nên quay lại buổi tối để xem cầu phun lửa.' },
      { name: 'Bãi biển Mỹ Khê', desc: 'Một trong những bãi biển đẹp nhất Việt Nam.', keyword: 'Bãi biển Mỹ Khê', tips: 'Buổi chiều mát rất thích hợp để tắm biển.' }
    ],
    dinner: [
      { dish: 'Hải sản Mỹ Khê', desc: 'Mực nhảy hấp, ghẹ rang me, tôm nướng muối ớt ven biển.', keyword: 'Hải sản Đà Nẵng' },
      { dish: 'Bánh tráng cuốn thịt heo', desc: 'Thịt heo hai đầu da cuốn bánh tráng, rau sống, chấm mắm nêm.', keyword: 'Bánh tráng cuốn thịt heo' },
      { dish: 'Ốc hút Đà Nẵng', desc: 'Ốc hút xào sả ớt, món nhậu vặt quen thuộc buổi tối.', keyword: 'Ốc hút Đà Nẵng' }
    ],
    nightlife: [
      { name: 'Cầu Rồng phun lửa & phố đi bộ Bạch Đằng', desc: 'Xem cầu Rồng phun lửa nước, dạo phố ven sông Hàn.', keyword: 'Sông Hàn Đà Nẵng về đêm', tips: 'Cầu Rồng phun lửa vào 21h tối thứ Bảy, Chủ Nhật.' },
      { name: 'Chợ đêm Sơn Trà', desc: 'Khu chợ đêm ẩm thực đường phố quy mô lớn.', keyword: 'Chợ đêm Sơn Trà', tips: 'Rất đông vào cuối tuần, nên gửi xe sớm.' }
    ]
  },

  'Quảng Ngãi': {
    breakfast: [
      { dish: 'Don Quảng Ngãi', desc: 'Món ăn dân dã từ con don nhỏ, nước dùng ngọt thanh.', keyword: 'Don Quảng Ngãi' },
      { dish: 'Cháo don', desc: 'Cháo nấu cùng con don, ăn kèm bánh tráng nướng giòn.', keyword: 'Cháo don' },
      { dish: 'Bánh xèo Quảng Ngãi', desc: 'Bánh xèo nhân tôm mực, ăn kèm rau sống đặc trưng miền Trung.', keyword: 'Bánh xèo Quảng Ngãi' }
    ],
    morningVisit: [
      { name: 'Núi Thiên Ấn', desc: 'Ngọn núi được ví như "Thiên Ấn niêm hà", có chùa cổ trên đỉnh.', keyword: 'Núi Thiên Ấn', tips: 'View đẹp nhất vào buổi sáng sớm nhiều mây.' },
      { name: 'Thành cổ Châu Sa', desc: 'Di tích thành cổ Chăm Pa còn lại ở Quảng Ngãi.', keyword: 'Thành cổ Châu Sa', tips: 'Phù hợp cho ai yêu thích tìm hiểu văn hoá Chăm.' }
    ],
    lunch: [
      { dish: 'Cá bống sông Trà', desc: 'Cá bống kho tiêu, đặc sản trứ danh của sông Trà Khúc.', keyword: 'Cá bống sông Trà' },
      { dish: 'Don xào', desc: 'Con don xào xúc bánh tráng, món trưa lạ miệng.', keyword: 'Don xào Quảng Ngãi' },
      { dish: 'Chả cá Quảng Ngãi', desc: 'Chả cá thu hoặc cá mối, chiên vàng thơm.', keyword: 'Chả cá Quảng Ngãi' }
    ],
    afternoonVisit: [
      { name: 'Cầu Trà Khúc', desc: 'Cây cầu biểu tượng bắc qua sông Trà Khúc.', keyword: 'Sông Trà Khúc', tips: 'Chiều muộn là thời điểm ngắm hoàng hôn đẹp trên cầu.' },
      { name: 'Bảo tàng Khởi nghĩa Ba Tơ', desc: 'Tìm hiểu lịch sử phong trào khởi nghĩa Ba Tơ.', keyword: 'Bảo tàng Ba Tơ', tips: 'Phù hợp cho chuyến đi tìm hiểu lịch sử địa phương.' }
    ],
    dinner: [
      { dish: 'Cá bống sông Trà kho tiêu', desc: 'Món ăn kèm cơm nóng, đậm vị đặc sản địa phương.', keyword: 'Cá bống kho tiêu' },
      { dish: 'Kẹo gương Quảng Ngãi', desc: 'Món tráng miệng giòn ngọt làm từ đường và đậu phộng.', keyword: 'Kẹo gương Quảng Ngãi' },
      { dish: 'Don Quảng Ngãi', desc: 'Ăn tối nhẹ nhàng với tô don nóng hổi quen thuộc.', keyword: 'Don Quảng Ngãi tối' }
    ],
    nightlife: [
      { name: 'Phố ẩm thực ven sông Trà Khúc', desc: 'Các quán ăn đêm dọc bờ sông, không khí mát mẻ.', keyword: 'Sông Trà Khúc về đêm', tips: 'Thích hợp đi dạo và ăn nhẹ sau bữa tối.' }
    ]
  },

  'Gia Lai': null, /* Đã phủ đầy đủ cả 6 điểm cấp 2 trong ITINERARY_DATA, không cần dự phòng */

  'Đắk Lắk': {
    breakfast: [
      { dish: 'Bún đỏ Buôn Ma Thuột', desc: 'Bún màu đỏ gạch cua, nước dùng sánh, ăn kèm chả và trứng cút.', keyword: 'Bún đỏ Buôn Ma Thuột' },
      { dish: 'Cà phê Ban Mê', desc: 'Cà phê phin nguyên chất, nét đặc trưng thủ phủ cà phê Việt Nam.', keyword: 'Cà phê Buôn Ma Thuột' },
      { dish: 'Bánh ướt thịt nướng', desc: 'Bánh ướt cuộn thịt nướng, chấm nước mắm chua ngọt.', keyword: 'Bánh ướt thịt nướng Đắk Lắk' }
    ],
    morningVisit: [
      { name: 'Buôn Đôn', desc: 'Làng voi nổi tiếng của người Ê Đê, M\'nông với cầu treo qua sông Sêrêpốk.', keyword: 'Buôn Đôn', tips: 'Nên đi cùng hướng dẫn viên địa phương để hiểu văn hoá Tây Nguyên.' },
      { name: 'Bảo tàng Đắk Lắk', desc: 'Trưng bày văn hoá cồng chiêng và đời sống Tây Nguyên.', keyword: 'Bảo tàng Đắk Lắk', tips: 'Kết hợp tham quan Biệt điện Bảo Đại gần đó.' }
    ],
    lunch: [
      { dish: 'Gà nướng Bản Đôn', desc: 'Gà thả vườn nướng nguyên con, chấm muối ớt xanh.', keyword: 'Gà nướng Bản Đôn' },
      { dish: 'Cơm lam Tây Nguyên', desc: 'Cơm nếp nướng ống tre, ăn kèm gà nướng hoặc muối vừng.', keyword: 'Cơm lam Tây Nguyên' },
      { dish: 'Canh chua kiến vàng', desc: 'Món canh độc đáo dùng kiến vàng của đồng bào Tây Nguyên.', keyword: 'Canh chua kiến vàng' }
    ],
    afternoonVisit: [
      { name: 'Thác Dray Nur', desc: 'Một trong những thác nước hùng vĩ nhất Tây Nguyên.', keyword: 'Thác Dray Nur', tips: 'Đường xuống thác khá trơn, nên đi giày bám tốt.' },
      { name: 'Hồ Lắk', desc: 'Hồ nước ngọt tự nhiên lớn, có thể trải nghiệm cưỡi voi hoặc chèo thuyền độc mộc.', keyword: 'Hồ Lắk', tips: 'Buổi chiều mặt hồ yên ả, rất đẹp để ngắm cảnh.' }
    ],
    dinner: [
      { dish: 'Lẩu lá rừng', desc: 'Lẩu nấu từ nhiều loại lá rừng Tây Nguyên, vị thanh mát lạ miệng.', keyword: 'Lẩu lá rừng Tây Nguyên' },
      { dish: 'Heo rẫy nướng', desc: 'Heo bản địa nướng than hoa, thịt săn ít mỡ.', keyword: 'Heo rẫy nướng' },
      { dish: 'Rượu cần', desc: 'Thức uống truyền thống của các dân tộc Tây Nguyên trong dịp lễ hội.', keyword: 'Rượu cần Tây Nguyên' }
    ],
    nightlife: [
      { name: 'Đêm cồng chiêng Tây Nguyên', desc: 'Thưởng thức biểu diễn cồng chiêng, múa xoang quanh lửa trại.', keyword: 'Cồng chiêng Tây Nguyên', tips: 'Thường tổ chức tại các buôn du lịch, nên đặt trước theo đoàn.' }
    ]
  },

  'Khánh Hòa': {
    breakfast: [
      { dish: 'Bún cá Nha Trang', desc: 'Bún cá sứa hoặc chả cá, nước dùng ngọt thanh vị biển.', keyword: 'Bún cá Nha Trang' },
      { dish: 'Bánh căn Nha Trang', desc: 'Bánh căn nhỏ đổ khuôn, ăn kèm mắm nêm hoặc xíu mại.', keyword: 'Bánh căn Nha Trang' },
      { dish: 'Nem nướng Ninh Hòa', desc: 'Nem nướng cuốn bánh tráng, chấm nước lèo đặc trưng.', keyword: 'Nem nướng Ninh Hòa' }
    ],
    morningVisit: [
      { name: 'Hòn Chồng', desc: 'Cụm đá tự nhiên độc đáo ven biển, view toàn cảnh vịnh Nha Trang.', keyword: 'Hòn Chồng Nha Trang', tips: 'Buổi sáng ánh nắng dịu, thích hợp chụp ảnh.' },
      { name: 'Tháp Bà Ponagar', desc: 'Quần thể tháp Chăm cổ thờ nữ thần Ponagar.', keyword: 'Tháp Bà Ponagar', tips: 'Tìm hiểu trước về văn hoá Chăm để chuyến tham quan ý nghĩa hơn.' }
    ],
    lunch: [
      { dish: 'Bún sứa Nha Trang', desc: 'Bún với sứa giòn mát, nước dùng chua nhẹ.', keyword: 'Bún sứa Nha Trang' },
      { dish: 'Bánh xèo mực Nha Trang', desc: 'Bánh xèo giòn nhân mực tươi vùng biển.', keyword: 'Bánh xèo mực' },
      { dish: 'Nem nướng Ninh Hòa', desc: 'Món trưa cuốn bánh tráng rau sống nổi tiếng.', keyword: 'Nem nướng Ninh Hòa trưa' }
    ],
    afternoonVisit: [
      { name: 'Vinpearl Land Nha Trang', desc: 'Khu vui chơi giải trí trên đảo Hòn Tre, cáp treo vượt biển.', keyword: 'Vinpearl Land Nha Trang', tips: 'Nên đến sớm chiều để có đủ thời gian chơi các trò chơi.' },
      { name: 'Viện Hải dương học Nha Trang', desc: 'Nơi trưng bày sinh vật biển lâu đời nhất Việt Nam.', keyword: 'Viện Hải dương học Nha Trang', tips: 'Phù hợp cho gia đình có trẻ nhỏ.' }
    ],
    dinner: [
      { dish: 'Hải sản Nha Trang', desc: 'Tôm hùm, ghẹ, ốc biển tươi sống chế biến đa dạng.', keyword: 'Hải sản Nha Trang' },
      { dish: 'Bún cá dầm', desc: 'Bún cá kiểu dầm với chả cá và cá tươi từng miếng.', keyword: 'Bún cá dầm Nha Trang' },
      { dish: 'Yến sào Khánh Hòa', desc: 'Chè yến hoặc súp yến, đặc sản quý của vùng biển Khánh Hòa.', keyword: 'Yến sào Khánh Hòa' }
    ],
    nightlife: [
      { name: 'Phố Tây Nha Trang (Nguyễn Thiện Thuật)', desc: 'Khu phố sôi động với quán bar, ẩm thực đường phố.', keyword: 'Phố Tây Nha Trang', tips: 'Rất đông vào buổi tối cuối tuần, nên đặt bàn trước nếu đi nhóm đông.' },
      { name: 'Quảng trường 2 Tháng 4', desc: 'Không gian đi bộ ven biển về đêm, mát mẻ dễ chịu.', keyword: 'Quảng trường 2 tháng 4 Nha Trang', tips: 'Có thể ngồi ven biển hóng gió sau bữa tối.' }
    ]
  },

  'Lâm Đồng': {
    breakfast: [
      { dish: 'Bánh căn Đà Lạt', desc: 'Bánh căn nhỏ nóng hổi ăn kèm xíu mại, phù hợp khí hậu se lạnh.', keyword: 'Bánh căn Đà Lạt' },
      { dish: 'Sữa đậu nành nóng', desc: 'Sữa đậu nành nóng ăn cùng bánh tiêu, món sáng quen thuộc phố núi.', keyword: 'Sữa đậu nành Đà Lạt' },
      { dish: 'Bánh mì xíu mại Đà Lạt', desc: 'Bánh mì chấm cùng chén xíu mại nóng, đặc sản buổi sáng se lạnh.', keyword: 'Bánh mì xíu mại Đà Lạt' }
    ],
    morningVisit: [
      { name: 'Hồ Xuân Hương', desc: 'Hồ nước giữa trung tâm thành phố, biểu tượng của Đà Lạt.', keyword: 'Hồ Xuân Hương Đà Lạt', tips: 'Đi bộ hoặc đạp xe quanh hồ vào buổi sáng sớm rất dễ chịu.' },
      { name: 'Vườn hoa thành phố Đà Lạt', desc: 'Không gian hoa đa dạng bốn mùa của xứ sở ngàn hoa.', keyword: 'Vườn hoa Đà Lạt', tips: 'Nên đi giày thoải mái vì vườn khá rộng.' }
    ],
    lunch: [
      { dish: 'Lẩu gà lá é', desc: 'Lẩu gà nấu cùng lá é thơm đặc trưng cao nguyên.', keyword: 'Lẩu gà lá é' },
      { dish: 'Bánh tráng nướng Đà Lạt', desc: 'Bánh tráng nướng trứng, phô mai — món ăn vặt trứ danh.', keyword: 'Bánh tráng nướng Đà Lạt' },
      { dish: 'Nấm Đà Lạt xào', desc: 'Các loại nấm cao nguyên tươi, xào bơ tỏi hoặc chiên giòn.', keyword: 'Nấm Đà Lạt' }
    ],
    afternoonVisit: [
      { name: 'Thung lũng Tình Yêu', desc: 'Không gian đồi thông, hồ nước lãng mạn.', keyword: 'Thung lũng Tình Yêu Đà Lạt', tips: 'Trời chiều thường có sương nhẹ, nên mang áo ấm.' },
      { name: 'Đồi chè Cầu Đất', desc: 'Đồi chè xanh mướt ở độ cao lớn, view núi đồi bao quát.', keyword: 'Đồi chè Cầu Đất', tips: 'Cách trung tâm khá xa, nên chủ động thời gian di chuyển.' }
    ],
    dinner: [
      { dish: 'Lẩu bò Đà Lạt', desc: 'Lẩu bò nhúng rau cải mèo, hợp với thời tiết se lạnh về đêm.', keyword: 'Lẩu bò Đà Lạt' },
      { dish: 'Gà nướng cơm lam Đà Lạt', desc: 'Gà nướng ăn kèm cơm lam, đậm chất núi rừng.', keyword: 'Gà nướng cơm lam Đà Lạt' },
      { dish: 'Rượu vang Đà Lạt', desc: 'Nhâm nhi cùng bữa tối, đặc sản địa phương nổi tiếng.', keyword: 'Rượu vang Đà Lạt' }
    ],
    nightlife: [
      { name: 'Chợ đêm Đà Lạt', desc: 'Khu chợ đêm sầm uất với đồ nướng, sữa đậu nành, len ấm.', keyword: 'Chợ đêm Đà Lạt', tips: 'Trời về đêm khá lạnh, nhớ mang theo áo khoác dày.' }
    ]
  },

  'Đồng Nai': {
    breakfast: [
      { dish: 'Bún hến Biên Hòa', desc: 'Bún hến xào cùng ăn kèm rau sống, món sáng bình dân.', keyword: 'Bún hến Biên Hòa' },
      { dish: 'Bánh cuốn Biên Hòa', desc: 'Bánh cuốn nóng ăn cùng chả lụa, nước mắm chua ngọt.', keyword: 'Bánh cuốn Biên Hòa' },
      { dish: 'Bún bò Biên Hòa', desc: 'Bún bò kiểu miền Trung phổ biến khắp thành phố Biên Hòa.', keyword: 'Bún bò Biên Hòa' }
    ],
    morningVisit: [
      { name: 'Văn miếu Trấn Biên', desc: 'Văn miếu đầu tiên được xây ở Đàng Trong, không gian cổ kính.', keyword: 'Văn miếu Trấn Biên', tips: 'Khuôn viên rộng, thích hợp đi dạo buổi sáng.' },
      { name: 'Chùa Ông Biên Hòa', desc: 'Ngôi chùa cổ của cộng đồng người Hoa ven sông Đồng Nai.', keyword: 'Chùa Ông Biên Hòa', tips: 'Kết hợp tham quan khu vực Cù lao Phố gần đó.' }
    ],
    lunch: [
      { dish: 'Gỏi cá Biên Hòa', desc: 'Gỏi cá tươi trộn thính, ăn kèm rau rừng và bánh tráng.', keyword: 'Gỏi cá Biên Hòa' },
      { dish: 'Cơm gà xối mỡ', desc: 'Cơm gà chiên giòn xối mỡ nóng, phổ biến khắp Đồng Nai.', keyword: 'Cơm gà xối mỡ' },
      { dish: 'Bánh xèo Đồng Nai', desc: 'Bánh xèo giòn nhân tôm thịt, ăn kèm rau vườn.', keyword: 'Bánh xèo Đồng Nai' }
    ],
    afternoonVisit: [
      { name: 'Vườn quốc gia Cát Tiên', desc: 'Khu bảo tồn thiên nhiên rộng lớn, đa dạng sinh học cao.', keyword: 'Vườn quốc gia Cát Tiên', tips: 'Nên đặt lịch trước nếu muốn tham gia tour xem thú đêm.' },
      { name: 'Cù lao Phố', desc: 'Cù lao ven sông Đồng Nai với nhiều di tích lịch sử.', keyword: 'Cù lao Phố Biên Hòa', tips: 'Kết hợp đạp xe quanh cù lao để cảm nhận không khí làng quê.' }
    ],
    dinner: [
      { dish: 'Lẩu cá lăng Đồng Nai', desc: 'Lẩu cá lăng nuôi ven sông Đồng Nai, thịt béo ngọt.', keyword: 'Lẩu cá lăng Đồng Nai' },
      { dish: 'Gà hấp muối Long Khánh', desc: 'Gà thả vườn hấp muối, giữ trọn vị ngọt tự nhiên.', keyword: 'Gà hấp muối Long Khánh' },
      { dish: 'Trái cây Long Khánh', desc: 'Chôm chôm, sầu riêng tráng miệng đặc sản vùng Long Khánh.', keyword: 'Trái cây Long Khánh' }
    ],
    nightlife: [
      { name: 'Phố ẩm thực ven sông Đồng Nai', desc: 'Các quán ăn, cà phê ven sông về đêm khá thoáng mát.', keyword: 'Sông Đồng Nai về đêm', tips: 'Thích hợp ngồi hóng gió sau bữa tối.' }
    ]
  },

  'Hồ Chí Minh': {
    breakfast: [
      { dish: 'Cơm tấm Sài Gòn', desc: 'Cơm tấm sườn bì chả, món sáng - trưa quen thuộc khắp thành phố.', keyword: 'Cơm tấm Sài Gòn' },
      { dish: 'Hủ tiếu Nam Vang', desc: 'Hủ tiếu nước trong, tôm thịt bằm, phổ biến khắp Sài Gòn.', keyword: 'Hủ tiếu Nam Vang' },
      { dish: 'Bánh mì Sài Gòn', desc: 'Bánh mì giòn kẹp thịt nguội, pate, đồ chua đặc trưng.', keyword: 'Bánh mì Sài Gòn' }
    ],
    morningVisit: [
      { name: 'Dinh Độc Lập', desc: 'Di tích lịch sử quan trọng, kiến trúc đặc trưng thập niên 1960.', keyword: 'Dinh Độc Lập', tips: 'Nên đi cùng hướng dẫn viên để hiểu thêm bối cảnh lịch sử.' },
      { name: 'Nhà thờ Đức Bà & Bưu điện Thành phố', desc: 'Cụm công trình kiến trúc Pháp cổ nổi tiếng giữa trung tâm.', keyword: 'Nhà thờ Đức Bà Sài Gòn', tips: 'Khu vực này rất đông, nên đi từ sớm để chụp ảnh thoải mái.' }
    ],
    lunch: [
      { dish: 'Cơm tấm sườn bì chả', desc: 'Món trưa kinh điển của người Sài Gòn.', keyword: 'Cơm tấm sườn bì chả' },
      { dish: 'Bánh mì Huỳnh Hoa', desc: 'Ổ bánh mì đầy ắp pate, chả lụa, thịt nguội nổi tiếng.', keyword: 'Bánh mì Huỳnh Hoa' },
      { dish: 'Gỏi cuốn Sài Gòn', desc: 'Gỏi cuốn tôm thịt tươi mát, chấm tương hoặc mắm nêm.', keyword: 'Gỏi cuốn' }
    ],
    afternoonVisit: [
      { name: 'Phố đi bộ Nguyễn Huệ', desc: 'Không gian đi bộ hiện đại giữa trung tâm quận 1.', keyword: 'Phố đi bộ Nguyễn Huệ', tips: 'Buổi chiều mát là thời điểm dễ chịu để dạo bộ.' },
      { name: 'Bảo tàng Chứng tích Chiến tranh', desc: 'Bảo tàng lưu giữ nhiều tư liệu, hiện vật về chiến tranh Việt Nam.', keyword: 'Bảo tàng Chứng tích Chiến tranh', tips: 'Một số hình ảnh khá nặng nề, cân nhắc nếu đi cùng trẻ nhỏ.' }
    ],
    dinner: [
      { dish: 'Ốc Sài Gòn', desc: 'Các món ốc xào me, hấp sả — món tối quen thuộc của giới trẻ.', keyword: 'Ốc Sài Gòn' },
      { dish: 'Lẩu mắm miền Tây tại Sài Gòn', desc: 'Lẩu mắm đậm đà hương vị miền Tây ngay giữa thành phố.', keyword: 'Lẩu mắm Sài Gòn' },
      { dish: 'Cút lộn xào me', desc: 'Món ăn vặt quen thuộc buổi tối, vị chua ngọt hấp dẫn.', keyword: 'Cút lộn xào me' }
    ],
    nightlife: [
      { name: 'Phố Bùi Viện', desc: 'Khu phố Tây sôi động bậc nhất Sài Gòn về đêm.', keyword: 'Phố Bùi Viện', tips: 'Rất đông đúc cuối tuần, nên chú ý tư trang cá nhân.' },
      { name: 'Bến Bạch Đằng về đêm', desc: 'Không gian ven sông Sài Gòn, view các toà nhà cao tầng rực sáng.', keyword: 'Bến Bạch Đằng Sài Gòn', tips: 'Có thể đi buýt đường sông để ngắm thành phố từ mặt nước.' }
    ]
  },

  'Tây Ninh': {
    breakfast: [
      { dish: 'Bánh tráng phơi sương', desc: 'Bánh tráng dẻo cuốn thịt luộc, rau rừng Tây Ninh đặc trưng.', keyword: 'Bánh tráng phơi sương Tây Ninh' },
      { dish: 'Bánh canh Trảng Bàng', desc: 'Bánh canh nước dùng ngọt thanh, ăn kèm chả giò.', keyword: 'Bánh canh Trảng Bàng' },
      { dish: 'Bò tơ Tây Ninh', desc: 'Bò tơ nướng hoặc nhúng giấm, cuốn bánh tráng phơi sương.', keyword: 'Bò tơ Tây Ninh' }
    ],
    morningVisit: [
      { name: 'Toà Thánh Cao Đài Tây Ninh', desc: 'Công trình kiến trúc tôn giáo độc đáo, biểu tượng của tỉnh.', keyword: 'Tòa Thánh Cao Đài Tây Ninh', tips: 'Nên xem giờ hành lễ để trải nghiệm thêm phần văn hoá tín ngưỡng.' },
      { name: 'Núi Bà Đen', desc: 'Ngọn núi cao nhất Nam Bộ, có cáp treo lên đỉnh và tượng Phật Bà.', keyword: 'Núi Bà Đen', tips: 'Đi cáp treo buổi sáng để tránh nắng gắt và ngắm mây.' }
    ],
    lunch: [
      { dish: 'Bánh canh Trảng Bàng', desc: 'Món trưa đặc sản nổi danh khắp miền Nam.', keyword: 'Bánh canh Trảng Bàng trưa' },
      { dish: 'Bò tơ nướng', desc: 'Bò tơ nướng lá lốt hoặc nướng muối ớt cuốn bánh tráng.', keyword: 'Bò tơ nướng Tây Ninh' },
      { dish: 'Muối tôm Tây Ninh', desc: 'Ăn kèm trái cây hoặc các món cuốn, đặc sản trứ danh.', keyword: 'Muối tôm Tây Ninh' }
    ],
    afternoonVisit: [
      { name: 'Chùa Bà Đen (Linh Sơn Tiên Thạch Tự)', desc: 'Ngôi chùa cổ trên núi Bà Đen, không khí linh thiêng.', keyword: 'Chùa Bà Đen', tips: 'Kết hợp hành trình lên đỉnh núi bằng cáp treo.' },
      { name: 'Hồ Dầu Tiếng', desc: 'Hồ nước nhân tạo lớn bậc nhất Đông Nam Á.', keyword: 'Hồ Dầu Tiếng', tips: 'Thích hợp cho ai muốn tìm không gian yên tĩnh, ít khách du lịch.' }
    ],
    dinner: [
      { dish: 'Bò tơ nhúng giấm', desc: 'Bò tơ nhúng giấm cuốn bánh tráng, chấm mắm nêm.', keyword: 'Bò tơ nhúng giấm' },
      { dish: 'Ốc xu núi Bà Đen', desc: 'Đặc sản vùng núi, chế biến hấp hoặc xào sả ớt.', keyword: 'Ốc núi Bà Đen' },
      { dish: 'Bánh tráng me', desc: 'Món ăn vặt trộn me cay đặc trưng của Tây Ninh.', keyword: 'Bánh tráng me Tây Ninh' }
    ],
    nightlife: [
      { name: 'Quảng trường dưới chân núi Bà Đen', desc: 'Không gian check-in, nhạc nước về đêm khá mới.', keyword: 'Núi Bà Đen về đêm', tips: 'Cuối tuần thường có chương trình nhạc nước quy mô lớn.' }
    ]
  },

  'Đồng Tháp': {
    breakfast: [
      { dish: 'Hủ tiếu Sa Đéc', desc: 'Hủ tiếu sợi dai đặc trưng, nước dùng ngọt xương thanh.', keyword: 'Hủ tiếu Sa Đéc' },
      { dish: 'Bánh xèo miền Tây', desc: 'Bánh xèo giòn nhân tôm thịt giá đỗ, ăn kèm rau vườn.', keyword: 'Bánh xèo miền Tây' },
      { dish: 'Bún cá Đồng Tháp', desc: 'Bún cá lóc đồng, nước dùng nghệ vàng thơm.', keyword: 'Bún cá Đồng Tháp' }
    ],
    morningVisit: [
      { name: 'Làng hoa Sa Đéc', desc: 'Làng hoa lớn nhất miền Tây, rực rỡ sắc màu quanh năm.', keyword: 'Làng hoa Sa Đéc', tips: 'Dịp cận Tết là thời điểm hoa nở rộ nhất.' },
      { name: 'Khu di tích Xẻo Quýt', desc: 'Khu căn cứ cách mạng giữa rừng tràm nguyên sinh.', keyword: 'Khu di tích Xẻo Quýt', tips: 'Có thể chèo xuồng ba lá tham quan rừng tràm.' }
    ],
    lunch: [
      { dish: 'Hủ tiếu Sa Đéc', desc: 'Món trưa đặc sản trứ danh của vùng đất sen hồng.', keyword: 'Hủ tiếu Sa Đéc trưa' },
      { dish: 'Cá lóc nướng trui', desc: 'Cá lóc nướng rơm, cuốn bánh tráng và rau sống.', keyword: 'Cá lóc nướng trui' },
      { dish: 'Chuột đồng chiên', desc: 'Món đặc sản dân dã của vùng Đồng Tháp Mười.', keyword: 'Chuột đồng chiên Đồng Tháp' }
    ],
    afternoonVisit: [
      { name: 'Vườn quốc gia Tràm Chim', desc: 'Khu bảo tồn đất ngập nước với sếu đầu đỏ quý hiếm.', keyword: 'Vườn quốc gia Tràm Chim', tips: 'Mùa khô (tháng 12 - tháng 4) dễ ngắm chim hơn.' },
      { name: 'Khu du lịch Đồng Sen Tháp Mười', desc: 'Cánh đồng sen bạt ngàn, chèo xuồng ngắm hoa sen.', keyword: 'Đồng Sen Tháp Mười', tips: 'Mùa sen nở đẹp nhất vào khoảng tháng 6 - 8.' }
    ],
    dinner: [
      { dish: 'Lẩu cá linh bông điên điển', desc: 'Món lẩu đặc trưng mùa nước nổi miền Tây.', keyword: 'Lẩu cá linh bông điên điển' },
      { dish: 'Cá tra kho tộ', desc: 'Cá tra kho tộ đậm đà, ăn kèm cơm trắng.', keyword: 'Cá tra kho tộ' },
      { dish: 'Nem Lai Vung', desc: 'Nem chua đặc sản của huyện Lai Vung, Đồng Tháp.', keyword: 'Nem Lai Vung' }
    ],
    nightlife: [
      { name: 'Phố đi bộ ven sông Sa Đéc', desc: 'Không gian đi dạo, ẩm thực nhẹ ven sông về đêm.', keyword: 'Sông Sa Đéc về đêm', tips: 'Không khí yên bình, phù hợp thư giãn sau một ngày tham quan.' }
    ]
  },

  'Vĩnh Long': {
    breakfast: [
      { dish: 'Bánh xèo miền Tây', desc: 'Bánh xèo giòn rụm ăn kèm rau vườn Vĩnh Long.', keyword: 'Bánh xèo Vĩnh Long' },
      { dish: 'Hủ tiếu Vĩnh Long', desc: 'Hủ tiếu nước trong, topping tôm thịt đầy đặn.', keyword: 'Hủ tiếu Vĩnh Long' },
      { dish: 'Bún nước lèo', desc: 'Bún nước lèo đặc trưng miền Tây Nam Bộ, ăn kèm rau muống bào.', keyword: 'Bún nước lèo miền Tây' }
    ],
    morningVisit: [
      { name: 'Cù lao An Bình', desc: 'Cù lao xanh mát giữa sông Tiền, nhiều vườn trái cây.', keyword: 'Cù lao An Bình Vĩnh Long', tips: 'Đi đò qua cù lao vào buổi sáng để tránh nắng gắt.' },
      { name: 'Văn Thánh Miếu Vĩnh Long', desc: 'Văn miếu cổ mang dấu ấn Nho học Nam Bộ.', keyword: 'Văn Thánh Miếu Vĩnh Long', tips: 'Không gian yên tĩnh, thích hợp tham quan chậm rãi.' }
    ],
    lunch: [
      { dish: 'Cá tai tượng chiên xù', desc: 'Cá tai tượng chiên giòn, cuốn bánh tráng rau sống.', keyword: 'Cá tai tượng chiên xù' },
      { dish: 'Lẩu cá kèo', desc: 'Lẩu cá kèo lá giang chua nhẹ, đặc trưng miền Tây.', keyword: 'Lẩu cá kèo' },
      { dish: 'Chả cá Vĩnh Long', desc: 'Chả cá thát lát chiên vàng, ăn kèm cơm hoặc bún.', keyword: 'Chả cá thát lát' }
    ],
    afternoonVisit: [
      { name: 'Vườn trái cây Vĩnh Long', desc: 'Tham quan, hái trái cây tại các miệt vườn ven sông Tiền.', keyword: 'Vườn trái cây Vĩnh Long', tips: 'Mùa trái cây rộ thường vào khoảng tháng 5 - 8.' },
      { name: 'Đình Tân Giai / Đình làng Nam Bộ', desc: 'Kiến trúc đình làng truyền thống Nam Bộ.', keyword: 'Đình làng Vĩnh Long', tips: 'Kết hợp tìm hiểu sinh hoạt cộng đồng làng quê sông nước.' }
    ],
    dinner: [
      { dish: 'Cá lóc hấp bầu', desc: 'Cá lóc hấp cùng bầu non, nước chấm mắm gừng.', keyword: 'Cá lóc hấp bầu' },
      { dish: 'Bánh xèo cù lao', desc: 'Bánh xèo ăn kèm hàng chục loại rau vườn đặc trưng cù lao.', keyword: 'Bánh xèo cù lao Vĩnh Long' },
      { dish: 'Rượu Vĩnh Long', desc: 'Rượu nếp truyền thống, thường dùng trong bữa tối cùng gia đình.', keyword: 'Rượu nếp Vĩnh Long' }
    ],
    nightlife: [
      { name: 'Bờ sông Cổ Chiên về đêm', desc: 'Không gian ven sông mát mẻ, ngắm ghe thuyền về đêm.', keyword: 'Sông Cổ Chiên', tips: 'Phù hợp đi dạo nhẹ nhàng sau bữa tối.' }
    ]
  },

  'Cần Thơ': {
    breakfast: [
      { dish: 'Bánh xèo miền Tây', desc: 'Bánh xèo giòn nhân tôm thịt, cuốn cùng rau vườn miền Tây.', keyword: 'Bánh xèo miền Tây Cần Thơ' },
      { dish: 'Hủ tiếu Cần Thơ', desc: 'Hủ tiếu nước trong, topping tôm thịt đầy đặn.', keyword: 'Hủ tiếu Cần Thơ' },
      { dish: 'Bún gỏi già', desc: 'Bún nước lèo me chua nhẹ, ăn kèm thịt heo quay.', keyword: 'Bún gỏi già Cần Thơ' }
    ],
    morningVisit: [
      { name: 'Chợ nổi vùng sông nước miền Tây', desc: 'Trải nghiệm chợ nổi đặc trưng văn hoá sông nước.', keyword: 'chợ nổi miền Tây', tips: 'Nên đi thật sớm (5h-7h) khi chợ còn tấp nập nhất.' },
      { name: 'Vườn trái cây miệt vườn', desc: 'Tham quan, hái trái cây tại các miệt vườn ven sông.', keyword: 'miệt vườn miền Tây', tips: 'Mùa trái cây rộ thường vào khoảng tháng 5 - 8.' }
    ],
    lunch: [
      { dish: 'Bún gỏi già', desc: 'Đặc sản nổi tiếng của vùng đất Tây Đô.', keyword: 'Bún gỏi già' },
      { dish: 'Lẩu mắm miền Tây', desc: 'Lẩu mắm cá linh, cá sặc, ăn kèm rất nhiều loại rau.', keyword: 'Lẩu mắm miền Tây' },
      { dish: 'Cá lóc nướng trui', desc: 'Cá lóc nướng rơm, cuốn bánh tráng và rau sống.', keyword: 'Cá lóc nướng trui miền Tây' }
    ],
    afternoonVisit: [
      { name: 'Cù lao ven sông Hậu', desc: 'Đạp xe hoặc đi thuyền quanh cù lao xanh mát.', keyword: 'cù lao sông Hậu', tips: 'Buổi chiều mát là thời điểm dễ chịu để tham quan.' },
      { name: 'Nhà cổ Nam Bộ', desc: 'Tham quan kiến trúc nhà cổ đặc trưng vùng đồng bằng sông Cửu Long.', keyword: 'nhà cổ Nam Bộ', tips: 'Nhiều nhà cổ vẫn có người ở, nên xin phép trước khi vào chụp ảnh.' }
    ],
    dinner: [
      { dish: 'Lẩu cá kèo lá giang', desc: 'Lẩu chua nhẹ vị lá giang, phổ biến khắp miền Tây.', keyword: 'Lẩu cá kèo lá giang' },
      { dish: 'Ốc bươu nướng tiêu', desc: 'Món nhậu vặt quen thuộc buổi tối miền sông nước.', keyword: 'Ốc bươu nướng tiêu' },
      { dish: 'Cá tra kho tộ', desc: 'Món cá kho đậm đà ăn kèm cơm trắng.', keyword: 'Cá tra kho tộ miền Tây' }
    ],
    nightlife: [
      { name: 'Bến Ninh Kiều về đêm', desc: 'Không gian đi bộ ven sông Hậu, tàu du lịch thắp đèn rực rỡ.', keyword: 'Bến Ninh Kiều', tips: 'Có thể trải nghiệm đi tàu ngắm sông Hậu về đêm.' }
    ]
  },

  'Cà Mau': {
    breakfast: [
      { dish: 'Bún nước lèo', desc: 'Bún nước lèo cá lóc hoặc cá kèo, đặc trưng miền Tây Nam Bộ.', keyword: 'Bún nước lèo Cà Mau' },
      { dish: 'Bánh tằm cay', desc: 'Bánh tằm chan nước cà ri cay nhẹ, món sáng lạ miệng.', keyword: 'Bánh tằm cay' },
      { dish: 'Cháo cá lóc rau đắng', desc: 'Cháo nấu nhuyễn ăn kèm rau đắng, món sáng miền Tây quen thuộc.', keyword: 'Cháo cá lóc rau đắng' }
    ],
    morningVisit: [
      { name: 'Chợ trung tâm vùng đất Mũi', desc: 'Chợ địa phương với hải sản và đặc sản rừng ngập mặn.', keyword: 'chợ Cà Mau', tips: 'Ghé sớm để chọn được hải sản tươi ngon nhất.' },
      { name: 'Rừng ngập mặn ven biển', desc: 'Trải nghiệm hệ sinh thái rừng ngập mặn đặc trưng cực Nam Tổ quốc.', keyword: 'rừng ngập mặn Cà Mau', tips: 'Nên đi cùng hướng dẫn viên địa phương để an toàn.' }
    ],
    lunch: [
      { dish: 'Lẩu mắm U Minh', desc: 'Lẩu mắm cá đồng đậm vị, ăn kèm rất nhiều rau rừng.', keyword: 'Lẩu mắm U Minh' },
      { dish: 'Ba khía Rạch Gốc', desc: 'Ba khía muối trộn chua ngọt, đặc sản trứ danh Cà Mau.', keyword: 'Ba khía Rạch Gốc' },
      { dish: 'Cá thòi lòi nướng', desc: 'Món đặc sản độc đáo của vùng rừng ngập mặn Cà Mau.', keyword: 'Cá thòi lòi nướng' }
    ],
    afternoonVisit: [
      { name: 'Vườn quốc gia U Minh Hạ', desc: 'Rừng tràm nguyên sinh rộng lớn, hệ sinh thái độc đáo.', keyword: 'Vườn quốc gia U Minh Hạ', tips: 'Có thể trải nghiệm đi xuồng len lỏi trong rừng tràm.' },
      { name: 'Khu du lịch sinh thái ven biển', desc: 'Không gian sinh thái ven biển vùng đất cuối cùng của Tổ quốc.', keyword: 'du lịch sinh thái Cà Mau', tips: 'Nên hỏi kỹ lịch tàu/thuyền nếu di chuyển bằng đường thuỷ.' }
    ],
    dinner: [
      { dish: 'Tôm tít nướng', desc: 'Tôm tít nướng muối ớt, hải sản tươi vùng biển Cà Mau.', keyword: 'Tôm tít nướng' },
      { dish: 'Cua Cà Mau hấp', desc: 'Cua biển Cà Mau nổi tiếng thịt chắc, gạch béo.', keyword: 'Cua Cà Mau' },
      { dish: 'Lẩu cá bớp', desc: 'Lẩu cá bớp chua cay, nguyên liệu tươi từ biển Cà Mau.', keyword: 'Lẩu cá bớp' }
    ],
    nightlife: [
      { name: 'Chợ đêm Cà Mau', desc: 'Khu ẩm thực đường phố nhỏ với hải sản và đặc sản địa phương.', keyword: 'Chợ đêm Cà Mau', tips: 'Nên hỏi giá trước khi gọi món hải sản theo cân.' }
    ]
  },

  'An Giang': {
    breakfast: [
      { dish: 'Bún cá Châu Đốc', desc: 'Bún cá lóc nước dùng nghệ vàng, ăn kèm rau muống bào.', keyword: 'Bún cá Châu Đốc' },
      { dish: 'Bánh bò thốt nốt', desc: 'Bánh bò mềm xốp làm từ đường thốt nốt đặc trưng An Giang.', keyword: 'Bánh bò thốt nốt' },
      { dish: 'Cháo bò Tri Tôn', desc: 'Cháo bò đậm đà mang hương vị vùng Bảy Núi.', keyword: 'Cháo bò Tri Tôn' }
    ],
    morningVisit: [
      { name: 'Rừng tràm Trà Sư', desc: 'Rừng tràm ngập nước nổi tiếng, đi xuồng ba lá ngắm cảnh.', keyword: 'Rừng tràm Trà Sư', tips: 'Mùa nước nổi (tháng 9-11) là đẹp nhất để tham quan.' },
      { name: 'Miếu Bà Chúa Xứ', desc: 'Điểm hành hương nổi tiếng bậc nhất vùng Bảy Núi.', keyword: 'Miếu Bà Chúa Xứ', tips: 'Ăn mặc lịch sự, chuẩn bị tinh thần khá đông vào mùa lễ hội.' }
    ],
    lunch: [
      { dish: 'Bún cá Châu Đốc', desc: 'Món trưa đặc sản nổi tiếng vùng biên giới Tây Nam.', keyword: 'Bún cá Châu Đốc trưa' },
      { dish: 'Gỏi sầu đâu', desc: 'Gỏi lá sầu đâu trộn khô cá, vị đắng nhẹ hậu ngọt lạ miệng.', keyword: 'Gỏi sầu đâu' },
      { dish: 'Lẩu cá linh bông điên điển', desc: 'Món lẩu đặc trưng mùa nước nổi miền Tây.', keyword: 'Lẩu cá linh bông điên điển An Giang' }
    ],
    afternoonVisit: [
      { name: 'Núi Sam Châu Đốc', desc: 'Ngọn núi gắn với quần thể di tích tâm linh nổi tiếng.', keyword: 'Núi Sam Châu Đốc', tips: 'Có thể kết hợp tham quan Lăng Thoại Ngọc Hầu gần đó.' },
      { name: 'Núi Cấm (Bảy Núi)', desc: 'Ngọn núi cao nhất vùng đồng bằng sông Cửu Long.', keyword: 'Núi Cấm An Giang', tips: 'Có cáp treo lên núi, nên đặt vé trước vào cuối tuần.' }
    ],
    dinner: [
      { dish: 'Mắm Châu Đốc', desc: 'Đặc sản mắm nổi tiếng vùng An Giang, ăn kèm bún hoặc cơm.', keyword: 'Mắm Châu Đốc' },
      { dish: 'Cá lóc nướng trui', desc: 'Cá lóc nướng rơm, cuốn bánh tráng và rau rừng.', keyword: 'Cá lóc nướng trui An Giang' },
      { dish: 'Bò cạp bảy núi', desc: 'Món đặc sản lạ miệng vùng Bảy Núi, thường chiên giòn.', keyword: 'Bò cạp Bảy Núi' }
    ],
    nightlife: [
      { name: 'Chợ đêm Châu Đốc', desc: 'Khu chợ đêm với đặc sản mắm, khô và ẩm thực đường phố.', keyword: 'Chợ đêm Châu Đốc', tips: 'Thích hợp mua mắm, khô làm quà mang về.' }
    ]
  }
};

/* =====================================================================
   ITINERARY_DATA — dữ liệu riêng cho từng điểm đến cụ thể
   (11 tỉnh chưa chia cấp 2 trong app + các điểm đến cấp 2 nổi bật)
   ===================================================================== */
const ITINERARY_DATA = {

  /* -------------------- 11 TỈNH CHƯA CHIA CẤP 2 -------------------- */

  'Hà Nội': {
    breakfast: [
      { dish: 'Phở Hà Nội', desc: 'Phở bò/gà nước dùng trong, thơm quế hồi — món sáng biểu tượng của thủ đô.', keyword: 'Phở Hà Nội' },
      { dish: 'Bánh cuốn Thanh Trì', desc: 'Bánh cuốn tráng mỏng, chấm nước mắm cà cuống truyền thống.', keyword: 'Bánh cuốn Thanh Trì' },
      { dish: 'Xôi xéo', desc: 'Xôi đậu xanh, hành phi thơm, ăn kèm chả hoặc giò.', keyword: 'Xôi xéo Hà Nội' },
      { dish: 'Bún riêu cua Hà Nội', desc: 'Bún riêu cua đồng chua thanh, ăn kèm đậu rán, rau sống.', keyword: 'Bún riêu cua Hà Nội' }
    ],
    morningVisit: [
      { name: 'Hồ Hoàn Kiếm & Đền Ngọc Sơn', desc: 'Trái tim của Hà Nội, biểu tượng Tháp Rùa và cầu Thê Húc đỏ.', keyword: 'Hồ Hoàn Kiếm', tips: 'Buổi sáng sớm hồ rất yên tĩnh, nhiều người tập thể dục quanh hồ.' },
      { name: 'Văn Miếu - Quốc Tử Giám', desc: 'Trường đại học đầu tiên của Việt Nam, kiến trúc cổ kính.', keyword: 'Văn Miếu Quốc Tử Giám', tips: 'Nên dành ít nhất 1 giờ để tham quan hết các khu vực.' },
      { name: 'Hoàng thành Thăng Long', desc: 'Di sản UNESCO, minh chứng hơn 1000 năm lịch sử kinh đô.', keyword: 'Hoàng thành Thăng Long', tips: 'Kết hợp tham quan khu khảo cổ số 18 Hoàng Diệu.' }
    ],
    lunch: [
      { dish: 'Bún chả Hà Nội', desc: 'Chả nướng than hoa, chấm nước mắm chua ngọt, ăn kèm bún và rau sống.', keyword: 'Bún chả Hà Nội' },
      { dish: 'Bún đậu mắm tôm', desc: 'Bún, đậu rán, chả cốm chấm mắm tôm — món trưa đặc trưng Hà Nội.', keyword: 'Bún đậu mắm tôm' },
      { dish: 'Bún thang', desc: 'Bún nước dùng thanh, nhiều nguyên liệu tinh tế: giò, trứng, gà xé.', keyword: 'Bún thang Hà Nội' },
      { dish: 'Phở cuốn', desc: 'Bánh phở cuốn thịt bò xào, rau sống, chấm nước mắm.', keyword: 'Phở cuốn' }
    ],
    afternoonVisit: [
      { name: 'Phố cổ Hà Nội (36 phố phường)', desc: 'Khu phố cổ với kiến trúc và nhịp sống buôn bán truyền thống.', keyword: 'Phố cổ Hà Nội', tips: 'Đi bộ khám phá từng con phố nghề để hiểu rõ nét đặc trưng.' },
      { name: 'Bảo tàng Dân tộc học Việt Nam', desc: 'Trưng bày văn hoá 54 dân tộc Việt Nam sinh động.', keyword: 'Bảo tàng Dân tộc học Việt Nam', tips: 'Khu ngoài trời có nhà sàn thực tế của các dân tộc, nên dạo cả hai khu.' }
    ],
    dinner: [
      { dish: 'Chả cá Lã Vọng', desc: 'Cá nướng cùng nghệ, thì là, ăn kèm bún và mắm tôm — món đặc sản trứ danh.', keyword: 'Chả cá Lã Vọng' },
      { dish: 'Nem rán Hà Nội', desc: 'Nem rán giòn nhân thịt, miến, mộc nhĩ, ăn kèm rau sống.', keyword: 'Nem rán Hà Nội' },
      { dish: 'Bún ốc nguội', desc: 'Bún ốc nước chua ngọt mát, món ăn vặt buổi tối đặc trưng.', keyword: 'Bún ốc nguội' }
    ],
    nightlife: [
      { name: 'Phố đi bộ Hồ Gươm', desc: 'Không gian đi bộ cuối tuần quanh hồ, nhiều hoạt động văn hoá đường phố.', keyword: 'Phố đi bộ Hồ Gươm', tips: 'Chỉ hoạt động tối thứ Sáu đến Chủ Nhật.' },
      { name: 'Chợ đêm Đồng Xuân', desc: 'Khu chợ đêm sầm uất trong lòng phố cổ.', keyword: 'Chợ đêm Đồng Xuân', tips: 'Có thể kết hợp ăn vặt các món phố cổ dọc lối đi.' }
    ]
  },

  'Huế': {
    breakfast: [
      { dish: 'Bún bò Huế', desc: 'Nước dùng sả ớt cay nồng, ăn kèm chả cua và giò heo.', keyword: 'Bún bò Huế' },
      { dish: 'Bánh canh Nam Phổ', desc: 'Bánh canh cua đồng sánh đặc, đậm vị xứ Huế.', keyword: 'Bánh canh Nam Phổ' },
      { dish: 'Cơm hến', desc: 'Cơm nguội trộn hến xào, đậu phộng, tóp mỡ — món sáng dân dã Huế.', keyword: 'Cơm hến Huế' }
    ],
    morningVisit: [
      { name: 'Đại Nội Huế (Hoàng thành)', desc: 'Kinh thành triều Nguyễn, kiến trúc cung đình đồ sộ.', keyword: 'Đại Nội Huế', tips: 'Nên đi từ sớm vì khuôn viên rất rộng, cần nhiều thời gian.' },
      { name: 'Chùa Thiên Mụ', desc: 'Ngôi chùa cổ biểu tượng của Huế bên dòng sông Hương.', keyword: 'Chùa Thiên Mụ', tips: 'Có thể kết hợp đi thuyền dọc sông Hương tới chùa.' }
    ],
    lunch: [
      { dish: 'Bánh khoái Huế', desc: 'Bánh khoái giòn nhân tôm thịt, chấm nước lèo gan tôm đặc trưng.', keyword: 'Bánh khoái Huế' },
      { dish: 'Cơm âm phủ', desc: 'Cơm trộn nhiều món ăn kèm nhỏ, món đặc sản lâu đời của Huế.', keyword: 'Cơm âm phủ' },
      { dish: 'Bún bò Huế', desc: 'Ăn trưa với tô bún bò cay nồng đặc trưng.', keyword: 'Bún bò Huế trưa' }
    ],
    afternoonVisit: [
      { name: 'Lăng Tự Đức', desc: 'Lăng tẩm mang phong cách thơ mộng bậc nhất trong các lăng vua Nguyễn.', keyword: 'Lăng Tự Đức', tips: 'Không gian nhiều hồ, cây xanh — nên đi chậm để cảm nhận kiến trúc.' },
      { name: 'Đi thuyền rồng sông Hương', desc: 'Ngắm cảnh sông Hương, cầu Trường Tiền từ trên thuyền.', keyword: 'Sông Hương Huế', tips: 'Có thể kết hợp nghe ca Huế ngay trên thuyền.' }
    ],
    dinner: [
      { dish: 'Cơm cung đình Huế', desc: 'Set món ăn nhiều món nhỏ tinh tế theo phong cách cung đình.', keyword: 'Cơm cung đình Huế' },
      { dish: 'Bánh bèo nậm lọc', desc: 'Bộ ba bánh Huế đặc trưng: bánh bèo, bánh nậm, bánh lọc.', keyword: 'Bánh bèo nậm lọc' },
      { dish: 'Nem lụi Huế', desc: 'Nem lụi nướng than, cuốn bánh tráng, chấm nước lèo đậu phộng.', keyword: 'Nem lụi Huế' }
    ],
    nightlife: [
      { name: 'Ca Huế trên sông Hương', desc: 'Nghe ca Huế truyền thống trên thuyền rồng về đêm.', keyword: 'Ca Huế trên sông Hương', tips: 'Nên đặt vé trước, thường khởi hành vào buổi tối.' },
      { name: 'Phố đi bộ Nguyễn Đình Chiểu', desc: 'Phố đi bộ ven sông Hương với các gian hàng ẩm thực đêm.', keyword: 'Phố đi bộ Nguyễn Đình Chiểu Huế', tips: 'Chỉ hoạt động vào cuối tuần.' }
    ]
  },

  'Quảng Ninh': {
    breakfast: [
      { dish: 'Bánh cuốn chả mực Hạ Long', desc: 'Bánh cuốn ăn kèm chả mực giã tay dai giòn đặc trưng.', keyword: 'Bánh cuốn chả mực Hạ Long' },
      { dish: 'Bún bề bề', desc: 'Bún tôm tít (bề bề) tươi, nước dùng ngọt vị biển.', keyword: 'Bún bề bề Hạ Long' },
      { dish: 'Sá sùng chiên', desc: 'Đặc sản biển giòn tan, thường ăn kèm trong bữa sáng nhẹ.', keyword: 'Sá sùng Quảng Ninh' }
    ],
    morningVisit: [
      { name: 'Vịnh Hạ Long', desc: 'Di sản thiên nhiên thế giới với hàng nghìn đảo đá vôi kỳ vĩ.', keyword: 'Vịnh Hạ Long', tips: 'Nên đi tàu tham quan từ sáng sớm để tránh nắng gắt.' },
      { name: 'Hang Sửng Sốt', desc: 'Một trong những hang động đẹp và lớn nhất vịnh Hạ Long.', keyword: 'Hang Sửng Sốt', tips: 'Đường trong hang có bậc thang, nên đi giày thể thao.' }
    ],
    lunch: [
      { dish: 'Chả mực Hạ Long', desc: 'Chả mực giã tay, chiên vàng giòn — đặc sản trứ danh nhất vùng.', keyword: 'Chả mực Hạ Long' },
      { dish: 'Ngán Quảng Ninh', desc: 'Ngán nướng hoặc hấp, vị ngọt đậm đặc trưng vùng biển Quảng Ninh.', keyword: 'Ngán Quảng Ninh' },
      { dish: 'Sam biển', desc: 'Sam chế biến gỏi hoặc nướng, món đặc sản lạ miệng.', keyword: 'Sam biển Quảng Ninh' }
    ],
    afternoonVisit: [
      { name: 'Đảo Titop', desc: 'Đảo nhỏ giữa vịnh với bãi tắm đẹp và đỉnh núi ngắm toàn cảnh.', keyword: 'Đảo Titop', tips: 'Leo lên đỉnh núi để ngắm toàn cảnh vịnh Hạ Long từ trên cao.' },
      { name: 'Công viên Sun World Hạ Long', desc: 'Khu vui chơi giải trí với cáp treo vượt biển.', keyword: 'Sun World Hạ Long', tips: 'Nên đi vào buổi chiều mát để trải nghiệm các trò chơi ngoài trời.' }
    ],
    dinner: [
      { dish: 'Hải sản Hạ Long', desc: 'Tu hài, ngán, sam, tôm mũ ni chế biến đa dạng.', keyword: 'Hải sản Hạ Long' },
      { dish: 'Chả mực giã tay', desc: 'Ăn tối cùng chả mực nướng hoặc chiên, chấm tương ớt.', keyword: 'Chả mực Hạ Long tối' },
      { dish: 'Gà đồi Tiên Yên', desc: 'Gà thả đồi luộc hoặc hấp, thịt chắc ngọt tự nhiên.', keyword: 'Gà đồi Tiên Yên' }
    ],
    nightlife: [
      { name: 'Phố du lịch Bãi Cháy về đêm', desc: 'Khu phố sôi động với quán bar, chợ đêm ven biển.', keyword: 'Bãi Cháy về đêm', tips: 'Có cầu Bãi Cháy ngắm cảnh đẹp về đêm.' }
    ]
  },

  'Lạng Sơn': {
    breakfast: [
      { dish: 'Phở chua Lạng Sơn', desc: 'Phở trộn vị chua ngọt lạ miệng, ăn kèm lạc rang, khoai chiên.', keyword: 'Phở chua Lạng Sơn' },
      { dish: 'Bánh cuốn trứng Lạng Sơn', desc: 'Bánh cuốn nhân trứng, chan nước dùng xương thay vì chấm.', keyword: 'Bánh cuốn trứng Lạng Sơn' },
      { dish: 'Bánh áp chao', desc: 'Bánh chiên nhân thịt vịt, ăn kèm nộm đu đủ và nước chấm chua ngọt.', keyword: 'Bánh áp chao Lạng Sơn' }
    ],
    morningVisit: [
      { name: 'Động Tam Thanh - Nhị Thanh', desc: 'Quần thể hang động, đền chùa nổi tiếng giữa lòng thành phố.', keyword: 'Động Tam Thanh Lạng Sơn', tips: 'Mang theo đèn pin nhỏ nếu muốn khám phá sâu trong hang.' },
      { name: 'Thành nhà Mạc Lạng Sơn', desc: 'Di tích thành cổ trên núi, view toàn cảnh thành phố.', keyword: 'Thành nhà Mạc Lạng Sơn', tips: 'Cần leo bậc thang khá dốc để lên tới thành.' }
    ],
    lunch: [
      { dish: 'Vịt quay Lạng Sơn', desc: 'Vịt quay lá mắc mật, da giòn thơm đặc trưng xứ Lạng.', keyword: 'Vịt quay Lạng Sơn' },
      { dish: 'Khâu nhục', desc: 'Thịt ba chỉ hấp cách thuỷ nhiều giờ, mềm béo đậm vị.', keyword: 'Khâu nhục Lạng Sơn' },
      { dish: 'Phở chua', desc: 'Ăn trưa nhẹ nhàng với phở chua thanh mát.', keyword: 'Phở chua Lạng Sơn trưa' }
    ],
    afternoonVisit: [
      { name: 'Chợ Đông Kinh', desc: 'Chợ biên giới lớn, nơi giao thương hàng hoá Việt - Trung.', keyword: 'Chợ Đông Kinh Lạng Sơn', tips: 'Có thể mua đặc sản xứ Lạng làm quà tại đây.' },
      { name: 'Ải Chi Lăng', desc: 'Di tích lịch sử gắn với nhiều chiến thắng chống ngoại xâm.', keyword: 'Ải Chi Lăng', tips: 'Phù hợp cho ai yêu thích tìm hiểu lịch sử quân sự Việt Nam.' }
    ],
    dinner: [
      { dish: 'Vịt quay lá mắc mật', desc: 'Món đặc sản không thể bỏ lỡ khi đến Lạng Sơn.', keyword: 'Vịt quay lá mắc mật' },
      { dish: 'Lợn quay Lạng Sơn', desc: 'Lợn quay da giòn tan, ướp lá mắc mật đặc trưng.', keyword: 'Lợn quay Lạng Sơn' },
      { dish: 'Măng ớt ngâm', desc: 'Món ăn kèm chua cay đặc trưng của ẩm thực xứ Lạng.', keyword: 'Măng ớt Lạng Sơn' }
    ],
    nightlife: [
      { name: 'Chợ đêm Kỳ Lừa', desc: 'Chợ đêm nổi tiếng vùng biên giới với ẩm thực đường phố đa dạng.', keyword: 'Chợ đêm Kỳ Lừa', tips: 'Trời về đêm khá se lạnh, nên mang thêm áo khoác.' }
    ]
  },

  'Cao Bằng': {
    breakfast: [
      { dish: 'Bánh cuốn Cao Bằng', desc: 'Bánh cuốn ăn cùng nước dùng xương hầm nóng thay vì nước mắm.', keyword: 'Bánh cuốn Cao Bằng' },
      { dish: 'Phở chua Cao Bằng', desc: 'Phở trộn chua ngọt, ăn kèm lạc rang và gan lợn.', keyword: 'Phở chua Cao Bằng' },
      { dish: 'Bánh áp chao Cao Bằng', desc: 'Bánh chiên nhân thịt vịt, ăn kèm nộm đu đủ chua ngọt.', keyword: 'Bánh áp chao Cao Bằng' }
    ],
    morningVisit: [
      { name: 'Thác Bản Giốc', desc: 'Một trong những thác nước tự nhiên đẹp nhất Đông Nam Á.', keyword: 'Thác Bản Giốc', tips: 'Mùa nước đổ đẹp nhất vào khoảng tháng 8-9.' },
      { name: 'Động Ngườm Ngao', desc: 'Hang động nhũ đá kỳ vĩ gần khu vực thác Bản Giốc.', keyword: 'Động Ngườm Ngao', tips: 'Kết hợp tham quan cùng ngày với thác Bản Giốc.' }
    ],
    lunch: [
      { dish: 'Vịt quay 7 vị', desc: 'Vịt quay tẩm ướp bảy loại gia vị đặc trưng Cao Bằng.', keyword: 'Vịt quay 7 vị Cao Bằng' },
      { dish: 'Bánh cuốn Cao Bằng', desc: 'Ăn trưa nhẹ nhàng cùng bánh cuốn nước dùng nóng.', keyword: 'Bánh cuốn Cao Bằng trưa' },
      { dish: 'Xôi trám', desc: 'Xôi nếp trộn trám rừng, món ăn dân dã vùng núi phía Bắc.', keyword: 'Xôi trám Cao Bằng' }
    ],
    afternoonVisit: [
      { name: 'Hồ Thang Hen', desc: 'Hồ nước xanh biếc giữa núi đá vôi, cảnh sắc yên bình.', keyword: 'Hồ Thang Hen', tips: 'Nên đi vào mùa khô để mực nước hồ đẹp và trong nhất.' },
      { name: 'Khu di tích Pác Bó', desc: 'Nơi gắn liền với giai đoạn hoạt động cách mạng của Chủ tịch Hồ Chí Minh.', keyword: 'Khu di tích Pác Bó', tips: 'Có suối Lênin và núi Các Mác gần đó, nên tham quan cùng.' }
    ],
    dinner: [
      { dish: 'Lợn quay Cao Bằng', desc: 'Lợn quay da giòn, ướp lá mắc mật thơm đặc trưng.', keyword: 'Lợn quay Cao Bằng' },
      { dish: 'Hạt dẻ Trùng Khánh', desc: 'Món tráng miệng bùi béo, đặc sản nổi tiếng của Cao Bằng.', keyword: 'Hạt dẻ Trùng Khánh' },
      { dish: 'Rau rừng Cao Bằng', desc: 'Các loại rau rừng luộc hoặc xào, ăn kèm chấm đặc trưng.', keyword: 'Rau rừng Cao Bằng' }
    ],
    nightlife: [
      { name: 'Phố đi bộ trung tâm thành phố Cao Bằng', desc: 'Không gian đi dạo nhẹ nhàng ven sông Bằng Giang.', keyword: 'Thành phố Cao Bằng về đêm', tips: 'Trời vùng cao về đêm khá lạnh, nên mang áo ấm.' }
    ]
  },

  'Lai Châu': {
    breakfast: [
      { dish: 'Xôi tím Lai Châu', desc: 'Xôi nếp nương nhuộm tím tự nhiên từ lá cây rừng.', keyword: 'Xôi tím Lai Châu' },
      { dish: 'Bánh chưng đen', desc: 'Bánh chưng nhuộm đen từ tro cây núc nác, đặc sản vùng cao.', keyword: 'Bánh chưng đen Lai Châu' },
      { dish: 'Phở chua Lai Châu', desc: 'Phở trộn chua ngọt lạ miệng, phổ biến vùng núi phía Bắc.', keyword: 'Phở chua Lai Châu' }
    ],
    morningVisit: [
      { name: 'Cầu kính Rồng Mây', desc: 'Cầu kính trên cao với view núi non hùng vĩ vùng Tây Bắc.', keyword: 'Cầu kính Rồng Mây', tips: 'Nên đi vào ngày trời quang để ngắm toàn cảnh rõ nhất.' },
      { name: 'Bản Sin Suối Hồ', desc: 'Bản du lịch cộng đồng người Mông giữa núi rừng.', keyword: 'Bản Sin Suối Hồ', tips: 'Có thể ở lại homestay để trải nghiệm văn hoá bản địa trọn vẹn hơn.' }
    ],
    lunch: [
      { dish: 'Lợn cắp nách', desc: 'Thịt lợn bản nhỏ hấp hoặc nướng, thịt chắc ít mỡ.', keyword: 'Lợn cắp nách Lai Châu' },
      { dish: 'Cá suối nướng', desc: 'Cá bắt từ suối vùng cao, nướng than kèm gia vị núi rừng.', keyword: 'Cá suối nướng Lai Châu' },
      { dish: 'Cơm lam Lai Châu', desc: 'Cơm nếp nướng ống tre, ăn kèm muối vừng.', keyword: 'Cơm lam Lai Châu' }
    ],
    afternoonVisit: [
      { name: 'Đèo Ô Quy Hồ', desc: 'Một trong "tứ đại đỉnh đèo" Việt Nam, view núi non hùng vĩ.', keyword: 'Đèo Ô Quy Hồ', tips: 'Đường đèo quanh co, nên cẩn thận nếu tự lái xe.' },
      { name: 'Động Pu Sam Cáp', desc: 'Hang động nhũ đá đẹp giữa núi rừng Lai Châu.', keyword: 'Động Pu Sam Cáp', tips: 'Bên trong khá tối, nên mang theo đèn pin.' }
    ],
    dinner: [
      { dish: 'Nộm da trâu', desc: 'Da trâu thái mỏng trộn cùng lạc, rau thơm, chua cay lạ miệng.', keyword: 'Nộm da trâu' },
      { dish: 'Lẩu cá tầm', desc: 'Cá tầm nuôi vùng cao Lai Châu, nước lẩu chua cay đậm đà.', keyword: 'Lẩu cá tầm Lai Châu' },
      { dish: 'Rượu ngô Sìn Hồ', desc: 'Rượu ngô truyền thống của người vùng cao Sìn Hồ.', keyword: 'Rượu ngô Sìn Hồ' }
    ],
    nightlife: [
      { name: 'Chợ phiên vùng cao', desc: 'Trải nghiệm không khí chợ phiên nếu trùng đúng ngày họp chợ.', keyword: 'Chợ phiên Lai Châu', tips: 'Nên hỏi trước lịch họp chợ vì mỗi bản có ngày phiên khác nhau.' }
    ]
  },

  'Điện Biên': {
    breakfast: [
      { dish: 'Xôi nếp nương Điện Biên', desc: 'Xôi dẻo thơm từ gạo nếp nương nổi tiếng vùng Tây Bắc.', keyword: 'Xôi nếp nương Điện Biên' },
      { dish: 'Phở gà đen', desc: 'Phở nấu từ giống gà đen bản địa, nước dùng đậm vị.', keyword: 'Phở gà đen Điện Biên' },
      { dish: 'Bánh khẩu sli', desc: 'Bánh nếp giòn ngọt, món quà sáng quen thuộc vùng cao.', keyword: 'Bánh khẩu sli' }
    ],
    morningVisit: [
      { name: 'Đồi A1', desc: 'Cứ điểm quan trọng trong chiến dịch Điện Biên Phủ lịch sử.', keyword: 'Đồi A1 Điện Biên', tips: 'Nên tìm hiểu trước lịch sử chiến dịch để chuyến đi ý nghĩa hơn.' },
      { name: 'Bảo tàng Chiến thắng Điện Biên Phủ', desc: 'Trưng bày hiện vật, tranh tường quy mô lớn về chiến dịch.', keyword: 'Bảo tàng Chiến thắng Điện Biên Phủ', tips: 'Dành ít nhất 1-1.5 giờ để tham quan đầy đủ.' }
    ],
    lunch: [
      { dish: 'Gà đen nướng mắc khén', desc: 'Gà đen bản địa nướng cùng mắc khén, hạt dổi đặc trưng Tây Bắc.', keyword: 'Gà đen nướng mắc khén' },
      { dish: 'Cơm lam Điện Biên', desc: 'Cơm nếp nướng ống tre ăn kèm gà nướng hoặc muối vừng.', keyword: 'Cơm lam Điện Biên' },
      { dish: 'Cá suối nướng', desc: 'Cá bắt từ suối vùng cao Điện Biên, nướng thơm than hoa.', keyword: 'Cá suối nướng Điện Biên' }
    ],
    afternoonVisit: [
      { name: 'Tượng đài Chiến thắng Điện Biên Phủ', desc: 'Tượng đài lớn trên đồi D1, nhìn bao quát thành phố.', keyword: 'Tượng đài Chiến thắng Điện Biên Phủ', tips: 'View đẹp để ngắm hoàng hôn trên thành phố Điện Biên Phủ.' },
      { name: 'Hầm Đờ Cát', desc: 'Sở chỉ huy quân Pháp được giữ nguyên trạng lịch sử.', keyword: 'Hầm Đờ Cát', tips: 'Kết hợp tham quan cùng đồi A1 gần đó.' }
    ],
    dinner: [
      { dish: 'Rêu đá nướng', desc: 'Rêu suối gói lá dong nướng, đặc sản vùng núi phía Bắc.', keyword: 'Rêu đá nướng Điện Biên' },
      { dish: 'Lợn cắp nách', desc: 'Thịt lợn bản nhỏ nướng hoặc hấp, thịt chắc ít mỡ.', keyword: 'Lợn cắp nách Điện Biên' },
      { dish: 'Rượu Mông Pê', desc: 'Rượu ngô đặc sản của người Mông vùng Điện Biên.', keyword: 'Rượu Mông Pê' }
    ],
    nightlife: [
      { name: 'Chợ trung tâm thành phố Điện Biên Phủ', desc: 'Khu chợ đêm nhỏ với các món nướng và đặc sản vùng cao.', keyword: 'Chợ đêm Điện Biên Phủ', tips: 'Trời về đêm khá lạnh, nên mang áo ấm.' }
    ]
  },

  'Sơn La': {
    breakfast: [
      { dish: 'Bánh dày Sơn La', desc: 'Bánh dày nếp nương dẻo thơm, món sáng dân dã vùng cao.', keyword: 'Bánh dày Sơn La' },
      { dish: 'Xôi ngũ sắc', desc: 'Xôi nếp nhuộm màu tự nhiên từ lá cây rừng.', keyword: 'Xôi ngũ sắc Sơn La' },
      { dish: 'Phở gà Mộc Châu', desc: 'Phở nấu từ gà thả đồi Mộc Châu, nước dùng ngọt tự nhiên.', keyword: 'Phở gà Mộc Châu' }
    ],
    morningVisit: [
      { name: 'Cao nguyên Mộc Châu', desc: 'Cao nguyên nổi tiếng với đồi chè trái tim và đồng cỏ xanh mướt.', keyword: 'Cao nguyên Mộc Châu', tips: 'Mùa hoa cải, hoa mận nở (khoảng tháng 12-1) rất đẹp.' },
      { name: 'Nhà tù Sơn La', desc: 'Di tích lịch sử từng giam giữ nhiều chiến sĩ cách mạng.', keyword: 'Nhà tù Sơn La', tips: 'Phù hợp cho chuyến tham quan tìm hiểu lịch sử.' }
    ],
    lunch: [
      { dish: 'Bê chao Mộc Châu', desc: 'Thịt bê non chao giòn, chấm tương gừng đặc trưng Mộc Châu.', keyword: 'Bê chao Mộc Châu' },
      { dish: 'Nậm pịa', desc: 'Món ăn đặc trưng của người Thái vùng Tây Bắc, vị đắng lạ miệng.', keyword: 'Nậm pịa' },
      { dish: 'Cá suối nướng', desc: 'Cá bắt từ suối vùng cao, nướng than kèm gia vị núi rừng.', keyword: 'Cá suối nướng Sơn La' }
    ],
    afternoonVisit: [
      { name: 'Thác Dải Yếm', desc: 'Thác nước đẹp gắn với truyền thuyết tình yêu của người Thái.', keyword: 'Thác Dải Yếm', tips: 'Mùa mưa nước thác đổ mạnh và đẹp hơn.' },
      { name: 'Rừng thông bản Áng', desc: 'Rừng thông xanh mát cùng hồ nước nhỏ giữa cao nguyên.', keyword: 'Rừng thông bản Áng', tips: 'Thích hợp cắm trại hoặc chụp ảnh buổi chiều.' }
    ],
    dinner: [
      { dish: 'Bê chao Mộc Châu', desc: 'Món ăn tối đặc sản không thể bỏ lỡ ở Mộc Châu.', keyword: 'Bê chao Mộc Châu tối' },
      { dish: 'Thịt trâu gác bếp', desc: 'Thịt trâu hun khói, chấm tương ớt hoặc chẩm chéo.', keyword: 'Thịt trâu gác bếp Sơn La' },
      { dish: 'Sữa chua Mộc Châu', desc: 'Món tráng miệng nổi tiếng từ vùng cao nguyên bò sữa.', keyword: 'Sữa chua Mộc Châu' }
    ],
    nightlife: [
      { name: 'Cao nguyên Mộc Châu về đêm', desc: 'Không khí se lạnh, có thể ngắm sao giữa cao nguyên.', keyword: 'Mộc Châu về đêm', tips: 'Nên mang áo ấm vì nhiệt độ đêm khá thấp.' }
    ]
  },

  'Thanh Hóa': {
    breakfast: [
      { dish: 'Bánh cuốn Thanh Hóa', desc: 'Bánh cuốn nóng ăn kèm chả và nước mắm chua ngọt.', keyword: 'Bánh cuốn Thanh Hóa' },
      { dish: 'Bánh gai Tứ Trụ', desc: 'Bánh nếp lá gai nhân đậu xanh dừa, đặc sản làng nghề Thọ Xuân.', keyword: 'Bánh gai Tứ Trụ' },
      { dish: 'Nem chua Thanh Hóa', desc: 'Nem chua lên men tự nhiên, ăn kèm lá đinh lăng.', keyword: 'Nem chua Thanh Hóa' }
    ],
    morningVisit: [
      { name: 'Thành nhà Hồ', desc: 'Di sản UNESCO, toà thành đá cổ độc đáo của Việt Nam.', keyword: 'Thành nhà Hồ', tips: 'Kết hợp tham quan Bảo tàng Thành nhà Hồ gần đó.' },
      { name: 'Suối cá thần Cẩm Lương', desc: 'Suối nước trong với hàng nghìn con cá bơi lội, gắn nhiều truyền thuyết.', keyword: 'Suối cá thần Cẩm Lương', tips: 'Không nên bắt hoặc ăn cá tại đây theo quan niệm địa phương.' }
    ],
    lunch: [
      { dish: 'Chả tôm Thanh Hóa', desc: 'Chả tôm nướng lá chuối, món đặc sản nổi tiếng của xứ Thanh.', keyword: 'Chả tôm Thanh Hóa' },
      { dish: 'Gỏi cá Sầm Sơn', desc: 'Gỏi cá biển tươi trộn thính, ăn kèm bánh tráng và rau rừng.', keyword: 'Gỏi cá Sầm Sơn' },
      { dish: 'Nem chua nướng', desc: 'Biến tấu nem chua nướng than, ăn kèm tương ớt.', keyword: 'Nem chua nướng Thanh Hóa' }
    ],
    afternoonVisit: [
      { name: 'Bãi biển Sầm Sơn', desc: 'Bãi biển nổi tiếng bậc nhất miền Bắc, sóng lớn thích hợp tắm biển.', keyword: 'Bãi biển Sầm Sơn', tips: 'Buổi chiều mát là thời điểm tắm biển dễ chịu nhất.' },
      { name: 'Đền Bà Triệu', desc: 'Đền thờ nữ anh hùng dân tộc Triệu Thị Trinh.', keyword: 'Đền Bà Triệu', tips: 'Ăn mặc lịch sự khi vào khu vực đền.' }
    ],
    dinner: [
      { dish: 'Hải sản Sầm Sơn', desc: 'Hải sản tươi sống chế biến hấp, nướng ngay ven biển.', keyword: 'Hải sản Sầm Sơn' },
      { dish: 'Chả tôm Thanh Hóa', desc: 'Ăn tối cùng chả tôm nướng thơm lừng.', keyword: 'Chả tôm Thanh Hóa tối' },
      { dish: 'Nem nướng Thanh Hóa', desc: 'Nem nướng than hoa, cuốn bánh tráng và rau sống.', keyword: 'Nem nướng Thanh Hóa' }
    ],
    nightlife: [
      { name: 'Phố biển Sầm Sơn về đêm', desc: 'Đi dạo bãi biển, thưởng thức hải sản đêm ven bờ.', keyword: 'Sầm Sơn về đêm', tips: 'Chợ đêm Sầm Sơn gần đó cũng rất đáng ghé.' }
    ]
  },

  'Nghệ An': {
    breakfast: [
      { dish: 'Cháo lươn Nghệ An', desc: 'Cháo lươn cay nồng, đậm vị nghệ — món sáng đặc trưng xứ Nghệ.', keyword: 'Cháo lươn Nghệ An' },
      { dish: 'Bánh mướt', desc: 'Bánh cuốn kiểu Nghệ An, ăn kèm nước mắm hoặc súp lươn.', keyword: 'Bánh mướt Nghệ An' },
      { dish: 'Súp lươn', desc: 'Lươn xào nghệ sánh đặc, ăn kèm bánh mướt hoặc bánh mì.', keyword: 'Súp lươn Nghệ An' }
    ],
    morningVisit: [
      { name: 'Khu di tích Kim Liên (Làng Sen quê Bác)', desc: 'Quê hương Chủ tịch Hồ Chí Minh, không gian làng quê mộc mạc.', keyword: 'Khu di tích Kim Liên', tips: 'Nên tìm hiểu trước về tiểu sử Bác Hồ để chuyến đi ý nghĩa hơn.' },
      { name: 'Đền Cuông', desc: 'Đền thờ An Dương Vương gắn với truyền thuyết Mỵ Châu - Trọng Thuỷ.', keyword: 'Đền Cuông', tips: 'Ăn mặc lịch sự khi vào khu vực đền.' }
    ],
    lunch: [
      { dish: 'Cháo lươn Nghệ An', desc: 'Món trưa đặc sản trứ danh của vùng đất xứ Nghệ.', keyword: 'Cháo lươn Nghệ An trưa' },
      { dish: 'Lươn om chuối đậu', desc: 'Lươn om cùng chuối xanh, đậu phụ, nghệ tươi đậm đà.', keyword: 'Lươn om chuối đậu' },
      { dish: 'Bánh đa xúc hến', desc: 'Bánh đa giòn xúc hến xào, món ăn dân dã ven sông Lam.', keyword: 'Bánh đa xúc hến' }
    ],
    afternoonVisit: [
      { name: 'Biển Cửa Lò', desc: 'Bãi biển đẹp và sạch bậc nhất miền Trung phía Bắc.', keyword: 'Biển Cửa Lò', tips: 'Buổi chiều mát rất thích hợp để tắm biển.' },
      { name: 'Đảo Lan Châu', desc: 'Đảo nhỏ gắn liền với bãi biển Cửa Lò, view đẹp ra biển.', keyword: 'Đảo Lan Châu', tips: 'Có thể đi bộ ra đảo khi thuỷ triều xuống.' }
    ],
    dinner: [
      { dish: 'Hải sản Cửa Lò', desc: 'Hải sản tươi sống chế biến hấp, nướng ngay ven biển.', keyword: 'Hải sản Cửa Lò' },
      { dish: 'Cháo lươn tối', desc: 'Ăn tối nhẹ nhàng với tô cháo lươn nóng hổi quen thuộc.', keyword: 'Cháo lươn Nghệ An tối' },
      { dish: 'Bê thui Đô Lương', desc: 'Bê thui vàng da, chấm tương gừng đặc trưng xứ Nghệ.', keyword: 'Bê thui Đô Lương' }
    ],
    nightlife: [
      { name: 'Phố biển Cửa Lò về đêm', desc: 'Đi dạo bãi biển, ăn hải sản đêm cùng không khí biển mát mẻ.', keyword: 'Cửa Lò về đêm', tips: 'Cuối tuần mùa hè khu vực này khá đông khách du lịch.' }
    ]
  },

  'Hà Tĩnh': {
    breakfast: [
      { dish: 'Bánh mướt Hà Tĩnh', desc: 'Bánh cuốn mềm mỏng, ăn kèm nước mắm hoặc súp lươn.', keyword: 'Bánh mướt Hà Tĩnh' },
      { dish: 'Cháo canh Hà Tĩnh', desc: 'Cháo canh sợi bột lọc dai, nước dùng đậm đà.', keyword: 'Cháo canh Hà Tĩnh' },
      { dish: 'Kẹo cu đơ', desc: 'Kẹo lạc mật mía đặc sản, thường ăn kèm trà xanh buổi sáng.', keyword: 'Kẹo cu đơ Hà Tĩnh' }
    ],
    morningVisit: [
      { name: 'Khu di tích Nguyễn Du', desc: 'Khu lưu niệm Đại thi hào Nguyễn Du, tác giả Truyện Kiều.', keyword: 'Khu di tích Nguyễn Du', tips: 'Phù hợp cho ai yêu thích văn học, tìm hiểu về Truyện Kiều.' },
      { name: 'Chùa Hương Tích Hà Tĩnh', desc: 'Ngôi chùa cổ trên núi Hồng Lĩnh, còn gọi là "Hoan Châu đệ nhất danh lam".', keyword: 'Chùa Hương Tích Hà Tĩnh', tips: 'Có thể đi cáp treo lên chùa để đỡ mất sức leo núi.' }
    ],
    lunch: [
      { dish: 'Bún bò Đò Trai', desc: 'Bún bò kiểu Hà Tĩnh, nước dùng đậm đà đặc trưng.', keyword: 'Bún bò Đò Trai' },
      { dish: 'Mực nháy Vũng Áng', desc: 'Mực tươi vừa đánh bắt, hấp hoặc nướng giữ vị ngọt tự nhiên.', keyword: 'Mực nháy Vũng Áng' },
      { dish: 'Cháo lươn Hà Tĩnh', desc: 'Cháo lươn cay nồng, đậm vị nghệ tương tự vùng Nghệ - Tĩnh.', keyword: 'Cháo lươn Hà Tĩnh' }
    ],
    afternoonVisit: [
      { name: 'Biển Thiên Cầm', desc: 'Bãi biển đẹp với núi Thiên Cầm nhô ra biển.', keyword: 'Biển Thiên Cầm', tips: 'Buổi chiều mát rất thích hợp để tắm biển và ngắm hoàng hôn.' },
      { name: 'Ngã ba Đồng Lộc', desc: 'Di tích lịch sử tưởng niệm 10 nữ thanh niên xung phong.', keyword: 'Ngã ba Đồng Lộc', tips: 'Nên giữ thái độ trang nghiêm khi tham quan khu di tích.' }
    ],
    dinner: [
      { dish: 'Hải sản Thiên Cầm', desc: 'Hải sản tươi sống chế biến hấp, nướng ngay ven biển.', keyword: 'Hải sản Thiên Cầm' },
      { dish: 'Kẹo cu đơ', desc: 'Món tráng miệng đặc sản, ăn kèm trà nóng sau bữa tối.', keyword: 'Kẹo cu đơ' },
      { dish: 'Cháo canh', desc: 'Ăn tối nhẹ nhàng với tô cháo canh nóng hổi.', keyword: 'Cháo canh Hà Tĩnh tối' }
    ],
    nightlife: [
      { name: 'Phố biển Thiên Cầm về đêm', desc: 'Đi dạo bãi biển, thưởng thức hải sản đêm mát mẻ.', keyword: 'Thiên Cầm về đêm', tips: 'Mùa hè khu vực này khá đông khách du lịch.' }
    ]
  },

  /* -------------------- GIA LAI — quê hương HackAIthon, đầy đủ 6/6 -------------------- */

  'Pleiku, Gia Lai': {
    breakfast: [
      { dish: 'Phở khô Gia Lai (phở hai tô)', desc: 'Sợi phở khô trộn cùng thịt bằm, ăn kèm tô nước lèo riêng — đặc sản trứ danh của Pleiku.', keyword: 'Phở khô Gia Lai' },
      { dish: 'Bún cua thối', desc: 'Nước lèo lên men từ cua đồng, hương vị đậm và lạ — món ăn "thử thách" nổi tiếng của phố núi.', keyword: 'Bún cua thối Pleiku' },
      { dish: 'Bánh hỏi cháo lòng', desc: 'Bánh hỏi mềm ăn kèm cháo lòng nóng, phổ biến vào buổi sáng ở Pleiku.', keyword: 'Bánh hỏi cháo lòng Gia Lai' },
      { dish: 'Bún mắm nêm Pleiku', desc: 'Bún trộn mắm nêm đậm đà, ăn kèm thịt heo quay và rau sống.', keyword: 'Bún mắm nêm Pleiku' }
    ],
    morningVisit: [
      { name: 'Biển Hồ (Hồ T\'Nưng)', desc: 'Miệng núi lửa cổ đã ngưng hoạt động, mặt hồ xanh biếc được ví như "đôi mắt Pleiku".', keyword: 'Biển Hồ T\'Nưng Gia Lai', tips: 'Nên đi vào sáng sớm khi mặt hồ còn phẳng lặng và ít gió.' },
      { name: 'Chùa Minh Thành', desc: 'Ngôi chùa mang kiến trúc pha trộn phong cách Nhật Bản độc đáo giữa phố núi.', keyword: 'Chùa Minh Thành Gia Lai', tips: 'Ăn mặc lịch sự và giữ yên tĩnh khi tham quan trong khuôn viên chùa.' },
      { name: 'Quảng trường Đại Đoàn Kết', desc: 'Quảng trường trung tâm với tượng đài Bác Hồ lớn cùng cụm núi đá và cây Kơ nia.', keyword: 'Quảng trường Đại Đoàn Kết Gia Lai', tips: 'Không gian rất rộng, thích hợp đi bộ và chụp ảnh vào sáng sớm.' }
    ],
    lunch: [
      { dish: 'Phở khô Gia Lai', desc: 'Món trưa quen thuộc và nổi tiếng nhất của người Pleiku.', keyword: 'Phở khô Gia Lai trưa' },
      { dish: 'Cơm lam gà nướng', desc: 'Cơm nếp nướng ống tre ăn cùng gà nướng, đậm chất ẩm thực Tây Nguyên.', keyword: 'Cơm lam gà nướng Gia Lai' },
      { dish: 'Bún cua thối', desc: 'Ăn trưa cùng tô bún cua thối đặc trưng nếu muốn thử trọn vẹn hương vị phố núi.', keyword: 'Bún cua thối Pleiku trưa' },
      { dish: 'Gà nướng Bazan', desc: 'Gà thả vườn trên đất đỏ Bazan, nướng mật ong thơm lừng.', keyword: 'Gà nướng Bazan Gia Lai' }
    ],
    afternoonVisit: [
      { name: 'Núi Hàm Rồng', desc: 'Miệng núi lửa cổ, view toàn cảnh thành phố Pleiku và núi non Tây Nguyên từ trên cao.', keyword: 'Núi Hàm Rồng Gia Lai', tips: 'Thời điểm đẹp nhất để ngắm cảnh và chụp ảnh là lúc chiều muộn.' },
      { name: 'Nhà thờ gỗ Pleiku (Nhà thờ Thăng Thiên)', desc: 'Nhà thờ mang kiến trúc Pháp cổ, gần gũi với đời sống người dân bản địa.', keyword: 'Nhà thờ gỗ Pleiku', tips: 'Nên tránh giờ hành lễ nếu chỉ muốn tham quan chụp ảnh bên ngoài.' },
      { name: 'Công viên Diên Hồng', desc: 'Hồ nước và công viên xanh mát ngay giữa lòng thành phố.', keyword: 'Công viên Diên Hồng Gia Lai', tips: 'Thích hợp dạo bộ, nghỉ chân sau buổi sáng tham quan nhiều nơi.' }
    ],
    dinner: [
      { dish: 'Gà nướng Bazan mật ong', desc: 'Gà nướng mật ong rừng, thịt thơm ngọt đặc trưng vùng đất đỏ.', keyword: 'Gà nướng mật ong Gia Lai' },
      { dish: 'Bò một nắng muối kiến vàng', desc: 'Thịt bò một nắng nướng, chấm muối kiến vàng — đặc sản nổi danh của Gia Lai.', keyword: 'Bò một nắng muối kiến vàng' },
      { dish: 'Lẩu lá rừng', desc: 'Lẩu nấu từ nhiều loại lá rừng Tây Nguyên, vị thanh mát lạ miệng.', keyword: 'Lẩu lá rừng Gia Lai' },
      { dish: 'Heo quay Pleiku', desc: 'Heo quay da giòn, thường xuất hiện trong các bữa tối sum họp.', keyword: 'Heo quay Pleiku' }
    ],
    nightlife: [
      { name: 'Phố cà phê đường Anh Hùng Núp', desc: 'Khu quán cà phê sôi động về đêm, nơi giới trẻ Pleiku thường tụ họp.', keyword: 'Đường Anh Hùng Núp Pleiku', tips: 'Không khí phố núi về đêm khá se lạnh, nên mang thêm áo khoác nhẹ.' },
      { name: 'Chợ đêm Pleiku', desc: 'Khu chợ đêm nhỏ với các món nướng và đặc sản Tây Nguyên.', keyword: 'Chợ đêm Pleiku', tips: 'Thích hợp mua cà phê, tiêu, hạt điều Gia Lai làm quà.' }
    ]
  },

  'Thị xã An Khê, Gia Lai': {
    breakfast: [
      { dish: 'Bánh xèo An Khê', desc: 'Bánh xèo nhỏ giòn, nhân tôm thịt giá đỗ, ăn kèm rau vườn.', keyword: 'Bánh xèo An Khê' },
      { dish: 'Bún tôm An Khê', desc: 'Bún nước dùng ngọt từ tôm, món sáng dân dã quen thuộc.', keyword: 'Bún tôm An Khê' },
      { dish: 'Bánh canh chả cá', desc: 'Bánh canh bột gạo, chả cá chiên vàng, nước dùng đậm đà.', keyword: 'Bánh canh chả cá An Khê' }
    ],
    morningVisit: [
      { name: 'Khu di tích Tây Sơn Thượng Đạo', desc: 'Quần thể di tích gắn với buổi đầu dựng nghiệp của nhà Tây Sơn.', keyword: 'Tây Sơn Thượng Đạo An Khê', tips: 'Tìm hiểu trước về lịch sử khởi nghĩa Tây Sơn để chuyến đi ý nghĩa hơn.' },
      { name: 'An Khê Trường - An Khê Đình', desc: 'Di tích cổ gắn liền với nghĩa quân Tây Sơn thuở ban đầu.', keyword: 'An Khê Đình', tips: 'Không gian yên tĩnh, phù hợp tham quan chậm rãi.' }
    ],
    lunch: [
      { dish: 'Gà nướng An Khê', desc: 'Gà thả vườn nướng than hoa, chấm muối ớt xanh.', keyword: 'Gà nướng An Khê' },
      { dish: 'Cơm lam An Khê', desc: 'Cơm nếp nướng ống tre, món trưa đậm chất Tây Nguyên.', keyword: 'Cơm lam An Khê' },
      { dish: 'Bò một nắng muối kiến vàng', desc: 'Đặc sản chung của vùng đất Gia Lai, phổ biến cả ở An Khê.', keyword: 'Bò một nắng An Khê' }
    ],
    afternoonVisit: [
      { name: 'Cánh đồng Cô Hầu', desc: 'Thung lũng đồng cỏ xanh mướt, cảnh sắc yên bình giữa núi rừng.', keyword: 'Cánh đồng Cô Hầu', tips: 'Buổi chiều ánh nắng dịu là thời điểm đẹp để chụp ảnh.' },
      { name: 'Miếu An Khê', desc: 'Miếu cổ mang dấu ấn lịch sử của vùng đất cửa ngõ Gia Lai.', keyword: 'Miếu An Khê', tips: 'Ăn mặc lịch sự khi tham quan khu vực miếu.' }
    ],
    dinner: [
      { dish: 'Heo quay An Khê', desc: 'Heo quay da giòn, thường có trong các bữa tối sum họp.', keyword: 'Heo quay An Khê' },
      { dish: 'Lẩu gà lá giang', desc: 'Lẩu gà chua nhẹ với lá giang, thích hợp cho bữa tối đông người.', keyword: 'Lẩu gà lá giang An Khê' },
      { dish: 'Gà nướng muối ớt', desc: 'Gà nướng cay nhẹ, đậm vị núi rừng Tây Nguyên.', keyword: 'Gà nướng muối ớt An Khê' }
    ],
    nightlife: [
      { name: 'Quán cà phê trung tâm thị xã An Khê', desc: 'Không gian cà phê nhẹ nhàng, thích hợp nghỉ ngơi sau một ngày tham quan.', keyword: 'An Khê về đêm', tips: 'Thị xã khá yên tĩnh về đêm, phù hợp cho ai thích nghỉ ngơi sớm.' }
    ]
  },

  'Huyện Chư Sê, Gia Lai': {
    breakfast: [
      { dish: 'Bánh canh Chư Sê', desc: 'Bánh canh bột gạo nước dùng đậm đà, món sáng phổ biến vùng cao nguyên.', keyword: 'Bánh canh Chư Sê' },
      { dish: 'Bún riêu Chư Sê', desc: 'Bún riêu cua đồng chua thanh, ăn kèm rau sống.', keyword: 'Bún riêu Chư Sê' },
      { dish: 'Cà phê phin Chư Sê', desc: 'Cà phê nguyên chất từ vùng đất trồng cà phê và hồ tiêu nổi tiếng.', keyword: 'Cà phê Chư Sê' }
    ],
    morningVisit: [
      { name: 'Thác Phú Cường', desc: 'Thác nước đẹp gần trung tâm huyện, dòng nước đổ từ độ cao lớn.', keyword: 'Thác Phú Cường Gia Lai', tips: 'Đường xuống thác khá trơn, nên đi giày bám tốt.' },
      { name: 'Vườn hồ tiêu Chư Sê', desc: 'Tham quan những vườn tiêu bạt ngàn, đặc sản nổi tiếng của vùng đất này.', keyword: 'Vườn hồ tiêu Chư Sê', tips: 'Có thể mua tiêu Chư Sê chính gốc làm quà.' }
    ],
    lunch: [
      { dish: 'Gà nướng Chư Sê', desc: 'Gà thả vườn nướng than hoa, ăn kèm cơm lam.', keyword: 'Gà nướng Chư Sê' },
      { dish: 'Cơm lam Chư Sê', desc: 'Cơm nếp nướng ống tre, món trưa đậm chất Tây Nguyên.', keyword: 'Cơm lam Chư Sê' },
      { dish: 'Canh thụt lá bép', desc: 'Món canh đặc trưng Tây Nguyên nấu từ lá bép và cá suối.', keyword: 'Canh thụt lá bép' }
    ],
    afternoonVisit: [
      { name: 'Đồi chè, tiêu Chư Sê', desc: 'Ngắm cảnh đồi nương bạt ngàn của thủ phủ hồ tiêu Tây Nguyên.', keyword: 'Đồi tiêu Chư Sê', tips: 'Buổi chiều nắng dịu là thời điểm đẹp để chụp ảnh nông trại.' },
      { name: 'Thác Phú Cường (buổi chiều)', desc: 'Quay lại ngắm thác vào khung giờ chiều mát, ít nắng gắt hơn.', keyword: 'Thác Phú Cường chiều', tips: 'Có thể kết hợp cắm trại nhẹ ven khu vực thác.' }
    ],
    dinner: [
      { dish: 'Gà nướng muối ớt', desc: 'Gà nướng cay nhẹ, đậm vị núi rừng Tây Nguyên.', keyword: 'Gà nướng muối ớt Chư Sê' },
      { dish: 'Lẩu lá giang', desc: 'Lẩu chua nhẹ với lá giang, thích hợp cho bữa tối đông người.', keyword: 'Lẩu lá giang Chư Sê' },
      { dish: 'Heo rẫy nướng', desc: 'Heo bản địa nướng than hoa, thịt săn ít mỡ.', keyword: 'Heo rẫy nướng Chư Sê' }
    ],
    nightlife: [
      { name: 'Quán cà phê trung tâm huyện Chư Sê', desc: 'Không gian nghỉ ngơi nhẹ nhàng sau một ngày tham quan nông trại.', keyword: 'Chư Sê về đêm', tips: 'Khu vực khá yên tĩnh, phù hợp thư giãn sớm.' }
    ]
  },

  'Quy Nhơn, Gia Lai': {
    breakfast: [
      { dish: 'Bánh xèo tôm nhảy Quy Nhơn', desc: 'Bánh xèo nhân tôm còn tươi nhảy trên chảo, giòn rụm đặc trưng Quy Nhơn.', keyword: 'Bánh xèo tôm nhảy Quy Nhơn' },
      { dish: 'Bún chả cá Quy Nhơn', desc: 'Bún nước dùng ngọt thanh từ cá biển, chả cá chiên vàng thơm.', keyword: 'Bún chả cá Quy Nhơn' },
      { dish: 'Bánh hỏi lòng heo', desc: 'Bánh hỏi mềm ăn kèm lòng heo và rau sống, món sáng quen thuộc.', keyword: 'Bánh hỏi lòng heo Quy Nhơn' },
      { dish: 'Bánh căn Quy Nhơn', desc: 'Bánh căn nhỏ đổ khuôn, ăn kèm mắm nêm hoặc nước mắm chua ngọt.', keyword: 'Bánh căn Quy Nhơn' }
    ],
    morningVisit: [
      { name: 'Kỳ Co', desc: 'Bãi biển hoang sơ với nước trong xanh như "Maldives thu nhỏ" của Việt Nam.', keyword: 'Kỳ Co Quy Nhơn', tips: 'Nên đi ca nô từ sớm để tránh sóng lớn và nắng gắt buổi trưa.' },
      { name: 'Eo Gió', desc: 'Mỏm đá nhô ra biển với cảnh quan hùng vĩ, view toàn cảnh vịnh.', keyword: 'Eo Gió Quy Nhơn', tips: 'Đi giày đế bằng vì đường đá khá gồ ghề.' },
      { name: 'Ghềnh Ráng Tiên Sa', desc: 'Khu danh thắng có bãi đá Trứng và mộ thi sĩ Hàn Mặc Tử.', keyword: 'Ghềnh Ráng Tiên Sa', tips: 'Kết hợp viếng mộ Hàn Mặc Tử nếu yêu thích thơ ca.' }
    ],
    lunch: [
      { dish: 'Bún chả cá Quy Nhơn', desc: 'Món trưa đặc sản nổi tiếng nhất của thành phố biển.', keyword: 'Bún chả cá Quy Nhơn trưa' },
      { dish: 'Bánh hỏi cháo lòng', desc: 'Bánh hỏi mềm ăn kèm cháo lòng, đặc sản vùng Bình Định.', keyword: 'Bánh hỏi cháo lòng Quy Nhơn' },
      { dish: 'Nem chợ huyện', desc: 'Nem chua đặc sản nổi tiếng của vùng đất Bình Định.', keyword: 'Nem chợ huyện' },
      { dish: 'Bún rạm', desc: 'Bún nấu từ rạm đồng giã nhuyễn, vị ngọt đậm đà.', keyword: 'Bún rạm Quy Nhơn' }
    ],
    afternoonVisit: [
      { name: 'Tháp Đôi', desc: 'Di tích tháp Chăm cổ ngay giữa lòng thành phố Quy Nhơn.', keyword: 'Tháp Đôi Quy Nhơn', tips: 'Tham quan vào buổi chiều để tránh nắng gắt buổi trưa.' },
      { name: 'Bãi biển Quy Nhơn (đường Xuân Diệu)', desc: 'Bãi biển ngay trung tâm thành phố, thích hợp dạo bộ ngắm biển.', keyword: 'Đường Xuân Diệu Quy Nhơn', tips: 'Buổi chiều mát là thời điểm lý tưởng để tắm biển.' },
      { name: 'Cù Lao Xanh', desc: 'Hòn đảo nhỏ hoang sơ ngoài khơi Quy Nhơn (nếu còn thời gian trong ngày).', keyword: 'Cù Lao Xanh Quy Nhơn', tips: 'Cần đi tàu, nên hỏi trước lịch trình và thời gian di chuyển.' }
    ],
    dinner: [
      { dish: 'Hải sản tươi Quy Nhơn', desc: 'Ghẹ, mực, tôm hùm chế biến hấp, nướng ngay tại các quán ven biển.', keyword: 'Hải sản Quy Nhơn' },
      { dish: 'Bánh xèo tôm nhảy', desc: 'Ăn tối cùng bánh xèo giòn nóng, cuốn rau sống chấm mắm nêm.', keyword: 'Bánh xèo tôm nhảy Quy Nhơn tối' },
      { dish: 'Bún cá Quy Nhơn', desc: 'Bún cá biển tươi, nước dùng ngọt thanh cho bữa tối nhẹ nhàng.', keyword: 'Bún cá Quy Nhơn' }
    ],
    nightlife: [
      { name: 'Phố đi bộ Xuân Diệu ven biển', desc: 'Dạo bộ ven biển về đêm, nhiều quán cà phê và hải sản.', keyword: 'Phố đi bộ Xuân Diệu', tips: 'Gió biển về đêm khá mạnh, nên mang thêm áo khoác nhẹ.' },
      { name: 'Chợ đêm Quy Nhơn', desc: 'Khu chợ đêm với ẩm thực đường phố và đặc sản địa phương.', keyword: 'Chợ đêm Quy Nhơn', tips: 'Thích hợp mua nem chợ huyện, bánh tráng làm quà.' }
    ]
  },

  'Thị xã An Nhơn, Gia Lai': {
    breakfast: [
      { dish: 'Bánh hỏi cháo lòng An Nhơn', desc: 'Đặc sản nổi tiếng nhất An Nhơn: bánh hỏi mềm ăn cùng cháo lòng nóng.', keyword: 'Bánh hỏi cháo lòng An Nhơn' },
      { dish: 'Bún song thằn', desc: 'Bún làm từ đậu xanh nguyên chất của làng An Thái, sợi dai đặc biệt.', keyword: 'Bún song thằn An Nhơn' },
      { dish: 'Nem chua An Nhơn', desc: 'Nem chua lên men tự nhiên, món ăn sáng nhẹ quen thuộc.', keyword: 'Nem chua An Nhơn' }
    ],
    morningVisit: [
      { name: 'Tháp Cánh Tiên', desc: 'Di tích tháp Chăm cổ từng là kinh đô Vijaya của vương quốc Chăm Pa.', keyword: 'Tháp Cánh Tiên', tips: 'Nên tìm hiểu trước lịch sử Chăm Pa để chuyến tham quan ý nghĩa hơn.' },
      { name: 'Làng nghề rèn Tây Phương Danh', desc: 'Làng rèn truyền thống lâu đời nổi tiếng của đất An Nhơn.', keyword: 'Làng rèn Tây Phương Danh', tips: 'Có thể xem trực tiếp quy trình rèn thủ công.' }
    ],
    lunch: [
      { dish: 'Bánh hỏi cháo lòng', desc: 'Món trưa đặc sản không thể bỏ lỡ khi ghé An Nhơn.', keyword: 'Bánh hỏi cháo lòng An Nhơn trưa' },
      { dish: 'Bún song thằn làng An Thái', desc: 'Bún đậu xanh nấu cùng tôm, thịt, nước dùng thanh ngọt.', keyword: 'Bún song thằn An Thái' },
      { dish: 'Nem chua rán', desc: 'Nem chua chiên giòn, món ăn vặt kèm bữa trưa lạ miệng.', keyword: 'Nem chua rán An Nhơn' }
    ],
    afternoonVisit: [
      { name: 'Chùa Thập Tháp', desc: 'Một trong những ngôi chùa cổ nhất Bình Định, kiến trúc uy nghiêm.', keyword: 'Chùa Thập Tháp', tips: 'Ăn mặc lịch sự và giữ yên tĩnh khi tham quan trong chùa.' },
      { name: 'Làng gốm Vân Sơn', desc: 'Làng nghề gốm truyền thống gắn với lịch sử lâu đời của An Nhơn.', keyword: 'Làng gốm Vân Sơn', tips: 'Có thể mua sản phẩm gốm thủ công làm quà lưu niệm.' }
    ],
    dinner: [
      { dish: 'Bánh hỏi cháo lòng (buổi tối)', desc: 'Món ăn quen thuộc của người An Nhơn vào cả buổi sáng lẫn tối.', keyword: 'Bánh hỏi cháo lòng tối' },
      { dish: 'Gà nướng An Nhơn', desc: 'Gà thả vườn nướng than hoa, chấm muối ớt.', keyword: 'Gà nướng An Nhơn' },
      { dish: 'Rượu Bàu Đá', desc: 'Rượu gạo trứ danh của vùng đất Bình Định, thường dùng trong bữa tối.', keyword: 'Rượu Bàu Đá' }
    ],
    nightlife: [
      { name: 'Quán cà phê trung tâm thị xã An Nhơn', desc: 'Không gian nhẹ nhàng để nghỉ ngơi sau một ngày tham quan di tích.', keyword: 'An Nhơn về đêm', tips: 'Khu vực khá yên tĩnh, phù hợp thư giãn sớm.' }
    ]
  },

  'Huyện Tây Sơn, Gia Lai': {
    breakfast: [
      { dish: 'Bún song thằn', desc: 'Bún đậu xanh nguyên chất, sợi dai đặc trưng vùng đất võ.', keyword: 'Bún song thằn Tây Sơn' },
      { dish: 'Bánh ít lá gai', desc: 'Bánh nếp lá gai nhân đậu xanh dừa, đặc sản gắn với đất Tây Sơn.', keyword: 'Bánh ít lá gai' },
      { dish: 'Bánh hỏi Tây Sơn', desc: 'Bánh hỏi mềm ăn kèm rau sống và nước mắm, món sáng quen thuộc.', keyword: 'Bánh hỏi Tây Sơn' }
    ],
    morningVisit: [
      { name: 'Bảo tàng Quang Trung', desc: 'Khu di tích Tây Sơn Tam Kiệt, nơi lưu giữ hiện vật về ba anh em Tây Sơn.', keyword: 'Bảo tàng Quang Trung Tây Sơn', tips: 'Có biểu diễn võ Tây Sơn và trống trận theo khung giờ, nên hỏi lịch trước.' },
      { name: 'Đền thờ Tây Sơn Tam Kiệt', desc: 'Đền thờ ba anh em nhà Tây Sơn: Nguyễn Nhạc, Nguyễn Huệ, Nguyễn Lữ.', keyword: 'Đền thờ Tây Sơn Tam Kiệt', tips: 'Nên tìm hiểu trước lịch sử phong trào Tây Sơn để chuyến đi ý nghĩa hơn.' }
    ],
    lunch: [
      { dish: 'Nem chợ huyện', desc: 'Nem chua đặc sản nổi tiếng của vùng đất Tây Sơn - Bình Định.', keyword: 'Nem chợ huyện Tây Sơn' },
      { dish: 'Bánh ít lá gai', desc: 'Ăn kèm bữa trưa như món tráng miệng dân dã.', keyword: 'Bánh ít lá gai Tây Sơn' },
      { dish: 'Cơm gà Tây Sơn', desc: 'Cơm gà xé phay đơn giản, đậm đà hương vị miền Trung.', keyword: 'Cơm gà Tây Sơn' }
    ],
    afternoonVisit: [
      { name: 'Tháp Dương Long', desc: 'Cụm ba tháp Chăm cổ cao nhất Việt Nam, kiến trúc điêu khắc tinh xảo.', keyword: 'Tháp Dương Long', tips: 'Nên đi vào buổi chiều để tránh nắng gắt khi tham quan ngoài trời.' },
      { name: 'Suối khoáng nóng Hội Vân', desc: 'Suối khoáng nóng tự nhiên, thích hợp nghỉ dưỡng thư giãn.', keyword: 'Suối khoáng nóng Hội Vân', tips: 'Nên mang theo đồ bơi nếu muốn ngâm khoáng.' }
    ],
    dinner: [
      { dish: 'Gà nướng Tây Sơn', desc: 'Gà thả vườn nướng than hoa, thịt chắc thơm.', keyword: 'Gà nướng Tây Sơn' },
      { dish: 'Rượu Bàu Đá Cù Lâm', desc: 'Rượu gạo nổi tiếng vùng Tây Sơn, thường dùng đãi khách.', keyword: 'Rượu Bàu Đá Cù Lâm' },
      { dish: 'Bánh ít lá gai tráng miệng', desc: 'Kết thúc bữa tối bằng món bánh ngọt dẻo đặc trưng.', keyword: 'Bánh ít lá gai tráng miệng' }
    ],
    nightlife: [
      { name: 'Quán cà phê trung tâm huyện Tây Sơn', desc: 'Không gian yên tĩnh để nghỉ ngơi sau một ngày tham quan di tích lịch sử.', keyword: 'Tây Sơn về đêm', tips: 'Khu vực khá yên tĩnh về đêm, phù hợp nghỉ ngơi sớm.' }
    ]
  },

  /* -------------------- MIỀN BẮC & BẮC TRUNG BỘ — điểm đến nổi bật -------------------- */

  'Huyện Đồng Văn, Tuyên Quang': {
    breakfast: [
      { dish: 'Thắng cố', desc: 'Món hầm truyền thống của người Mông vùng cao nguyên đá.', keyword: 'Thắng cố Đồng Văn' },
      { dish: 'Bánh cuốn trứng Đồng Văn', desc: 'Bánh cuốn nóng ăn kèm nước dùng xương hầm.', keyword: 'Bánh cuốn trứng Đồng Văn' }
    ],
    morningVisit: [
      { name: 'Phố cổ Đồng Văn', desc: 'Khu phố cổ với những ngôi nhà trình tường mang đậm bản sắc cao nguyên đá.', keyword: 'Phố cổ Đồng Văn', tips: 'Buổi tối cuối tuần phố cổ có phiên chợ đêm nhỏ rất đáng ghé.' },
      { name: 'Cột cờ Lũng Cú', desc: 'Điểm cực Bắc biểu tượng của Tổ quốc, view toàn cảnh cao nguyên đá.', keyword: 'Cột cờ Lũng Cú', tips: 'Cần leo khá nhiều bậc thang lên đỉnh cột cờ.' }
    ],
    lunch: [
      { dish: 'Cháo ấu tẩu Đồng Văn', desc: 'Cháo củ ấu tẩu và chân giò, món đặc trưng vùng núi đá.', keyword: 'Cháo ấu tẩu Đồng Văn' },
      { dish: 'Thịt trâu gác bếp', desc: 'Thịt trâu hun khói, chấm tương ớt hoặc chẩm chéo.', keyword: 'Thịt trâu gác bếp Đồng Văn' }
    ],
    afternoonVisit: [
      { name: 'Cao nguyên đá Đồng Văn', desc: 'Công viên địa chất toàn cầu với cảnh quan đá tai mèo hùng vĩ.', keyword: 'Cao nguyên đá Đồng Văn', tips: 'Đường đi nhiều đèo dốc, nên cẩn thận nếu tự lái xe máy.' },
      { name: 'Dinh thự họ Vương', desc: 'Dinh thự cổ của "vua Mèo" mang kiến trúc độc đáo.', keyword: 'Dinh thự họ Vương', tips: 'Nên tìm hiểu trước lịch sử dòng họ Vương để chuyến tham quan ý nghĩa hơn.' }
    ],
    dinner: [
      { dish: 'Lợn cắp nách nướng', desc: 'Thịt lợn bản nướng than, thịt chắc ít mỡ.', keyword: 'Lợn cắp nách Đồng Văn' },
      { dish: 'Rượu ngô Đồng Văn', desc: 'Rượu ngô truyền thống của người Mông vùng cao nguyên đá.', keyword: 'Rượu ngô Đồng Văn' }
    ],
    nightlife: [
      { name: 'Chợ đêm phố cổ Đồng Văn', desc: 'Phiên chợ đêm cuối tuần với ẩm thực và văn hoá vùng cao.', keyword: 'Chợ đêm Đồng Văn', tips: 'Chỉ họp vào tối thứ Bảy hằng tuần.' }
    ]
  },

  'Huyện Mèo Vạc, Tuyên Quang': {
    breakfast: [
      { dish: 'Mèn mén', desc: 'Món ăn từ bột ngô hấp, lương thực truyền thống của người Mông.', keyword: 'Mèn mén Mèo Vạc' },
      { dish: 'Bánh tam giác mạch', desc: 'Bánh làm từ hạt tam giác mạch, đặc sản mùa hoa nở.', keyword: 'Bánh tam giác mạch' }
    ],
    morningVisit: [
      { name: 'Đèo Mã Pí Lèng', desc: 'Một trong "tứ đại đỉnh đèo" hiểm trở và hùng vĩ nhất Việt Nam.', keyword: 'Đèo Mã Pí Lèng', tips: 'Nên đi vào ngày trời quang, tầm nhìn tốt để ngắm trọn vẻ đẹp đèo.' },
      { name: 'Hẻm Tu Sản', desc: 'Hẻm vực sâu nhất Đông Nam Á bên dòng sông Nho Quế.', keyword: 'Hẻm Tu Sản', tips: 'Có thể đi thuyền dưới sông Nho Quế để ngắm hẻm vực từ dưới lên.' }
    ],
    lunch: [
      { dish: 'Thắng cố Mèo Vạc', desc: 'Món hầm truyền thống thường ăn cùng rượu ngô trong phiên chợ.', keyword: 'Thắng cố Mèo Vạc' },
      { dish: 'Cơm lam Mèo Vạc', desc: 'Cơm nếp nướng ống tre, món trưa dân dã vùng cao.', keyword: 'Cơm lam Mèo Vạc' }
    ],
    afternoonVisit: [
      { name: 'Sông Nho Quế', desc: 'Dòng sông xanh ngọc uốn lượn dưới chân đèo Mã Pí Lèng.', keyword: 'Sông Nho Quế', tips: 'Trải nghiệm đi thuyền máy dọc sông rất được yêu thích.' },
      { name: 'Chợ phiên Mèo Vạc', desc: 'Phiên chợ vùng cao đầy màu sắc văn hoá các dân tộc.', keyword: 'Chợ phiên Mèo Vạc', tips: 'Chợ thường họp vào Chủ Nhật hằng tuần, nên hỏi trước lịch.' }
    ],
    dinner: [
      { dish: 'Thịt lợn bản nướng', desc: 'Thịt lợn bản ướp mắc khén, nướng than hoa thơm lừng.', keyword: 'Thịt lợn bản nướng Mèo Vạc' },
      { dish: 'Rượu ngô Mèo Vạc', desc: 'Rượu ngô truyền thống của người vùng cao nguyên đá.', keyword: 'Rượu ngô Mèo Vạc' }
    ],
    nightlife: [
      { name: 'Thị trấn Mèo Vạc về đêm', desc: 'Không gian nhỏ, yên bình giữa núi đá, phù hợp nghỉ ngơi sớm.', keyword: 'Mèo Vạc về đêm', tips: 'Trời về đêm khá lạnh, nên mang áo ấm.' }
    ]
  },

  'Thị xã Sa Pa, Lào Cai': {
    breakfast: [
      { dish: 'Bánh cuốn Sa Pa', desc: 'Bánh cuốn tráng tay, ăn kèm nước dùng xương thay vì chấm.', keyword: 'Bánh cuốn Sa Pa' },
      { dish: 'Xôi bảy màu', desc: 'Xôi nếp nhuộm bảy sắc tự nhiên của người Tày, Nùng.', keyword: 'Xôi bảy màu Sa Pa' },
      { dish: 'Thắng cố Sa Pa', desc: 'Món hầm truyền thống thường xuất hiện trong phiên chợ vùng cao.', keyword: 'Thắng cố Sa Pa' }
    ],
    morningVisit: [
      { name: 'Đỉnh Fansipan', desc: '"Nóc nhà Đông Dương", có thể lên đỉnh bằng cáp treo.', keyword: 'Đỉnh Fansipan', tips: 'Trên đỉnh khá lạnh quanh năm, nên mang áo ấm dù đi mùa hè.' },
      { name: 'Bản Cát Cát', desc: 'Bản du lịch cộng đồng người Mông với ruộng bậc thang và thác nước.', keyword: 'Bản Cát Cát', tips: 'Đường xuống bản khá dốc, nên đi giày thể thao.' }
    ],
    lunch: [
      { dish: 'Cá hồi Sa Pa', desc: 'Cá hồi nuôi nước lạnh, chế biến gỏi, nướng hoặc lẩu.', keyword: 'Cá hồi Sa Pa' },
      { dish: 'Lợn cắp nách', desc: 'Thịt lợn bản nhỏ nướng hoặc hấp, thịt chắc ít mỡ.', keyword: 'Lợn cắp nách Sa Pa' },
      { dish: 'Cơm lam Sa Pa', desc: 'Cơm nếp nướng ống tre, món trưa đậm chất vùng cao.', keyword: 'Cơm lam Sa Pa' }
    ],
    afternoonVisit: [
      { name: 'Nhà thờ đá Sa Pa', desc: 'Công trình kiến trúc Pháp cổ giữa trung tâm thị xã.', keyword: 'Nhà thờ đá Sa Pa', tips: 'Khu vực quảng trường xung quanh rất thích hợp dạo bộ.' },
      { name: 'Thung lũng Mường Hoa', desc: 'Thung lũng ruộng bậc thang trải dài giữa núi non Sa Pa.', keyword: 'Thung lũng Mường Hoa', tips: 'Mùa lúa chín (tháng 9-10) là thời điểm đẹp nhất.' }
    ],
    dinner: [
      { dish: 'Lẩu cá tầm Sa Pa', desc: 'Lẩu cá tầm nuôi vùng cao, nước dùng chua cay đậm đà.', keyword: 'Lẩu cá tầm Sa Pa tối' },
      { dish: 'Thịt lợn bản nướng', desc: 'Thịt lợn bản ướp mắc khén, nướng than hoa thơm lừng.', keyword: 'Thịt lợn bản nướng Sa Pa' },
      { dish: 'Rau cải mèo xào', desc: 'Rau cải mèo vùng cao xào tỏi, vị đắng nhẹ đặc trưng.', keyword: 'Rau cải mèo Sa Pa' }
    ],
    nightlife: [
      { name: 'Chợ đêm Sa Pa', desc: 'Chợ đêm với đồ nướng, thổ cẩm và các món ăn vùng cao.', keyword: 'Chợ đêm Sa Pa', tips: 'Trời Sa Pa về đêm rất lạnh, cần mang áo ấm dày.' }
    ]
  },

  'Huyện Mù Cang Chải, Lào Cai': {
    breakfast: [
      { dish: 'Xôi ngũ sắc Mù Cang Chải', desc: 'Xôi nếp nhuộm màu tự nhiên, món sáng của người Mông, Thái.', keyword: 'Xôi ngũ sắc Mù Cang Chải' },
      { dish: 'Bánh chưng đen', desc: 'Bánh chưng nhuộm đen từ tro cây núc nác, đặc sản vùng cao.', keyword: 'Bánh chưng đen Mù Cang Chải' }
    ],
    morningVisit: [
      { name: 'Ruộng bậc thang Mù Cang Chải', desc: 'Danh thắng quốc gia với những thửa ruộng bậc thang trải dài kỳ vĩ.', keyword: 'Ruộng bậc thang Mù Cang Chải', tips: 'Mùa lúa chín (tháng 9-10) hoặc mùa nước đổ (tháng 5-6) là đẹp nhất.' },
      { name: 'Đèo Khau Phạ', desc: 'Một trong "tứ đại đỉnh đèo" nổi tiếng, thường có mây phủ.', keyword: 'Đèo Khau Phạ', tips: 'Nên đi sớm để có cơ hội ngắm biển mây trên đèo.' }
    ],
    lunch: [
      { dish: 'Cá suối nướng', desc: 'Cá bắt từ suối vùng cao, nướng than kèm gia vị núi rừng.', keyword: 'Cá suối nướng Mù Cang Chải' },
      { dish: 'Cơm lam Mù Cang Chải', desc: 'Cơm nếp nướng ống tre, món trưa đậm chất Tây Bắc.', keyword: 'Cơm lam Mù Cang Chải' }
    ],
    afternoonVisit: [
      { name: 'Bản Lìm Mông', desc: 'Bản làng người Mông giữa những thửa ruộng bậc thang đẹp như tranh.', keyword: 'Bản Lìm Mông', tips: 'Có thể đi bộ xuyên qua các thửa ruộng để cảm nhận trọn vẹn cảnh sắc.' },
      { name: 'Thác Mơ Mù Cang Chải', desc: 'Thác nước đẹp ẩn giữa núi rừng Tây Bắc.', keyword: 'Thác Mơ Mù Cang Chải', tips: 'Đường vào thác khá xa, nên chủ động thời gian di chuyển.' }
    ],
    dinner: [
      { dish: 'Lợn bản nướng', desc: 'Thịt lợn bản nướng than hoa, thịt săn ít mỡ.', keyword: 'Lợn bản nướng Mù Cang Chải' },
      { dish: 'Rượu thóc Mù Cang Chải', desc: 'Rượu nếp truyền thống của người dân vùng cao.', keyword: 'Rượu thóc Mù Cang Chải' }
    ],
    nightlife: [
      { name: 'Thị trấn Mù Cang Chải về đêm', desc: 'Không gian nhỏ, yên tĩnh giữa núi rừng, phù hợp nghỉ ngơi sớm.', keyword: 'Mù Cang Chải về đêm', tips: 'Trời về đêm khá lạnh, nên mang áo ấm.' }
    ]
  },

  'Huyện Cát Hải, Hải Phòng': {
    breakfast: [
      { dish: 'Bánh mì cay Cát Bà', desc: 'Bánh mì que nhỏ chấm tương ớt, món sáng nhanh gọn trước khi ra đảo.', keyword: 'Bánh mì cay Cát Bà' },
      { dish: 'Bún tôm Cát Bà', desc: 'Bún nước dùng ngọt từ tôm biển tươi.', keyword: 'Bún tôm Cát Bà' }
    ],
    morningVisit: [
      { name: 'Vịnh Lan Hạ', desc: 'Vịnh biển với nước trong xanh và các đảo đá vôi kỳ vĩ, tương tự Hạ Long.', keyword: 'Vịnh Lan Hạ', tips: 'Nên đi tàu tham quan từ sớm để tránh nắng gắt.' },
      { name: 'Vườn quốc gia Cát Bà', desc: 'Khu bảo tồn thiên nhiên với hệ sinh thái rừng nhiệt đới trên đảo.', keyword: 'Vườn quốc gia Cát Bà', tips: 'Có các cung đường trekking phù hợp nhiều trình độ khác nhau.' }
    ],
    lunch: [
      { dish: 'Tu hài Cát Bà', desc: 'Hải sản đặc trưng của vùng biển Cát Bà, hấp hoặc nướng mỡ hành.', keyword: 'Tu hài Cát Bà' },
      { dish: 'Nem cua bể Hải Phòng', desc: 'Nem rán nhân cua bể, tôm, thịt — vỏ giòn rụm.', keyword: 'Nem cua bể Cát Bà' }
    ],
    afternoonVisit: [
      { name: 'Bãi tắm Cát Cò', desc: 'Cụm ba bãi biển đẹp gần trung tâm thị trấn Cát Bà.', keyword: 'Bãi tắm Cát Cò', tips: 'Buổi chiều mát rất thích hợp để tắm biển.' },
      { name: 'Pháo đài Thần Công', desc: 'Di tích quân sự cũ trên đồi cao, view toàn cảnh đảo Cát Bà.', keyword: 'Pháo đài Thần Công Cát Bà', tips: 'Thích hợp ngắm hoàng hôn từ trên cao.' }
    ],
    dinner: [
      { dish: 'Hải sản Cát Bà', desc: 'Tu hài, ghẹ, ốc biển tươi sống chế biến đa dạng.', keyword: 'Hải sản Cát Bà' },
      { dish: 'Sam biển Cát Bà', desc: 'Sam chế biến gỏi hoặc nướng, món đặc sản lạ miệng.', keyword: 'Sam biển Cát Bà' }
    ],
    nightlife: [
      { name: 'Chợ đêm Cát Bà', desc: 'Khu chợ đêm ven biển với hải sản và ẩm thực đường phố.', keyword: 'Chợ đêm Cát Bà', tips: 'Nên hỏi giá trước khi gọi món hải sản theo cân.' }
    ]
  },

  'Ninh Bình, Ninh Bình': {
    breakfast: [
      { dish: 'Cơm cháy Ninh Bình', desc: 'Cơm cháy giòn rụm, chấm cùng nước sốt tim cật hoặc dê.', keyword: 'Cơm cháy Ninh Bình thành phố' },
      { dish: 'Bún mọc Ninh Bình', desc: 'Bún mọc nước dùng ninh xương thanh ngọt.', keyword: 'Bún mọc Ninh Bình thành phố' }
    ],
    morningVisit: [
      { name: 'Tràng An', desc: 'Quần thể danh thắng sông nước, hang động nổi tiếng, đi thuyền len lỏi qua các hang.', keyword: 'Tràng An Ninh Bình thành phố', tips: 'Nên đi từ sớm để tránh nắng và đông người khi chèo thuyền.' },
      { name: 'Cố đô Hoa Lư', desc: 'Kinh đô đầu tiên của nhà nước phong kiến trung ương tập quyền Việt Nam.', keyword: 'Cố đô Hoa Lư', tips: 'Kết hợp tham quan đền vua Đinh, vua Lê gần đó.' }
    ],
    lunch: [
      { dish: 'Thịt dê núi Ninh Bình', desc: 'Dê núi thả tự nhiên, chế biến tái chanh, nướng hoặc hấp.', keyword: 'Thịt dê núi Ninh Bình thành phố' },
      { dish: 'Cơm cháy', desc: 'Ăn kèm nước sốt dê hoặc tim cật, đặc sản trứ danh.', keyword: 'Cơm cháy Ninh Bình trưa' }
    ],
    afternoonVisit: [
      { name: 'Tam Cốc - Bích Động', desc: 'Đi thuyền ngắm cánh đồng lúa hai bên bờ sông Ngô Đồng.', keyword: 'Tam Cốc Bích Động', tips: 'Mùa lúa chín (tháng 5-6) là thời điểm đẹp nhất.' },
      { name: 'Chùa Bái Đính', desc: 'Quần thể chùa lớn với nhiều tượng Phật và hành lang La Hán.', keyword: 'Chùa Bái Đính thành phố', tips: 'Diện tích rất rộng, nên chuẩn bị giày thoải mái để đi bộ.' }
    ],
    dinner: [
      { dish: 'Dê núi hấp', desc: 'Thịt dê hấp lá cách hoặc sả, chấm tương gừng đặc trưng.', keyword: 'Dê núi hấp Ninh Bình thành phố' },
      { dish: 'Ốc núi Ninh Bình', desc: 'Ốc núi đá vôi, thịt giòn dai, hấp sả hoặc xào.', keyword: 'Ốc núi Ninh Bình thành phố' }
    ],
    nightlife: [
      { name: 'Phố cổ Hoa Lư về đêm', desc: 'Không gian yên bình quanh cố đô Hoa Lư, ít ồn ào.', keyword: 'Hoa Lư về đêm', tips: 'Phù hợp cho những ai thích nghỉ ngơi tĩnh lặng.' }
    ]
  },

  'Đông Hà, Quảng Trị': {
    breakfast: [
      { dish: 'Cháo bột cá lóc', desc: 'Cháo bột gạo cá lóc, món sáng đặc trưng miền Trung.', keyword: 'Cháo bột cá lóc Đông Hà' },
      { dish: 'Bánh ướt Phương Lang', desc: 'Bánh ướt mềm mỏng, chấm nước mắm nguyên chất.', keyword: 'Bánh ướt Đông Hà' }
    ],
    morningVisit: [
      { name: 'Thành cổ Quảng Trị', desc: 'Di tích lịch sử chiến tranh nổi tiếng, nơi tưởng niệm chiến sĩ.', keyword: 'Thành cổ Quảng Trị Đông Hà', tips: 'Nên tìm hiểu trước bối cảnh lịch sử 81 ngày đêm.' },
      { name: 'Cầu Hiền Lương - Sông Bến Hải', desc: 'Biểu tượng lịch sử chia cắt hai miền một thời.', keyword: 'Cầu Hiền Lương Đông Hà', tips: 'Kết hợp tham quan Kỳ đài và cụm di tích đôi bờ.' }
    ],
    lunch: [
      { dish: 'Bún hến Mai Xá', desc: 'Bún hến xào, nước hến chua nhẹ, ăn kèm bánh tráng.', keyword: 'Bún hến Đông Hà' },
      { dish: 'Lòng sả Đông Hà', desc: 'Lòng heo xào sả ớt, ăn kèm cơm hoặc bánh tráng.', keyword: 'Lòng sả Đông Hà trưa' }
    ],
    afternoonVisit: [
      { name: 'Nghĩa trang liệt sĩ Trường Sơn', desc: 'Nghĩa trang lớn tưởng niệm các anh hùng liệt sĩ.', keyword: 'Nghĩa trang liệt sĩ Trường Sơn Đông Hà', tips: 'Nên giữ thái độ trang nghiêm khi tham quan.' },
      { name: 'Địa đạo Vịnh Mốc', desc: 'Hệ thống địa đạo từng che chở người dân thời chiến.', keyword: 'Địa đạo Vịnh Mốc Đông Hà', tips: 'Đường trong địa đạo khá hẹp, nên chọn trang phục gọn nhẹ.' }
    ],
    dinner: [
      { dish: 'Hải sản Cửa Việt', desc: 'Hải sản tươi từ cảng cá Cửa Việt, chế biến nướng hoặc hấp.', keyword: 'Hải sản Cửa Việt Đông Hà' },
      { dish: 'Cháo bột cá lóc tối', desc: 'Món ăn tối nhẹ nhàng, đậm chất miền Trung.', keyword: 'Cháo bột cá lóc Đông Hà tối' }
    ],
    nightlife: [
      { name: 'Bờ sông Thạch Hãn về đêm', desc: 'Thả đèn hoa đăng, không gian tưởng niệm nhẹ nhàng về đêm.', keyword: 'Sông Thạch Hãn Đông Hà', tips: 'Vào các dịp lễ lớn, khu vực này thường tổ chức thả hoa đăng.' }
    ]
  },

  'Đồng Hới, Quảng Trị': {
    breakfast: [
      { dish: 'Bánh bèo Đồng Hới', desc: 'Bánh bèo nhỏ, chan nước mắm chua ngọt, món sáng nhẹ nhàng.', keyword: 'Bánh bèo Đồng Hới' },
      { dish: 'Cháo canh Đồng Hới', desc: 'Cháo canh sợi bột lọc dai, nước dùng đậm đà.', keyword: 'Cháo canh Đồng Hới' }
    ],
    morningVisit: [
      { name: 'Động Phong Nha', desc: 'Hang động kỳ vĩ trong Vườn quốc gia Phong Nha - Kẻ Bàng, di sản UNESCO.', keyword: 'Động Phong Nha', tips: 'Nên đi thuyền vào sâu trong động để chiêm ngưỡng nhũ đá.' },
      { name: 'Bãi biển Nhật Lệ', desc: 'Bãi biển đẹp ngay trung tâm thành phố Đồng Hới.', keyword: 'Bãi biển Nhật Lệ', tips: 'Buổi sáng sớm mặt biển rất yên tĩnh.' }
    ],
    lunch: [
      { dish: 'Bánh khoái Đồng Hới', desc: 'Bánh khoái giòn nhân tôm thịt giá đỗ, ăn kèm rau sống.', keyword: 'Bánh khoái Đồng Hới' },
      { dish: 'Cháo hàu Nhật Lệ', desc: 'Cháo nấu từ hàu tươi sông Nhật Lệ, vị ngọt béo đặc trưng.', keyword: 'Cháo hàu Nhật Lệ' }
    ],
    afternoonVisit: [
      { name: 'Động Thiên Đường', desc: 'Hang động khô với hệ thống thạch nhũ tráng lệ trong Phong Nha - Kẻ Bàng.', keyword: 'Động Thiên Đường', tips: 'Nên đi giày thoải mái vì đường đi khá dài.' },
      { name: 'Sông Nhật Lệ', desc: 'Dòng sông thơ mộng chảy qua trung tâm thành phố Đồng Hới.', keyword: 'Sông Nhật Lệ', tips: 'Có thể đi thuyền dạo quanh cửa sông vào buổi chiều.' }
    ],
    dinner: [
      { dish: 'Hải sản Nhật Lệ', desc: 'Hải sản tươi sống chế biến hấp, nướng ngay ven biển.', keyword: 'Hải sản Nhật Lệ' },
      { dish: 'Lẩu cá khoai', desc: 'Lẩu cá khoai chua cay, đặc sản vùng biển Quảng Bình.', keyword: 'Lẩu cá khoai Đồng Hới' }
    ],
    nightlife: [
      { name: 'Phố biển Nhật Lệ về đêm', desc: 'Đi dạo bãi biển, thưởng thức hải sản đêm mát mẻ.', keyword: 'Nhật Lệ về đêm', tips: 'Mùa hè khu vực này khá đông khách du lịch.' }
    ]
  },

  'Đà Nẵng, Đà Nẵng': {
    breakfast: [
      { dish: 'Mì Quảng', desc: 'Sợi mì vàng, nước lèo sánh ít, ăn kèm bánh tráng và đậu phộng.', keyword: 'Mì Quảng Đà Nẵng thành phố' },
      { dish: 'Bánh xèo Đà Nẵng', desc: 'Bánh xèo nhỏ giòn, cuốn bánh tráng rau sống chấm mắm nêm.', keyword: 'Bánh xèo Đà Nẵng thành phố' },
      { dish: 'Bún mắm Đà Nẵng', desc: 'Bún ăn cùng mắm nêm và thịt luộc, hương vị đậm đà miền Trung.', keyword: 'Bún mắm Đà Nẵng thành phố' }
    ],
    morningVisit: [
      { name: 'Bán đảo Sơn Trà', desc: 'Bán đảo xanh với chùa Linh Ứng và voọc chà vá chân nâu.', keyword: 'Bán đảo Sơn Trà thành phố', tips: 'Đi sớm để tránh nắng khi leo các cung đường ngắm cảnh.' },
      { name: 'Ngũ Hành Sơn', desc: 'Cụm 5 ngọn núi đá vôi với hang động và chùa cổ.', keyword: 'Ngũ Hành Sơn thành phố', tips: 'Có thể đi thang máy lên núi nếu ngại leo bộ.' }
    ],
    lunch: [
      { dish: 'Mì Quảng ếch', desc: 'Biến tấu mì Quảng với ếch đồng, vị lạ miệng đặc trưng.', keyword: 'Mì Quảng ếch thành phố' },
      { dish: 'Bún chả cá Đà Nẵng', desc: 'Bún nước dùng ngọt thanh từ cá, chả cá chiên vàng.', keyword: 'Bún chả cá Đà Nẵng thành phố' },
      { dish: 'Gỏi cá Nam Ô', desc: 'Gỏi cá trích tươi trộn thính, ăn kèm bánh tráng và rau rừng.', keyword: 'Gỏi cá Nam Ô thành phố' }
    ],
    afternoonVisit: [
      { name: 'Cầu Rồng', desc: 'Biểu tượng thành phố, phun lửa/nước vào tối cuối tuần.', keyword: 'Cầu Rồng Đà Nẵng thành phố', tips: 'Nên quay lại buổi tối để xem cầu phun lửa.' },
      { name: 'Bãi biển Mỹ Khê', desc: 'Một trong những bãi biển đẹp nhất Việt Nam.', keyword: 'Bãi biển Mỹ Khê thành phố', tips: 'Buổi chiều mát rất thích hợp để tắm biển.' }
    ],
    dinner: [
      { dish: 'Hải sản Mỹ Khê', desc: 'Mực nhảy hấp, ghẹ rang me, tôm nướng muối ớt ven biển.', keyword: 'Hải sản Đà Nẵng thành phố' },
      { dish: 'Bánh tráng cuốn thịt heo', desc: 'Thịt heo hai đầu da cuốn bánh tráng, rau sống, chấm mắm nêm.', keyword: 'Bánh tráng cuốn thịt heo thành phố' },
      { dish: 'Ốc hút Đà Nẵng', desc: 'Ốc hút xào sả ớt, món nhậu vặt quen thuộc buổi tối.', keyword: 'Ốc hút Đà Nẵng thành phố' }
    ],
    nightlife: [
      { name: 'Cầu Rồng phun lửa & phố đi bộ Bạch Đằng', desc: 'Xem cầu Rồng phun lửa nước, dạo phố ven sông Hàn.', keyword: 'Sông Hàn Đà Nẵng thành phố về đêm', tips: 'Cầu Rồng phun lửa vào 21h tối thứ Bảy, Chủ Nhật.' },
      { name: 'Chợ đêm Sơn Trà', desc: 'Khu chợ đêm ẩm thực đường phố quy mô lớn.', keyword: 'Chợ đêm Sơn Trà thành phố', tips: 'Rất đông vào cuối tuần, nên gửi xe sớm.' }
    ]
  },

  'Hội An, Đà Nẵng': {
    breakfast: [
      { dish: 'Cao lầu Hội An', desc: 'Sợi mì dai đặc trưng chỉ có ở Hội An, ăn cùng thịt xá xíu và rau sống.', keyword: 'Cao lầu Hội An' },
      { dish: 'Bánh mì Phượng', desc: 'Bánh mì nổi tiếng thế giới với nhân đầy đặn, nước sốt đặc trưng.', keyword: 'Bánh mì Phượng Hội An' },
      { dish: 'Bánh bao bánh vạc', desc: 'Còn gọi là "hoa hồng trắng", bánh nhân tôm hình hoa tinh xảo.', keyword: 'Bánh bao bánh vạc Hội An' }
    ],
    morningVisit: [
      { name: 'Phố cổ Hội An', desc: 'Di sản văn hoá thế giới với những ngôi nhà cổ vàng ươm bên sông Hoài.', keyword: 'Phố cổ Hội An', tips: 'Đi bộ khám phá phố cổ vào sáng sớm để tránh nắng và đông khách.' },
      { name: 'Chùa Cầu Hội An', desc: 'Biểu tượng kiến trúc nổi tiếng nhất của phố cổ Hội An.', keyword: 'Chùa Cầu Hội An', tips: 'Rất đông khách chụp ảnh, nên tranh thủ giờ sáng sớm.' }
    ],
    lunch: [
      { dish: 'Cao lầu Hội An', desc: 'Món trưa đặc sản không thể bỏ lỡ khi đến phố cổ.', keyword: 'Cao lầu Hội An trưa' },
      { dish: 'Mì Quảng Hội An', desc: 'Phiên bản mì Quảng đặc trưng của vùng đất Hội An.', keyword: 'Mì Quảng Hội An' },
      { dish: 'Cơm gà Hội An', desc: 'Cơm gà xé phay vàng ươm, ăn kèm hành phi và rau răm.', keyword: 'Cơm gà Hội An' }
    ],
    afternoonVisit: [
      { name: 'Rừng dừa Bảy Mẫu', desc: 'Trải nghiệm chèo thuyền thúng giữa rừng dừa nước độc đáo.', keyword: 'Rừng dừa Bảy Mẫu', tips: 'Có thể xem biểu diễn múa thúng, câu cua tại đây.' },
      { name: 'Làng gốm Thanh Hà', desc: 'Làng nghề gốm truyền thống hơn 500 năm tuổi.', keyword: 'Làng gốm Thanh Hà', tips: 'Có thể tự tay nặn gốm trải nghiệm tại làng nghề.' }
    ],
    dinner: [
      { dish: 'Cơm gà Hội An (tối)', desc: 'Ăn tối nhẹ nhàng với cơm gà đặc sản phố cổ.', keyword: 'Cơm gà Hội An tối' },
      { dish: 'Hến trộn Cẩm Nam', desc: 'Hến xào trộn cùng bánh tráng, đậu phộng, rau răm.', keyword: 'Hến trộn Cẩm Nam' },
      { dish: 'Chè bắp Cẩm Nam', desc: 'Món tráng miệng ngọt thanh từ bắp non Cẩm Nam.', keyword: 'Chè bắp Cẩm Nam' }
    ],
    nightlife: [
      { name: 'Phố đèn lồng Hội An về đêm', desc: 'Phố cổ lung linh ánh đèn lồng, thả hoa đăng trên sông Hoài.', keyword: 'Đèn lồng Hội An', tips: 'Đêm rằm hằng tháng phố cổ tắt điện, chỉ thắp sáng bằng đèn lồng.' }
    ]
  },

  'Quảng Ngãi, Quảng Ngãi': {
    breakfast: [
      { dish: 'Don Quảng Ngãi', desc: 'Món ăn dân dã từ con don nhỏ, nước dùng ngọt thanh.', keyword: 'Don Quảng Ngãi thành phố' },
      { dish: 'Cháo don', desc: 'Cháo nấu cùng con don, ăn kèm bánh tráng nướng giòn.', keyword: 'Cháo don thành phố' }
    ],
    morningVisit: [
      { name: 'Núi Thiên Ấn', desc: 'Ngọn núi được ví như "Thiên Ấn niêm hà", có chùa cổ trên đỉnh.', keyword: 'Núi Thiên Ấn thành phố', tips: 'View đẹp nhất vào buổi sáng sớm nhiều mây.' },
      { name: 'Thành cổ Châu Sa', desc: 'Di tích thành cổ Chăm Pa còn lại ở Quảng Ngãi.', keyword: 'Thành cổ Châu Sa thành phố', tips: 'Phù hợp cho ai yêu thích tìm hiểu văn hoá Chăm.' }
    ],
    lunch: [
      { dish: 'Cá bống sông Trà', desc: 'Cá bống kho tiêu, đặc sản trứ danh của sông Trà Khúc.', keyword: 'Cá bống sông Trà thành phố' },
      { dish: 'Chả cá Quảng Ngãi', desc: 'Chả cá thu hoặc cá mối, chiên vàng thơm.', keyword: 'Chả cá Quảng Ngãi thành phố' }
    ],
    afternoonVisit: [
      { name: 'Cầu Trà Khúc', desc: 'Cây cầu biểu tượng bắc qua sông Trà Khúc.', keyword: 'Sông Trà Khúc thành phố', tips: 'Chiều muộn là thời điểm ngắm hoàng hôn đẹp trên cầu.' },
      { name: 'Bảo tàng tổng hợp Quảng Ngãi', desc: 'Trưng bày lịch sử, văn hoá vùng đất Quảng Ngãi.', keyword: 'Bảo tàng Quảng Ngãi', tips: 'Phù hợp cho chuyến đi tìm hiểu lịch sử địa phương.' }
    ],
    dinner: [
      { dish: 'Cá bống sông Trà kho tiêu', desc: 'Món ăn kèm cơm nóng, đậm vị đặc sản địa phương.', keyword: 'Cá bống kho tiêu thành phố' },
      { dish: 'Kẹo gương Quảng Ngãi', desc: 'Món tráng miệng giòn ngọt làm từ đường và đậu phộng.', keyword: 'Kẹo gương Quảng Ngãi thành phố' }
    ],
    nightlife: [
      { name: 'Phố ẩm thực ven sông Trà Khúc', desc: 'Các quán ăn đêm dọc bờ sông, không khí mát mẻ.', keyword: 'Sông Trà Khúc thành phố về đêm', tips: 'Thích hợp đi dạo và ăn nhẹ sau bữa tối.' }
    ]
  },

  'Huyện Bình Sơn (Lý Sơn), Quảng Ngãi': {
    breakfast: [
      { dish: 'Gỏi tỏi Lý Sơn', desc: 'Gỏi làm từ tỏi non đặc sản đảo Lý Sơn, vị giòn thanh lạ miệng.', keyword: 'Gỏi tỏi Lý Sơn' },
      { dish: 'Bánh xèo mực Lý Sơn', desc: 'Bánh xèo giòn nhân mực tươi vùng biển đảo.', keyword: 'Bánh xèo mực Lý Sơn' }
    ],
    morningVisit: [
      { name: 'Đảo Lý Sơn', desc: 'Đảo núi lửa với cánh đồng tỏi và biển xanh trong vắt.', keyword: 'Đảo Lý Sơn', tips: 'Cần đi tàu cao tốc từ cảng Sa Kỳ, nên hỏi trước lịch tàu.' },
      { name: 'Cổng Tò Vò', desc: 'Cổng đá núi lửa tự nhiên nổi tiếng nhất Lý Sơn, đẹp lúc bình minh.', keyword: 'Cổng Tò Vò Lý Sơn', tips: 'Nên ra ngắm bình minh sớm để có khung cảnh đẹp nhất.' }
    ],
    lunch: [
      { dish: 'Gỏi rong biển Lý Sơn', desc: 'Rong biển trộn cùng tỏi phi, vị thanh mát của đảo.', keyword: 'Gỏi rong biển Lý Sơn' },
      { dish: 'Hải sản Lý Sơn', desc: 'Hải sản tươi sống đánh bắt trực tiếp từ ngư dân đảo.', keyword: 'Hải sản Lý Sơn' }
    ],
    afternoonVisit: [
      { name: 'Chùa Hang Lý Sơn', desc: 'Ngôi chùa nằm trong hang đá núi lửa cổ, view ra biển.', keyword: 'Chùa Hang Lý Sơn', tips: 'Kết hợp tham quan núi Thới Lới gần đó.' },
      { name: 'Núi Thới Lới', desc: 'Ngọn núi lửa cao nhất đảo, có hồ nước ngọt trên miệng núi lửa.', keyword: 'Núi Thới Lới', tips: 'Leo lên đỉnh để ngắm toàn cảnh đảo Lý Sơn từ trên cao.' }
    ],
    dinner: [
      { dish: 'Ốc cừ Lý Sơn', desc: 'Đặc sản ốc biển của đảo, hấp hoặc nướng đơn giản.', keyword: 'Ốc cừ Lý Sơn' },
      { dish: 'Cá tươi nướng muối ớt', desc: 'Cá vừa đánh bắt nướng ngay trên bếp than, giữ vị ngọt tự nhiên.', keyword: 'Cá nướng Lý Sơn' }
    ],
    nightlife: [
      { name: 'Bờ biển Lý Sơn về đêm', desc: 'Ngắm sao trên đảo, không khí yên tĩnh xa thành phố.', keyword: 'Lý Sơn về đêm', tips: 'Đảo khá yên tĩnh về đêm, phù hợp nghỉ ngơi sớm.' }
    ]
  },

  'Buôn Ma Thuột, Đắk Lắk': {
    breakfast: [
      { dish: 'Bún đỏ Buôn Ma Thuột', desc: 'Bún màu đỏ gạch cua, nước dùng sánh, ăn kèm chả và trứng cút.', keyword: 'Bún đỏ Buôn Ma Thuột thành phố' },
      { dish: 'Cà phê Ban Mê', desc: 'Cà phê phin nguyên chất, nét đặc trưng thủ phủ cà phê Việt Nam.', keyword: 'Cà phê Buôn Ma Thuột thành phố' },
      { dish: 'Bánh ướt thịt nướng', desc: 'Bánh ướt cuộn thịt nướng, chấm nước mắm chua ngọt.', keyword: 'Bánh ướt thịt nướng Buôn Ma Thuột' }
    ],
    morningVisit: [
      { name: 'Bảo tàng Đắk Lắk', desc: 'Trưng bày văn hoá cồng chiêng và đời sống Tây Nguyên.', keyword: 'Bảo tàng Đắk Lắk thành phố', tips: 'Kết hợp tham quan Biệt điện Bảo Đại gần đó.' },
      { name: 'Buôn Đôn', desc: 'Làng voi nổi tiếng của người Ê Đê, M\'nông với cầu treo qua sông Sêrêpốk.', keyword: 'Buôn Đôn Buôn Ma Thuột', tips: 'Nên đi cùng hướng dẫn viên địa phương để hiểu văn hoá Tây Nguyên.' }
    ],
    lunch: [
      { dish: 'Gà nướng Bản Đôn', desc: 'Gà thả vườn nướng nguyên con, chấm muối ớt xanh.', keyword: 'Gà nướng Bản Đôn thành phố' },
      { dish: 'Cơm lam Tây Nguyên', desc: 'Cơm nếp nướng ống tre, ăn kèm gà nướng hoặc muối vừng.', keyword: 'Cơm lam Buôn Ma Thuột' },
      { dish: 'Canh chua kiến vàng', desc: 'Món canh độc đáo dùng kiến vàng của đồng bào Tây Nguyên.', keyword: 'Canh chua kiến vàng Buôn Ma Thuột' }
    ],
    afternoonVisit: [
      { name: 'Thác Dray Nur', desc: 'Một trong những thác nước hùng vĩ nhất Tây Nguyên.', keyword: 'Thác Dray Nur Buôn Ma Thuột', tips: 'Đường xuống thác khá trơn, nên đi giày bám tốt.' },
      { name: 'Hồ Lắk', desc: 'Hồ nước ngọt tự nhiên lớn, có thể trải nghiệm cưỡi voi hoặc chèo thuyền độc mộc.', keyword: 'Hồ Lắk Buôn Ma Thuột', tips: 'Buổi chiều mặt hồ yên ả, rất đẹp để ngắm cảnh.' }
    ],
    dinner: [
      { dish: 'Lẩu lá rừng', desc: 'Lẩu nấu từ nhiều loại lá rừng Tây Nguyên, vị thanh mát lạ miệng.', keyword: 'Lẩu lá rừng Buôn Ma Thuột' },
      { dish: 'Heo rẫy nướng', desc: 'Heo bản địa nướng than hoa, thịt săn ít mỡ.', keyword: 'Heo rẫy nướng Buôn Ma Thuột' },
      { dish: 'Rượu cần', desc: 'Thức uống truyền thống của các dân tộc Tây Nguyên trong dịp lễ hội.', keyword: 'Rượu cần Buôn Ma Thuột' }
    ],
    nightlife: [
      { name: 'Đêm cồng chiêng Tây Nguyên', desc: 'Thưởng thức biểu diễn cồng chiêng, múa xoang quanh lửa trại.', keyword: 'Cồng chiêng Buôn Ma Thuột', tips: 'Thường tổ chức tại các buôn du lịch, nên đặt trước theo đoàn.' }
    ]
  },

  'Tuy Hòa, Đắk Lắk': {
    breakfast: [
      { dish: 'Bánh canh hẹ Tuy Hòa', desc: 'Bánh canh bột gạo nấu cùng hẹ, chả cá — món sáng đặc trưng Phú Yên.', keyword: 'Bánh canh hẹ Tuy Hòa' },
      { dish: 'Bún cá Tuy Hòa', desc: 'Bún cá ngừ hoặc cá thu, nước dùng ngọt thanh vị biển.', keyword: 'Bún cá Tuy Hòa' }
    ],
    morningVisit: [
      { name: 'Gành Đá Đĩa', desc: 'Bãi đá bazan hình lục giác xếp chồng độc đáo bậc nhất Việt Nam.', keyword: 'Gành Đá Đĩa', tips: 'Nên đi vào buổi sáng để tránh nắng gắt khi tham quan ngoài trời.' },
      { name: 'Núi Nhạn - Tháp Nhạn', desc: 'Ngọn tháp Chăm cổ trên núi, view toàn cảnh thành phố Tuy Hòa.', keyword: 'Tháp Nhạn Tuy Hòa', tips: 'Thích hợp ngắm hoàng hôn từ trên núi.' }
    ],
    lunch: [
      { dish: 'Cá ngừ đại dương Phú Yên', desc: 'Cá ngừ đại dương tươi, chế biến gỏi hoặc nướng.', keyword: 'Cá ngừ đại dương Tuy Hòa' },
      { dish: 'Bún cá Tuy Hòa', desc: 'Món trưa đặc sản nổi tiếng của thành phố biển.', keyword: 'Bún cá Tuy Hòa trưa' }
    ],
    afternoonVisit: [
      { name: 'Bãi Xép', desc: 'Bãi biển hoang sơ nổi tiếng qua bộ phim "Tôi thấy hoa vàng trên cỏ xanh".', keyword: 'Bãi Xép Tuy Hòa', tips: 'Buổi chiều mát rất thích hợp để tắm biển và chụp ảnh.' },
      { name: 'Bãi biển Tuy Hòa', desc: 'Bãi biển dài đẹp ngay trung tâm thành phố.', keyword: 'Bãi biển Tuy Hòa', tips: 'Thích hợp dạo bộ ngắm hoàng hôn.' }
    ],
    dinner: [
      { dish: 'Mắt cá ngừ đại dương hầm thuốc bắc', desc: 'Món đặc sản bổ dưỡng nổi tiếng của Phú Yên.', keyword: 'Mắt cá ngừ hầm Tuy Hòa' },
      { dish: 'Hải sản Tuy Hòa', desc: 'Hải sản tươi sống chế biến hấp, nướng ngay ven biển.', keyword: 'Hải sản Tuy Hòa' }
    ],
    nightlife: [
      { name: 'Phố biển Tuy Hòa về đêm', desc: 'Đi dạo bãi biển, thưởng thức hải sản đêm mát mẻ.', keyword: 'Tuy Hòa về đêm', tips: 'Cuối tuần khu vực này khá đông khách du lịch.' }
    ]
  },

  'Nha Trang, Khánh Hòa': {
    breakfast: [
      { dish: 'Bún cá Nha Trang', desc: 'Bún cá sứa hoặc chả cá, nước dùng ngọt thanh vị biển.', keyword: 'Bún cá Nha Trang thành phố' },
      { dish: 'Bánh căn Nha Trang', desc: 'Bánh căn nhỏ đổ khuôn, ăn kèm mắm nêm hoặc xíu mại.', keyword: 'Bánh căn Nha Trang thành phố' },
      { dish: 'Nem nướng Ninh Hòa', desc: 'Nem nướng cuốn bánh tráng, chấm nước lèo đặc trưng.', keyword: 'Nem nướng Ninh Hòa thành phố' }
    ],
    morningVisit: [
      { name: 'Hòn Chồng', desc: 'Cụm đá tự nhiên độc đáo ven biển, view toàn cảnh vịnh Nha Trang.', keyword: 'Hòn Chồng Nha Trang thành phố', tips: 'Buổi sáng ánh nắng dịu, thích hợp chụp ảnh.' },
      { name: 'Tháp Bà Ponagar', desc: 'Quần thể tháp Chăm cổ thờ nữ thần Ponagar.', keyword: 'Tháp Bà Ponagar thành phố', tips: 'Tìm hiểu trước về văn hoá Chăm để chuyến tham quan ý nghĩa hơn.' }
    ],
    lunch: [
      { dish: 'Bún sứa Nha Trang', desc: 'Bún với sứa giòn mát, nước dùng chua nhẹ.', keyword: 'Bún sứa Nha Trang thành phố' },
      { dish: 'Bánh xèo mực Nha Trang', desc: 'Bánh xèo giòn nhân mực tươi vùng biển.', keyword: 'Bánh xèo mực thành phố' },
      { dish: 'Nem nướng Ninh Hòa', desc: 'Món trưa cuốn bánh tráng rau sống nổi tiếng.', keyword: 'Nem nướng Ninh Hòa trưa thành phố' }
    ],
    afternoonVisit: [
      { name: 'Vinpearl Land Nha Trang', desc: 'Khu vui chơi giải trí trên đảo Hòn Tre, cáp treo vượt biển.', keyword: 'Vinpearl Land Nha Trang thành phố', tips: 'Nên đến sớm chiều để có đủ thời gian chơi các trò chơi.' },
      { name: 'Viện Hải dương học Nha Trang', desc: 'Nơi trưng bày sinh vật biển lâu đời nhất Việt Nam.', keyword: 'Viện Hải dương học thành phố', tips: 'Phù hợp cho gia đình có trẻ nhỏ.' }
    ],
    dinner: [
      { dish: 'Hải sản Nha Trang', desc: 'Tôm hùm, ghẹ, ốc biển tươi sống chế biến đa dạng.', keyword: 'Hải sản Nha Trang thành phố' },
      { dish: 'Bún cá dầm', desc: 'Bún cá kiểu dầm với chả cá và cá tươi từng miếng.', keyword: 'Bún cá dầm thành phố' },
      { dish: 'Yến sào Khánh Hòa', desc: 'Chè yến hoặc súp yến, đặc sản quý của vùng biển Khánh Hòa.', keyword: 'Yến sào Khánh Hòa thành phố' }
    ],
    nightlife: [
      { name: 'Phố Tây Nha Trang (Nguyễn Thiện Thuật)', desc: 'Khu phố sôi động với quán bar, ẩm thực đường phố.', keyword: 'Phố Tây Nha Trang thành phố', tips: 'Rất đông vào buổi tối cuối tuần, nên đặt bàn trước nếu đi nhóm đông.' },
      { name: 'Quảng trường 2 Tháng 4', desc: 'Không gian đi bộ ven biển về đêm, mát mẻ dễ chịu.', keyword: 'Quảng trường 2 tháng 4 thành phố', tips: 'Có thể ngồi ven biển hóng gió sau bữa tối.' }
    ]
  },

  'Phan Rang - Tháp Chàm, Khánh Hòa': {
    breakfast: [
      { dish: 'Bánh căn Phan Rang', desc: 'Bánh căn nhỏ đổ khuôn, ăn kèm nước mắm xíu mại đặc trưng.', keyword: 'Bánh căn Phan Rang' },
      { dish: 'Bánh xèo Phan Rang', desc: 'Bánh xèo giòn nhân tôm mực vùng biển Ninh Thuận.', keyword: 'Bánh xèo Phan Rang' }
    ],
    morningVisit: [
      { name: 'Tháp Po Klong Garai', desc: 'Cụm tháp Chăm cổ được bảo tồn gần như nguyên vẹn nhất Việt Nam.', keyword: 'Tháp Po Klong Garai', tips: 'Tìm hiểu trước về văn hoá Chăm để chuyến tham quan ý nghĩa hơn.' },
      { name: 'Đồi cát Nam Cương', desc: 'Đồi cát vàng độc đáo mang nét sa mạc giữa vùng đất Ninh Thuận.', keyword: 'Đồi cát Nam Cương', tips: 'Nên đi sớm để tránh cát nóng và nắng gắt.' }
    ],
    lunch: [
      { dish: 'Bánh canh chả cá Phan Rang', desc: 'Bánh canh bột gạo, chả cá chiên vàng đậm vị biển.', keyword: 'Bánh canh chả cá Phan Rang' },
      { dish: 'Cơm gà Phan Rang', desc: 'Cơm gà xé phay ăn kèm hành phi và rau răm.', keyword: 'Cơm gà Phan Rang' }
    ],
    afternoonVisit: [
      { name: 'Vườn nho Ninh Thuận', desc: 'Vùng trồng nho đặc sản khô nóng đặc trưng của Ninh Thuận.', keyword: 'Vườn nho Ninh Thuận', tips: 'Có thể mua nho tươi và rượu vang nho làm quà.' },
      { name: 'Vịnh Vĩnh Hy', desc: 'Vịnh biển hoang sơ với nước trong xanh, một trong những vịnh đẹp nhất Việt Nam.', keyword: 'Vịnh Vĩnh Hy', tips: 'Có thể đi thuyền đáy kính ngắm san hô.' }
    ],
    dinner: [
      { dish: 'Hải sản Ninh Chữ', desc: 'Hải sản tươi sống chế biến hấp, nướng ngay ven biển.', keyword: 'Hải sản Ninh Chữ' },
      { dish: 'Dê nướng Ninh Thuận', desc: 'Thịt dê nướng đặc sản vùng đất nắng gió Ninh Thuận.', keyword: 'Dê nướng Ninh Thuận' }
    ],
    nightlife: [
      { name: 'Bãi biển Ninh Chữ về đêm', desc: 'Đi dạo bãi biển, thưởng thức hải sản đêm mát mẻ.', keyword: 'Ninh Chữ về đêm', tips: 'Không khí biển về đêm khá dễ chịu, thích hợp đi dạo.' }
    ]
  },

  'Đà Lạt, Lâm Đồng': {
    breakfast: [
      { dish: 'Bánh căn Đà Lạt', desc: 'Bánh căn nhỏ nóng hổi ăn kèm xíu mại, phù hợp khí hậu se lạnh.', keyword: 'Bánh căn Đà Lạt thành phố' },
      { dish: 'Sữa đậu nành nóng', desc: 'Sữa đậu nành nóng ăn cùng bánh tiêu, món sáng quen thuộc phố núi.', keyword: 'Sữa đậu nành Đà Lạt thành phố' },
      { dish: 'Bánh mì xíu mại Đà Lạt', desc: 'Bánh mì chấm cùng chén xíu mại nóng, đặc sản buổi sáng se lạnh.', keyword: 'Bánh mì xíu mại Đà Lạt thành phố' }
    ],
    morningVisit: [
      { name: 'Hồ Xuân Hương', desc: 'Hồ nước giữa trung tâm thành phố, biểu tượng của Đà Lạt.', keyword: 'Hồ Xuân Hương thành phố', tips: 'Đi bộ hoặc đạp xe quanh hồ vào buổi sáng sớm rất dễ chịu.' },
      { name: 'Ga Đà Lạt', desc: 'Nhà ga xe lửa cổ mang kiến trúc độc đáo, đẹp nhất Đông Dương.', keyword: 'Ga Đà Lạt', tips: 'Có thể trải nghiệm tàu hoả cổ đi Trại Mát.' }
    ],
    lunch: [
      { dish: 'Lẩu gà lá é', desc: 'Lẩu gà nấu cùng lá é thơm đặc trưng cao nguyên.', keyword: 'Lẩu gà lá é thành phố' },
      { dish: 'Bánh tráng nướng Đà Lạt', desc: 'Bánh tráng nướng trứng, phô mai — món ăn vặt trứ danh.', keyword: 'Bánh tráng nướng thành phố' },
      { dish: 'Nấm Đà Lạt xào', desc: 'Các loại nấm cao nguyên tươi, xào bơ tỏi hoặc chiên giòn.', keyword: 'Nấm Đà Lạt thành phố' }
    ],
    afternoonVisit: [
      { name: 'Thung lũng Tình Yêu', desc: 'Không gian đồi thông, hồ nước lãng mạn.', keyword: 'Thung lũng Tình Yêu thành phố', tips: 'Trời chiều thường có sương nhẹ, nên mang áo ấm.' },
      { name: 'Vườn hoa thành phố Đà Lạt', desc: 'Không gian hoa đa dạng bốn mùa của xứ sở ngàn hoa.', keyword: 'Vườn hoa Đà Lạt thành phố', tips: 'Nên đi giày thoải mái vì vườn khá rộng.' }
    ],
    dinner: [
      { dish: 'Lẩu bò Đà Lạt', desc: 'Lẩu bò nhúng rau cải mèo, hợp với thời tiết se lạnh về đêm.', keyword: 'Lẩu bò Đà Lạt thành phố' },
      { dish: 'Gà nướng cơm lam Đà Lạt', desc: 'Gà nướng ăn kèm cơm lam, đậm chất núi rừng.', keyword: 'Gà nướng cơm lam thành phố' },
      { dish: 'Rượu vang Đà Lạt', desc: 'Nhâm nhi cùng bữa tối, đặc sản địa phương nổi tiếng.', keyword: 'Rượu vang Đà Lạt thành phố' }
    ],
    nightlife: [
      { name: 'Chợ đêm Đà Lạt', desc: 'Khu chợ đêm sầm uất với đồ nướng, sữa đậu nành, len ấm.', keyword: 'Chợ đêm Đà Lạt thành phố', tips: 'Trời về đêm khá lạnh, nhớ mang theo áo khoác dày.' }
    ]
  },

  'Phan Thiết, Lâm Đồng': {
    breakfast: [
      { dish: 'Bánh căn Phan Thiết', desc: 'Bánh căn nhỏ đổ khuôn, ăn kèm nước mắm chua ngọt và xíu mại.', keyword: 'Bánh căn Phan Thiết' },
      { dish: 'Bánh xèo Phan Thiết', desc: 'Bánh xèo giòn nhân tôm mực vùng biển.', keyword: 'Bánh xèo Phan Thiết' }
    ],
    morningVisit: [
      { name: 'Đồi cát bay Mũi Né', desc: 'Đồi cát vàng rộng lớn, có thể trượt ván cát trải nghiệm.', keyword: 'Đồi cát bay Mũi Né', tips: 'Nên đi sớm để tránh cát nóng và nắng gắt.' },
      { name: 'Bàu Trắng', desc: 'Hồ nước ngọt giữa đồi cát trắng, cảnh sắc nên thơ.', keyword: 'Bàu Trắng Mũi Né', tips: 'Có thể kết hợp tham quan cùng đồi cát bay trong buổi sáng.' }
    ],
    lunch: [
      { dish: 'Gỏi cá mai Phan Thiết', desc: 'Gỏi cá mai tươi trộn thính, chua ngọt đặc trưng vùng biển.', keyword: 'Gỏi cá mai Phan Thiết' },
      { dish: 'Bánh canh chả cá Phan Thiết', desc: 'Bánh canh bột gạo, chả cá chiên vàng đậm vị biển.', keyword: 'Bánh canh chả cá Phan Thiết' }
    ],
    afternoonVisit: [
      { name: 'Làng chài Mũi Né', desc: 'Làng chài truyền thống với những chiếc thuyền thúng đặc trưng.', keyword: 'Làng chài Mũi Né', tips: 'Buổi chiều là thời điểm ngư dân về bến, khá nhộn nhịp.' },
      { name: 'Suối Tiên Mũi Né', desc: 'Con suối nhỏ chảy qua địa hình đất đỏ độc đáo.', keyword: 'Suối Tiên Mũi Né', tips: 'Nên đi chân trần lội suối, mang theo dép để dễ di chuyển.' }
    ],
    dinner: [
      { dish: 'Hải sản Mũi Né', desc: 'Hải sản tươi sống chế biến hấp, nướng ngay ven biển.', keyword: 'Hải sản Mũi Né' },
      { dish: 'Mực một nắng Phan Thiết', desc: 'Mực phơi một nắng nướng than, chấm tương ớt.', keyword: 'Mực một nắng Phan Thiết' }
    ],
    nightlife: [
      { name: 'Phố biển Mũi Né về đêm', desc: 'Đi dạo bãi biển, thưởng thức hải sản đêm mát mẻ.', keyword: 'Mũi Né về đêm', tips: 'Nhiều resort tổ chức hoạt động giải trí buổi tối cho khách.' }
    ]
  },

  /* -------------------- MIỀN NAM — điểm đến nổi bật -------------------- */

  'Hồ Chí Minh, Hồ Chí Minh': {
    breakfast: [
      { dish: 'Cơm tấm Sài Gòn', desc: 'Cơm tấm sườn bì chả, món sáng - trưa quen thuộc khắp thành phố.', keyword: 'Cơm tấm Sài Gòn thành phố' },
      { dish: 'Hủ tiếu Nam Vang', desc: 'Hủ tiếu nước trong, tôm thịt bằm, phổ biến khắp Sài Gòn.', keyword: 'Hủ tiếu Nam Vang thành phố' },
      { dish: 'Bánh mì Sài Gòn', desc: 'Bánh mì giòn kẹp thịt nguội, pate, đồ chua đặc trưng.', keyword: 'Bánh mì Sài Gòn thành phố' }
    ],
    morningVisit: [
      { name: 'Dinh Độc Lập', desc: 'Di tích lịch sử quan trọng, kiến trúc đặc trưng thập niên 1960.', keyword: 'Dinh Độc Lập thành phố', tips: 'Nên đi cùng hướng dẫn viên để hiểu thêm bối cảnh lịch sử.' },
      { name: 'Nhà thờ Đức Bà & Bưu điện Thành phố', desc: 'Cụm công trình kiến trúc Pháp cổ nổi tiếng giữa trung tâm.', keyword: 'Nhà thờ Đức Bà thành phố', tips: 'Khu vực này rất đông, nên đi từ sớm để chụp ảnh thoải mái.' }
    ],
    lunch: [
      { dish: 'Cơm tấm sườn bì chả', desc: 'Món trưa kinh điển của người Sài Gòn.', keyword: 'Cơm tấm sườn bì chả thành phố' },
      { dish: 'Bánh mì Huỳnh Hoa', desc: 'Ổ bánh mì đầy ắp pate, chả lụa, thịt nguội nổi tiếng.', keyword: 'Bánh mì Huỳnh Hoa thành phố' },
      { dish: 'Gỏi cuốn Sài Gòn', desc: 'Gỏi cuốn tôm thịt tươi mát, chấm tương hoặc mắm nêm.', keyword: 'Gỏi cuốn thành phố' }
    ],
    afternoonVisit: [
      { name: 'Phố đi bộ Nguyễn Huệ', desc: 'Không gian đi bộ hiện đại giữa trung tâm quận 1.', keyword: 'Phố đi bộ Nguyễn Huệ thành phố', tips: 'Buổi chiều mát là thời điểm dễ chịu để dạo bộ.' },
      { name: 'Bảo tàng Chứng tích Chiến tranh', desc: 'Bảo tàng lưu giữ nhiều tư liệu, hiện vật về chiến tranh Việt Nam.', keyword: 'Bảo tàng Chứng tích Chiến tranh thành phố', tips: 'Một số hình ảnh khá nặng nề, cân nhắc nếu đi cùng trẻ nhỏ.' }
    ],
    dinner: [
      { dish: 'Ốc Sài Gòn', desc: 'Các món ốc xào me, hấp sả — món tối quen thuộc của giới trẻ.', keyword: 'Ốc Sài Gòn thành phố' },
      { dish: 'Lẩu mắm miền Tây tại Sài Gòn', desc: 'Lẩu mắm đậm đà hương vị miền Tây ngay giữa thành phố.', keyword: 'Lẩu mắm Sài Gòn thành phố' },
      { dish: 'Cút lộn xào me', desc: 'Món ăn vặt quen thuộc buổi tối, vị chua ngọt hấp dẫn.', keyword: 'Cút lộn xào me thành phố' }
    ],
    nightlife: [
      { name: 'Phố Bùi Viện', desc: 'Khu phố Tây sôi động bậc nhất Sài Gòn về đêm.', keyword: 'Phố Bùi Viện thành phố', tips: 'Rất đông đúc cuối tuần, nên chú ý tư trang cá nhân.' },
      { name: 'Bến Bạch Đằng về đêm', desc: 'Không gian ven sông Sài Gòn, view các toà nhà cao tầng rực sáng.', keyword: 'Bến Bạch Đằng thành phố', tips: 'Có thể đi buýt đường sông để ngắm thành phố từ mặt nước.' }
    ]
  },

  'Vũng Tàu, Hồ Chí Minh': {
    breakfast: [
      { dish: 'Bánh khọt Vũng Tàu', desc: 'Bánh khọt nhỏ giòn nhân tôm, ăn kèm rau sống và nước mắm chua ngọt.', keyword: 'Bánh khọt Vũng Tàu' },
      { dish: 'Bún hải sản Vũng Tàu', desc: 'Bún nước dùng ngọt từ hải sản tươi vùng biển.', keyword: 'Bún hải sản Vũng Tàu' }
    ],
    morningVisit: [
      { name: 'Tượng Chúa Kitô Vua', desc: 'Tượng Chúa lớn trên núi Nhỏ, view toàn cảnh thành phố biển.', keyword: 'Tượng Chúa Kitô Vua Vũng Tàu', tips: 'Cần leo khá nhiều bậc thang lên tới tượng.' },
      { name: 'Ngọn Hải Đăng Vũng Tàu', desc: 'Ngọn hải đăng cổ hơn 100 năm tuổi trên núi Nhỏ.', keyword: 'Hải đăng Vũng Tàu', tips: 'View đẹp để ngắm toàn cảnh vịnh Vũng Tàu.' }
    ],
    lunch: [
      { dish: 'Bánh khọt Vũng Tàu', desc: 'Món trưa đặc sản trứ danh nhất của thành phố biển.', keyword: 'Bánh khọt Vũng Tàu trưa' },
      { dish: 'Lẩu cá đuối', desc: 'Lẩu cá đuối chua cay, đặc sản vùng biển Vũng Tàu.', keyword: 'Lẩu cá đuối Vũng Tàu' }
    ],
    afternoonVisit: [
      { name: 'Bãi Sau Vũng Tàu', desc: 'Bãi biển dài và đẹp, đông đảo du khách tắm biển.', keyword: 'Bãi Sau Vũng Tàu', tips: 'Buổi chiều mát rất thích hợp để tắm biển.' },
      { name: 'Bạch Dinh', desc: 'Biệt thự cổ Pháp trên đồi, từng là nơi nghỉ dưỡng của các quan chức xưa.', keyword: 'Bạch Dinh Vũng Tàu', tips: 'Khuôn viên nhiều cây xanh, thích hợp dạo bộ.' }
    ],
    dinner: [
      { dish: 'Hải sản Vũng Tàu', desc: 'Hải sản tươi sống chế biến hấp, nướng ngay ven biển.', keyword: 'Hải sản Vũng Tàu' },
      { dish: 'Lẩu cá đuối tối', desc: 'Ăn tối cùng lẩu cá đuối đậm đà chua cay.', keyword: 'Lẩu cá đuối Vũng Tàu tối' }
    ],
    nightlife: [
      { name: 'Bãi Trước Vũng Tàu về đêm', desc: 'Đi dạo ven biển, thưởng thức hải sản đêm mát mẻ.', keyword: 'Bãi Trước Vũng Tàu', tips: 'Cuối tuần khu vực này khá đông khách du lịch.' }
    ]
  },

  'Thủ Đức, Hồ Chí Minh': {
    breakfast: [
      { dish: 'Bún bò Thủ Đức', desc: 'Bún bò kiểu miền Trung phổ biến khắp khu vực Thủ Đức.', keyword: 'Bún bò Thủ Đức' },
      { dish: 'Bánh mì Thủ Đức', desc: 'Bánh mì giòn kẹp thịt nguội, món sáng nhanh gọn.', keyword: 'Bánh mì Thủ Đức' }
    ],
    morningVisit: [
      { name: 'Chợ Thủ Đức', desc: 'Khu chợ truyền thống với nhịp sống sôi động của cư dân địa phương.', keyword: 'Chợ Thủ Đức', tips: 'Ghé sớm để chợ còn tươi và đông vui nhất.' },
      { name: 'Công viên Lịch sử Văn hoá Dân tộc', desc: 'Không gian xanh rộng lớn tái hiện lịch sử văn hoá Việt Nam.', keyword: 'Công viên Văn hóa Dân tộc Thủ Đức', tips: 'Thích hợp dạo bộ, đạp xe vào buổi sáng.' }
    ],
    lunch: [
      { dish: 'Cơm tấm Thủ Đức', desc: 'Cơm tấm sườn bì chả, món trưa quen thuộc khu vực.', keyword: 'Cơm tấm Thủ Đức' },
      { dish: 'Bún thịt nướng', desc: 'Bún ăn kèm thịt nướng, chả giò, rau sống, chấm nước mắm chua ngọt.', keyword: 'Bún thịt nướng Thủ Đức' }
    ],
    afternoonVisit: [
      { name: 'Landmark 81', desc: 'Toà nhà cao nhất Việt Nam với đài quan sát nhìn toàn cảnh thành phố.', keyword: 'Landmark 81', tips: 'Nên đặt vé trước nếu muốn lên đài quan sát vào cuối tuần.' },
      { name: 'Bờ sông Sài Gòn khu vực Thủ Đức', desc: 'Không gian ven sông thoáng mát, nhiều quán cà phê view sông.', keyword: 'Sông Sài Gòn Thủ Đức', tips: 'Buổi chiều mát là thời điểm dễ chịu để ngồi cà phê ven sông.' }
    ],
    dinner: [
      { dish: 'Lẩu cá kèo', desc: 'Lẩu cá kèo lá giang chua nhẹ, phổ biến khu vực Thủ Đức.', keyword: 'Lẩu cá kèo Thủ Đức' },
      { dish: 'Ốc Thủ Đức', desc: 'Các món ốc xào me, hấp sả — món tối được giới trẻ ưa chuộng.', keyword: 'Ốc Thủ Đức' }
    ],
    nightlife: [
      { name: 'Phố ẩm thực ven sông Thủ Đức', desc: 'Các quán ăn, cà phê ven sông về đêm khá thoáng mát.', keyword: 'Thủ Đức về đêm', tips: 'Thích hợp ngồi hóng gió sau bữa tối.' }
    ]
  },

  'Huyện Côn Đảo, Hồ Chí Minh': {
    breakfast: [
      { dish: 'Bánh canh Côn Đảo', desc: 'Bánh canh hải sản tươi, món sáng đơn giản của đảo.', keyword: 'Bánh canh Côn Đảo' },
      { dish: 'Bún hải sản Côn Đảo', desc: 'Bún nước dùng ngọt từ hải sản tươi đánh bắt tại đảo.', keyword: 'Bún hải sản Côn Đảo' }
    ],
    morningVisit: [
      { name: 'Nhà tù Côn Đảo', desc: 'Di tích lịch sử nổi tiếng, từng giam giữ nhiều chiến sĩ cách mạng.', keyword: 'Nhà tù Côn Đảo', tips: 'Nên tìm hiểu trước lịch sử để chuyến tham quan ý nghĩa hơn.' },
      { name: 'Nghĩa trang Hàng Dương', desc: 'Nơi an nghỉ của nhiều chiến sĩ cách mạng, có mộ chị Võ Thị Sáu.', keyword: 'Nghĩa trang Hàng Dương', tips: 'Nên giữ thái độ trang nghiêm khi tham quan.' }
    ],
    lunch: [
      { dish: 'Hải sản Côn Đảo', desc: 'Hải sản tươi sống đánh bắt trực tiếp từ ngư dân đảo.', keyword: 'Hải sản Côn Đảo' },
      { dish: 'Ốc vú nàng Côn Đảo', desc: 'Đặc sản ốc biển quý hiếm của vùng biển Côn Đảo.', keyword: 'Ốc vú nàng Côn Đảo' }
    ],
    afternoonVisit: [
      { name: 'Bãi biển An Hải Côn Đảo', desc: 'Bãi biển hoang sơ trong xanh, ít khách du lịch.', keyword: 'Bãi biển An Hải Côn Đảo', tips: 'Buổi chiều mát rất thích hợp để tắm biển.' },
      { name: 'Vườn quốc gia Côn Đảo', desc: 'Khu bảo tồn với rùa biển và hệ sinh thái biển đa dạng.', keyword: 'Vườn quốc gia Côn Đảo', tips: 'Mùa rùa đẻ trứng (khoảng tháng 6-9) rất đáng trải nghiệm.' }
    ],
    dinner: [
      { dish: 'Cá mú Côn Đảo hấp', desc: 'Cá mú tươi hấp xì dầu, đặc sản biển đảo.', keyword: 'Cá mú Côn Đảo' },
      { dish: 'Tôm hùm Côn Đảo', desc: 'Tôm hùm tươi chế biến nướng hoặc hấp, đặc sản quý của đảo.', keyword: 'Tôm hùm Côn Đảo' }
    ],
    nightlife: [
      { name: 'Thị trấn Côn Đảo về đêm', desc: 'Không gian yên tĩnh, ít ánh đèn thành phố, thích hợp ngắm sao.', keyword: 'Côn Đảo về đêm', tips: 'Đảo khá yên tĩnh về đêm, phù hợp nghỉ ngơi sớm.' }
    ]
  },

  'Long Xuyên, An Giang': {
    breakfast: [
      { dish: 'Bún cá Long Xuyên', desc: 'Bún cá lóc nước dùng nghệ vàng, ăn kèm rau muống bào.', keyword: 'Bún cá Long Xuyên' },
      { dish: 'Cháo bò Long Xuyên', desc: 'Cháo bò đậm đà, món sáng phổ biến của vùng đất An Giang.', keyword: 'Cháo bò Long Xuyên' }
    ],
    morningVisit: [
      { name: 'Chợ nổi Long Xuyên', desc: 'Chợ nổi trên sông Hậu, nét văn hoá sông nước đặc trưng miền Tây.', keyword: 'Chợ nổi Long Xuyên', tips: 'Nên đi thật sớm (5h-7h) khi chợ còn tấp nập nhất.' },
      { name: 'Cù lao Ông Hổ', desc: 'Cù lao quê hương Chủ tịch Tôn Đức Thắng giữa sông Hậu.', keyword: 'Cù lao Ông Hổ', tips: 'Kết hợp tham quan khu lưu niệm Bác Tôn tại đây.' }
    ],
    lunch: [
      { dish: 'Bún cá Long Xuyên', desc: 'Món trưa đặc sản nổi tiếng của vùng đất An Giang.', keyword: 'Bún cá Long Xuyên trưa' },
      { dish: 'Cơm tấm Long Xuyên', desc: 'Cơm tấm phiên bản miền Tây, ăn kèm bì và nước mắm.', keyword: 'Cơm tấm Long Xuyên' }
    ],
    afternoonVisit: [
      { name: 'Khu lưu niệm Chủ tịch Tôn Đức Thắng', desc: 'Không gian tưởng niệm vị Chủ tịch nước quê An Giang.', keyword: 'Khu lưu niệm Tôn Đức Thắng', tips: 'Phù hợp cho chuyến đi tìm hiểu lịch sử.' },
      { name: 'Búng Bình Thiên', desc: 'Hồ nước ngọt tự nhiên lớn, cảnh sắc yên bình vùng biên giới.', keyword: 'Búng Bình Thiên', tips: 'Có thể chèo xuồng dạo quanh hồ vào buổi chiều.' }
    ],
    dinner: [
      { dish: 'Lẩu cá linh bông điên điển', desc: 'Món lẩu đặc trưng mùa nước nổi miền Tây.', keyword: 'Lẩu cá linh bông điên điển Long Xuyên' },
      { dish: 'Gỏi sầu đâu', desc: 'Gỏi lá sầu đâu trộn khô cá, vị đắng nhẹ hậu ngọt lạ miệng.', keyword: 'Gỏi sầu đâu Long Xuyên' }
    ],
    nightlife: [
      { name: 'Bờ sông Hậu Long Xuyên về đêm', desc: 'Không gian đi dạo ven sông mát mẻ về đêm.', keyword: 'Sông Hậu Long Xuyên', tips: 'Phù hợp đi dạo nhẹ nhàng sau bữa tối.' }
    ]
  },

  'Châu Đốc, An Giang': {
    breakfast: [
      { dish: 'Bún cá Châu Đốc', desc: 'Bún cá lóc nước dùng nghệ vàng, ăn kèm rau muống bào.', keyword: 'Bún cá Châu Đốc thành phố' },
      { dish: 'Bánh bò thốt nốt', desc: 'Bánh bò mềm xốp làm từ đường thốt nốt đặc trưng An Giang.', keyword: 'Bánh bò thốt nốt Châu Đốc' }
    ],
    morningVisit: [
      { name: 'Miếu Bà Chúa Xứ', desc: 'Điểm hành hương nổi tiếng bậc nhất vùng Bảy Núi.', keyword: 'Miếu Bà Chúa Xứ Châu Đốc', tips: 'Ăn mặc lịch sự, chuẩn bị tinh thần khá đông vào mùa lễ hội.' },
      { name: 'Rừng tràm Trà Sư', desc: 'Rừng tràm ngập nước nổi tiếng, đi xuồng ba lá ngắm cảnh.', keyword: 'Rừng tràm Trà Sư Châu Đốc', tips: 'Mùa nước nổi (tháng 9-11) là đẹp nhất để tham quan.' }
    ],
    lunch: [
      { dish: 'Bún cá Châu Đốc', desc: 'Món trưa đặc sản nổi tiếng vùng biên giới Tây Nam.', keyword: 'Bún cá Châu Đốc trưa thành phố' },
      { dish: 'Gỏi sầu đâu', desc: 'Gỏi lá sầu đâu trộn khô cá, vị đắng nhẹ hậu ngọt lạ miệng.', keyword: 'Gỏi sầu đâu Châu Đốc' }
    ],
    afternoonVisit: [
      { name: 'Núi Sam Châu Đốc', desc: 'Ngọn núi gắn với quần thể di tích tâm linh nổi tiếng.', keyword: 'Núi Sam Châu Đốc thành phố', tips: 'Có thể kết hợp tham quan Lăng Thoại Ngọc Hầu gần đó.' },
      { name: 'Chợ Châu Đốc', desc: 'Khu chợ nổi tiếng với các loại mắm và khô đặc sản.', keyword: 'Chợ Châu Đốc', tips: 'Thích hợp mua mắm, khô làm quà mang về.' }
    ],
    dinner: [
      { dish: 'Mắm Châu Đốc', desc: 'Đặc sản mắm nổi tiếng vùng An Giang, ăn kèm bún hoặc cơm.', keyword: 'Mắm Châu Đốc thành phố' },
      { dish: 'Cá lóc nướng trui', desc: 'Cá lóc nướng rơm, cuốn bánh tráng và rau rừng.', keyword: 'Cá lóc nướng trui Châu Đốc' }
    ],
    nightlife: [
      { name: 'Chợ đêm Châu Đốc', desc: 'Khu chợ đêm với đặc sản mắm, khô và ẩm thực đường phố.', keyword: 'Chợ đêm Châu Đốc thành phố', tips: 'Thích hợp mua mắm, khô làm quà mang về.' }
    ]
  },

  'Phú Quốc, An Giang': {
    breakfast: [
      { dish: 'Bún kèn Phú Quốc', desc: 'Bún nước dùng cá và nước cốt dừa, món sáng đặc trưng đảo ngọc.', keyword: 'Bún kèn Phú Quốc' },
      { dish: 'Bánh canh chả cá Phú Quốc', desc: 'Bánh canh bột gạo, chả cá chiên vàng đậm vị biển.', keyword: 'Bánh canh chả cá Phú Quốc' }
    ],
    morningVisit: [
      { name: 'Vinpearl Safari Phú Quốc', desc: 'Vườn thú bán hoang dã lớn với nhiều loài động vật quý hiếm.', keyword: 'Vinpearl Safari Phú Quốc', tips: 'Nên đi từ sớm để tránh nắng và có nhiều thời gian tham quan.' },
      { name: 'Chợ Dinh Cậu', desc: 'Chợ hải sản và khu tâm linh nổi tiếng ngay trung tâm thị trấn.', keyword: 'Dinh Cậu Phú Quốc', tips: 'Kết hợp mua hải sản tươi và tham quan Dinh Cậu gần đó.' }
    ],
    lunch: [
      { dish: 'Gỏi cá trích Phú Quốc', desc: 'Gỏi cá trích tươi trộn dừa nạo, đặc sản trứ danh của đảo.', keyword: 'Gỏi cá trích Phú Quốc' },
      { dish: 'Bún quậy Phú Quốc', desc: 'Bún tươi làm tại chỗ, ăn kèm hải sản và nước chấm đặc biệt.', keyword: 'Bún quậy Phú Quốc' }
    ],
    afternoonVisit: [
      { name: 'Bãi Sao Phú Quốc', desc: 'Bãi biển cát trắng nước trong xanh đẹp bậc nhất đảo ngọc.', keyword: 'Bãi Sao Phú Quốc', tips: 'Buổi chiều mát rất thích hợp để tắm biển.' },
      { name: 'Cáp treo Hòn Thơm', desc: 'Cáp treo vượt biển dài nhất thế giới, ngắm toàn cảnh biển đảo.', keyword: 'Cáp treo Hòn Thơm', tips: 'Nên đặt vé trước vào mùa cao điểm du lịch.' }
    ],
    dinner: [
      { dish: 'Hải sản Phú Quốc', desc: 'Ghẹ, tôm hùm, nhum biển tươi sống chế biến đa dạng.', keyword: 'Hải sản Phú Quốc' },
      { dish: 'Nhum biển Phú Quốc', desc: 'Nhum biển tươi ăn sống với mù tạt hoặc nướng mỡ hành.', keyword: 'Nhum biển Phú Quốc' }
    ],
    nightlife: [
      { name: 'Chợ đêm Phú Quốc', desc: 'Khu chợ đêm sầm uất với hải sản và đặc sản đảo ngọc.', keyword: 'Chợ đêm Phú Quốc', tips: 'Nên hỏi giá trước khi gọi món hải sản theo cân.' }
    ]
  },

  'Hà Tiên, An Giang': {
    breakfast: [
      { dish: 'Bún kèn Hà Tiên', desc: 'Bún nước dùng cá và nước cốt dừa, món sáng đặc trưng vùng biển Tây Nam.', keyword: 'Bún kèn Hà Tiên' },
      { dish: 'Bánh canh Hà Tiên', desc: 'Bánh canh bột gạo, chả cá chiên vàng đậm vị biển.', keyword: 'Bánh canh Hà Tiên' }
    ],
    morningVisit: [
      { name: 'Thạch Động Hà Tiên', desc: 'Hang động đá vôi với truyền thuyết Thạch Sanh, cảnh quan kỳ vĩ.', keyword: 'Thạch Động Hà Tiên', tips: 'Đường vào hang có bậc thang, nên đi giày thoải mái.' },
      { name: 'Chùa Phù Dung', desc: 'Ngôi chùa cổ gắn với giai thoại lịch sử vùng đất Hà Tiên.', keyword: 'Chùa Phù Dung Hà Tiên', tips: 'Không gian yên tĩnh, thích hợp tham quan chậm rãi.' }
    ],
    lunch: [
      { dish: 'Gỏi cá trích Hà Tiên', desc: 'Gỏi cá trích tươi trộn dừa nạo, đặc sản vùng biển Tây Nam.', keyword: 'Gỏi cá trích Hà Tiên' },
      { dish: 'Bún cá Hà Tiên', desc: 'Bún cá lóc nước dùng nghệ vàng, ăn kèm rau sống.', keyword: 'Bún cá Hà Tiên' }
    ],
    afternoonVisit: [
      { name: 'Mũi Nai Hà Tiên', desc: 'Bãi biển đẹp với hình dáng núi giống đầu con nai.', keyword: 'Mũi Nai Hà Tiên', tips: 'Buổi chiều mát rất thích hợp để tắm biển và ngắm hoàng hôn.' },
      { name: 'Đầm Đông Hồ', desc: 'Đầm nước tự nhiên với cảnh sắc yên bình vùng biên giới.', keyword: 'Đầm Đông Hồ Hà Tiên', tips: 'Thích hợp ngắm cảnh vào buổi chiều mát.' }
    ],
    dinner: [
      { dish: 'Hải sản Hà Tiên', desc: 'Hải sản tươi sống chế biến hấp, nướng ngay ven biển.', keyword: 'Hải sản Hà Tiên' },
      { dish: 'Ốc Hà Tiên', desc: 'Các món ốc biển hấp, xào sả ớt đậm đà.', keyword: 'Ốc Hà Tiên' }
    ],
    nightlife: [
      { name: 'Phố biển Hà Tiên về đêm', desc: 'Đi dạo bãi biển, thưởng thức hải sản đêm mát mẻ.', keyword: 'Hà Tiên về đêm', tips: 'Không khí biên giới về đêm khá yên bình.' }
    ]
  },

  'Sa Đéc, Đồng Tháp': {
    breakfast: [
      { dish: 'Hủ tiếu Sa Đéc', desc: 'Hủ tiếu sợi dai đặc trưng, nước dùng ngọt xương thanh.', keyword: 'Hủ tiếu Sa Đéc thị xã' },
      { dish: 'Bánh xèo miền Tây', desc: 'Bánh xèo giòn nhân tôm thịt giá đỗ, ăn kèm rau vườn.', keyword: 'Bánh xèo Sa Đéc' }
    ],
    morningVisit: [
      { name: 'Làng hoa Sa Đéc', desc: 'Làng hoa lớn nhất miền Tây, rực rỡ sắc màu quanh năm.', keyword: 'Làng hoa Sa Đéc thị xã', tips: 'Dịp cận Tết là thời điểm hoa nở rộ nhất.' },
      { name: 'Nhà cổ Huỳnh Thủy Lê', desc: 'Ngôi nhà cổ gắn liền với câu chuyện tình trong tiểu thuyết "Người tình".', keyword: 'Nhà cổ Huỳnh Thủy Lê', tips: 'Kiến trúc pha trộn Đông - Tây độc đáo, rất đáng tham quan.' }
    ],
    lunch: [
      { dish: 'Hủ tiếu Sa Đéc', desc: 'Món trưa đặc sản trứ danh của vùng đất sen hồng.', keyword: 'Hủ tiếu Sa Đéc trưa thị xã' },
      { dish: 'Cá lóc nướng trui', desc: 'Cá lóc nướng rơm, cuốn bánh tráng và rau sống.', keyword: 'Cá lóc nướng trui Sa Đéc' }
    ],
    afternoonVisit: [
      { name: 'Vườn hồng Sa Đéc', desc: 'Vườn hoa hồng đa dạng giống, một phần của làng hoa nổi tiếng.', keyword: 'Vườn hồng Sa Đéc', tips: 'Buổi chiều nắng dịu là thời điểm đẹp để chụp ảnh.' },
      { name: 'Chợ Sa Đéc', desc: 'Chợ truyền thống ven sông Tiền, nhịp sống buôn bán sông nước.', keyword: 'Chợ Sa Đéc', tips: 'Ghé sớm để chợ còn tươi và đông vui nhất.' }
    ],
    dinner: [
      { dish: 'Lẩu cá linh bông điên điển', desc: 'Món lẩu đặc trưng mùa nước nổi miền Tây.', keyword: 'Lẩu cá linh bông điên điển Sa Đéc' },
      { dish: 'Nem Lai Vung', desc: 'Nem chua đặc sản của huyện Lai Vung, Đồng Tháp.', keyword: 'Nem Lai Vung Sa Đéc' }
    ],
    nightlife: [
      { name: 'Phố đi bộ ven sông Sa Đéc', desc: 'Không gian đi dạo, ẩm thực nhẹ ven sông về đêm.', keyword: 'Sông Sa Đéc về đêm thị xã', tips: 'Không khí yên bình, phù hợp thư giãn sau một ngày tham quan.' }
    ]
  },

  'Mỹ Tho, Đồng Tháp': {
    breakfast: [
      { dish: 'Hủ tiếu Mỹ Tho', desc: 'Hủ tiếu sợi khô dai đặc trưng, nước dùng ngọt xương thanh nổi tiếng khắp cả nước.', keyword: 'Hủ tiếu Mỹ Tho' },
      { dish: 'Bún gỏi già Mỹ Tho', desc: 'Bún nước lèo me chua nhẹ, ăn kèm thịt heo quay.', keyword: 'Bún gỏi già Mỹ Tho' }
    ],
    morningVisit: [
      { name: 'Cù lao Thới Sơn', desc: 'Cù lao xanh mát giữa sông Tiền, nổi tiếng với vườn trái cây và đờn ca tài tử.', keyword: 'Cù lao Thới Sơn', tips: 'Có thể trải nghiệm chèo xuồng qua kênh rạch rợp bóng dừa.' },
      { name: 'Chùa Vĩnh Tràng', desc: 'Ngôi chùa cổ kiến trúc pha trộn Việt - Khmer - Pháp độc đáo.', keyword: 'Chùa Vĩnh Tràng', tips: 'Kiến trúc rất đẹp, thích hợp chụp ảnh vào buổi sáng.' }
    ],
    lunch: [
      { dish: 'Hủ tiếu Mỹ Tho', desc: 'Món trưa đặc sản trứ danh nhất của vùng đất Tiền Giang.', keyword: 'Hủ tiếu Mỹ Tho trưa' },
      { dish: 'Cá lóc nướng trui', desc: 'Cá lóc nướng rơm, cuốn bánh tráng và rau sống.', keyword: 'Cá lóc nướng trui Mỹ Tho' }
    ],
    afternoonVisit: [
      { name: 'Trại rắn Đồng Tâm', desc: 'Khu nuôi và nghiên cứu rắn lớn, tìm hiểu đa dạng sinh học vùng sông nước.', keyword: 'Trại rắn Đồng Tâm', tips: 'Phù hợp cho gia đình có trẻ nhỏ tò mò về thiên nhiên.' },
      { name: 'Vườn trái cây cù lao', desc: 'Tham quan, hái trái cây tại các miệt vườn ven sông Tiền.', keyword: 'Vườn trái cây Mỹ Tho', tips: 'Mùa trái cây rộ thường vào khoảng tháng 5 - 8.' }
    ],
    dinner: [
      { dish: 'Lẩu cá kèo lá giang', desc: 'Lẩu chua nhẹ vị lá giang, phổ biến khắp miền Tây.', keyword: 'Lẩu cá kèo lá giang Mỹ Tho' },
      { dish: 'Cá tai tượng chiên xù', desc: 'Cá tai tượng chiên giòn, cuốn bánh tráng rau sống.', keyword: 'Cá tai tượng chiên xù Mỹ Tho' }
    ],
    nightlife: [
      { name: 'Bờ sông Tiền Mỹ Tho về đêm', desc: 'Không gian ven sông mát mẻ, ngắm ghe thuyền về đêm.', keyword: 'Sông Tiền Mỹ Tho', tips: 'Phù hợp đi dạo nhẹ nhàng sau bữa tối.' }
    ]
  },

  'Cần Thơ, Cần Thơ': {
    breakfast: [
      { dish: 'Bánh xèo miền Tây', desc: 'Bánh xèo giòn nhân tôm thịt, cuốn cùng rau vườn miền Tây.', keyword: 'Bánh xèo Cần Thơ thành phố' },
      { dish: 'Hủ tiếu Cần Thơ', desc: 'Hủ tiếu nước trong, topping tôm thịt đầy đặn.', keyword: 'Hủ tiếu Cần Thơ thành phố' },
      { dish: 'Bún gỏi già', desc: 'Bún nước lèo me chua nhẹ, ăn kèm thịt heo quay.', keyword: 'Bún gỏi già Cần Thơ thành phố' }
    ],
    morningVisit: [
      { name: 'Chợ nổi Cái Răng', desc: 'Chợ nổi lớn và nổi tiếng nhất miền Tây Nam Bộ.', keyword: 'Chợ nổi Cái Răng', tips: 'Nên đi thật sớm (5h-7h) khi chợ còn tấp nập nhất.' },
      { name: 'Nhà cổ Bình Thủy', desc: 'Ngôi nhà cổ kiến trúc Pháp hơn 100 năm tuổi.', keyword: 'Nhà cổ Bình Thủy', tips: 'Kiến trúc rất đẹp, thích hợp chụp ảnh vào buổi sáng.' }
    ],
    lunch: [
      { dish: 'Bún gỏi già', desc: 'Đặc sản nổi tiếng của vùng đất Tây Đô.', keyword: 'Bún gỏi già Cần Thơ trưa' },
      { dish: 'Lẩu mắm miền Tây', desc: 'Lẩu mắm cá linh, cá sặc, ăn kèm rất nhiều loại rau.', keyword: 'Lẩu mắm Cần Thơ' },
      { dish: 'Cá lóc nướng trui', desc: 'Cá lóc nướng rơm, cuốn bánh tráng và rau sống.', keyword: 'Cá lóc nướng trui Cần Thơ' }
    ],
    afternoonVisit: [
      { name: 'Cù lao ven sông Hậu', desc: 'Đạp xe hoặc đi thuyền quanh cù lao xanh mát.', keyword: 'Cù lao sông Hậu Cần Thơ', tips: 'Buổi chiều mát là thời điểm dễ chịu để tham quan.' },
      { name: 'Thiền viện Trúc Lâm Phương Nam', desc: 'Thiền viện lớn mang kiến trúc Phật giáo truyền thống Việt Nam.', keyword: 'Thiền viện Trúc Lâm Phương Nam', tips: 'Không gian yên tĩnh, thích hợp tham quan chậm rãi.' }
    ],
    dinner: [
      { dish: 'Lẩu cá kèo lá giang', desc: 'Lẩu chua nhẹ vị lá giang, phổ biến khắp miền Tây.', keyword: 'Lẩu cá kèo lá giang Cần Thơ' },
      { dish: 'Ốc bươu nướng tiêu', desc: 'Món nhậu vặt quen thuộc buổi tối miền sông nước.', keyword: 'Ốc bươu nướng tiêu Cần Thơ' },
      { dish: 'Cá tra kho tộ', desc: 'Món cá kho đậm đà ăn kèm cơm trắng.', keyword: 'Cá tra kho tộ Cần Thơ' }
    ],
    nightlife: [
      { name: 'Bến Ninh Kiều về đêm', desc: 'Không gian đi bộ ven sông Hậu, tàu du lịch thắp đèn rực rỡ.', keyword: 'Bến Ninh Kiều thành phố', tips: 'Có thể trải nghiệm đi tàu ngắm sông Hậu về đêm.' }
    ]
  },

  'Cà Mau, Cà Mau': {
    breakfast: [
      { dish: 'Bún nước lèo', desc: 'Bún nước lèo cá lóc hoặc cá kèo, đặc trưng miền Tây Nam Bộ.', keyword: 'Bún nước lèo Cà Mau thành phố' },
      { dish: 'Bánh tằm cay', desc: 'Bánh tằm chan nước cà ri cay nhẹ, món sáng lạ miệng.', keyword: 'Bánh tằm cay Cà Mau thành phố' }
    ],
    morningVisit: [
      { name: 'Mũi Cà Mau', desc: 'Điểm cực Nam của Tổ quốc, biểu tượng cột mốc toạ độ quốc gia.', keyword: 'Mũi Cà Mau', tips: 'Nên đi cùng hướng dẫn viên địa phương để hiểu thêm hệ sinh thái rừng ngập mặn.' },
      { name: 'Rừng ngập mặn Mũi Cà Mau', desc: 'Trải nghiệm hệ sinh thái rừng ngập mặn đặc trưng cực Nam Tổ quốc.', keyword: 'Rừng ngập mặn Mũi Cà Mau', tips: 'Có thể đi xuồng len lỏi trong rừng ngập mặn.' }
    ],
    lunch: [
      { dish: 'Lẩu mắm U Minh', desc: 'Lẩu mắm cá đồng đậm vị, ăn kèm rất nhiều rau rừng.', keyword: 'Lẩu mắm U Minh thành phố' },
      { dish: 'Ba khía Rạch Gốc', desc: 'Ba khía muối trộn chua ngọt, đặc sản trứ danh Cà Mau.', keyword: 'Ba khía Rạch Gốc thành phố' }
    ],
    afternoonVisit: [
      { name: 'Vườn quốc gia U Minh Hạ', desc: 'Rừng tràm nguyên sinh rộng lớn, hệ sinh thái độc đáo.', keyword: 'Vườn quốc gia U Minh Hạ thành phố', tips: 'Có thể trải nghiệm đi xuồng len lỏi trong rừng tràm.' },
      { name: 'Chợ Cà Mau', desc: 'Chợ trung tâm với hải sản và đặc sản rừng ngập mặn.', keyword: 'Chợ Cà Mau thành phố', tips: 'Ghé sớm để chọn được hải sản tươi ngon nhất.' }
    ],
    dinner: [
      { dish: 'Tôm tít nướng', desc: 'Tôm tít nướng muối ớt, hải sản tươi vùng biển Cà Mau.', keyword: 'Tôm tít nướng Cà Mau thành phố' },
      { dish: 'Cua Cà Mau hấp', desc: 'Cua biển Cà Mau nổi tiếng thịt chắc, gạch béo.', keyword: 'Cua Cà Mau thành phố' }
    ],
    nightlife: [
      { name: 'Chợ đêm Cà Mau', desc: 'Khu ẩm thực đường phố nhỏ với hải sản và đặc sản địa phương.', keyword: 'Chợ đêm Cà Mau thành phố', tips: 'Nên hỏi giá trước khi gọi món hải sản theo cân.' }
    ]
  },

  'Bạc Liêu, Cà Mau': {
    breakfast: [
      { dish: 'Bánh tằm bì Bạc Liêu', desc: 'Bánh tằm ăn kèm bì heo, nước cốt dừa béo ngậy.', keyword: 'Bánh tằm bì Bạc Liêu' },
      { dish: 'Bún nước lèo Bạc Liêu', desc: 'Bún nước lèo cá lóc, đặc trưng ẩm thực Khmer Nam Bộ.', keyword: 'Bún nước lèo Bạc Liêu' }
    ],
    morningVisit: [
      { name: 'Nhà Công tử Bạc Liêu', desc: 'Ngôi nhà cổ gắn với giai thoại "Công tử Bạc Liêu" nổi tiếng.', keyword: 'Nhà Công tử Bạc Liêu', tips: 'Nên tìm hiểu trước giai thoại để chuyến tham quan thú vị hơn.' },
      { name: 'Quán âm Phật đài', desc: 'Tượng Phật Bà Nam Hải lớn nhìn ra biển, điểm hành hương nổi tiếng.', keyword: 'Quán âm Phật đài Bạc Liêu', tips: 'Ăn mặc lịch sự khi tham quan khu vực tượng Phật.' }
    ],
    lunch: [
      { dish: 'Bún bò cay Bạc Liêu', desc: 'Bún bò nước dùng cay nồng đặc trưng vùng đất Bạc Liêu.', keyword: 'Bún bò cay Bạc Liêu' },
      { dish: 'Ba khía Bạc Liêu', desc: 'Ba khía muối trộn chua ngọt, đặc sản miền Tây Nam Bộ.', keyword: 'Ba khía Bạc Liêu' }
    ],
    afternoonVisit: [
      { name: 'Cánh đồng điện gió Bạc Liêu', desc: 'Cánh đồng turbine điện gió ngoài biển độc đáo, cảnh quan hiện đại.', keyword: 'Điện gió Bạc Liêu', tips: 'Thích hợp chụp ảnh vào buổi chiều khi ánh nắng dịu.' },
      { name: 'Vườn nhãn cổ Bạc Liêu', desc: 'Vườn nhãn hơn 100 năm tuổi, đặc sản trái cây nổi tiếng vùng đất này.', keyword: 'Vườn nhãn cổ Bạc Liêu', tips: 'Mùa nhãn chín thường vào khoảng tháng 7-8.' }
    ],
    dinner: [
      { dish: 'Bánh xèo Bạc Liêu', desc: 'Bánh xèo giòn nhân tôm thịt, ăn kèm rau vườn đặc trưng miền Tây.', keyword: 'Bánh xèo Bạc Liêu' },
      { dish: 'Cá kèo kho rau răm', desc: 'Cá kèo kho đậm đà, ăn kèm cơm trắng nóng hổi.', keyword: 'Cá kèo kho rau răm Bạc Liêu' }
    ],
    nightlife: [
      { name: 'Phố đờn ca tài tử Bạc Liêu', desc: 'Không gian nghe đờn ca tài tử Nam Bộ, di sản văn hoá phi vật thể.', keyword: 'Đờn ca tài tử Bạc Liêu', tips: 'Nên hỏi trước lịch biểu diễn tại các điểm cố định.' }
    ]
  }
};
