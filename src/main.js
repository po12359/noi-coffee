/* ============================================
   noi coffee - main.js (완전 재설계)
   ============================================ */

// ── 로더 ──────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        var loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            loader.style.transition = 'opacity 0.6s ease';
            setTimeout(function () { loader.style.display = 'none'; }, 700);
        }
    }, 1400);
});


// ── 헤더 스크롤 ────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);

    // 맨 위로 버튼
    document.getElementById('back-top').classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

document.getElementById('back-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── 모바일 드로어 ─────────────────────────────────
const navToggle = document.getElementById('nav-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');

navToggle?.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

document.querySelectorAll('.drawer-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ── 스크롤 reveal ─────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // 순차 딜레이 적용
                const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
                const idx = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${idx * 0.08}s`;
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

// ── 히어로 슬라이더 ──────────────────────────────
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let current = 0;
let timer;

function goToSlide(idx) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
}

function startSlider() {
    timer = setInterval(() => goToSlide(current + 1), 5000);
}

dots.forEach(dot => {
    dot.addEventListener('click', () => {
        clearInterval(timer);
        goToSlide(parseInt(dot.dataset.index));
        startSlider();
    });
});

if (slides.length > 0) startSlider();

// ── 갤러리 라이트박스 ─────────────────────────────
const galleryItems = [...document.querySelectorAll('.gallery-item img')];
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
let currentLb = 0;

function openLightbox(idx) {
    currentLb = idx;
    lbImg.src = galleryItems[idx].src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
}
function prevLb() { currentLb = (currentLb - 1 + galleryItems.length) % galleryItems.length; lbImg.src = galleryItems[currentLb].src; }
function nextLb() { currentLb = (currentLb + 1) % galleryItems.length; lbImg.src = galleryItems[currentLb].src; }

galleryItems.forEach((img, i) => {
    img.parentElement.addEventListener('click', () => openLightbox(i));
});
document.getElementById('lightbox-close')?.addEventListener('click', closeLightbox);
document.getElementById('lightbox-prev')?.addEventListener('click', prevLb);
document.getElementById('lightbox-next')?.addEventListener('click', nextLb);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

// 키보드 라이트박스 조작
document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') prevLb();
    if (e.key === 'ArrowRight') nextLb();
});

// ── 네비게이션 스무스 스크롤 ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = header.offsetHeight + 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
    });
});

// ── 문의 폼 (Formspree AJAX) ──────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = document.getElementById('submit-btn');
        const submitText = btn.querySelector('.submit-text');
        const submitSending = btn.querySelector('.submit-sending');
        const successMsg = document.getElementById('form-success');
        const errorMsg = document.getElementById('form-error');

        // 전송 중 상태
        btn.disabled = true;
        submitText.style.display = 'none';
        submitSending.style.display = 'inline';
        successMsg.style.display = 'none';
        errorMsg.style.display = 'none';

        try {
            const res = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                // 성공
                contactForm.reset();
                successMsg.style.display = 'block';
            } else {
                // 실패
                errorMsg.style.display = 'block';
            }
        } catch {
            errorMsg.style.display = 'block';
        } finally {
            btn.disabled = false;
            submitText.style.display = 'inline';
            submitSending.style.display = 'none';
        }
    });
}
