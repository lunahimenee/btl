let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Cập nhật số lượng giỏ hàng
function updateCartCount() {
  const cartCount = cart.length;
  const cartCountElement = document.querySelector('.cart-count');
  cartCountElement.textContent = cartCount;
}

// Lưu giỏ hàng vào localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Hiển thị các sản phẩm trong giỏ hàng
function updateCartItems() {
  const cartItemsElement = document.querySelector('.cart-items');
  cartItemsElement.innerHTML = ''; // Xóa danh sách sản phẩm cũ

  if (cart.length > 0) {
    cart.forEach((item, index) => {
      const li = document.createElement('li');
      li.textContent = `${item.name} - ${item.price}đ`;

      // Tạo nút xóa
      const removeBtn = document.createElement('button');
      removeBtn.textContent = 'Xóa'; // Nội dung của nút xóa
      removeBtn.classList.add('remove-item'); // Thêm class để tạo kiểu

      // Xử lý sự kiện xóa sản phẩm
      removeBtn.addEventListener('click', () => {
        removeFromCart(index);  // Gọi hàm xóa khi nhấn nút
      });

      // Thêm nút xóa vào trong phần tử li
      li.appendChild(removeBtn);

      // Thêm sản phẩm vào giỏ hàng
      cartItemsElement.appendChild(li);
    });
  } else {
    const li = document.createElement('li');
    li.textContent = 'Giỏ hàng trống';
    cartItemsElement.appendChild(li);
  }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
  cart.splice(index, 1);  // Xóa sản phẩm tại vị trí index
  saveCart();              // Lưu giỏ hàng đã thay đổi vào localStorage
  updateCartCount();       // Cập nhật số lượng giỏ hàng
  updateCartItems();       // Cập nhật lại danh sách sản phẩm trong giỏ
}

// Hàm thay đổi màu sắc thông báo
function setNotificationColor(type) {
  const notification = document.querySelector('.notification');
  
  if (type === 'error') {
    notification.style.backgroundColor = 'red';  // Màu đỏ khi có lỗi
    notification.style.color = 'white';  // Chữ màu trắng
  } else if (type === 'success') {
    notification.style.backgroundColor = 'green';  // Màu xanh khi thành công
    notification.style.color = 'white';  // Chữ màu trắng
  } else {
    notification.style.backgroundColor = 'gray';  // Mặc định nếu không có type
    notification.style.color = 'white';
  }
}

// Hiển thị thông báo với màu sắc dựa vào loại thông báo (success hoặc error)
function showNotification(message, type = 'success') {
  const notification = document.querySelector('.notification');
  notification.textContent = message;
  notification.style.display = 'block';
  
  // Gọi hàm để thay đổi màu sắc
  setNotificationColor(type);

  // Tắt thông báo sau 3 giây
  setTimeout(() => {
    notification.style.display = 'none';
  }, 3000);
}

// Hiển thị bảng giỏ hàng khi nhấn vào biểu tượng giỏ hàng
const cartIcon = document.querySelector('.cart');
const cartDetails = document.querySelector('.cart-details');
const closeCartBtn = document.querySelector('.close-cart-btn');

cartIcon.addEventListener('click', () => {
  cartDetails.style.display = 'block'; // Hiển thị giỏ hàng
  updateCartItems(); // Cập nhật sản phẩm trong giỏ hàng
});

// Đóng giỏ hàng khi nhấn nút "Đóng"
closeCartBtn.addEventListener('click', () => {
  cartDetails.style.display = 'none'; // Ẩn giỏ hàng
});

// Xử lý sự kiện thêm sản phẩm vào giỏ hàng
const addToCartButtons = document.querySelectorAll('.add-to-cart');

addToCartButtons.forEach(button => {
  button.addEventListener('click', () => {
    const productName = button.dataset.name;
    const productPrice = button.dataset.price;

    // Kiểm tra nếu sản phẩm đã có trong giỏ
    const productExists = cart.some(item => item.name === productName);

    if (productExists) {
      // Hiển thị thông báo nếu sản phẩm đã có trong giỏ với màu đỏ
      showNotification(`Sản phẩm "${productName}" đã có trong giỏ hàng rồi!`, 'error');
    } else {
      // Thêm sản phẩm vào giỏ hàng nếu chưa có
      cart.push({ name: productName, price: productPrice });
      saveCart();
      updateCartCount();
      updateCartItems();

      // Hiển thị thông báo khi thêm sản phẩm vào giỏ với màu xanh
      showNotification(`Sản phẩm "${productName}" đã được thêm vào giỏ hàng`, 'success');
    }
  });
});

