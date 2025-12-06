// Lấy thông tin sách từ sessionStorage
const selectedBookId = sessionStorage.getItem('selectedBookId');
let currentPreviewIndex = 0; // Biến theo dõi trang đang đọc
let previewImagesList = [];  // Biến lưu danh sách ảnh đọc thử

document.addEventListener('DOMContentLoaded', function() {
    if (typeof booksData === 'undefined') { console.error('Chưa load data.js'); return; }

    setupMobileMenu();

    const productContainer = document.getElementById('product-detail');
    
    // ... (Giữ nguyên các đoạn check ID và check Book null như cũ) ...
    if (!selectedBookId) return;
    const book = booksData.find(b => b.id == selectedBookId);
    if (!book) return;
    
    const hasDiscount = book.originalPrice > book.price;
    const discountPercent = hasDiscount ? Math.round((1 - book.price / book.originalPrice) * 100) : 0;
    
    document.title = `${book.title} - BookStore`;

    // Chuẩn bị nút Đọc thử (nếu có dữ liệu)
    let readPreviewBtnHTML = '';
    if (book.previewImages && book.previewImages.length > 0) {
        previewImagesList = book.previewImages; // Lưu lại để dùng cho Modal
        readPreviewBtnHTML = `
            <button class="btn-read-preview" onclick="openPreviewModal()">
                <i class="fas fa-book-open"></i> Đọc thử (${book.previewImages.length} trang)
            </button>
        `;
    }

    // RENDER GIAO DIỆN
    productContainer.innerHTML = `
        <div class="product-detail-container" style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 40px; margin-top: 20px;">
            
            <div class="product-image-col">
                <div class="product-image" style="position: relative;">
                    <img src="../${book.image}" alt="${book.title}" style="width: 100%; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
                </div>
                ${readPreviewBtnHTML}
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
                                <div style="font-size: 16px; color: #929292; text-decoration: line-through;">${book.originalPrice.toLocaleString('vi-VN')} ₫</div>
                                <div style="background: #fff0f1; color: #d0011b; border: 1px solid #d0011b; padding: 2px 6px; border-radius: 2px; font-size: 12px; font-weight: 600;">-${discountPercent}%</div>
                            </div>
                        ` : ''}
                    </div>
                    <p style="color: #27ae60; font-size: 14px; margin: 0;"><i class="fas fa-truck-fast"></i> Miễn phí vận chuyển cho đơn từ 200k</p>
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

        <div id="previewModal" class="preview-modal" onclick="if(event.target === this) closePreviewModal()">
            <div class="preview-content">
                <button class="preview-btn close-preview" onclick="closePreviewModal()"><i class="fas fa-times"></i></button>
                <button class="preview-btn prev-preview" onclick="changePreviewImage(-1)"><i class="fas fa-chevron-left"></i></button>
                
                <img id="previewImageDisplay" src="" alt="Đọc thử">
                <div style="text-align: center; color: white; margin-top: 10px; font-weight: 600;">
                    Trang <span id="previewCounter">1</span> / <span id="previewTotal">0</span>
                </div>

                <button class="preview-btn next-preview" onclick="changePreviewImage(1)"><i class="fas fa-chevron-right"></i></button>
            </div>
        </div>
    `;
    
    // ... (Giữ nguyên phần hiển thị sách liên quan và responsive style) ...
    const relatedBooks = booksData.filter(b => b.category === book.category && b.id !== book.id).slice(0, 4);
    displayRelatedBooks(relatedBooks);
    
    if(typeof updateHeaderUserInfo === 'function') updateHeaderUserInfo();
    else if(typeof updateCartCount === 'function') updateCartCount();

    const style = document.createElement('style');
    style.innerHTML = `
        @media (max-width: 768px) {
            .product-detail-container { grid-template-columns: 1fr !important; gap: 20px !important; }
            .product-actions { position: fixed; bottom: 0; left: 0; right: 0; background: white; padding: 10px 15px; box-shadow: 0 -5px 15px rgba(0,0,0,0.1); z-index: 1000; margin: 0 !important; border-top: 1px solid #eee; }
            .footer { padding-bottom: 90px; }
        }
    `;
    document.head.appendChild(style);
});

// ===== CÁC HÀM XỬ LÝ MODAL ĐỌC THỬ =====
function openPreviewModal() {
    if (previewImagesList.length === 0) return;
    currentPreviewIndex = 0;
    updatePreviewImage();
    const modal = document.getElementById('previewModal');
    modal.style.display = 'flex';
    // Timeout nhỏ để animation opacity hoạt động
    setTimeout(() => { modal.classList.add('open'); }, 10);
    document.body.style.overflow = 'hidden'; // Khóa cuộn trang
}

function closePreviewModal() {
    const modal = document.getElementById('previewModal');
    modal.classList.remove('open');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
    document.body.style.overflow = ''; // Mở cuộn trang
}

function changePreviewImage(step) {
    currentPreviewIndex += step;
    // Loop vòng tròn
    if (currentPreviewIndex < 0) currentPreviewIndex = previewImagesList.length - 1;
    if (currentPreviewIndex >= previewImagesList.length) currentPreviewIndex = 0;
    updatePreviewImage();
}

function updatePreviewImage() {
    const img = document.getElementById('previewImageDisplay');
    const counter = document.getElementById('previewCounter');
    const total = document.getElementById('previewTotal');
    
    if (img && previewImagesList.length > 0) {
        let imageSrc = previewImagesList[currentPreviewIndex];
        
        // --- FIX LỖI ĐƯỜNG DẪN ẢNH TẠI ĐÂY ---
        // Nếu link không phải là link online (http) và chưa có ../ thì thêm vào
        if (!imageSrc.startsWith('http') && !imageSrc.startsWith('../')) {
            imageSrc = '../' + imageSrc;
        }
        
        img.src = imageSrc;
        counter.textContent = currentPreviewIndex + 1;
        total.textContent = previewImagesList.length;
    }
}

// ... (Giữ nguyên các hàm generateStarRating, displayRelatedBooks, addToCart, buyNow, viewDetail, updateCartCount, setupMobileMenu) ...
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
            <div class="book-image"><img src="../${book.image}" alt="${book.title}"></div>
            <div class="book-content">
                <h3 class="book-title" style="font-size: 14px;">${book.title}</h3>
                <div class="book-price"><span class="current-price" style="font-size: 16px;">${book.price.toLocaleString('vi-VN')} đ</span></div>
            </div>`;
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
    if (typeof showNotification === 'function') showNotification(`Đã thêm "${book.title}" vào giỏ hàng!`);
    else alert(`Đã thêm "${book.title}" vào giỏ hàng!`);
}

function buyNow(bookId) { addToCart(bookId); window.location.href = 'cart.html'; }

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

function setupMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const navbar = document.getElementById('navbar');
    if (menuToggle && navbar) {
        const newMenuToggle = menuToggle.cloneNode(true);
        menuToggle.parentNode.replaceChild(newMenuToggle, menuToggle);
        newMenuToggle.addEventListener('click', () => { navbar.classList.toggle('active'); });
        document.addEventListener('click', (e) => { if (!navbar.contains(e.target) && !newMenuToggle.contains(e.target)) navbar.classList.remove('active'); });
    }
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) { if (window.innerWidth <= 768) this.classList.toggle('active'); });
    });
}