// Theme toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  // Check for saved theme preference or use the system preference
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = localStorage.getItem('theme') || (prefersDarkMode ? 'dark' : 'light');
  
  // Apply the theme
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  // Event listener for theme toggle button when header component loads
  document.addEventListener('componentLoaded', function(e) {
    if (e.detail.id === 'header-component') {
      const themeToggle = document.getElementById('theme-toggle');
      const moonIcon = document.querySelector('.theme-toggle .icon-moon');
      const sunIcon = document.querySelector('.theme-toggle .icon-sun');
      
      // Ensure icons reflect current theme when component loads
      updateThemeIcons(savedTheme, moonIcon, sunIcon);
      
      if (themeToggle) {
        themeToggle.addEventListener('click', function() {
          // Get current theme
          const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
          
          // Switch to opposite theme
          const newTheme = currentTheme === 'light' ? 'dark' : 'light';
          
          // Update the HTML attribute
          document.documentElement.setAttribute('data-theme', newTheme);
          
          // Save to localStorage
          localStorage.setItem('theme', newTheme);
          
          // Update toggle button icons
          updateThemeIcons(newTheme, moonIcon, sunIcon);
        });
      }
    }
  });
});

// Function to update theme icons based on current theme
function updateThemeIcons(theme, moonIcon, sunIcon) {
  if (!moonIcon || !sunIcon) return;
  
  if (theme === 'dark') {
    moonIcon.classList.remove('icon-visible');
    moonIcon.classList.add('icon-hidden');
    
    sunIcon.classList.remove('icon-hidden');
    sunIcon.classList.add('icon-visible');
  } else {
    moonIcon.classList.remove('icon-hidden');
    moonIcon.classList.add('icon-visible');
    
    sunIcon.classList.remove('icon-visible');
    sunIcon.classList.add('icon-hidden');
  }
}
