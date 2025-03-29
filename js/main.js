// Main JavaScript for Portfolio

// Mobile Navigation Toggle
function initMobileNav() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle navigation
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav-active');
            burger.classList.remove('toggle');
        });
    });
}

// Project filtering functionality
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filterValue = btn.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}




// Form submission handler
async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitBtn = document.getElementById('submitBtn');
    
    try {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        const response = await fetch(form.action, {
            method: form.method,
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            showMessageBox();
            form.reset();
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        console.error('Error:', error);
        document.querySelector('.error-message').style.display = 'block';
        setTimeout(() => {
            document.querySelector('.error-message').style.display = 'none';
        }, 5000);
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }
    
    return false;
}

// Show message box with dark mode detection
function showMessageBox() {
    const messageBox = document.getElementById('messageBox');
    
    // Check if the body or html tag has a dark mode class
    // This assumes your site uses a class like 'dark-mode', 'dark-theme', or 'dark'
    // Adjust this check based on how your dark mode is implemented
    const isDarkMode = document.body.classList.contains('dark-mode') || 
                     document.body.classList.contains('dark-theme') || 
                     document.body.classList.contains('dark') ||
                     document.documentElement.classList.contains('dark-mode') ||
                     document.documentElement.classList.contains('dark-theme') ||
                     document.documentElement.classList.contains('dark') ||
                     window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (isDarkMode) {
        messageBox.classList.add('dark-mode');
    } else {
        messageBox.classList.remove('dark-mode');
    }
    
    messageBox.classList.add('show');
}

// Close the message box
function closeMessageBox() {
    document.getElementById('messageBox').classList.remove('show');
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    initProjectFilters();
    initSmoothScroll();
    updateActiveNavOnScroll();
    
    // Form submission handling - removing this as we now handle it with handleSubmit
    // const contactForm = document.querySelector('.contact-form');
    // if (contactForm) {
    //     contactForm.addEventListener('submit', function(e) {
    //         e.preventDefault();
    //         // Here you would typically handle form submission with AJAX
    //         contactForm.reset();
    //     });
    // }
    
    // Removed navIndicator initial positioning code
});
