// ------------------- particles.js initialization -------------------
particlesJS("particles-js", {
  particles: {
    number: { value: 100, density: { enable: true, value_area: 800 } },
    color: { value: ["#ff6b00", "#ff9900", "#ffd500"] },
    shape: { type: "circle" },
    opacity: {
      value: 0.6,
      random: true,
      anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
    },
    size: {
      value: 5,
      random: true,
      anim: { enable: true, speed: 3, size_min: 1, sync: false }
    },
    move: { enable: true, speed: 0.5, direction: "top", outMode: "out" }
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false },
      onclick: { enable: false },
      resize: true
    }
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

  slides.forEach((s, i) => s.classList.toggle('active', i === 0));

  function nextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }

  function start() {
    timer = setInterval(nextSlide, 4500);
  }

  function stop() {
    clearInterval(timer);
    timer = null;
  }

  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', () => { if (!timer) start(); });
  slider.addEventListener('click', () => { timer ? stop() : start(); });

  start();
}

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

  track.addEventListener('mouseenter', () => {
    track.style.animationPlayState = 'paused';
  });
  track.addEventListener('mouseleave', () => {
    track.style.animationPlayState = 'running';
  });
}

// ------------------- Mobile Side-Menu Toggle -------------------
function initMenu() {
  const sideMenu = document.getElementById('side-menu');
  if (!sideMenu) return;

  sideMenu.addEventListener('click', function(e) {
    if (e.target.closest('a')) return;
    sideMenu.classList.toggle('submenu-active');
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('#side-menu')) {
      sideMenu.classList.remove('submenu-active');
    }
  });
}

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

  modal.querySelector('.modal-backdrop').addEventListener('click', () => {
    closeBtn.click();
  });
}

// ------------------- Portfolio Video Filters -------------------
function initVideoFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.video-card');

  buttons.forEach(btn => {
    btn.style.cursor = 'pointer';
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      cards.forEach(card => {
        card.style.display = (filter === 'all' || card.classList.contains(filter)) ? '' : 'none';
      });
    });
  });
}

// ------------------- Floating Labels & Form Validation -------------------
function initForm() {
  document.querySelectorAll('.field-wrapper input, .field-wrapper textarea').forEach(field => {
    field.addEventListener('focus', () => field.parentNode.classList.add('focused'));
    field.addEventListener('blur', () => {
      if (!field.value) field.parentNode.classList.remove('focused');
    });
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });

  const contactSection = document.getElementById('contact');
  if (contactSection) observer.observe(contactSection);

  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (form.checkValidity()) {
        form.querySelector('button').innerText = 'Inviato!';
      } else {
        form.querySelectorAll(':invalid').forEach(el => el.classList.add('error'));
      }
    });
  }
}

// ------------------- Footer Animation -------------------
function initFooterAnimation() {
  document.getElementById("year").textContent = new Date().getFullYear();
  const footerText = document.querySelector(".footer-text");
  if (footerText) {
    setTimeout(() => {
      footerText.classList.add("fade-in");
    }, 500);
  }
}

// ------------------- DOM Ready -------------------
window.addEventListener('DOMContentLoaded', () => {
  if (typeof initMenu === 'function') initMenu();
  initAnimations();
  initScrollEffect();
  initServicesScroll();
  initSlideshow();
  initLogoSlideshow();
  initVideoGallery();
  initVideoFilters();
  initForm();
  initFooterAnimation();
});