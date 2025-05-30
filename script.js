// ──────────────────────────────────────────────────────────
// Stub per initRealEstatePromo (evita ReferenceError)
// ──────────────────────────────────────────────────────────
function initRealEstatePromo() {
  // TODO: logica futura per promo immobiliare
}

// ──────────────────────────────────────────────────────────
// 1) Animazione SVG
// ──────────────────────────────────────────────────────────
function initAnimations() {
  const svgEl = document.querySelector('.disegno-svg');
  if (!svgEl) return;

  // dopo 500ms facciamo il fade-in
  setTimeout(() => svgEl.classList.add('show'), 500);

  // 2 secondi dopo il fade-in, lo spostiamo in alto a sinistra
  setTimeout(() => svgEl.classList.add('move-to-corner'), 2500);
}

// ──────────────────────────────────────────────────────────
// 2) Effetto scroll “pulse” su elemento titolo
// ──────────────────────────────────────────────────────────
function initScrollEffect() {
  const svgTitle = document.getElementById('svg-title2');
  if (!svgTitle) return;
  
  let wasInView = false;
  function handler() {
    const rect = svgTitle.getBoundingClientRect();
    const inView = rect.top <= window.innerHeight && rect.bottom >= 0;
    if (inView && !wasInView) {
      svgTitle.classList.add('pulse-twice');
      setTimeout(() => svgTitle.classList.remove('pulse-twice'), 1000);
    }
    wasInView = inView;
  }

  window.addEventListener('scroll', handler);
}

// ──────────────────────────────────────────────────────────
// 3) Toggle classe in base allo scroll
// ──────────────────────────────────────────────────────────
function initServicesScroll() {
  window.addEventListener('scroll', () => {
    document.body.classList.toggle(
      'window-scrolled',
      window.scrollY > window.innerHeight * 0.5
    );
  });
}

// ──────────────────────────────────────────────────────────
// 4) Side menu (hamburger, sottomenù, click esterno, resize)
// ──────────────────────────────────────────────────────────
function initSideMenu() {
  const sideMenu = document.getElementById('side-menu');
  if (!sideMenu) return;
  const submenuToggles = sideMenu.querySelectorAll('.submenu-toggle');
  const submenuItems   = sideMenu.querySelectorAll('.has-submenu');
  const menuLinks      = sideMenu.querySelectorAll('.menu-item > a:not(.submenu-toggle)');

  // Hamburger mobile
  const hamburgerLink = sideMenu.querySelector('.menu-item:first-child > a');
  if (hamburgerLink) {
    hamburgerLink.addEventListener('click', e => {
      if (window.innerWidth < 768) {
        e.preventDefault();
        sideMenu.classList.toggle('submenu-active');
        document.body.style.overflow = sideMenu.classList.contains('submenu-active')
          ? 'hidden'
          : '';
      }
    });
  }

  // Toggle sottomenù
  submenuToggles.forEach(btn => {
    ['click','touchstart'].forEach(evt => {
      btn.addEventListener(evt, e => {
        if (window.innerWidth < 768) {
          e.preventDefault();
          btn.closest('.has-submenu').classList.toggle('submenu-open');
        }
      });
    });
  });

  // Hover desktop
  if (window.innerWidth >= 768) {
    submenuItems.forEach(item => {
      item.addEventListener('mouseenter', () => item.classList.add('submenu-open'));
      item.addEventListener('mouseleave', () => item.classList.remove('submenu-open'));
    });
  }

  // Chiudi menu mobile al click su link
  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768) {
        sideMenu.classList.remove('submenu-active');
        document.body.style.overflow = '';
      }
    });
  });

  // Click esterno
  ['click','touchstart'].forEach(evt => {
    document.addEventListener(evt, e => {
      if (!e.target.closest('#side-menu')) {
        if (window.innerWidth < 768) {
          sideMenu.classList.remove('submenu-active');
          document.body.style.overflow = '';
        }
        submenuItems.forEach(i => i.classList.remove('submenu-open'));
      }
    });
  });

  // Resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      sideMenu.classList.remove('submenu-active');
      document.body.style.overflow = '';
    }
  });
}

// ──────────────────────────────────────────────────────────
// 5) Logo slideshow orizzontale random
// ──────────────────────────────────────────────────────────
function initLogoSlideshow() {
  const track = document.querySelector('.logos-track');
  if (!track) return;
  const items = Array.from(track.querySelectorAll('.logo-item'));
  items.sort(() => Math.random() - 0.5);
  track.innerHTML = '';
  items.concat(items.map(i => i.cloneNode(true))).forEach(i => track.appendChild(i));
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}

// ──────────────────────────────────────────────────────────
// 6) Video modal (YouTube embed)
// ──────────────────────────────────────────────────────────
function initVideoGallery() {
  const modal      = document.getElementById('video-modal');
  const modalFrame = document.getElementById('modal-iframe');
  const closeBtn   = document.getElementById('modal-close');
  if (!modal || !modalFrame || !closeBtn) return;

  document.querySelectorAll('.video-item').forEach(card => {
    card.addEventListener('click', () => {
      modalFrame.src = `https://www.youtube.com/embed/${card.dataset.videoId}?autoplay=1`;
      modal.classList.remove('hidden');
    });
  });
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalFrame.src = '';
  });
}

// ──────────────────────────────────────────────────────────
// 7) Filtri video
// ──────────────────────────────────────────────────────────
function initVideoFilters() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.video-card');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(c => {
        c.style.display = (filter === 'all' || c.classList.contains(filter)) ? '' : 'none';
      });
    });
  });
}

