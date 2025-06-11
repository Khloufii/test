// Mobile Menu Toggle
document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('active');
    this.querySelector('i').classList.toggle('fa-times');
    this.querySelector('i').classList.toggle('fa-bars');
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        
        // Close mobile menu if open
        if (document.querySelector('nav ul').classList.contains('active')) {
            document.querySelector('nav ul').classList.remove('active');
            document.querySelector('.mobile-menu i').classList.remove('fa-times');
            document.querySelector('.mobile-menu i').classList.add('fa-bars');
        }
    });
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Form Submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const service = document.getElementById('service').value;
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', { name, phone, service });
    
    // Show success message
    alert(`Merci ${name}, votre demande de rendez-vous pour ${service} a été enregistrée. Nous vous contacterons bientôt au ${phone}.`);
    
    // Reset form
    this.reset();
});

// Animate on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animated');
        }
    });
}

// Initialize animations on load
window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);

// Add animate-on-scroll class to sections
document.querySelectorAll('section').forEach((section, index) => {
    if (index > 0) { // Skip first section (hero)
        section.classList.add('animate-on-scroll');
    }
});

// Add delay classes to service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.classList.add(`delay-${index % 3}`);
});