// ==========================================
// APP INITIALIZATION
// ==========================================

/**
 * Initialize the application
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Student Attendance Portal - Initialized');
    
    // Initialize mock data if needed
    initializeMockData();
    
    // Check if we're on the login page
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        initializeLandingPage();
    }
});

/**
 * Initialize landing page
 */
function initializeLandingPage() {
    // Check if user is already logged in
    const user = getCurrentUser();
    if (user) {
        redirectToDashboard(user.role);
    }
}

/**
 * Handle role selection on landing page
 * @param {string} role - Selected role
 */
function selectRole(role) {
    console.log('Role selected:', role);
    
    // Hide landing page
    document.getElementById('landing-page').style.display = 'none';
    
    // Show login form
    const loginForm = document.getElementById('login-form');
    loginForm.style.display = 'flex';
    
    // Update login form based on role
    updateLoginForm(role);
    
    // Store selected role temporarily
    sessionStorage.setItem('selectedRole', role);
}

/**
 * Update login form based on selected role
 * @param {string} role - Selected role
 */
function updateLoginForm(role) {
    const configs = {
        admin: {
            title: 'Administrator Login',
            iconClass: 'admin-icon',
            color: '#2196F3',
            placeholder: 'admin@university.edu',
            demo: 'admin@university.edu / admin123'
        },
        teacher: {
            title: 'Teacher Login',
            iconClass: 'teacher-icon',
            color: '#4CAF50',
            placeholder: 'teacher@university.edu',
            demo: 'sarah.johnson@university.edu / teacher123'
        },
        student: {
            title: 'Student Login',
            iconClass: 'student-icon',
            color: '#FF9800',
            placeholder: 'student@student.edu',
            demo: 'david.wilson@student.edu / student123'
        }
    };
    
    const config = configs[role];
    
    // Update title
    document.getElementById('login-title').textContent = config.title;
    
    // Update icon
    const iconDiv = document.getElementById('login-icon');
    iconDiv.className = `role-icon ${config.iconClass}`;
    iconDiv.innerHTML = getIconSVG(role);
    
    // Update email placeholder
    document.getElementById('email').placeholder = config.placeholder;
    
    // Update submit button color
    const submitBtn = document.getElementById('login-submit-btn');
    submitBtn.style.backgroundColor = config.color;
    
    // Update demo text
    document.getElementById('demo-text').innerHTML = `<strong>Demo Account:</strong><br>${config.demo}`;
}

/**
 * Get icon SVG for role
 * @param {string} role - Role
 * @returns {string} SVG HTML
 */
function getIconSVG(role) {
    const icons = {
        admin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>ircle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
        teacher: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>',
        student: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>'
    };
    return icons[role] || '';
}

/**
 * Go back to role selection
 */
function backToRoleSelection() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('landing-page').style.display = 'flex';
    document.getElementById('login-form-element').reset();
    document.getElementById('login-error').style.display = 'none';
    sessionStorage.removeItem('selectedRole');
}

/**
 * Handle login form submission
 * @param {Event} event - Submit event
 */
function handleLogin(event) {
    event.preventDefault();
    
    console.log('Login form submitted');
    
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('login-error');
    
    // Hide previous errors
    errorDiv.style.display = 'none';
    
    // Validate inputs
    if (!email) {
        errorDiv.textContent = 'Please enter your email address';
        errorDiv.style.display = 'block';
        return false;
    }
    
    if (!isValidEmail(email)) {
        errorDiv.textContent = 'Please enter a valid email address';
        errorDiv.style.display = 'block';
        return false;
    }
    
    if (!password) {
        errorDiv.textContent = 'Please enter your password';
        errorDiv.style.display = 'block';
        return false;
    }
    
    console.log('Attempting login with:', email);
    
    // Attempt login
    const success = login(email, password);
    
    if (success) {
        const user = getCurrentUser();
        console.log('Login successful:', user);
        
        // Redirect to appropriate dashboard
        setTimeout(() => {
            redirectToDashboard(user.role);
        }, 100);
    } else {
        console.log('Login failed');
        errorDiv.textContent = 'Invalid email or password. Please try again.';
        errorDiv.style.display = 'block';
    }
    
    return false;
}
