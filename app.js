// ===== Simple SPA Router =====
document.addEventListener('DOMContentLoaded', () => {
    initRouting();
    initMobileMenu();
    initAuthUI();
});

function initRouting() {
    window.addEventListener('hashchange', route);
    route();
}

function route() {
    const hash = location.hash.slice(1) || 'home';
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(hash);
    if (target) {
        target.classList.add('active');
        document.querySelectorAll('.nav-item').forEach(link => {
            const href = link.getAttribute('href').substring(1);
            link.classList.toggle('active', href === hash);
        });
        window.scrollTo(0, 0);
    } else {
        document.getElementById('home').classList.add('active');
    }
}

function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
    });
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => navLinks.classList.remove('show'));
    });
}

function initAuthUI() {
    const btn = document.getElementById('authBtn');
    btn.addEventListener('click', () => {
        if (auth.currentUser) {
            auth.signOut();
        } else {
            alert('Login feature coming soon');
        }
    });
    auth.onAuthStateChanged(user => {
        if (user) {
            btn.textContent = 'Logout';
            document.body.classList.add('admin-logged-in');
        } else {
            btn.textContent = 'Login';
            document.body.classList.remove('admin-logged-in');
        }
    });
}