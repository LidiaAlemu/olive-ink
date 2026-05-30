// ===== SPA Router with dynamic page loading =====
document.addEventListener('DOMContentLoaded', () => {
    initRouting();
    initMobileMenu();
    initAuthUI();
    // Load the initial page
    loadPageContent('home');
});

function initRouting() {
    window.addEventListener('hashchange', () => {
        const hash = location.hash.slice(1) || 'home';
        loadPageContent(hash);
    });
}

async function loadPageContent(pageName) {
    // Handle review detail pages (e.g., #review/powerless)
    if (pageName.startsWith('review/')) {
        pageName = 'review-detail';
    }

    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const target = document.getElementById(pageName);
    if (!target) {
        document.getElementById('home').classList.add('active');
        return;
    }

    // If the page hasn't been loaded yet, fetch it
    if (!target.dataset.loaded) {
        try {
            const response = await fetch(`pages/${pageName}.html`);
            if (!response.ok) throw new Error('Page not found');
            const html = await response.text();
            target.innerHTML = html;
            target.dataset.loaded = 'true';
            // Execute any <script> tags inside the loaded content
            executeScripts(target);
        } catch (err) {
            target.innerHTML = '<p style="text-align:center;padding:4rem;">Page not found.</p>';
        }
    }
    target.classList.add('active');

    // Update active nav link
    document.querySelectorAll('.nav-item').forEach(link => {
        const href = link.getAttribute('href').substring(1);
        link.classList.toggle('active', href === pageName);
    });
    window.scrollTo(0, 0);
}

function executeScripts(container) {
    const scripts = container.querySelectorAll('script');
    scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => {
            newScript.setAttribute(attr.name, attr.value);
        });
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
    });
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