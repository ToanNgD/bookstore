// Lấy thông tin sách từ sessionStorage
const selectedBookId = sessionStorage.getItem('selectedBookId');

document.addEventListener('DOMContentLoaded', function() {
    if (typeof booksData === 'undefined') {
        console.error('Chưa load data.js');
        return;
    }

    // --- SETUP MENU MOBILE ---
    setupMobileMenu();
    // ------------------------

    const productContainer = document.getElementById('product-detail');
    
    if (!selectedBookId) {
        productContainer.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 48px; color: #e74c3c; margin-bottom: 20px;"></i>
                <h3>Chưa chọn sách</h3>
                <p>Vui lòng quay lại <a href="../index.html" style="color: #3498db;">Trang chủ</a> để chọn sách.</p>
            </div>
        `;
        return;
    }
    
    const book = booksData.find(b => b.id == selectedBookId);
    
    if (!book) {
        productContainer.innerHTML = `
            <div style="text-align: center; padding: 50px;">
                <i class="fas fa-search-minus" style="font-size: 48px; color: #95a5a6; margin-bottom: 20px;"></i>
                <h3>Không tìm thấy sách</h3>
                <p>Sản phẩm này có thể đã bị xóa hoặc không tồn tại.</p>
                <a href="../index.html" class="btn">Về trang chủ</a>
            </div>
        `;
        return;
    }
    
    const hasDiscount = book.originalPrice > book.price;
    const discountPercent = hasDiscount ? Math.round((1 - book.price / book.originalPrice) * 100) : 0;
    
    // Update Document Title
    document.title = `${book.title} - BookStore`;

    // RENDER CHI TIẾT SÁCH
    productContainer.innerHTML = `
        <div class="product-detail-container" style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; margin-top: 20px;">
            
            <div class="product-image">
                <img src="../${book.image}" alt="${book.title}" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            </div>
            
            <div class="product-info">
                <h1 style="font-family: 'Montserrat', sans-serif; font-size: 28px; margin-bottom: 10px; color: #2c3e50;">${book.title}</h1>
                <p style="font-size: 16px; color: #7f8c8d; margin-bottom: 15px;">Tác giả: <strong>${book.author}</strong></p>
                
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                    <div class="rating" style="display: flex; align-items: center; gap: 5px; color: #f39c12;">
                        ${generateStarRating(book.rating)}
                        <span style="color: #7f8c8d; margin-left: 5px;">(${book.rating}/5)</span>
                    </div>
                    <span style="color: #bdc3c7;">|</span>
                    <div style="color: #7f8c8d;">
                        <span style="background-color: #ecf0f1; padding: 3px 10px; border-radius: 15px; font-size: 13px;">${book.category}</span>
                    </div>
                </div>
                
                <div class="price-section" style="background-color: #fafafa; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 10px; flex-wrap: wrap;">
                        
                        <div style="font-size: 32px; font-weight: 700; color: #d0011b;">
                            ${book.price.toLocaleString('vi-VN')} ₫
                        </div>
                        
                        ${hasDiscount ? `
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <div style="font-size: 16px; color: #929292; text-decoration: line-through;">
                                    ${book.originalPrice.toLocaleString('vi-VN')} ₫
                                </div>
                                <div style="
                                    background: #fff0f1; 
                                    color: #d0011b; 
                                    border: 1px solid #d0011b;
                                    padding: 2px 6px; 
                                    border-radius: 2px; 
                                    font-size: 12px; 
                                    font-weight: 600;
                                    text-transform: uppercase;
                                ">
                                    -${discountPercent}%
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <p style="color: #27ae60; font-size: 14px; margin: 0; display: flex; align-items: center; gap: 5px;">
                        <i class="fas fa-truck-fast"></i> Miễn phí vận chuyển cho đơn từ 200k
                    </p>
                </div>
                
                <div class="product-description" style="margin-bottom: 30px;">
                    <h3 style="font-family: 'Montserrat', sans-serif; margin-bottom: 10px; font-size: 18px;">Giới thiệu sách</h3>
                    <p style="line-height: 1.6; color: #34495e;">${book.description}</p>
                </div>
                
                <div class="product-actions" style="display: flex; gap: 15px;">
                    <button onclick="addToCart(${book.id})" class="btn" style="flex: 1; padding: 15px; font-size: 16px; background-color: #e8f6fd; color: #3498db; border: 1px solid #3498db; border-radius: 4px; cursor: pointer; font-weight: 600;">
                        <i class="fas fa-cart-plus"></i> Thêm vào giỏ
                    </button>
                    <button onclick="buyNow(${book.id})" class="btn" style="flex: 1; padding: 15px; font-size: 16px; background-color: #d0011b; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 600;">
                        Mua ngay
                    </button>
                </div>
            </div>
        </div>
        
        <div class="related-products" style="margin-top: 50px; border-top: 1px solid #eee; padding-top: 30px;">
            <h2 style="font-family: 'Montserrat', sans-serif; font-size: 24px; margin-bottom: 25px;">Sách cùng thể loại</h2>
            <div id="related-books" class="books-grid"></div>
        </div>
    `;
    
    // Hiển thị sách liên quan
    const relatedBooks = booksData.filter(b => b.category === book.category && b.id !== book.id).slice(0, 4);
    displayRelatedBooks(relatedBooks);
    
    // Cập nhật giỏ hàng trên header
    if(typeof updateHeaderUserInfo === 'function') updateHeaderUserInfo();
    else if(typeof updateCartCount === 'function') updateCartCount();
    
    // Xử lý Responsive CSS cho grid chi tiết (Inject thẳng style cho nhanh)
    const style = document.createElement('style');
    style.innerHTML = `
        @media (max-width: 768px) {
            .product-detail-container { grid-template-columns: 1fr !important; gap: 20px !important; }
            .product-actions { position: fixed; bottom: 0; left: 0; right: 0; background: white; padding: 10px 15px; box-shadow: 0 -5px 15px rgba(0,0,0,0.1); z-index: 1000; margin: 0 !important; border-top: 1px solid #eee; }
            .footer { padding-bottom: 90px; } /* Đẩy footer lên để không bị nút che */
        }
    `;
    document.head.appendChild(style);
});

function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) stars += '<i class="fas fa-star"></i>';
        else if (i === Math.ceil(rating) && !Number.isInteger(rating)) stars += '<i class="fas fa-star-half-alt"></i>';
        else stars += '<i class="far fa-star"></i>';
    }
    return stars;
}

