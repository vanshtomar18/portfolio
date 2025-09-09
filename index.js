let menuIcon = document.querySelector('#menu-icon');
let navBar = document.querySelector('.navbar');
let header = document.querySelector('.header');

// Ensure header is always visible
function ensureHeaderVisible() {
    if (header) {
        header.style.position = 'fixed';
        header.style.top = '0';
        header.style.zIndex = '999999';
        header.style.visibility = 'visible';
        header.style.opacity = '1';
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', ensureHeaderVisible);

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navBar.classList.toggle('active');
    
    // MODIFIED: Only prevent body scroll on mobile when menu is actually open
    if (window.innerWidth <= 768) {
        document.body.classList.toggle('menu-open');
    }
    
    // Ensure header stays visible when toggling menu
    ensureHeaderVisible();
};

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
   
    ensureHeaderVisible();
    
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
            });
            
            
            let activeLink = document.querySelector('header nav a[href*="' + id + '"]');
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    });

    
    if (menuIcon && navBar) {
        menuIcon.classList.remove('bx-x');
        navBar.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}


navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (menuIcon && navBar) {
            menuIcon.classList.remove('bx-x');
            navBar.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
        
        
        setTimeout(ensureHeaderVisible, 100);
    });
});


window.addEventListener('resize', () => {
    
    if (window.innerWidth > 768) {
        document.body.classList.remove('menu-open');
        if (navBar) navBar.classList.remove('active');
        if (menuIcon) menuIcon.classList.remove('bx-x');
    }
    
    ensureHeaderVisible();
});


const sr = ScrollReveal({
    distance: '80px',
    duration: 1000,
    delay: 200,
    
    beforeReveal: function(el) {
        ensureHeaderVisible();
    }
});


sr.reveal('.heading', { 
    origin: 'top',
    delay: 1000,
    reset: true,
    afterReveal: ensureHeaderVisible
});

sr.reveal('.home-content, .about-content, .education-content', { 
    origin: 'bottom',
    delay: 200,
    afterReveal: ensureHeaderVisible
});

sr.reveal('.home-img, .about-img, .education-box', {
    origin: 'left',
    delay: 200,
    afterReveal: ensureHeaderVisible
});

sr.reveal('.projects, .skills-box, .contact form', {
    origin: 'right',
    delay: 200,
    afterReveal: ensureHeaderVisible
});


document.addEventListener('click', ensureHeaderVisible);
document.addEventListener('touchstart', ensureHeaderVisible);


if ('IntersectionObserver' in window) {
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                ensureHeaderVisible();
            }
        });
    });
    
    if (header) {
        headerObserver.observe(header);
    }
}


if ('MutationObserver' in window) {
    const headerMutationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target === header || mutation.target === document.body) {
                ensureHeaderVisible();
            }
        });
    });
    
    if (header) {
        headerMutationObserver.observe(header, {
            attributes: true,
            attributeFilter: ['style', 'class']
        });
    }
    
    headerMutationObserver.observe(document.body, {
        attributes: true,
        attributeFilter: ['class']
    });
}
