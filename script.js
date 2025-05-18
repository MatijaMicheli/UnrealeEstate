<<<<<<< HEAD
// @section: Initialization
console.log("Start");

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

// ------------------- Side-Menu Mobile & Dropdown -------------------
function initSideMenu() {
  const sideMenu = document.getElementById('side-menu');
  if (!sideMenu) return;

  const submenuToggles = sideMenu.querySelectorAll('.submenu-toggle');
  const submenuItems   = sideMenu.querySelectorAll('.has-submenu');

  // 1) Toggle principale hamburger (solo su mobile)
  const hamburgerLink = sideMenu.querySelector('.menu-item:first-child > a');
  if (hamburgerLink) {
    hamburgerLink.addEventListener('click', e => {
      if (window.innerWidth < 768) {
        e.preventDefault();
        e.stopPropagation();
        sideMenu.classList.toggle('submenu-active');
        document.body.style.overflow = sideMenu.classList.contains('submenu-active') ? 'hidden' : '';
      }
    });
  }

  // 2) Toggle sottomenù Services (click + touchstart)
  submenuToggles.forEach(btn => {
    ['click', 'touchstart'].forEach(evtType => {
      btn.addEventListener(evtType, e => {
        e.preventDefault();
        e.stopPropagation();
        const parent = btn.closest('.has-submenu');
        parent.classList.toggle('submenu-open');
      });
    });
  });

  // 3) Chiudi tutto se clicchi o tocchi fuori
  ['click', 'touchstart'].forEach(evtType => {
    document.addEventListener(evtType, e => {
      // chiudi dropdown
      submenuItems.forEach(item => {
        if (!e.target.closest('.has-submenu')) {
          item.classList.remove('submenu-open');
        }
      });
      // chiudi menu mobile
      if (
        !e.target.closest('#side-menu') &&
        sideMenu.classList.contains('submenu-active')
      ) {
        sideMenu.classList.remove('submenu-active');
        document.body.style.overflow = '';
      }
    });
  });
}

// ------------------- Simple Slideshow -------------------
(function() {
  function initSlideshow() {
    const slider = document.querySelector('.illustration-slider');
    if (!slider) {
      console.error('[Slideshow] .illustration-slider non trovato');
      return;
    }
    const slides = Array.from(slider.querySelectorAll('.slide'));
    if (!slides.length) {
      console.error('[Slideshow] nessuna slide trovata');
      return;
    }

    let current = 0, timerId = null;
    slides.forEach((s, i) => s.classList.toggle('active', i === 0));

    function nextSlide() {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }
    function start() { if (timerId === null) timerId = setInterval(nextSlide, 4500); }
    function stop()  { if (timerId !== null) { clearInterval(timerId); timerId = null; } }

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

// ------------------- Video Gallery Modal -------------------
function initVideoGallery() {
  const items    = document.querySelectorAll('.video-item');
  const modal    = document.getElementById('video-modal');
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
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modalFrame.src = '';
  });
  modal.querySelector('.modal-backdrop').addEventListener('click', () => closeBtn.click());
}

// ------------------- Portfolio Video Filters -------------------
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

// ------------------- Floating Labels & Form Validation -------------------
function initForm() {
  document.querySelectorAll('.field-wrapper input, .field-wrapper textarea').forEach(f => {
    f.addEventListener('focus', () => f.parentNode.classList.add('focused'));
    f.addEventListener('blur', () => {
      if (!f.value) f.parentNode.classList.remove('focused');
    });
  });
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('show');
    });
  }, { threshold: 0.2 });

  const contact = document.getElementById('contact');
  if (contact) observer.observe(contact);

  const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const feedback = form.querySelector('.form-feedback');
    if (!form.checkValidity()) {
      form.querySelectorAll(':invalid').forEach(el => el.classList.add('error'));
      feedback.textContent = 'Per favore compila tutti i campi richiesti.';
      return;
    }
    feedback.textContent = 'Inviando...';
    const data = new FormData(form);
    try {
      const resp = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });
      if (resp.ok) {
        feedback.textContent = 'Grazie! Il messaggio è stato inviato.';
        form.reset();
      } else {
        feedback.textContent = 'Errore durante l’invio, riprova più tardi.';
      }
    } catch (err) {
      console.error(err);
      feedback.textContent = 'Connessione fallita.';
    }
  });
}
}


// ------------------- Real Estate Promo Initialization -------------------
function initRealEstatePromo() {
  const promoEls = document.querySelectorAll('#real-estate-promo .promo-content > div');
  if (!promoEls.length) return;

  // 1) IntersectionObserver per fade-in delle colonne
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  promoEls.forEach(el => observer.observe(el));

  // 2) Hover sulle icone dei benefit
  document.querySelectorAll('.promo-benefits .benefit-icon').forEach(icon => {
    icon.addEventListener('mouseenter', () => icon.classList.add('icon-glow'));
    icon.addEventListener('mouseleave', () => icon.classList.remove('icon-glow'));
  });
}

