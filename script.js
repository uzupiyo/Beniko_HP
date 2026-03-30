// ヒーローセクションの背景画像スライドショー
const heroBackgroundContainer = document.querySelector('.hero-background-container');
// 背景画像のパス
const heroImages = [
    'img/okumono_girly321.png',
    'img/okumono_girly329.png',
    'img/okumono_girly37.png'
];
let currentImageIndex = 0;

function changeHeroBackground() {
    const currentImageElement = document.querySelector('.hero-background-image.active');
    if (currentImageElement) {
        currentImageElement.classList.remove('active');
        setTimeout(() => currentImageElement.remove(), 1000); // CSS transition time (1s)
    }

    const newImageElement = document.createElement('div');
    newImageElement.classList.add('hero-background-image');
    newImageElement.style.backgroundImage = `url('${heroImages[currentImageIndex]}')`;
    heroBackgroundContainer.appendChild(newImageElement);

    setTimeout(() => newImageElement.classList.add('active'), 50);

    currentImageIndex = (currentImageIndex + 1) % heroImages.length;
}

changeHeroBackground();
setInterval(changeHeroBackground, 5000); // 5秒ごとに画像を切り替える

// ヒーローセクションのタイプライターエフェクト（左下）
const heroTextContainer = document.querySelector('.hero-text-container');
const vtuberNameElement = document.querySelector('.hero-text-container #vtuber-name');
const catchphraseElement = document.querySelector('.hero-text-container #catchphrase');
const vtuberNameText = "牛タン 紅狐"; // Vtuber名
// const catchphraseText 
let nameIndex = 0;
let catchphraseIndex = 0;

function typeWriterName() {
    heroTextContainer.classList.add('show'); // テキストコンテナを表示
    if (nameIndex < vtuberNameText.length) {
        vtuberNameElement.textContent += vtuberNameText.charAt(nameIndex);
        nameIndex++;
        setTimeout(typeWriterName, 80); // スピード調整
    } else {
        vtuberNameElement.classList.add('animated'); // アニメーション完了
        setTimeout(typeWriterCatchphrase, 1000); // 1秒後にキャッチフレーズを開始
    }
}

function typeWriterCatchphrase() {
    if (catchphraseIndex < catchphraseText.length) {
        catchphraseElement.style.opacity = 1; // フェードイン
        catchphraseElement.textContent += catchphraseText.charAt(catchphraseIndex);
        catchphraseIndex++;
        setTimeout(typeWriterCatchphrase, 60); // スピード調整
    }
}

// ローディングゲージを非表示にする処理とタイプライターエフェクトの開始
window.addEventListener('load', () => {
    // ローディングゲージを非表示にする
    const loadingOverlay = document.getElementById('loading-overlay');
    setTimeout(() => {
        loadingOverlay.classList.add('hidden');
        // ローディングゲージ非表示後にタイプライターエフェクトを開始
        typeWriterName();
    }, 500); // 0.5秒後に非表示
});


// ハンバーガーメニュー
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileOverlay = document.getElementById('mobile-menu-overlay');

function openMenu() {
    hamburger.classList.add('open');
    mobileMenu.classList.add('open');
    mobileOverlay.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
    mobileOverlay.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeMenu() : openMenu();
});

// オーバーレイクリックで閉じる
mobileOverlay.addEventListener('click', closeMenu);

// メニュー内リンクをタップしたら閉じる
document.querySelectorAll('.mobile-menu-link').forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Escキーで閉じる
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
});


const navBar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navBar.classList.add('scrolled');
    } else {
        navBar.classList.remove('scrolled');
    }
});

// スクロール時のセクションフェードインアニメーション
const sections = document.querySelectorAll('.section');

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ============================================================
// プロフィールモーダル
// ============================================================
(function () {
    var charaArea = document.getElementById('profile-chara-area');
    var chara     = document.getElementById('profile-chara');
    var modal     = document.getElementById('profile-modal');
    var closeBtn  = document.getElementById('profile-modal-close');
    var overlay   = document.getElementById('profile-modal-overlay');
    if (!charaArea || !chara || !modal) return;

    var opened = false;

    function openProfile() {
        if (opened) return;
        opened = true;
        // キャラエリアをスライドイン
        charaArea.classList.add('open');
        // 内側キャラのアニメをリセット（アイドル→フロートへ切り替え準備）
        chara.classList.remove('idle', 'floating');
        chara.style.animation = 'none';
        void chara.offsetWidth;
        // モーダルを表示
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        // オーバーレイ（スマホ）
        if (overlay) overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        // 着地後にフロートアニメ開始
        setTimeout(function () { chara.classList.add('floating'); }, 1100);
    }

    function closeProfile() {
        if (!opened) return;
        opened = false;
        charaArea.classList.remove('open');
        chara.classList.remove('floating');
        chara.style.animation = 'none';
        void chara.offsetWidth;
        chara.classList.add('idle');
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        if (overlay) overlay.classList.remove('open');
        document.body.style.overflow = '';
    }

    charaArea.addEventListener('click', openProfile);
    closeBtn.addEventListener('click', function (e) { e.stopPropagation(); closeProfile(); });
    if (overlay) overlay.addEventListener('click', closeProfile);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && opened) closeProfile();
    });
})();

// ============================================================
// ページトップへ戻るボタン
// ============================================================
(function () {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;

    window.addEventListener('scroll', function () {
        btn.classList.toggle('show', window.scrollY > 300);
    }, { passive: true });

    btn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