// Hiển thị số lượng giỏ hàng khi tải lại trang
updateCartCount();

// Thêm nút quay về đầu trang với icon
const scrollToTopButton = document.createElement('button');
scrollToTopButton.classList.add('scroll-to-top-button');

// Thêm icon vào nút (mũi tên lên)
const icon = document.createElement('i');
icon.classList.add('fas', 'fa-arrow-up');  // Font Awesome icon mũi tên lên
scrollToTopButton.appendChild(icon);

// Hiển thị nút khi cuộn xuống dưới một đoạn nhất định
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

// Sự kiện khi nhấn vào nút
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });  // Cuộn mượt về đầu trang
});

// Thêm nút vào cuối trang
document.body.appendChild(scrollToTopButton);

// CSS cơ bản cho nút quay về đầu trang
const style = document.createElement('style');
style.textContent = `
  .scroll-to-top-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none; /* Ẩn nút khi chưa cuộn xuống */
    font-size: 20px;
  }
  .scroll-to-top-button:hover {
    background-color: #0056b3;
  }
  .scroll-to-top-button i {
    margin: 0;
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', function() {
  const submitReviewButton = document.getElementById('submit-review');
  const reviewerNameInput = document.getElementById('reviewer-name');
  const reviewTextArea = document.getElementById('review-text');
  const reviewCards = document.querySelector('.review-cards');

  // Lấy các đánh giá đã lưu từ localStorage
  const savedReviews = JSON.parse(localStorage.getItem('reviews')) || [];

  // Hiển thị các đánh giá đã lưu
  function displayReviews() {
    reviewCards.innerHTML = '';  // Xóa các đánh giá cũ
    savedReviews.forEach(review => {
      const newReview = document.createElement('div');
      newReview.classList.add('review-card');

      const reviewTitle = document.createElement('h3');
      reviewTitle.textContent = review.name;
      const reviewContent = document.createElement('p');
      reviewContent.textContent = review.text;

      newReview.appendChild(reviewTitle);
      newReview.appendChild(reviewContent);

      reviewCards.appendChild(newReview);
    });
  }

  // Gọi hàm hiển thị các đánh giá khi trang được tải lại
  displayReviews();

  // Lắng nghe sự kiện khi nhấn nút "Gửi đánh giá"
  submitReviewButton.addEventListener('click', function() {
    const reviewerName = reviewerNameInput.value.trim();
    const reviewText = reviewTextArea.value.trim();

    // Kiểm tra nếu tên và nội dung đánh giá không rỗng
    if (reviewerName && reviewText) {
      // Tạo đánh giá mới
      const newReview = {
        name: reviewerName,
        text: reviewText
      };

      // Thêm đánh giá vào danh sách các đánh giá đã lưu
      savedReviews.push(newReview);
      
      // Lưu lại các đánh giá vào localStorage
      localStorage.setItem('reviews', JSON.stringify(savedReviews));

      // Cập nhật lại danh sách các đánh giá hiển thị
      displayReviews();

      // Xóa nội dung trong các trường nhập liệu
      reviewerNameInput.value = '';
      reviewTextArea.value = '';

      // Thông báo cho người dùng biết đánh giá đã được gửi thành công
      showNotification('Đánh giá của bạn đã được gửi thành công!', 'success');
    } else {
      // Thông báo nếu người dùng chưa điền đầy đủ thông tin
      showNotification('Vui lòng điền đủ tên và đánh giá.', 'error');
    }
  });

  // Hàm hiển thị thông báo
  function showNotification(message, type = 'success') {
    const notification = document.querySelector('.notification');
    notification.textContent = message;
    notification.style.display = 'block';

    // Thay đổi màu sắc thông báo dựa vào loại
    if (type === 'error') {
      notification.style.backgroundColor = 'red';
      notification.style.color = 'white';
    } else {
      notification.style.backgroundColor = 'green';
      notification.style.color = 'white';
    }

    // Tắt thông báo sau 3 giây
    setTimeout(() => {
      notification.style.display = 'none';
    }, 3000);
  }
});
