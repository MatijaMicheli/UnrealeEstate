// ------------------- particles.js initialization -------------------
particlesJS("particles-js", {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: ["#ff6b00","#ff9900","#ffd500"] },
    shape: { type: "circle" },
    opacity: { 
      value: 0.6, random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: { 
      value: 5, random: true,
      anim: { enable: true, speed: 3, size_min: 1, sync: false }
    },
    move: { enable: true, speed: 2, direction: "top", outMode: "out" }
  },
  interactivity: { detect_on: "canvas", events: { onhover: { enable: false }, onclick: { enable: false }, resize: true } },
  retina_detect: true
});

// ------------------- SVG Animation -------------------
function initAnimations() {
  const svgEl = document.querySelector('.disegno-svg');
  if (!svgEl) return;
  setTimeout(() => svgEl.classList.add('show'), 500);
}

// ------------------- Pulsing on Scroll for SVG -------------------
function initScrollEffect() {
  const svgTitle = document.getElementById('svg-title2');
  if (!svgTitle) return;
  let wasInView = false;

  const handler = () => {
    const rect = svgTitle.getBoundingClientRect();
    const nowInView = rect.top <= window.innerHeight && rect.bottom >= 0;
    if (nowInView && !wasInView) {
      svgTitle.classList.add('pulse-twice');
      setTimeout(() => svgTitle.classList.remove('pulse-twice'), 1000);
    }
    wasInView = nowInView;
  };

  window.addEventListener('scroll', handler);
}

// ------------------- Services Scroll Listener -------------------
function initServicesScroll() {
  window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight * 0.5) {
      document.body.classList.add('window-scrolled');
    } else {
      document.body.classList.remove('window-scrolled');
    }
  });
}

// ------------------- Simple Slideshow -------------------
function initSlideshow() {
  const slides = document.querySelectorAll('.illustration-slider .slide');
  if (!slides.length) return;

  let current = 0;
  slides.forEach((s, i) => s.classList.toggle('active', i === 0));

  setInterval(() => {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }, 3000);
}

// ------------------- Logo Slideshow -------------------
function initLogoSlideshow() {
  const track = document.querySelector('.logos-track');
  if (!track) return;

  // Duplica i loghi per l'effetto infinito
  const logos = track.innerHTML;
  track.innerHTML = logos + logos;

  // Pause on hover
  track.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });

  track.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}

// Aggiorna l'inizializzazione principale:
window.addEventListener('DOMContentLoaded', () => {
  // ... codice esistente ...
  
  // 5) Logo Slideshow
  initLogoSlideshow();
});

// ------------------- Main Initialization -------------------
window.addEventListener('DOMContentLoaded', () => {
  // 1) Menu (assume initMenu è definita altrove)
  if (typeof initMenu === 'function') {
    initMenu();
  }

  // 2) SVG animations
  initAnimations();
  initScrollEffect();

  // 3) Services fade-in scroll
  initServicesScroll();

  // 4) Slideshow
  initSlideshow();
});