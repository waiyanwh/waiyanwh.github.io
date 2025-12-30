/**
 * Scroll Reveal Animation
 * Triggers animations when elements come into view
 */
document.addEventListener('DOMContentLoaded', function () {
    // Add dark-page class to body if there's a hero section or dark header
    if (document.querySelector('.hero-section') || document.querySelector('.page-header-dark')) {
        document.body.classList.add('has-dark-header');
    }

    // Add reveal class to all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.classList.add('reveal');
    });

    // Intersection Observer for scroll reveal
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Typing effect for hero subtitle (optional enhancement)
    const typedText = document.querySelector('.typed-text');
    if (typedText) {
        const words = ['DevOps', 'Docker', 'Kubernetes', 'Cloud'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let currentWord = words[0];

        function typeEffect() {
            if (!typedText) return;

            if (isDeleting) {
                typedText.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedText.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                currentWord = words[wordIndex];
                typeSpeed = 500; // Pause before next word
            }

            setTimeout(typeEffect, typeSpeed);
        }

        // Start typing effect after initial animation
        setTimeout(typeEffect, 2000);
    }

    // Parallax effect for hero on scroll (subtle)
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const heroHeight = heroSection.offsetHeight;

            if (scrolled < heroHeight) {
                heroSection.style.transform = `translateY(${scrolled * 0.3}px)`;
                heroSection.style.opacity = 1 - (scrolled / heroHeight) * 0.5;
            }
        });
    }
});
