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


// ナビゲーションバーのスクロール時の変化
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