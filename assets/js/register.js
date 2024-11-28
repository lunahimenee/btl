document.getElementById('register-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;

    // Lưu thông tin tài khoản vào localStorage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);

    alert('Đăng ký thành công! Vui lòng đăng nhập lại.');
    window.location.href = 'checkout.html'; // Chuyển hướng về trang đăng nhập
  });