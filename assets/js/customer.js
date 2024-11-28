// Kiểm tra nếu người dùng đã đăng nhập
if (localStorage.getItem('loggedIn') !== 'true') {
    alert('Vui lòng đăng nhập để tiếp tục.');
    window.location.href = 'checkout.html'; // Quay lại trang đăng nhập nếu chưa đăng nhập
  }

  // Hiển thị các sản phẩm trong giỏ hàng
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsElement = document.getElementById('cart-items');
  
  if (cart.length > 0) {
    cart.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.price}đ`;
      cartItemsElement.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'Giỏ hàng trống';
    cartItemsElement.appendChild(li);
  }

  // Xử lý sự kiện khi người dùng gửi thông tin khách hàng
  const customerInfoForm = document.getElementById('customer-info-form');
  customerInfoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    alert('Thông tin khách hàng đã được lưu!');
    // Lưu thông tin khách hàng vào localStorage hoặc gửi lên server
  });

  // Xử lý sự kiện khi người dùng nhấn nút thanh toán
  const checkoutButton = document.getElementById('checkout-button');
  checkoutButton.addEventListener('click', function() {
    if (cart.length === 0) {
      alert('Giỏ hàng của bạn trống. Vui lòng thêm sản phẩm vào giỏ trước khi thanh toán.');
    } else {
      alert('Thanh toán thành công! Cảm ơn bạn đã mua hàng. Sản phẩm sẽ được bàn giao cho bạn trong vòng 3 - 5 ngày tuy khu vực.');
      // Tiến hành thanh toán (thực tế sẽ gửi yêu cầu thanh toán tới server)
      localStorage.removeItem('cart'); // Xóa giỏ hàng sau khi thanh toán
      window.location.href = 'index.html';  // Chuyển về trang cchủ
    }
  });