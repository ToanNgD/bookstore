// (Giữ nguyên toàn bộ Class AuthManager như cũ)
class AuthManager {
    constructor() {
        this.usersKey = 'bookstore_users';
        this.currentUserKey = 'bookstore_current_user';
        this.init();
    }
    init() {
        if (!localStorage.getItem(this.usersKey)) {
            const sampleUsers = [
                { id: 1, fullName: "Nguyễn Văn A", email: "user@example.com", phone: "0912345678", password: "123456", createdAt: new Date().toISOString() }
            ];
            localStorage.setItem(this.usersKey, JSON.stringify(sampleUsers));
        }
    }
    getUsers() { return JSON.parse(localStorage.getItem(this.usersKey)) || []; }
    saveUsers(users) { localStorage.setItem(this.usersKey, JSON.stringify(users)); }
    emailExists(email) { return this.getUsers().some(user => user.email === email); }
    phoneExists(phone) { return this.getUsers().some(user => user.phone === phone); }
    register(userData) {
        const users = this.getUsers();
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
        const newUser = { id: newId, ...userData, createdAt: new Date().toISOString() };
        users.push(newUser);
        this.saveUsers(users);
        this.setCurrentUser(newUser);
        return newUser;
    }
    login(emailOrPhone, password) {
        const users = this.getUsers();
        const user = users.find(u => (u.email === emailOrPhone || u.phone === emailOrPhone) && u.password === password);
        if (user) { this.setCurrentUser(user); return user; }
        return null;
    }

    // ... các hàm cũ init, register, login ...

    // THÊM HÀM NÀY VÀO TRONG CLASS AuthManager
    resetPassword(emailOrPhone, newPassword) {
        const users = this.getUsers();
        const index = users.findIndex(u => u.email === emailOrPhone || u.phone === emailOrPhone);
        
        if (index !== -1) {
            users[index].password = newPassword;
            this.saveUsers(users);
            return true; // Đổi thành công
        }
        return false; // Không tìm thấy user
    }

    // ... các hàm cũ logout, getCurrentUser ...

    logout() { localStorage.removeItem(this.currentUserKey); updateHeaderUserInfo(); }
    getCurrentUser() { const userStr = localStorage.getItem(this.currentUserKey); return userStr ? JSON.parse(userStr) : null; }
    setCurrentUser(user) { localStorage.setItem(this.currentUserKey, JSON.stringify(user)); updateHeaderUserInfo(); }
    isLoggedIn() { return this.getCurrentUser() !== null; }
}

window.authManager = new AuthManager();

function showNotification(message, type = 'success') {
    let notification = document.getElementById('notification');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = 'auth-notification';
        notification.innerHTML = `<span id="notificationMessage"></span><button onclick="closeNotification()"><i class="fas fa-times"></i></button>`;
        document.body.appendChild(notification);
    }

    const messageSpan = document.getElementById('notificationMessage');
    if (notification && messageSpan) {
        messageSpan.textContent = message;
        notification.className = `auth-notification ${type}`;
        notification.style.display = 'flex';
        setTimeout(() => { closeNotification(); }, 3000);
    }
}

function closeNotification() {
    const notification = document.getElementById('notification');
    if (notification) {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => { notification.style.display = 'none'; notification.style.animation = ''; }, 300);
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    if (input.type === 'password') { input.type = 'text'; icon.className = 'fas fa-eye-slash'; }
    else { input.type = 'password'; icon.className = 'fas fa-eye'; }
}

// Validation Helpers
function validateEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
function validatePhone(phone) { return /^(0|\+84)(3[2-9]|5[689]|7[06-9]|8[1-9]|9[0-9])[0-9]{7}$/.test(phone); }
function validatePassword(password) { return password.length >= 6; }
function showError(elementId, message) { 
    const el = document.getElementById(elementId); 
    if(el) { el.textContent = message; el.classList.add('show'); } 
}
function clearError(elementId) { 
    const el = document.getElementById(elementId); 
    if(el) { el.textContent = ''; el.classList.remove('show'); } 
}

// Logic Register Form
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms').checked;
        
        ['fullNameError', 'emailError', 'phoneError', 'passwordError', 'confirmPasswordError', 'termsError'].forEach(id => clearError(id));
        let isValid = true;

        if (!fullName || fullName.length < 2) { showError('fullNameError', 'Họ tên không hợp lệ'); isValid = false; }
        if (!validateEmail(email)) { showError('emailError', 'Email không hợp lệ'); isValid = false; }
        else if (authManager.emailExists(email)) { showError('emailError', 'Email đã tồn tại'); isValid = false; }
        if (!validatePhone(phone)) { showError('phoneError', 'SĐT không hợp lệ'); isValid = false; }
        if (!validatePassword(password)) { showError('passwordError', 'Mật khẩu >= 6 ký tự'); isValid = false; }
        if (password !== confirmPassword) { showError('confirmPasswordError', 'Mật khẩu không khớp'); isValid = false; }
        if (!agreeTerms) { showError('termsError', 'Bạn chưa đồng ý điều khoản'); isValid = false; }

        if (isValid) {
            authManager.register({ fullName, email, phone, password });
            showNotification('Đăng ký thành công!', 'success');
            setTimeout(() => { window.location.href = '../index.html'; }, 2000);
        }
    });
}

