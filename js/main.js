/* ========================================
   eXpert slim X - Main JavaScript
   ======================================== */

// Tailwind CSS Configuration
if (typeof tailwind !== 'undefined') {
    tailwind.config = {
        theme: {
            extend: {
                fontFamily: {
                    pretendard: ['Pretendard Variable', 'sans-serif'],
                },
                colors: {
                    primary: '#2563eb',
                    'primary-dark': '#1d4ed8',
                    sidebar: '#f8fafc',
                }
            }
        }
    };
}

// Initialize on DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Initialize sidebar state
    initSidebarState();
});

/* ========================================
   Login Page Functions
   ======================================== */

/**
 * Toggle password visibility
 */
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const eyeIcon = document.getElementById('eye-icon');
    
    if (!passwordInput || !eyeIcon) return;
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        eyeIcon.setAttribute('data-lucide', 'eye-off');
    } else {
        passwordInput.type = 'password';
        eyeIcon.setAttribute('data-lucide', 'eye');
    }
    
    // Re-initialize icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

/* ========================================
   Sidebar Functions
   ======================================== */

/**
 * Toggle sidebar visibility (LNB 접기/펼치기)
 */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const topBarBrand = document.querySelector('.top-bar-brand');
    const toggleIcon = document.getElementById('sidebar-toggle-icon');
    
    if (sidebar) {
        sidebar.classList.toggle('collapsed');
    }
    
    if (mainContent) {
        mainContent.classList.toggle('expanded');
    }
    
    if (topBarBrand) {
        topBarBrand.classList.toggle('collapsed');
    }
    
    // Save state to localStorage
    const isCollapsed = sidebar?.classList.contains('collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
    
    // Update toggle icon
    if (toggleIcon) {
        toggleIcon.setAttribute('data-lucide', isCollapsed ? 'panel-left-open' : 'panel-left-close');
        lucide.createIcons();
    }
}

/**
 * Initialize sidebar state from localStorage
 */
function initSidebarState() {
    const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const topBarBrand = document.querySelector('.top-bar-brand');
    const toggleIcon = document.getElementById('sidebar-toggle-icon');
    
    if (isCollapsed) {
        sidebar?.classList.add('collapsed');
        mainContent?.classList.add('expanded');
        topBarBrand?.classList.add('collapsed');
        
        if (toggleIcon) {
            toggleIcon.setAttribute('data-lucide', 'panel-left-open');
        }
    }
}

/**
 * Toggle submenu visibility
 * @param {string} id - The ID of the submenu element
 */
function toggleSubmenu(id) {
    const submenu = document.getElementById(id);
    const arrow = document.getElementById(id + '-arrow');
    
    if (!submenu) return;
    
    submenu.classList.toggle('open');
    
    if (arrow) {
        arrow.style.transform = submenu.classList.contains('open') ? 'rotate(180deg)' : '';
    }
}

/**
 * Set active menu item
 * @param {HTMLElement} element - The menu item element to activate
 */
function setActiveMenu(element) {
    // Remove active class from all menu items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Add active class to clicked element
    element.classList.add('active');
}

/* ========================================
   Utility Functions
   ======================================== */

/**
 * Format number with commas
 * @param {number} num - The number to format
 * @returns {string} Formatted number string
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Format currency
 * @param {number} amount - The amount to format
 * @param {string} currency - Currency code (USD, KRW, etc.)
 * @returns {string} Formatted currency string
 */
function formatCurrency(amount, currency = 'USD') {
    const formats = {
        USD: { symbol: '$', locale: 'en-US' },
        KRW: { symbol: '₩', locale: 'ko-KR' },
        JPY: { symbol: '¥', locale: 'ja-JP' },
        EUR: { symbol: '€', locale: 'de-DE' },
        GBP: { symbol: '£', locale: 'en-GB' }
    };
    
    const format = formats[currency] || formats.USD;
    return new Intl.NumberFormat(format.locale, {
        style: 'currency',
        currency: currency
    }).format(amount);
}

/**
 * Show toast notification
 * @param {string} message - The message to display
 * @param {string} type - Type of toast (success, error, warning, info)
 */
