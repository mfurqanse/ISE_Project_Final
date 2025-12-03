// ==========================================
// ATTENDANCE MANAGEMENT
// ==========================================

/**
 * Calculate attendance percentage for a student in a course
 * @param {string} studentId - Student ID
 * @param {string} courseId - Course ID
 * @returns {number} Attendance percentage
 */
function calculateAttendancePercentage(studentId, courseId) {
    const data = loadMockData();
    const records = data.attendance.filter(a => 
        a.studentId === studentId && a.courseId === courseId
    );
    
    if (records.length === 0) return 0;
    
    const presentCount = records.filter(a => 
        a.status === 'present' || a.status === 'late'
    ).length;
    
    return Math.round((presentCount / records.length) * 100);
}

/**
 * Get attendance summary for a student
 * @param {string} studentId - Student ID
 * @returns {Object} Attendance summary
 */
function getAttendanceSummary(studentId) {
    const data = loadMockData();
    const records = data.attendance.filter(a => a.studentId === studentId);
    
    return {
        total: records.length,
        present: records.filter(a => a.status === 'present').length,
        absent: records.filter(a => a.status === 'absent').length,
        late: records.filter(a => a.status === 'late').length,
        percentage: records.length > 0 
            ? Math.round(((records.filter(a => a.status === 'present' || a.status === 'late').length) / records.length) * 100)
            : 0
    };
}

/**
 * Mark attendance for multiple students
 * @param {string} courseId - Course ID
 * @param {Date} date - Attendance date
 * @param {Object} attendanceMap - Map of studentId to status
 */
function markBulkAttendance(courseId, date, attendanceMap) {
    const records = Object.entries(attendanceMap).map(([studentId, status]) => ({
        id: `att-${Date.now()}-${studentId}`,
        courseId: courseId,
        studentId: studentId,
        date: date,
        status: status
    }));
    
    saveAttendanceRecords(records);
}

/**
 * Get attendance for a specific date and course
 * @param {string} courseId - Course ID
 * @param {Date} date - Date
 * @returns {Array} Attendance records
 */
function getAttendanceByDate(courseId, date) {
    const data = loadMockData();
    return data.attendance.filter(a => 
        a.courseId === courseId && 
        new Date(a.date).toDateString() === date.toDateString()
    );
}

/**
 * Check if attendance is below minimum requirement
 * @param {number} percentage - Attendance percentage
 * @param {number} minimum - Minimum required (default 75)
 * @returns {boolean}
 */
function isBelowMinimum(percentage, minimum = 75) {
    return percentage < minimum;
}
