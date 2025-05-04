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

