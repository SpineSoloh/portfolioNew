// index.js
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Active nav link based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');
    
    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);

    // Enhanced typewriter effect for hero section
    const heroTitle = document.querySelector('.hero-text h1');
    const text = "Hi, I'm Spines Odhiambo";
    let charIndex = 0;
    
    function typeWriter() {
        if (charIndex < text.length) {
            heroTitle.innerHTML = text.substring(0, charIndex + 1) + 
                '<span class="highlight">' + text.substring(charIndex + 1) + '</span>';
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            // Reset and restart animation
            setTimeout(() => {
                charIndex = 0;
                typeWriter();
            }, 3000);
        }
    }
    
    // Start typewriter effect
    setTimeout(typeWriter, 500);

    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletterForm');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('nameInput').value;
            const email = document.getElementById('emailInput').value;
            const submitBtn = this.querySelector('button');
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            const originalIcon = submitBtn.innerHTML;
            
            // Simple validation
            if (name && email && email.includes('@')) {
                // Show success state
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                submitBtn.style.background = '#4CAF50';
                
                // In a real application, you would send this data to a server
                console.log('Newsletter subscription:', { name, email });
                
                // Reset form
                this.reset();
                
                //