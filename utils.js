// ==========================================
// UTILITY FUNCTIONS
// ==========================================

/**
 * Format date to readable string
 * @param {Date} date - Date object
 * @returns {string}
 */
function formatDate(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

/**
 * Format date to YYYY-MM-DD
 * @param {Date} date - Date object
 * @returns {string}
 */
function formatDateInput(date) {
    if (!(date instanceof Date)) {
        date = new Date(date);
    }
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
}

/**
 * Capitalize first letter of string
 * @param {string} str - String to capitalize
 * @returns {string}
 */
function capitalizeFirst(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Generate random ID
 * @param {string} prefix - Prefix for ID
 * @returns {string}
 */
function generateId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Group array by key
 * @param {Array} array - Array to group
 * @param {string} key - Key to group by
 * @returns {Object}
 */
function groupBy(array, key) {
    return array.reduce((result, item) => {
        const groupKey = item[key];
        if (!result[groupKey]) {
            result[groupKey] = [];
        }
        result[groupKey].push(item);
        return result;
    }, {});
}

/**
 * Sort array by key
 * @param {Array} array - Array to sort
 * @param {string} key - Key to sort by
 * @param {string} order - Order (asc/desc)
 * @returns {Array}
 */
function sortBy(array, key, order = 'asc') {
    return array.sort((a, b) => {
        const valA = a[key];
        const valB = b[key];
        
        if (order === 'asc') {
            return valA > valB ? 1 : valA < valB ? -1 : 0;
        } else {
            return valA < valB ? 1 : valA > valB ? -1 : 0;
        }
    });
}

/**
 * Deep clone object
 * @param {Object} obj - Object to clone
 * @returns {Object}
 */
function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Check if object is empty
 * @param {Object} obj - Object to check
 * @returns {boolean}
 */
function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/**
 * Get unique values from array
 * @param {Array} array - Array
 * @returns {Array}
 */
function unique(array) {
    return [...new Set(array)];
}

/**
 * Calculate percentage
 * @param {number} value - Value
 * @param {number} total - Total
 * @returns {number}
 */
function calculatePercentage(value, total) {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
}

/**
 * Get days between two dates
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {number}
 */
function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return Math.round(Math.abs((date1 - date2) / oneDay));
}

/**
 * Check if date is today
 * @param {Date} date - Date to check
 * @returns {boolean}
 */
function isToday(date) {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}

/**
 * Get current academic year
 * @returns {string}
 */
function getCurrentAcademicYear() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    // Academic year starts in August (month 7)
    if (month >= 7) {
        return `${year}-${year + 1}`;
    } else {
        return `${year - 1}-${year}`;
    }
}

/**
 * Get current semester
 * @returns {string}
 */
function getCurrentSemester() {
    const now = new Date();
    const month = now.getMonth();
    
    // Fall: August-December (7-11)
    // Spring: January-May (0-4)
    // Summer: June-July (5-6)
    if (month >= 7 && month <= 11) {
        return 'Fall';
    } else if (month >= 0 && month <= 4) {
        return 'Spring';
    } else {
        return 'Summer';
    }
}

/**
 * Export data as CSV
 * @param {Array} data - Array of objects
 * @param {string} filename - Filename
 */
function exportToCSV(data, filename = 'export.csv') {
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csvContent = [
        headers.join(','),
        ...data.map(row => headers.map(header => row[header]).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}