function showToast(message, type = 'info') {
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    };
    
    const toast = document.createElement('div');
    toast.className = `fixed bottom-4 right-4 ${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('animate-fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

/**
 * Logout function
 */
function logout() {
    if (confirm('로그아웃 하시겠습니까?')) {
        // Check if we're in pages folder
        const isInPages = window.location.pathname.includes('/pages/');
        window.location.href = isInPages ? '../login.html' : 'login.html';
    }
}

/* ========================================
   Fullscreen Functions
   ======================================== */

/**
 * Toggle fullscreen mode
 */
function toggleFullscreen() {
    const icon = document.getElementById('fullscreenIcon');
    
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
            if (icon) {
                icon.setAttribute('data-lucide', 'minimize');
                lucide.createIcons();
            }
        }).catch(err => {
            console.error('Fullscreen error:', err);
        });
    } else {
        document.exitFullscreen().then(() => {
            if (icon) {
                icon.setAttribute('data-lucide', 'maximize');
                lucide.createIcons();
            }
        });
    }
}

// Listen for fullscreen change
document.addEventListener('fullscreenchange', function() {
    const icon = document.getElementById('fullscreenIcon');
    if (icon) {
        icon.setAttribute('data-lucide', document.fullscreenElement ? 'minimize' : 'maximize');
        lucide.createIcons();
    }
});

/* ========================================
   Language Selection Functions
   ======================================== */

/**
 * Toggle language dropdown
 */
function toggleLanguageMenu() {
    const dropdown = document.getElementById('languageDropdown');
    const userDropdown = document.getElementById('userDropdown');
    
    // Close user dropdown if open
    if (userDropdown) userDropdown.classList.remove('show');
    
    // Toggle language dropdown
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

/**
 * Select language
 * @param {string} langCode - Language code (ko, en, ja, zh)
 * @param {string} displayCode - Display code (KO, EN, JP, CN)
 */
function selectLanguage(langCode, displayCode) {
    const langBtn = document.querySelector('#langBtn .lang-code');
    const dropdown = document.getElementById('languageDropdown');
    const options = document.querySelectorAll('.language-option');
    
    // Update button text
    if (langBtn) {
        langBtn.textContent = displayCode;
    }
    
    // Update active state
    options.forEach(option => {
        option.classList.remove('active');
        if (option.onclick.toString().includes(langCode)) {
            option.classList.add('active');
        }
    });
    
    // Close dropdown
    if (dropdown) {
        dropdown.classList.remove('show');
    }
    
    // Save to localStorage
    localStorage.setItem('language', langCode);
    
    showToast(`언어가 ${displayCode}로 변경되었습니다.`, 'info');
}

/* ========================================
   User Menu Functions
   ======================================== */

/**
 * Toggle user dropdown
 */
function toggleUserMenu() {
    const dropdown = document.getElementById('userDropdown');
    const langDropdown = document.getElementById('languageDropdown');
    
    // Close language dropdown if open
    if (langDropdown) langDropdown.classList.remove('show');
    
    // Toggle user dropdown
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

/**
 * Go to My Page
 */
function goToMyPage() {
    const isInPages = window.location.pathname.includes('/pages/');
    showToast('내 정보 페이지로 이동합니다.', 'info');
    // window.location.href = isInPages ? 'mypage.html' : 'pages/mypage.html';
}

/**
 * Go to Settings
 */
function goToSettings() {
    showToast('설정 페이지로 이동합니다.', 'info');
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    const langDropdown = document.getElementById('languageDropdown');
    const userDropdown = document.getElementById('userDropdown');
    const langBtn = document.getElementById('langBtn');
    const userBtn = document.getElementById('userBtn');
    
    // Close language dropdown
    if (langDropdown && !langBtn?.contains(e.target) && !langDropdown.contains(e.target)) {
        langDropdown.classList.remove('show');
    }
    
    // Close user dropdown
    if (userDropdown && !userBtn?.contains(e.target) && !userDropdown.contains(e.target)) {
        userDropdown.classList.remove('show');
    }
});

