// ==========================================
// LOCALSTORAGE OPERATIONS
// ==========================================

/**
 * Load mock data from localStorage or use default
 * @returns {Object} Mock data object
 */
function loadMockData() {
    const stored = localStorage.getItem('mockData');
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error('Error parsing mock data:', e);
        }
    }
    
    // Return default mock data if not in localStorage
    return {
        users: mockUsers || [],
        teachers: mockTeachers || [],
        students: mockStudents || [],
        courses: mockCourses || [],
        enrollments: mockEnrollments || [],
        assessments: mockAssessments || [],
        results: mockResults || [],
        attendance: mockAttendance || [],
        settings: mockSettings || {}
    };
}

/**
 * Save mock data to localStorage
 * @param {Object} data - Data to save
 */
function saveMockData(data) {
    try {
        localStorage.setItem('mockData', JSON.stringify(data));
        return true;
    } catch (e) {
        console.error('Error saving mock data:', e);
        return false;
    }
}

/**
 * Save attendance records
 * @param {Array} attendanceRecords - Array of attendance records
 */
function saveAttendanceRecords(attendanceRecords) {
    const data = loadMockData();
    
    // Remove existing records for the same course, students, and date
    attendanceRecords.forEach(newRecord => {
        data.attendance = data.attendance.filter(a => 
            !(a.courseId === newRecord.courseId && 
              a.studentId === newRecord.studentId && 
              new Date(a.date).toDateString() === new Date(newRecord.date).toDateString())
        );
    });
    
    // Add new records
    data.attendance = [...data.attendance, ...attendanceRecords];
    saveMockData(data);
}

/**
 * Save results/marks
 * @param {Array} results - Array of result records
 */
function saveResults(results) {
    const data = loadMockData();
    
    // Remove existing results for the same assessment and students
    results.forEach(newResult => {
        data.results = data.results.filter(r => 
            !(r.assessmentId === newResult.assessmentId && r.studentId === newResult.studentId)
        );
    });
    
    // Add new results
    data.results = [...data.results, ...results];
    saveMockData(data);
}

/**
 * Save assessment
 * @param {Object} assessment - Assessment object
 */
function saveAssessment(assessment) {
    const data = loadMockData();
    
    // Check if assessment exists
    const index = data.assessments.findIndex(a => a.id === assessment.id);
    if (index !== -1) {
        data.assessments[index] = assessment;
    } else {
        data.assessments.push(assessment);
    }
    
    saveMockData(data);
}

/**
 * Initialize mock data on first load
 */
function initializeMockData() {
    if (!localStorage.getItem('mockData')) {
        const initialData = {
            users: mockUsers || [],
            teachers: mockTeachers || [],
            students: mockStudents || [],
            courses: mockCourses || [],
            enrollments: mockEnrollments || [],
            assessments: mockAssessments || [],
            results: mockResults || [],
            attendance: mockAttendance || [],
            settings: mockSettings || {}
        };
        saveMockData(initialData);
    }
}

// Initialize on load
if (typeof window !== 'undefined') {
    initializeMockData();
}