// ------------------- Avvio di tutti gli init al DOMContentLoaded -------------------
document.addEventListener('DOMContentLoaded', () => {
  initAnimations();
  initScrollEffect();
  initServicesScroll();
  initSideMenu();
  initLogoSlideshow();
  initVideoGallery();
  initVideoFilters();
  initForm();
  initFooterAnimation();
  initRealEstatePromo();
});
=======
// particles.js initialization
particlesJS("particles-js", {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: ["#ff6b00","#ff9900","#ffd500"] },
        shape: { type: "circle" },
        opacity: { 
            value: 0.6, 
            random: true, 
            anim: { 
                enable: true, 
                speed: 1, 
                opacity_min: 0.1, 
                sync: false 
            } 
        },
        size: { 
            value: 5, 
            random: true, 
            anim: { 
                enable: true, 
                speed: 3, 
                size_min: 1, 
                sync: false 
            } 
        },
        move: { 
            enable: true, 
            speed: 2, 
            direction: "top", 
            outMode: "out" 
        }
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

// Mobile Menu Handler aggiornato
function handleMobileMenu() {
    const menu = document.getElementById('side-menu');
    let activeSubmenu = null;

    const toggleSubmenu = (menuItem) => {
        const wasActive = menuItem.classList.contains('active');
        const subMenu = menuItem.querySelector('.sub-menu');
        
        document.querySelectorAll('.has-submenu').forEach(item => {
            if(item !== menuItem) {
                item.classList.remove('active');
                item.querySelector('.sub-menu').style.opacity = '0';
            }
        });

        if(!wasActive) {
            menu.classList.add('submenu-active');
            subMenu.style.opacity = '1';
            subMenu.style.top = `${menuItem.offsetTop}px`;
            menuItem.classList.add('active');
            activeSubmenu = menuItem;
        } else {
            menu.classList.remove('submenu-active');
            subMenu.style.opacity = '0';
            menuItem.classList.remove('active');
            activeSubmenu = null;
        }
    };

    const handleInteraction = (e) => {
        const menuItem = e.target.closest('.has-submenu');
        if(menuItem) {
            e.preventDefault();
            e.stopPropagation();
            toggleSubmenu(menuItem);
        }
    };

    const handleDocumentClick = (e) => {
        if(!menu.contains(e.target) && activeSubmenu) {
            toggleSubmenu(activeSubmenu);
        }
    };

    // Aggiungi entrambi i listener
    menu.addEventListener('touchend', handleInteraction);
    menu.addEventListener('click', handleInteraction);
    document.addEventListener('touchend', handleDocumentClick);
    document.addEventListener('click', handleDocumentClick);

    return () => {
        menu.removeEventListener('touchend', handleInteraction);
        menu.removeEventListener('click', handleInteraction);
        document.removeEventListener('touchend', handleDocumentClick);
        document.removeEventListener('click', handleDocumentClick);
    };
}


// Init Menu
function initMenu() {
    const isMobileView = window.innerWidth <= 768;
    document.body.classList.toggle('mobile', isMobileView);
    
    if(isMobileView) {
        return handleMobileMenu();
    } else {
        document.querySelectorAll('.sub-menu').forEach(sub => {
            sub.style.maxHeight = null;
            sub.parentElement.classList.remove('active');
        });
        return null;
    }
}

// Initial Animations
function initAnimations() {
    const svg = document.querySelector('.disegno-svg');
    const videoContainer = document.getElementById('video-container');
    
    setTimeout(() => {
        svg.classList.add('show');
    }, 100);

    setTimeout(() => {
        videoContainer.classList.add('show');
    }, 1200);

    setTimeout(() => {
        svg.classList.remove('show');
        svg.classList.add('sticky');
    }, 2500);
}

// Scroll Effect
function initScrollEffect() {
    const svgTitle = document.getElementById('svg-title2');
    let wasInView = false;

    const scrollHandler = () => {
        if (!svgTitle) return;
        const rect = svgTitle.getBoundingClientRect();
        const nowInView = rect.top <= window.innerHeight && rect.bottom >= 0;
        
        if (nowInView && !wasInView) {
            svgTitle.classList.add('pulse-twice');
            setTimeout(() => svgTitle.classList.remove('pulse-twice'), 1000);
        }
        wasInView = nowInView;
    };

    window.addEventListener('scroll', scrollHandler);
    return () => window.removeEventListener('scroll', scrollHandler);
}



// Main Initialization
let isInit = false;
let cleanupMobileMenu = null;

window.addEventListener('DOMContentLoaded', () => {
    if(!isInit) {
        cleanupMobileMenu = initMenu();
        initAnimations();
        initScrollEffect();
        isInit = true;
    }
});

window.addEventListener('resize', () => {
    if(!isInit) return;
    if(cleanupMobileMenu) cleanupMobileMenu();
    cleanupMobileMenu = initMenu();
});

>>>>>>> 349283b (Initial commit clean)
