// nights-stepper.js — Xử lý tăng/giảm và nhập tay cho mục "Số Đêm"
// Gắn vào các phần tử: #btn-minus-nights, #btn-plus-nights, #nights
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var input = document.getElementById("nights");
    var btnMinus = document.getElementById("btn-minus-nights");
    var btnPlus = document.getElementById("btn-plus-nights");

    if (!input || !btnMinus || !btnPlus) return;

    var min = parseInt(input.getAttribute("min"), 10);
    var max = parseInt(input.getAttribute("max"), 10);
    if (isNaN(min)) min = 0;
    if (isNaN(max)) max = 30;

    // Lấy giá trị hiện tại của input, trả về min nếu rỗng/không hợp lệ
    function getValue() {
      var v = parseInt(input.value, 10);
      if (isNaN(v)) return min;
      return v;
    }

    // Ép giá trị về trong khoảng [min, max]
    function clamp(v) {
      if (v < min) return min;
      if (v > max) return max;
      return v;
    }

    // Cập nhật trạng thái disabled của 2 nút theo giá trị hiện tại
    function updateButtonsState(v) {
      btnMinus.disabled = v <= min;
      btnPlus.disabled = v >= max;
    }

    // Ghi giá trị vào input + bắn sự kiện "change" để các phần khác (nếu có) nhận biết
    function setValue(v) {
      v = clamp(v);
      input.value = v;
      updateButtonsState(v);
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }

    // Nút trừ (-)
    btnMinus.addEventListener("click", function () {
      setValue(getValue() - 1);
    });

    // Nút cộng (+)
    btnPlus.addEventListener("click", function () {
      setValue(getValue() + 1);
    });

    // Người dùng gõ tay: chỉ cho phép số, không giới hạn ngay khi đang gõ
    // để không cản trở việc gõ (ví dụ đang gõ "1" của "12")
    input.addEventListener("input", function () {
      input.value = input.value.replace(/[^0-9]/g, "");
      var v = parseInt(input.value, 10);
      btnMinus.disabled = !isNaN(v) && v <= min;
      btnPlus.disabled = !isNaN(v) && v >= max;
    });

    // Khi rời khỏi ô nhập: KHÔNG tự điền số nếu người dùng cố tình để trống.
    // Chỉ chỉnh lại nếu có số nhưng vượt ngoài khoảng min-max.
    input.addEventListener("blur", function () {
      if (input.value === "") return; // để trống thì giữ trống, không tự nhảy số
      var v = parseInt(input.value, 10);
      if (isNaN(v)) {
        input.value = "";
        return;
      }
      setValue(v); // chỉ ép về min/max khi số nhập vào vượt khoảng cho phép
    });

    // Khởi tạo trạng thái nút lúc tải trang
    updateButtonsState(getValue());
  });
})();
