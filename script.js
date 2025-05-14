// ------------------- particles.js initialization -------------------
particlesJS("particles-js", {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: ["#ff6b00", "#ff9900", "#ffd500"] },
    shape: { type: "circle" },
    opacity: { value: 0.6, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
    size: { value: 5, random: true, anim: { enable: true, speed: 3, size_min: 1, sync: false } },
    move: { enable: true, speed: 0.5, direction: "top", outMode: "out" }
  },
  interactivity: {
    detect_on: "canvas",
    events: { onhover: { enable: false }, onclick: { enable: false }, resize: true }
  },
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

// ------------------- Mobile Side-Menu Toggle -------------------
function initMenu() {
  const sideMenu = document.getElementById('side-menu');
  if (!sideMenu) return;

  // Toggle menu principale
  const toggleMenu = (e) => {
    e.stopPropagation();
    sideMenu.classList.toggle('submenu-active');
    
    // Blocca lo scroll quando il menu è aperto
    document.body.style.overflow = sideMenu.classList.contains('submenu-active') ? 'hidden' : '';
  };

  // Chiudi menu quando si clicca fuori
  const closeMenu = (e) => {
    if (!e.target.closest('#side-menu')) {
      sideMenu.classList.remove('submenu-active');
      document.body.style.overflow = '';
    }
  };

  // Gestione eventi per touch e mouse
  sideMenu.addEventListener('click', toggleMenu);
  document.addEventListener('click', closeMenu);
  document.addEventListener('touchstart', closeMenu);

  // Miglioramento per submenu
  sideMenu.querySelectorAll('.has-submenu').forEach(item => {
    item.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        item.classList.toggle('submenu-open');
      }
    });
  });
}

// ------------------- Simple Slideshow -------------------
(function() {
  function initSlideshow() {
    const slider = document.querySelector('.illustration-slider');
    if (!slider) { console.error('[Slideshow] .illustration-slider non trovato'); return; }
    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (!slides.length) { console.error('[Slideshow] nessuna slide trovata'); return; }

    let current = 0, timerId = null;
    slides.forEach((s, i) => s.classList.toggle('active', i === 0));

    function nextSlide() {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }
    function start() { if (timerId === null) timerId = setInterval(nextSlide, 4500); }
    function stop() { if (timerId !== null) { clearInterval(timerId); timerId = null; } }

    slider.addEventListener('mouseenter', stop);
    slider.addEventListener('mouseleave', start);
    slider.addEventListener('click', () => timerId ? stop() : start());
    start();
  }
  document.addEventListener('DOMContentLoaded', initSlideshow);
})();

// ------------------- Logo Slideshow RANDOM -------------------
function initLogoSlideshow() {
  const track = document.querySelector('.logos-track');
  if (!track) return;
  const items = Array.from(track.querySelectorAll('.logo-item'));
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  track.innerHTML = '';
  items.forEach(item => track.appendChild(item));
  items.forEach(item => track.appendChild(item.cloneNode(true)));
  track.addEventListener('mouseenter', () => track.style.animationPlayState = 'paused');
  track.addEventListener('mouseleave', () => track.style.animationPlayState = 'running');
}

document.addEventListener('DOMContentLoaded', initMenu);
document.addEventListener('DOMContentLoaded', initAnimations);
document.addEventListener('DOMContentLoaded', initScrollEffect);
document.addEventListener('DOMContentLoaded', initServicesScroll);
document.addEventListener('DOMContentLoaded', initLogoSlideshow);

// ------------------- Video Gallery Modal -------------------
function initVideoGallery() {
  const items = document.querySelectorAll('.video-item');
  const modal = document.getElementById('video-modal');
  const modalFrame = document.getElementById('modal-iframe');
  const closeBtn = document.getElementById('modal-close');
  if (!modal || !modalFrame || !closeBtn) return;

  items.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.dataset.videoId;
      modalFrame.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
      modal.classList.remove('hidden');
    });
  });
  closeBtn.addEventListener('click', () => { modal.classList.add('hidden'); modalFrame.src = ''; });
  modal.querySelector('.modal-backdrop').addEventListener('click', () => closeBtn.click());
}

document.addEventListener('DOMContentLoaded', initVideoGallery);

// ------------------- Portfolio Video Filters -------------------
function initVideoFilters() {
  const btns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.video-card');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(c => c.style.display = filter === 'all' || c.classList.contains(filter) ? '' : 'none');
    });
  });
}
document.addEventListener('DOMContentLoaded', initVideoFilters);

// ------------------- Floating Labels & Form Validation -------------------
function initForm() {
  document.querySelectorAll('.field-wrapper input, .field-wrapper textarea').forEach(f => {
    f.addEventListener('focus', () => f.parentNode.classList.add('focused'));
    f.addEventListener('blur', () => { if (!f.value) f.parentNode.classList.remove('focused'); });
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
  }, { threshold: 0.2 });
  const contact = document.getElementById('contact'); if (contact) observer.observe(contact);

  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    if (form.checkValidity()) form.querySelector('button').innerText = 'Inviato!';
    else form.querySelectorAll(':invalid').forEach(el => el.classList.add('error'));
  });
}
document.addEventListener('DOMContentLoaded', initForm);

// ------------------- Footer Animation -------------------
function initFooterAnimation() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const footerText = document.querySelector('.footer-text');
  if (footerText) setTimeout(() => footerText.classList.add('fade-in'), 500);
}
document.addEventListener('DOMContentLoaded', initFooterAnimation);
