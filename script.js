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
    move: { enable: true, speed: 0.5, direction: "top", outMode: "out" }
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
  const slider = document.querySelector('.illustration-slider');
  const slides = slider?.querySelectorAll('.slide') || [];
  if (!slides.length) return;

  let current = 0;
  let timer = null;

  // 1) Mostra la prima immagine
  slides.forEach((s,i) => s.classList.toggle('active', i === 0));

  // 2) Funzione per passare alla slide successiva
  function nextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }

  // 3) Avvio e stop del timer
  function start() {
    timer = setInterval(nextSlide, 4500);
  }
  function stop() {
    clearInterval(timer);
    timer = null;
  }

  // 4) Eventi per mettere in pausa / riprendere
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', () => { if (!timer) start(); });
  slider.addEventListener('click', () => { timer ? stop() : start(); });

  // 5) Partiamo!
  start();
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

// ------------------- Video Gallery Modal -------------------
function initVideoGallery() {
  const items = document.querySelectorAll('.video-item iframe');
  const modal = document.getElementById('video-modal');
  const modalFrame = document.getElementById('modal-iframe');
  const closeBtn = document.getElementById('modal-close');

  items.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const id = thumb.closest('.video-item').dataset.videoId;
      modalFrame.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
      modal.classList.remove('hidden');
    });
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalFrame.src = '';
  });

  // chiudi cliccando fuori
  modal.querySelector('.modal-backdrop').addEventListener('click', () => {
    closeBtn.click();
  });
}

// e infine fallo partire
window.addEventListener('DOMContentLoaded', () => {
  // ... gli init esistenti ...
  initLogoSlideshow();
  initVideoGallery();      // <— qui
});

// ------------------- Mobile Side-Menu Toggle -------------------
function initMenu() {
  // 1) Prendo il contenitore del menu
  const sideMenu = document.getElementById('side-menu');
  if (!sideMenu) return; // se non lo trova, esco
  
  // 2) Al tap sulla barra (ma non sui link) alterno la classe .submenu-active
  sideMenu.addEventListener('click', function(e) {
    // se il click è su un <a>, non faccio toggle (così il link funziona)
    if (e.target.closest('a')) return;
    sideMenu.classList.toggle('submenu-active');
  });
  
  // 3) Se clicco fuori dal menu, lo chiudo togliendo la classe
  document.addEventListener('click', function(e) {
    // se l'elemento cliccato NON è dentro #side-menu, chiudo
    if (!e.target.closest('#side-menu')) {
      sideMenu.classList.remove('submenu-active');
    }
  });
}