// Logic Login Form
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const emailOrPhone = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        clearError('loginEmailError'); clearError('loginPasswordError');
        
        if (!emailOrPhone || !password) { showError('loginPasswordError', 'Vui lòng nhập đủ thông tin'); return; }
        
        const user = authManager.login(emailOrPhone, password);
        if (user) {
            showNotification(`Chào mừng ${user.fullName}`, 'success');
            if (rememberMe) localStorage.setItem('remember_login', 'true');
            setTimeout(() => { window.location.href = '../index.html'; }, 1500);
        } else {
            showError('loginPasswordError', 'Sai thông tin đăng nhập');
            showNotification('Đăng nhập thất bại', 'error');
        }
    });
}

// Cập nhật Header
function updateHeaderUserInfo() {
    const currentUser = authManager.getCurrentUser();
    const headerActions = document.querySelector('.header-actions');
    if (!headerActions) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    
    // Đường dẫn fix cho trang chủ và trang con
    const isHomePage = !window.location.pathname.includes('/pages/');
    const cartLink = isHomePage ? 'pages/cart.html' : 'cart.html';
    const loginLink = isHomePage ? 'pages/login.html' : 'login.html';
    const registerLink = isHomePage ? 'pages/register.html' : 'register.html';
    
    if (currentUser) {
        headerActions.innerHTML = `
            <div class="user-dropdown">
                <button class="user-menu-btn">
                    <i class="fas fa-user-circle"></i> <span>${currentUser.fullName.split(' ')[0]}</span> <i class="fas fa-chevron-down"></i>
                </button>
                <div class="user-dropdown-menu">
                    <a href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Đăng xuất</a>
                </div>
            </div>
            <a href="${cartLink}" class="btn-cart"><i class="fas fa-shopping-cart"></i><span class="cart-count">${cartCount}</span></a>
        `;
        addUserDropdownStyles();
        const btn = headerActions.querySelector('.user-menu-btn');
        const menu = headerActions.querySelector('.user-dropdown-menu');
        if(btn && menu) {
            btn.onclick = (e) => { e.stopPropagation(); menu.classList.toggle('show'); };
            document.onclick = () => menu.classList.remove('show');
        }
    } else {
        headerActions.innerHTML = `
            <a href="${loginLink}" class="btn-login"><i class="fas fa-user"></i> <span>Đăng nhập</span></a>
            <a href="${registerLink}" class="btn-register"><i class="fas fa-user-plus"></i> <span>Đăng ký</span></a>
            <a href="${cartLink}" class="btn-cart"><i class="fas fa-shopping-cart"></i><span class="cart-count">${cartCount}</span></a>
        `;
    }
}

function logout() { authManager.logout(); window.location.reload(); }

function addUserDropdownStyles() {
    if (document.getElementById('user-dropdown-styles')) return;
    const style = document.createElement('style');
    style.id = 'user-dropdown-styles';
    style.textContent = `
        .user-dropdown { position: relative; }
        .user-menu-btn { display: flex; align-items: center; gap: 8px; padding: 6px 12px; border: 1px solid #ddd; background: #fff; border-radius: 20px; cursor: pointer; }
        .user-dropdown-menu { position: absolute; top: 120%; right: 0; background: #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.1); border-radius: 8px; min-width: 150px; opacity: 0; visibility: hidden; transition: 0.2s; z-index: 1000; padding: 10px 0; }
        .user-dropdown-menu.show { opacity: 1; visibility: visible; top: 110%; }
        .user-dropdown-menu a { display: block; padding: 8px 15px; color: #333; text-decoration: none; }
        .user-dropdown-menu a:hover { background: #f5f5f5; color: #3498db; }
    `;
    document.head.appendChild(style);
}

// XỬ LÝ TÌM KIẾM TOÀN CỤC (GLOBAL SEARCH)
function handleGlobalSearch() {
    const searchInput = document.getElementById('search-input');
    const keyword = searchInput ? searchInput.value.trim() : '';
    
    if (!keyword) return;

    // Kiểm tra xem có đang ở trang chủ không
    const isHomePage = !window.location.pathname.includes('/pages/');

    if (isHomePage) {
        // Nếu ở trang chủ, gọi hàm searchBooks của main.js
        if (typeof searchBooks === 'function') {
            searchBooks();
        }
    } else {
        // Nếu ở trang con, chuyển hướng về trang chủ kèm từ khóa
        // encodeURIComponent để xử lý tiếng Việt và ký tự đặc biệt
        window.location.href = `../index.html?search=${encodeURIComponent(keyword)}`;
    }
}

// Init
document.addEventListener('DOMContentLoaded', function() {
    if (authManager.isLoggedIn() && (location.pathname.includes('login') || location.pathname.includes('register'))) {
        window.location.href = '../index.html';
    }
    if (!document.querySelector('.auth-container')) updateHeaderUserInfo();

    // Gán sự kiện tìm kiếm
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    if (searchBtn) {
        searchBtn.onclick = handleGlobalSearch;
    }
    
    if (searchInput) {
        searchInput.onkeypress = (e) => { 
            if(e.key === 'Enter') handleGlobalSearch(); 
        };
    }
});

window.updateHeaderUserInfo = updateHeaderUserInfo;
window.logout = logout;