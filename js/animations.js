// Animations for Portfolio

document.addEventListener('DOMContentLoaded', function() {
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Initial check for elements in view
    animateOnScroll();
    
    // Check for elements in view on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add animate-on-scroll class to elements that should be animated
    document.querySelectorAll('.hero-content, .about-text, .about-stats, .skill-category, .project-item, .contact-info, .contact-form').forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Typing effect for hero section
    const typeWriter = function(textElement, text, speed, delay = 0) {
        let i = 0;
        setTimeout(() => {
            const typing = setInterval(() => {
                if (i < text.length) {
                    textElement.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typing);
                }
            }, speed);
        }, delay);
    };
    
    // Apply typing effect to the hero subtitle
    const heroSubtitle = document.querySelector('.hero-content h2');
    if (heroSubtitle) {
        const originalText = heroSubtitle.textContent;
        heroSubtitle.textContent = '';
        typeWriter(heroSubtitle, originalText, 100, 1000);
    }
    
    // Counter animation for statistics
    const animateCounter = function(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const counter = setInterval(() => {
            start += increment;
            
            if (start >= target) {
                clearInterval(counter);
                element.textContent = target;
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    };
    
    // Apply counter animation to stat items
    const statItems = document.querySelectorAll('.stat-item h3');
    
    const animateStats = function() {
        statItems.forEach(item => {
            const target = parseInt(item.textContent);
            item.textContent = '0';
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(item, target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(item);
        });
    };
    
    // Initialize stats animation
    if (statItems.length > 0) {
        animateStats();
    }
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            
            if (scrollPosition < heroSection.offsetHeight) {
                // Move the hero content up slightly as user scrolls down
                const heroContent = document.querySelector('.hero-content');
                if (heroContent) {
                    heroContent.style.transform = `translateY(${scrollPosition * 0.3}px)`;
                }
                
                // Move the hero image down slightly as user scrolls down
                const heroImage = document.querySelector('.hero-image');
                if (heroImage) {
                    heroImage.style.transform = `translateY(${scrollPosition * 0.2}px)`;
                }
            }
        });
    }
    
    // Skill bars animation
    const animateSkillBars = function() {
        const skillBars = document.querySelectorAll('.progress');
        
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage') || '0';
            bar.style.width = '0';
            
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            bar.style.width = percentage + '%';
                        }, 300);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(bar);
        });
    };
    
    // Initialize skill bars animation if they exist
    const skillBars = document.querySelectorAll('.progress');
    if (skillBars.length > 0) {
        animateSkillBars();
    }
    
    // Project image hover effect
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const img = item.querySelector('img');
        
        if (img) {
            item.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.1)';
            });
            
            item.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
            });
        }
    });
});
