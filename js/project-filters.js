/**
 * Project Filtering System
 * Works with dynamically loaded components
 */

// Use a self-executing function to avoid global namespace pollution
(function() {
    // Store references to important elements
    let filterBtns = null;
    let projectItems = null;
    
    // Main initialization function
    function initProjectFilters() {
        console.log('Project filters: Initializing');
        
        // Get fresh references to the elements
        filterBtns = document.querySelectorAll('.project-filters .filter-btn');
        projectItems = document.querySelectorAll('.projects-grid .project-item');
        
        if (!filterBtns.length || !projectItems.length) {
            console.log('Project filters: Elements not found, will retry');
            return false;
        }
        
        console.log(`Project filters: Found ${filterBtns.length} buttons and ${projectItems.length} items`);
        
        // Remove any existing event listeners (to prevent duplicates)
        filterBtns.forEach(btn => {
            btn.removeEventListener('click', handleFilterClick);
            btn.addEventListener('click', handleFilterClick);
        });
        
        // Setup "See More" button
        const seeMoreBtn = document.getElementById('seeMoreProjects');
        if (seeMoreBtn) {
            seeMoreBtn.removeEventListener('click', handleSeeMoreClick);
            seeMoreBtn.addEventListener('click', handleSeeMoreClick);
        }
        
        return true;
    }
    
    // Handle filter button clicks
    function handleFilterClick() {
        console.log(`Filter clicked: ${this.getAttribute('data-filter')}`);
        
        // Update active button
        filterBtns.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Get the filter value
        const filter = this.getAttribute('data-filter');
        
        // Filter projects
        projectItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || filter === category) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Handle "See More" button click
    function handleSeeMoreClick(e) {
        e.preventDefault();
        if (typeof showNotification === 'function') {
            showNotification('More projects will be uploaded soon. Stay tuned!', 4000);
        } else {
            alert('More projects will be uploaded soon. Stay tuned!');
        }
    }
    
    // Function to check if projects section exists and initialize if it does
    function checkAndInitialize() {
        if (document.querySelector('.projects-grid')) {
            if (!initProjectFilters()) {
                // If initialization fails, try again in 100ms
                setTimeout(checkAndInitialize, 100);
            }
        } else {
            // If projects grid doesn't exist yet, check again in 100ms
            setTimeout(checkAndInitialize, 100);
        }
    }
    
    // Multiple ways to initialize to ensure it works
    // Method 1: On DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkAndInitialize);
    } else {
        checkAndInitialize();
    }
    
    // Method 2: After window load
    window.addEventListener('load', checkAndInitialize);
    
    // Method 3: Reinitialize on any DOM changes (for dynamically loaded content)
    document.addEventListener('DOMContentLoaded', function() {
        // Create a mutation observer to watch for DOM changes
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.addedNodes.length) {
                    // Check if any of the added nodes contain our project elements
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        const node = mutation.addedNodes[i];
                        if (node.nodeType === 1 && (
                            node.classList?.contains('projects-grid') ||
                            node.querySelector?.('.projects-grid')
                        )) {
                            console.log('Project section detected in DOM changes');
                            setTimeout(initProjectFilters, 50);
                            return;
                        }
                    }
                }
            });
        });
        
        // Start observing the document body for DOM changes
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
    
    // Method 4: Listen for custom component loaded event
    document.addEventListener('componentLoaded', function(e) {
        if (e.detail && e.detail.id === 'projects-component') {
            console.log('Projects component loaded event detected');
            setTimeout(initProjectFilters, 50);
        }
    });
    
    // Make the init function available globally (for manual initialization)
    window.initProjectFilters = initProjectFilters;
})();

