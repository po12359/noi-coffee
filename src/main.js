/* ============================================
   noi coffee — Artistic Dark Edition
   main.js
   ============================================ */

// ── 커스텀 커서 ──────────────────────────────────
const cursorRing = document.getElementById('cursor-ring');

if (cursorRing && window.matchMedia('(hover: hover)').matches) {
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    function animateCursor() {
        ringX += (mouseX - ringX) * 0.12;
        ringY += (mouseY - ringY) * 0.12;
        cursorRing.style.left = ringX + 'px';
        cursorRing.style.top = ringY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover 인터랙션
    const hoverEls = document.querySelectorAll('a, button, .carousel-slide, .carousel-btn, .menu-board-item');
    hoverEls.forEach(el => {
        el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
    });
}

// ── 로더 ──────────────────────────────────────────
const loader = document.getElementById('loader');
const loaderPct = document.getElementById('loader-pct');

let pct = 0;
const pctInterval = setInterval(() => {
    pct = Math.min(pct + Math.floor(Math.random() * 12 + 4), 99);
    if (loaderPct) loaderPct.textContent = pct;
}, 80);

document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        clearInterval(pctInterval);
        if (loaderPct) loaderPct.textContent = '100';

        setTimeout(() => {
            if (loader) loader.classList.add('hidden');
            // 히어로 워드 reveals 시작
            triggerHeroWords();
        }, 300);
    }, 1800);
});

// ── 히어로 타이포 애니메이션 ─────────────────────
function triggerHeroWords() {
    const words = document.querySelectorAll('.hero-word');
    words.forEach((word, i) => {
        setTimeout(() => {
            word.classList.add('revealed');
        }, i * 260);
    });
}

// ── 헤더 오버레이 네비게이션 ─────────────────────
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const overlayNav = document.getElementById('overlay-nav');

navToggle?.addEventListener('click', () => {
    const isOpen = overlayNav.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    header.classList.toggle('nav-open', isOpen);
    overlayNav.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
});

// 오버레이 링크 클릭시 닫기
document.querySelectorAll('.overlay-link').forEach(link => {
    link.addEventListener('click', () => {
        overlayNav.classList.remove('open');
        navToggle.classList.remove('active');
        header.classList.remove('nav-open');
        overlayNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    });
});

// ESC 키로 닫기
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlayNav.classList.contains('open')) {
        overlayNav.classList.remove('open');
        navToggle.classList.remove('active');
        header.classList.remove('nav-open');
        overlayNav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }
});

// ── 헤더 스크롤 ────────────────────────────────────
const heroSection = document.getElementById('hero');
function updateHeaderState() {
    const heroH = heroSection ? heroSection.offsetHeight : 0;
    const onHero = window.scrollY < heroH - 80;
    header?.classList.toggle('on-hero', onHero);
    document.getElementById('back-top')?.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();

document.getElementById('back-top')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── 스크롤 Reveal ──────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // 형제 요소 기준 순차 딜레이
                const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
                const idx = siblings.indexOf(entry.target);
                entry.target.style.transitionDelay = `${idx * 0.09}s`;
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);
revealEls.forEach(el => revealObserver.observe(el));

// ── 히어로 슬라이더 ──────────────────────────────
const slides = document.querySelectorAll('.hero-slide');
const siFill = document.getElementById('si-fill');
const siCurrent = document.getElementById('si-current');
let current = 0;
let sliderTimer;

function pad(n) { return n < 10 ? '0' + n : '' + n; }

function goToSlide(idx) {
    slides[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('active');

    // 인디케이터 업데이트
    if (siCurrent) siCurrent.textContent = pad(current + 1);
    if (siFill) siFill.style.width = `${((current + 1) / slides.length) * 100}%`;
}

function startSlider() {
    sliderTimer = setInterval(() => goToSlide(current + 1), 5500);
}

if (slides.length > 0) {
    startSlider();
    // 초기 fill
    if (siFill) siFill.style.width = `${(1 / slides.length) * 100}%`;
}

// ── 갤러리 3D 캐러셀 ──────────────────────────────
(function () {
    const stage = document.getElementById('carousel-stage');
    if (!stage) return;

    const slides = [...stage.querySelectorAll('.carousel-slide')];
    const total = slides.length;
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const cCur = document.getElementById('c-cur');
    const progressFill = document.getElementById('carousel-progress-fill');

    let current = 0;
    let isAnimating = false;

    function pad(n) { return n < 10 ? '0' + n : String(n); }

    function updateCarousel(newIdx) {
        if (isAnimating) return;
        isAnimating = true;

        current = ((newIdx % total) + total) % total;

        slides.forEach((slide, i) => {
            // 현재 슬라이드 기준 상대 위치 계산
            let rel = i - current;
            // 원형으로 감싸기 — 가장 짧은 거리로
            if (rel > total / 2)  rel -= total;
            if (rel < -total / 2) rel += total;

            slide.className = 'carousel-slide';
            if      (rel ===  0) slide.classList.add('is-active');
            else if (rel ===  1) slide.classList.add('is-next-1');
            else if (rel === -1) slide.classList.add('is-prev-1');
            else if (rel ===  2) slide.classList.add('is-next-2');
            else if (rel === -2) slide.classList.add('is-prev-2');
            else                 slide.classList.add('is-hidden');
        });

        if (cCur) cCur.textContent = pad(current + 1);
        if (progressFill) {
            progressFill.style.width = `${((current + 1) / total) * 100}%`;
        }

        setTimeout(() => { isAnimating = false; }, 800);
    }

    // 버튼
    prevBtn?.addEventListener('click', () => updateCarousel(current - 1));
    nextBtn?.addEventListener('click', () => updateCarousel(current + 1));

    // 키보드 (갤러리 섹션 근처에서만)
    document.addEventListener('keydown', (e) => {
        const sec = document.getElementById('gallery');
        if (!sec) return;
        const r = sec.getBoundingClientRect();
        if (r.top > window.innerHeight || r.bottom < 0) return;
        if (e.key === 'ArrowLeft')  updateCarousel(current - 1);
        if (e.key === 'ArrowRight') updateCarousel(current + 1);
    });

    // 터치 스와이프
    let touchStartX = 0;
    stage.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    }, { passive: true });
    stage.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) > 48) {
            dx < 0 ? updateCarousel(current + 1) : updateCarousel(current - 1);
        }
    });

    // 마우스 드래그
    let dragStartX = 0;
    let isDragging = false;
    stage.addEventListener('mousedown', (e) => {
        dragStartX = e.clientX;
        isDragging = true;
    });
    stage.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        const dx = e.clientX - dragStartX;
        if (Math.abs(dx) > 60) {
            dx < 0 ? updateCarousel(current + 1) : updateCarousel(current - 1);
        }
    });
    stage.addEventListener('mouseleave', () => { isDragging = false; });

    // 초기화
    updateCarousel(0);
})();

// ── 스무스 스크롤 ─────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const offset = header.offsetHeight + 16;
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
                contactForm.reset();
                successMsg.style.display = 'block';
            } else {
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
