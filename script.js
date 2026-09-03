const loadingOverlay = document.getElementById('loading-overlay');
const siteHeader = document.getElementById('site-header');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-menu-overlay');
const backToTop = document.getElementById('back-to-top');
const profileDialog = document.getElementById('profile-dialog');
const profileOpen = document.getElementById('profile-open');
const profileClose = document.getElementById('profile-close');

window.addEventListener('load', () => {
    window.setTimeout(() => loadingOverlay?.classList.add('hidden'), 320);
});

function setMenu(open) {
    if (!hamburger || !mobileMenu || !mobileOverlay) return;
    hamburger.classList.toggle('open', open);
    mobileMenu.classList.toggle('open', open);
    mobileOverlay.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.classList.toggle('menu-open', open);
}

hamburger?.addEventListener('click', () => setMenu(!mobileMenu.classList.contains('open')));
mobileOverlay?.addEventListener('click', () => setMenu(false));
document.querySelectorAll('.mobile-menu-link').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
});

function updateScrollUi() {
    const isScrolled = window.scrollY > 40;
    siteHeader?.classList.toggle('scrolled', isScrolled);
    backToTop?.classList.toggle('show', window.scrollY > 480);
}

window.addEventListener('scroll', updateScrollUi, { passive: true });
updateScrollUi();

backToTop?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((section) => observer.observe(section));
} else {
    document.querySelectorAll('.reveal').forEach((section) => section.classList.add('visible'));
}

profileOpen?.addEventListener('click', () => {
    if (typeof profileDialog?.showModal === 'function') profileDialog.showModal();
});
profileClose?.addEventListener('click', () => profileDialog?.close());
profileDialog?.addEventListener('click', (event) => {
    const box = profileDialog.getBoundingClientRect();
    const outside = event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom;
    if (outside) profileDialog.close();
});