// ──────────────────────────────────────────────────────────
// 8) Form contatti
// ──────────────────────────────────────────────────────────
function initForm() {
  document.querySelectorAll('.field-wrapper input, .field-wrapper textarea').forEach(f => {
    f.addEventListener('focus', () => f.parentNode.classList.add('focused'));
    f.addEventListener('blur', () => {
      if (!f.value) f.parentNode.classList.remove('focused');
    });
  });
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const feedback = form.querySelector('.form-feedback');
    if (!form.checkValidity()) {
      form.querySelectorAll(':invalid').forEach(el => el.classList.add('error'));
      feedback.textContent = 'Compila tutti i campi obbligatori';
      return;
    }
    feedback.textContent = 'Invio in corso...';
    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      feedback.textContent = response.ok
        ? 'Messaggio inviato con successo!'
        : 'Errore durante l\'invio';
      if (response.ok) form.reset();
    } catch {
      feedback.textContent = 'Errore di connessione';
    }
  });
}

function initPromoZoomIn() {
  const promo = document.getElementById('real-estate-promo');
  if (!promo) return;

  let hasAnimated = false;

  function onScroll() {
    const rect = promo.getBoundingClientRect();
    const inView = rect.top <= window.innerHeight && rect.bottom >= 0;

    if (inView && !hasAnimated) {
      promo.classList.add('zoom-in');
      hasAnimated = true;
      window.removeEventListener('scroll', onScroll);
    }
  }

  window.addEventListener('scroll', onScroll);
  // Controllo iniziale nel caso sia già visibile
  onScroll();
}

// ──────────────────────────────────────────────────────────
// 9) Slideshow automatico
// ──────────────────────────────────────────────────────────
function initSlideshow() {
  const slider = document.querySelector('.illustration-slider');
  if (!slider) return;
  const slides = Array.from(slider.querySelectorAll('.slide'));
  let current = 0, timerId = null;

  slides.forEach((s, i) => s.classList.toggle('active', i === 0));

  function nextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }

  function start() { if (!timerId) timerId = setInterval(nextSlide, 4500); }
  function stop()  { clearInterval(timerId); timerId = null; }

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  start();
}

// ──────────────────────────────────────────────────────────
// 10) Fancy‑list progress‑bar
// ──────────────────────────────────────────────────────────
function initProgressBars() {
  document.querySelectorAll('.fancy-list .progress-bar').forEach(bar => {
    const w = Math.floor(Math.random() * 60) + 40;       // 40–100%
    const d = (Math.random() * 2 + 1.5).toFixed(2) + 's'; // 1.5–3.5s
    bar.style.transition = `width ${d} ease-in-out`;
    setTimeout(() => (bar.style.width = w + '%'), 100);
  });
}

function init3DSlider() {
  const slider = document.querySelector('.slider');
  const operas = document.querySelectorAll('.opera');
  let currentIndex = 0;
  let intervalId = null;

  function updateSlides() {
    operas.forEach((opera, index) => {
      const angle = (index * 90) - (currentIndex * 90);
      opera.style.transform = `
        rotateY(${angle}deg) 
        translateZ(300px)
        ${index === currentIndex ? 'scale(1)' : 'scale(0.8)'}
      `;
      opera.classList.toggle('active', index === currentIndex);
    });
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % operas.length;
    updateSlides();
  }

  function startSlider() {
    intervalId = setInterval(nextSlide, 4000);
  }

  function stopSlider() {
    clearInterval(intervalId);
  }

  slider.addEventListener('mouseenter', stopSlider);
  slider.addEventListener('mouseleave', startSlider);

  // Inizializzazione
  updateSlides();
  startSlider();
}

// ──────────────────────────────────────────────────────────
// 11) Animazione fancy-list con barra dorata semitrasparente
// ──────────────────────────────────────────────────────────
function initFancyListHighlight() {
  const list = document.querySelector('.fancy-list');
  if (!list) return;

  const highlighter = document.createElement('div');
  highlighter.className = 'list-highlighter';
  list.appendChild(highlighter);

  function updateHighlight(target) {
    const rect = target.getBoundingClientRect();
    const listRect = list.getBoundingClientRect();

    highlighter.style.top = (target.offsetTop) + 'px';
    highlighter.style.height = target.offsetHeight + 'px';
  }

  list.querySelectorAll('li').forEach(item => {
    item.addEventListener('mouseenter', () => updateHighlight(item));
  });

  // Reset posizione al mouseleave
  list.addEventListener('mouseleave', () => {
    highlighter.style.top = '-100px'; // Nasconde la barra
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initFancyListHighlight();
});

// ──────────────────────────────────────────────────────────
// Sezione inizializzazione principale
// ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Particelle sullo sfondo
  particlesJS("particles-js", {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: ["#ff6b00", "#ff9900", "#ffd500"] },
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
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
    },
    retina_detect: true
  });

  // Esegui tutte le init in try/catch per evitare blocchi
  [
    initAnimations,
    initScrollEffect,
    initServicesScroll,
    initSideMenu,
    initLogoSlideshow,
    initVideoGallery,
    initVideoFilters,
    initForm,
    initRealEstatePromo,
    initSlideshow,
    initPromoZoomIn,
    init3DSlider,
    initProgressBars
  ].forEach(fn => {
    try { fn(); }
    catch (err) { console.warn(`Errore in ${fn.name}:`, err); }
  });
});