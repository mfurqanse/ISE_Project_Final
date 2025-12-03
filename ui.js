// ==========================================
// UI UPDATES & DOM MANIPULATION
// ==========================================

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} type - Type (success, error, warning, info)
 */
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

/**
 * Show loading state
 * @param {HTMLElement} element - Element to show loading in
 */
function showLoading(element) {
    if (!element) return;
    element.innerHTML = '<div class="loading"></div>';
}

/**
 * Hide loading state
 * @param {HTMLElement} element - Element to hide loading from
 */
function hideLoading(element) {
    if (!element) return;
    const loader = element.querySelector('.loading');
    if (loader) loader.remove();
}

/**
 * Create element with classes and attributes
 * @param {string} tag - HTML tag
 * @param {Object} options - Options {classes, attributes, innerHTML}
 * @returns {HTMLElement}
 */
function createElement(tag, options = {}) {
    const element = document.createElement(tag);
    
    if (options.classes) {
        element.className = Array.isArray(options.classes) 
            ? options.classes.join(' ') 
            : options.classes;
    }
    
    if (options.attributes) {
        Object.entries(options.attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
    }
    
    if (options.innerHTML) {
        element.innerHTML = options.innerHTML;
    }
    
    if (options.textContent) {
        element.textContent = options.textContent;
    }
    
    return element;
}

/**
 * Confirm dialog
 * @param {string} message - Confirmation message
 * @returns {boolean}
 */
function confirmAction(message) {
    return confirm(message);
}

/**
 * Toggle element visibility
 * @param {HTMLElement} element - Element to toggle
 * @param {boolean} show - Show or hide
 */
function toggleElement(element, show) {
    if (!element) return;
    element.style.display = show ? 'block' : 'none';
}

/**
 * Update progress bar
 * @param {HTMLElement} progressBar - Progress bar element
 * @param {number} percentage - Percentage (0-100)
 */
function updateProgressBar(progressBar, percentage) {
    if (!progressBar) return;
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute('aria-valuenow', percentage);
}

/**
 * Scroll to top of page
 */
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * Highlight element temporarily
 * @param {HTMLElement} element - Element to highlight
 * @param {number} duration - Duration in ms
 */
function highlightElement(element, duration = 1000) {
    if (!element) return;
    
    element.style.transition = 'background-color 0.3s';
    const originalBg = element.style.backgroundColor;
    element.style.backgroundColor = '#FFEB3B';
    
    setTimeout(() => {
        element.style.backgroundColor = originalBg;
    }, duration);
}

/**
 * Disable/Enable button
 * @param {HTMLElement} button - Button element
 * @param {boolean} disabled - Disabled state
 */
function setButtonState(button, disabled) {
    if (!button) return;
    button.disabled = disabled;
    button.style.opacity = disabled ? '0.5' : '1';
    button.style.cursor = disabled ? 'not-allowed' : 'pointer';
}

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string}
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Truncate text
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string}
 */
function truncateText(text, maxLength = 50) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 */
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        showToast('Copied to clipboard!', 'success');
    } catch (err) {
        showToast('Failed to copy', 'error');
    }
    
    document.body.removeChild(textarea);
}

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function}
 */
function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
