/**
 * Component loader - loads HTML components into the main page
 * @param {string} targetId - The ID of the element to load the component into
 * @param {string} componentUrl - The URL of the component HTML file
 */
function loadComponent(targetId, componentUrl) {
    const target = document.getElementById(targetId);
    if (!target) {
        console.error(`Target element with ID ${targetId} not found`);
        return;
    }
    
    fetch(componentUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.text();
        })
        .then(html => {
            target.innerHTML = html;
            
            // Execute any scripts in the loaded component
            const scripts = target.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                
                // Copy attributes
                Array.from(script.attributes).forEach(attr => {
                    newScript.setAttribute(attr.name, attr.value);
                });
                
                // Copy content
                newScript.textContent = script.textContent;
                
                // Replace old script with new one to ensure execution
                script.parentNode.replaceChild(newScript, script);
            });
            
            // Dispatch an event when component is loaded
            const event = new CustomEvent('componentLoaded', {
                detail: { id: targetId, url: componentUrl }
            });
            document.dispatchEvent(event);
        })
        .catch(error => {
            console.error(`Error loading component ${componentUrl}:`, error);
            target.innerHTML = `<p>Error loading component. Please refresh the page.</p>`;
        });
}
