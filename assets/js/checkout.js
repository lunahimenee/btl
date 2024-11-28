// Bắt sự kiện submit form đăng nhập
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault(); // Ngăn không cho form tải lại trang

  // Lấy giá trị từ các input
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Lấy thông tin tài khoản từ localStorage
  const storedEmail = localStorage.getItem('userEmail');
  const storedPassword = localStorage.getItem('userPassword');

  // Kiểm tra thông tin đăng nhập
  if (!storedEmail || !storedPassword) {
    alert('Chưa có tài khoản. Vui lòng đăng ký trước.');
    window.location.href = 'register.html'; // Chuyển hướng đến trang đăng ký
  } else if (email === storedEmail && password === storedPassword) {
    alert('Đăng nhập thành công!');
    // Chuyển hướng đến trang thông tin thanh toán
    window.location.href = 'customer.html';
  } else {
    alert('Sai thông tin đăng nhập. Vui lòng thử lại.');
  }
});