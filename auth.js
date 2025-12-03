// ==========================================
// AUTHENTICATION LOGIC
// ==========================================

/**
 * Get current logged-in user from localStorage
 */
function getCurrentUser() {
    const userStr = localStorage.getItem('currentUser');
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (e) {
            console.error('Error parsing current user:', e);
            return null;
        }
    }
    return null;
}

/**
 * Check if user is authenticated and has correct role
 * @param {string} requiredRole - Required role (admin/teacher/student)
 */
function checkAuth(requiredRole) {
    const user = getCurrentUser();
    
    if (!user) {
        // Not logged in, redirect to home
        const isInPagesFolder = window.location.pathname.includes('/pages/');
        window.location.href = isInPagesFolder ? '../index.html' : 'index.html';
        return false;
    }
    
    if (requiredRole && user.role !== requiredRole) {
        // Wrong role, redirect to appropriate dashboard
        redirectToDashboard(user.role);
        return false;
    }
    
    return true;
}

/**
 * Redirect user to their appropriate dashboard
 * @param {string} role - User role
 */
function redirectToDashboard(role) {
    const dashboards = {
        admin: 'admin-dashboard.html',
        teacher: 'teacher-dashboard.html',
        student: 'student-dashboard.html'
    };
    
    const page = dashboards[role];
    if (!page) {
        console.error('Unknown role:', role);
        return;
    }
    
    console.log('Redirecting to:', page);
    
    // Check if we're already in the pages folder
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    
    if (isInPagesFolder) {
        // Already in pages folder, just redirect to the page
        window.location.href = page;
    } else {
        // Not in pages folder, add pages/ prefix
        window.location.href = 'pages/' + page;
    }
}

/**
 * Login user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {boolean} - Success status
 */
function login(email, password) {
    console.log('Login attempt for:', email);
    
    const data = loadMockData();
    console.log('Available users:', data.users.length);
    
    const user = data.users.find(u => u.email === email && u.password === password);
    
    if (user) {
        console.log('User found:', user.firstName, user.lastName, '-', user.role);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    
    console.log('User not found or password incorrect');
    return false;
}

/**
 * Logout user
 */
function logout() {
    localStorage.removeItem('currentUser');
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    window.location.href = isInPagesFolder ? '../index.html' : 'index.html';
}

/**
 * Check if user is authenticated (returns boolean)
 */
function isAuthenticated() {
    return getCurrentUser() !== null;
}