function displayRelatedBooks(books) {
    const container = document.getElementById('related-books');
    if (!container) return;
    
    if (books.length === 0) { container.innerHTML = '<p>Không có sách liên quan.</p>'; return; }
    
    container.innerHTML = '';
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.style.cursor = 'pointer';
        bookCard.onclick = () => viewDetail(book.id);
        
        bookCard.innerHTML = `
            <div class="book-image">
                <img src="../${book.image}" alt="${book.title}">
            </div>
            <div class="book-content">
                <h3 class="book-title" style="font-size: 14px;">${book.title}</h3>
                <div class="book-price">
                    <span class="current-price" style="font-size: 16px;">${book.price.toLocaleString('vi-VN')} đ</span>
                </div>
            </div>
        `;
        container.appendChild(bookCard);
    });
}

function addToCart(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (!book) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === bookId);
    
    if (existingItem) existingItem.quantity += 1;
    else cart.push({ ...book, quantity: 1 });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    if (typeof updateHeaderUserInfo === 'function') updateHeaderUserInfo();
    else if (typeof updateCartCount === 'function') updateCartCount();
    
    // Nếu có showNotification thì dùng
    if (typeof showNotification === 'function') showNotification(`Đã thêm "${book.title}" vào giỏ hàng!`);
    else alert(`Đã thêm "${book.title}" vào giỏ hàng!`);
}

function buyNow(bookId) { 
    addToCart(bookId); 
    window.location.href = 'cart.html'; 
}

function viewDetail(bookId) {
    sessionStorage.setItem('selectedBookId', bookId);
    window.scrollTo(0, 0);
    window.location.reload();
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countElement = document.querySelector('.cart-count');
    if(countElement) countElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// HÀM XỬ LÝ MENU MOBILE (QUAN TRỌNG)
function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    
    if (menuToggle && navbar) {
        // Clone để reset event cũ
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
    
    // Dropdown mobile toggle
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                // e.preventDefault(); // Có thể bỏ comment nếu cần chặn link chính
                this.classList.toggle('active');
            }
        });
    });
}