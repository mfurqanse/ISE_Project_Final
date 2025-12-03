// ==========================================
// INPUT VALIDATION
// ==========================================

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 * @param {string} password - Password
 * @returns {Object} {valid: boolean, message: string}
 */
function validatePassword(password) {
    if (!password || password.length < 6) {
        return {
            valid: false,
            message: 'Password must be at least 6 characters long'
        };
    }
    
    return { valid: true, message: '' };
}

/**
 * Validate required field
 * @param {string} value - Field value
 * @returns {boolean}
 */
function isRequired(value) {
    return value !== null && value !== undefined && value.trim() !== '';
}

/**
 * Validate number range
 * @param {number} value - Number value
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean}
 */
function isInRange(value, min, max) {
    const num = parseFloat(value);
    return !isNaN(num) && num >= min && num <= max;
}

/**
 * Validate marks input
 * @param {number} marks - Marks obtained
 * @param {number} maxMarks - Maximum marks
 * @returns {Object} {valid: boolean, message: string}
 */
function validateMarks(marks, maxMarks) {
    if (marks === null || marks === undefined || marks === '') {
        return {
            valid: false,
            message: 'Marks are required'
        };
    }
    
    const num = parseFloat(marks);
    
    if (isNaN(num)) {
        return {
            valid: false,
            message: 'Marks must be a number'
        };
    }
    
    if (num < 0) {
        return {
            valid: false,
            message: 'Marks cannot be negative'
        };
    }
    
    if (num > maxMarks) {
        return {
            valid: false,
            message: `Marks cannot exceed ${maxMarks}`
        };
    }
    
    return { valid: true, message: '' };
}

/**
 * Validate date format
 * @param {string} dateString - Date string
 * @returns {boolean}
 */
function isValidDate(dateString) {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date);
}

/**
 * Validate student ID format
 * @param {string} studentId - Student ID
 * @returns {boolean}
 */
function isValidStudentId(studentId) {
    // Example format: S2024001
    const regex = /^S\d{7}$/;
    return regex.test(studentId);
}

/**
 * Validate form fields
 * @param {Object} fields - Object with field names and values
 * @param {Object} rules - Validation rules
 * @returns {Object} {valid: boolean, errors: Object}
 */
function validateForm(fields, rules) {
    const errors = {};
    let valid = true;

    Object.entries(rules).forEach(([fieldName, fieldRules]) => {
        const value = fields[fieldName];
        
        if (fieldRules.required && !isRequired(value)) {
            errors[fieldName] = 'This field is required';
            valid = false;
        }
        
        if (fieldRules.email && value && !isValidEmail(value)) {
            errors[fieldName] = 'Invalid email format';
            valid = false;
        }
        
        if (fieldRules.minLength && value && value.length < fieldRules.minLength) {
            errors[fieldName] = `Minimum length is ${fieldRules.minLength}`;
            valid = false;
        }
        
        if (fieldRules.maxLength && value && value.length > fieldRules.maxLength) {
            errors[fieldName] = `Maximum length is ${fieldRules.maxLength}`;
            valid = false;
        }
        
        if (fieldRules.min !== undefined && value && parseFloat(value) < fieldRules.min) {
            errors[fieldName] = `Minimum value is ${fieldRules.min}`;
            valid = false;
        }
        
        if (fieldRules.max !== undefined && value && parseFloat(value) > fieldRules.max) {
            errors[fieldName] = `Maximum value is ${fieldRules.max}`;
            valid = false;
        }
    });

    return { valid, errors };
}

/**
 * Sanitize input to prevent XSS
 * @param {string} input - User input
 * @returns {string}
 */
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}
