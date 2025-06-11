document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navUl = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navUl.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
        this.querySelector('i').classList.toggle('fa-bars');
    });
    
    // Fermer le menu au clic sur un lien
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navUl.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        });
    });
    
    // Animation au scroll optimisée
    let lastScrollY = 0;
    let ticking = false;
    const elementsToAnimate = document.querySelectorAll('.service-card, .tech-item, .contact-info, .contact-map');
    
    // Cachez initialement les éléments à animer
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
    });
    
    function checkPosition() {
        lastScrollY = window.scrollY;
        
        if (!ticking) {
            window.requestAnimationFrame(function() {
                animateElements();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    function animateElements() {
        const windowHeight = window.innerHeight;
        const triggerPoint = windowHeight * 0.8;
        
        elementsToAnimate.forEach((element, index) => {
            const elementTop = element.getBoundingClientRect().top;
            
            if (elementTop < triggerPoint) {
                // Délai progressif pour un effet séquentiel
                element.style.animationDelay = `${index * 0.1}s`;
                element.classList.add('animate-fadeInUp');
            }
        });
    }
    
    // Détection de l'intersection avec Intersection Observer (plus performant)
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        elementsToAnimate.forEach(el => observer.observe(el));
    } else {
        // Fallback pour les anciens navigateurs
        window.addEventListener('scroll', checkPosition);
        checkPosition(); // Vérifier au chargement
    }
    
    // Smooth scrolling optimisé
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const startPosition = window.pageYOffset;
                const distance = targetPosition - startPosition - 80;
                const duration = Math.min(800, Math.max(300, Math.abs(distance) / 2));
                let startTime = null;
                
                function animation(currentTime) {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const run = ease(timeElapsed, startPosition, distance, duration);
                    window.scrollTo(0, run);
                    if (timeElapsed < duration) requestAnimationFrame(animation);
                }
                
                function ease(t, b, c, d) {
                    t /= d/2;
                    if (t < 1) return c/2*t*t + b;
                    t--;
                    return -c/2 * (t*(t-2) - 1) + b;
                }
                
                requestAnimationFrame(animation);
            }
        });
    });
});