/* ============================================================
   VNFinder — AUTH MODULE v3
   Backend: JSONBin.io (cloud storage) + localStorage fallback

   HƯỚNG DẪN SETUP JSONBin.io:
   1. Truy cập https://jsonbin.io và đăng ký tài khoản miễn phí
   2. Vào "API Keys" → copy X-Master-Key → điền vào JSONBIN_API_KEY bên dưới
   3. Click "Create Bin" → paste {"users": []} → lưu → copy Bin ID
   4. Điền Bin ID vào JSONBIN_BIN_ID bên dưới
   5. Khi chưa điền đủ 2 giá trị trên, hệ thống tự dùng localStorage

   BẢO MẬT: Đây là hackathon demo tĩnh — API key hiển thị client-side
   là bình thường. Với sản phẩm thật cần dùng backend server riêng.
   ============================================================ */

(function () {
  'use strict';

  /* ====================== CẤU HÌNH JSONBin.io ====================== */
  var JSONBIN_API_KEY = '';   // ← Điền X-Master-Key từ jsonbin.io vào đây
  var JSONBIN_BIN_ID  = '';   // ← Điền Bin ID từ jsonbin.io vào đây
  var JSONBIN_BASE    = 'https://api.jsonbin.io/v3/b';

  /* ========================= CONSTANTS ========================= */
  var SESSION_KEY     = 'vnfinder_session';
  var LOCAL_USERS_KEY = 'vnfinder_users_local'; // Fallback khi chưa có JSONBin

  /* ========================= HELPERS ========================= */
  function qs(id) { return document.getElementById(id); }

  function escapeHTML(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function isValidEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
  }

  function isJsonBinConfigured() {
    return JSONBIN_API_KEY && JSONBIN_BIN_ID &&
           JSONBIN_API_KEY !== '' && JSONBIN_BIN_ID !== '';
  }

  /* ========================= ĐIỀU HƯỚNG PANEL ========================= */
  // Dùng đúng cơ chế của nav.js: click tab có data-panel,
  // hoặc nếu không có tab tương ứng thì ẩn/hiện trực tiếp
  function navigateTo(panelId) {
    var tab = document.querySelector('.sh-tab[data-panel="' + panelId + '"]');
    if (tab) {
      tab.click();   // nav.js xử lý toàn bộ: ẩn panel cũ, hiện panel mới
    } else {
      // panel login/signup không có tab → điều hướng thủ công
      document.querySelectorAll('.sh-panel').forEach(function (p) {
        p.hidden = p.id !== panelId;
      });
      document.querySelectorAll('.sh-tab').forEach(function (t) {
        t.setAttribute('aria-selected', 'false');
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ========================= THÔNG BÁO FORM ========================= */
  function setMessage(el, text, kind) {
    if (!el) return;
    if (!text) {
      el.hidden = true;
      el.textContent = '';
      el.className = 'auth-message';
      return;
    }
    el.hidden = false;
    el.textContent = text;
    el.className = 'auth-message' +
      (kind === 'error'   ? ' is-error'   :
       kind === 'success' ? ' is-success'  : '');
  }

  function setLoading(btn, loading) {
    if (!btn) return;
    btn.disabled = loading;
    btn.classList.toggle('is-loading', loading);
  }

  /* ========================= JSONBIN.IO API ========================= */

  // Lấy danh sách users từ JSONBin
  function fetchUsers() {
    return fetch(JSONBIN_BASE + '/' + JSONBIN_BIN_ID + '/latest', {
      method: 'GET',
      headers: {
        'X-Master-Key': JSONBIN_API_KEY,
        'X-Bin-Meta':   'false'
      }
    })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(function (data) {
      // JSONBin trả về { record: { users: [...] } } khi X-Bin-Meta: false
      // hoặc { record: {...} } bình thường
      var record = data.record || data;
      return Array.isArray(record.users) ? record.users : [];
    });
  }

  // Cập nhật danh sách users lên JSONBin (PUT toàn bộ bin)
  function saveUsersRemote(users) {
    return fetch(JSONBIN_BASE + '/' + JSONBIN_BIN_ID, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': JSONBIN_API_KEY
      },
      body: JSON.stringify({ users: users })
    })
    .then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return true;
    });
  }

  /* ========================= LOCALSTORAGE FALLBACK ========================= */
  function getLocalUsers() {
    try {
      var raw = localStorage.getItem(LOCAL_USERS_KEY);
      var parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) { return []; }
  }

  function saveLocalUsers(users) {
    try {
      localStorage.setItem(LOCAL_USERS_KEY, JSON.stringify(users));
      return true;
    } catch (e) { return false; }
  }

  /* ========================= THAO TÁC NGƯỜI DÙNG ========================= */
  // Luôn trả về Promise để code form dùng chung 1 luồng
  function getUsers() {
    if (isJsonBinConfigured()) {
      return fetchUsers().catch(function (err) {
        console.warn('[VNFinder Auth] JSONBin lỗi, dùng localStorage:', err);
        return getLocalUsers();
      });
    }
    return Promise.resolve(getLocalUsers());
  }

  function saveUsers(users) {
    if (isJsonBinConfigured()) {
      // Lưu lên cloud, đồng thời lưu local để cache
      return saveUsersRemote(users)
        .then(function () { saveLocalUsers(users); return true; })
        .catch(function (err) {
          console.warn('[VNFinder Auth] JSONBin lỗi khi lưu, fallback local:', err);
          return saveLocalUsers(users);
        });
    }
    return Promise.resolve(saveLocalUsers(users));
  }

  /* ========================= ĐĂNG KÝ ========================= */
  function handleSignup(e) {
    e.preventDefault();
    var msgEl    = qs('signup-message');
    var emailEl  = qs('signup-email');
    var userEl   = qs('signup-username');
    var passEl   = qs('signup-password');
    var submitEl = e.target.querySelector('.auth-submit');

    var email    = emailEl.value.trim();
    var username = userEl.value.trim();
    var password = passEl.value;

    /* Validate phía client */
    setMessage(msgEl, '', null);
    if (!email || !username || !password) {
      setMessage(msgEl, 'Vui lòng điền đầy đủ thông tin.', 'error');
      return;
    }
    if (!isValidEmail(email)) {
      setMessage(msgEl, 'Địa chỉ email không hợp lệ.', 'error');
      return;
    }
    if (password.length < 8) {
      setMessage(msgEl, 'Mật khẩu phải có ít nhất 8 ký tự.', 'error');
      return;
    }

    setLoading(submitEl, true);
    setMessage(msgEl, 'Đang kiểm tra thông tin…', null);

    getUsers().then(function (users) {
      var emailTaken    = users.some(function (u) { return u.email.toLowerCase()    === email.toLowerCase(); });
      var usernameTaken = users.some(function (u) { return u.username.toLowerCase() === username.toLowerCase(); });

      if (emailTaken) {
        setLoading(submitEl, false);
        setMessage(msgEl, 'Email này đã được đăng ký. Hãy đăng nhập.', 'error');
        return;
      }
      if (usernameTaken) {
        setLoading(submitEl, false);
        setMessage(msgEl, 'Tên đăng nhập đã được dùng, hãy chọn tên khác.', 'error');
        return;
      }

      var newUser = { email: email, username: username, password: password };
      users.push(newUser);

      return saveUsers(users).then(function () {
        setLoading(submitEl, false);
        setMessage(msgEl, '✓ Tạo tài khoản thành công! Đang chuyển sang đăng nhập…', 'success');
        e.target.reset();

        setTimeout(function () {
          navigateTo('panel-login');
          var loginIdEl = qs('login-username');
          if (loginIdEl) loginIdEl.value = email;
          setMessage(qs('login-message'), '✓ Tạo tài khoản thành công, hãy đăng nhập.', 'success');
        }, 1000);
      });
    }).catch(function (err) {
      setLoading(submitEl, false);
      setMessage(msgEl, 'Có lỗi xảy ra, vui lòng thử lại. (' + err.message + ')', 'error');
    });
  }

  /* ========================= ĐĂNG NHẬP ========================= */
  function handleLogin(e) {
    e.preventDefault();
    var msgEl      = qs('login-message');
    var identifier = qs('login-username').value.trim();
    var password   = qs('login-password').value;
    var submitEl   = e.target.querySelector('.auth-submit');

    setMessage(msgEl, '', null);
    if (!identifier || !password) {
      setMessage(msgEl, 'Vui lòng nhập tên đăng nhập/email và mật khẩu.', 'error');
      return;
    }

    setLoading(submitEl, true);
    setMessage(msgEl, 'Đang xác thực…', null);

    getUsers().then(function (users) {
      var key  = identifier.toLowerCase();
      var user = users.find(function (u) {
        return u.email.toLowerCase() === key || u.username.toLowerCase() === key;
      });

      if (!user || user.password !== password) {
        setLoading(submitEl, false);
        setMessage(msgEl, 'Tên đăng nhập/email hoặc mật khẩu không đúng.', 'error');
        return;
      }

      /* Lưu session */
      try {
        localStorage.setItem(SESSION_KEY, JSON.stringify({
          username: user.username,
          email: user.email
        }));
      } catch (err) { /* bỏ qua nếu lưu session lỗi */ }

      setLoading(submitEl, false);
      setMessage(msgEl, '✓ Đăng nhập thành công! Xin chào ' + user.username + '.', 'success');
      e.target.reset();
      applyLoggedInNav(user.username);

      setTimeout(function () {
        navigateTo('panel-home');
      }, 900);
    }).catch(function (err) {
      setLoading(submitEl, false);
      setMessage(msgEl, 'Có lỗi xảy ra, vui lòng thử lại. (' + err.message + ')', 'error');
    });
  }

  /* ========================= TRẠNG THÁI ĐÃ ĐĂNG NHẬP ========================= */
  function applyLoggedInNav(username) {
    var authBox = document.querySelector('.sh-auth');
    if (!authBox) return;

    authBox.innerHTML =
      '<span class="auth-welcome">Xin chào, ' + escapeHTML(username) + '</span>' +
      '<button type="button" class="auth-btn auth-logout" id="nav-auth-logout">Đăng xuất</button>';

    var logoutBtn = qs('nav-auth-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function () {
        try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* bỏ qua */ }
        window.location.reload();
      });
    }
  }

  function restoreSession() {
    try {
      var raw = localStorage.getItem(SESSION_KEY);
      if (!raw) return;
      var sess = JSON.parse(raw);
      if (sess && sess.username) applyLoggedInNav(sess.username);
    } catch (e) { /* session hỏng → coi như chưa đăng nhập */ }
  }

  /* ========================= KHỞI ĐỘNG ========================= */
  function bootstrap() {
    var navLoginBtn = document.querySelector('.sh-auth .auth-login');
    var navSignupBtn = document.querySelector('.sh-auth .auth-signup');
    var loginForm  = qs('login-form');
    var signupForm = qs('signup-form');
    var forgotLink = qs('login-forgot');

    /* Nút Đăng nhập / Đăng ký trên nav */
    if (navLoginBtn) {
      navLoginBtn.addEventListener('click', function () {
        navigateTo('panel-login');
        setMessage(qs('login-message'), '', null);
      });
    }
    if (navSignupBtn) {
      navSignupBtn.addEventListener('click', function () {
        navigateTo('panel-signup');
        setMessage(qs('signup-message'), '', null);
      });
    }

    /* Nút chuyển giữa 2 form (data-target="panel-login|panel-signup") */
    document.querySelectorAll('.auth-switch-btn[data-target]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        navigateTo(btn.dataset.target);
        /* Xóa thông báo khi chuyển form */
        setMessage(qs('login-message'), '', null);
        setMessage(qs('signup-message'), '', null);
      });
    });

    /* Quên mật khẩu */
    if (forgotLink) {
      forgotLink.addEventListener('click', function (ev) {
        ev.preventDefault();
        setMessage(qs('login-message'), 'Tính năng khôi phục mật khẩu sẽ sớm ra mắt. Vui lòng liên hệ đội ngũ VNFinder.', 'error');
      });
    }

    /* Form submit */
    if (loginForm)  loginForm.addEventListener('submit', handleLogin);
    if (signupForm) signupForm.addEventListener('submit', handleSignup);

    /* Khôi phục session */
    restoreSession();

    /* Cảnh báo khi chưa cấu hình JSONBin */
    if (!isJsonBinConfigured()) {
      console.info(
        '[VNFinder Auth] JSONBin.io chưa được cấu hình.\n' +
        'Hệ thống đang dùng localStorage (chỉ lưu trên máy này).\n' +
        'Để dùng server cloud:\n' +
        '  1. Đăng ký tại https://jsonbin.io\n' +
        '  2. Lấy X-Master-Key và tạo Bin với nội dung {"users":[]}\n' +
        '  3. Điền vào JSONBIN_API_KEY và JSONBIN_BIN_ID ở đầu file js/auth.js'
      );
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
