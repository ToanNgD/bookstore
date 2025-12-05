document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    
    // Cập nhật thông tin user trên header
    if (typeof updateHeaderUserInfo !== 'undefined') {
        updateHeaderUserInfo();
    }
    
    // Kích hoạt menu mobile (SỬA LỖI MENU KHÔNG CHẠY)
    setupMobileMenu();
});

// (Giữ nguyên phần đầu file, chỉ thay hàm displayCartItems bên dưới)

function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-content');
    
    // Nếu giỏ hàng trống
    // Nếu giỏ hàng trống
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="text-align: center; padding: 80px 20px;">
                <img src="../images/empty-cart.png" 
                     onerror="this.src='https://cdn-icons-png.flaticon.com/512/11329/11329060.png'" 
                     style="width: 150px; margin: 0 auto 20px auto; display: block; opacity: 0.5;">
                
                <h3 style="color: #2c3e50; margin-bottom: 10px;">Giỏ hàng của bạn đang trống</h3>
                <p style="color: #7f8c8d; margin-bottom: 25px;">Hãy chọn thêm sách để đọc nhé!</p>
                
                <a href="../index.html" class="btn" style="background: var(--gradient-primary); color: white; padding: 12px 30px; border-radius: 30px; display: inline-block;">
                    <i class="fas fa-arrow-left"></i> Tiếp tục mua sắm
                </a>
            </div>
        `;
        if (typeof updateHeaderUserInfo !== 'undefined') updateHeaderUserInfo();
        else updateCartCount();
        return;
    }
    
    let total = 0;
    
    // BẮT ĐẦU RENDER GIAO DIỆN MỚI
    let html = `<div class="cart-page-container">`;
    
    // --- CỘT TRÁI: DANH SÁCH ---
    html += `<div class="cart-left">`;
    html += `<div class="cart-header-row">
                <span>Sản phẩm (${cart.length})</span>
            </div>`;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        html += `
            <div class="cart-item">
                <img src="../${item.image}" alt="${item.title}" class="cart-item-img" onclick="window.location.href='product.html'" style="cursor:pointer">
                
                <div class="cart-item-info">
                    <div class="cart-item-title" onclick="window.location.href='product.html'" style="cursor:pointer">${item.title}</div>
                    <div class="cart-item-author">${item.author}</div>
                    <div class="cart-item-price">${item.price.toLocaleString('vi-VN')} đ</div>
                </div>
                
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <input type="text" class="qty-input" value="${item.quantity}" readonly>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    
                    <button class="btn-remove" onclick="removeFromCart(${item.id})" title="Xóa sản phẩm">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    html += `</div>`; // Đóng .cart-left
    
    // --- CỘT PHẢI: TỔNG KẾT ---
    html += `
        <div class="cart-right">
            <div class="cart-summary">
                <div class="summary-title">Thông tin đơn hàng</div>
                
                <div class="summary-row">
                    <span>Tạm tính:</span>
                    <span>${total.toLocaleString('vi-VN')} đ</span>
                </div>
                <div class="summary-row">
                    <span>Phí vận chuyển:</span>
                    <span style="color: #27ae60;">Miễn phí</span>
                </div>
                
                <div class="summary-row total">
                    <span>Tổng cộng:</span>
                    <span>${total.toLocaleString('vi-VN')} đ</span>
                </div>
                
                <p style="font-size: 13px; color: #95a5a6; margin-top: 10px; text-align: right;">(Đã bao gồm VAT nếu có)</p>
                
                <button onclick="checkout()" class="btn-checkout">Thanh toán ngay</button>
                <a href="../index.html" class="btn-continue"><i class="fas fa-arrow-left"></i> Tiếp tục mua sách</a>
            </div>
        </div>
    `;
    
    html += `</div>`; // Đóng .cart-page-container
    
    cartContainer.innerHTML = html;
}

// (Giữ nguyên các hàm updateQuantity, removeFromCart... bên dưới)

function updateQuantity(bookId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === bookId);
    
    if (itemIndex !== -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        if (typeof updateHeaderUserInfo !== 'undefined') updateHeaderUserInfo();
        else updateCartCount();
    }
}

function removeFromCart(bookId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== bookId);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
    if (typeof updateHeaderUserInfo !== 'undefined') updateHeaderUserInfo();
    else updateCartCount();
}

// Thay thế hàm checkout() cũ bằng hàm này:

function checkout() {
    // 1. Kiểm tra xem người dùng đã đăng nhập chưa
    // (window.authManager lấy từ file auth.js)
    if (!window.authManager || !window.authManager.isLoggedIn()) {
        
        // Nếu chưa đăng nhập -> Thông báo lỗi
        if (typeof showNotification === 'function') {
            showNotification('Vui lòng đăng nhập để thanh toán!', 'error');
        } else {
            alert('Vui lòng đăng nhập để thanh toán!');
        }
        
        // Chuyển hướng sang trang đăng nhập sau 1.5 giây
        setTimeout(() => {
            window.location.href = 'login.html'; 
        }, 1500);
        
        return; // Dừng lại, không cho thanh toán
    }

    // 2. Nếu ĐÃ đăng nhập -> Xử lý thanh toán thành công (Giả lập)
    if (typeof showNotification === 'function') {
        showNotification('Đặt hàng thành công! Cảm ơn bạn.', 'success');
    } else {
        alert('Đặt hàng thành công! Cảm ơn bạn.');
    }
    
    // Xóa sạch giỏ hàng sau khi mua xong
    localStorage.removeItem('cart');
    
    // Tải lại trang để cập nhật giao diện giỏ hàng trống
    setTimeout(() => {
        window.location.reload();
    }, 2000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

// Hàm xử lý Menu Mobile (Đã thêm vào đây)
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    
    if (menuToggle && navbar) {
        // Xóa sự kiện cũ để tránh trùng lặp nếu có
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        
        newMenuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
        });
        
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && !newMenuToggle.contains(e.target)) {
                navbar.classList.remove('active');
            }
        });
    }
    
    // Dropdown mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // e.preventDefault(); // Nếu cần thiết
                this.classList.toggle('active');
            }
        });
    });
}