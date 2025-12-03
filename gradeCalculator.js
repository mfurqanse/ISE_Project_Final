// ==========================================
// GRADE CALCULATION FUNCTIONS
// ==========================================

/**
 * Calculate letter grade from percentage
 * @param {number} percentage - Grade percentage
 * @returns {string} Letter grade (A, B, C, D, F)
 */
function getLetterGrade(percentage) {
    if (percentage >= 85) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 55) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
}

/**
 * Calculate CGPA from percentage
 * @param {number} percentage - Average percentage
 * @returns {string} CGPA (e.g., "3.5")
 */
function calculateCGPA(percentage) {
    if (percentage >= 85) return '4.0';
    if (percentage >= 80) return '3.7';
    if (percentage >= 75) return '3.3';
    if (percentage >= 70) return '3.0';
    if (percentage >= 65) return '2.7';
    if (percentage >= 60) return '2.3';
    if (percentage >= 55) return '2.0';
    if (percentage >= 50) return '1.7';
    if (percentage >= 45) return '1.3';
    if (percentage >= 40) return '1.0';
    return '0.0';
}

/**
 * Calculate weighted grade for a course
 * @param {Array} assessments - Array of assessment objects with results
 * @returns {number} Weighted percentage
 */
function calculateWeightedGrade(assessments) {
    let totalWeighted = 0;
    let totalWeightage = 0;

    assessments.forEach(assessment => {
        if (assessment.result) {
            const percentage = (assessment.result.marksObtained / assessment.maxMarks) * 100;
            totalWeighted += (percentage * assessment.weightage) / 100;
            totalWeightage += assessment.weightage;
        }
    });

    return totalWeightage > 0 ? (totalWeighted / totalWeightage) * 100 : 0;
}

/**
 * Calculate overall grade for a student across all courses
 * @param {string} studentId - Student ID
 * @returns {Object} Grade summary
 */
function calculateOverallGrade(studentId) {
    const data = loadMockData();
    const studentResults = data.results.filter(r => r.studentId === studentId);
    
    if (studentResults.length === 0) {
        return {
            percentage: 0,
            grade: 'N/A',
            cgpa: '0.0'
        };
    }

    let totalPercentage = 0;
    
    studentResults.forEach(result => {
        const assessment = data.assessments.find(a => a.id === result.assessmentId);
        if (assessment) {
            const percentage = (result.marksObtained / assessment.maxMarks) * 100;
            totalPercentage += percentage;
        }
    });

    const avgPercentage = Math.round(totalPercentage / studentResults.length);
    
    return {
        percentage: avgPercentage,
        grade: getLetterGrade(avgPercentage),
        cgpa: calculateCGPA(avgPercentage)
    };
}

/**
 * Calculate course average for all students
 * @param {string} courseId - Course ID
 * @returns {number} Average percentage
 */
function calculateCourseAverage(courseId) {
    const data = loadMockData();
    const enrollments = data.enrollments.filter(e => e.courseId === courseId);
    const assessments = data.assessments.filter(a => a.courseId === courseId);
    
    if (enrollments.length === 0 || assessments.length === 0) return 0;

    let totalGrade = 0;
    let studentCount = 0;

    enrollments.forEach(enrollment => {
        let studentTotal = 0;
        let studentWeightage = 0;

        assessments.forEach(assessment => {
            const result = data.results.find(r => 
                r.assessmentId === assessment.id && r.studentId === enrollment.studentId
            );
            
            if (result) {
                const percentage = (result.marksObtained / assessment.maxMarks) * 100;
                studentTotal += (percentage * assessment.weightage) / 100;
                studentWeightage += assessment.weightage;
            }
        });

        if (studentWeightage > 0) {
            const studentGrade = (studentTotal / studentWeightage) * 100;
            totalGrade += studentGrade;
            studentCount++;
        }
    });

    return studentCount > 0 ? Math.round(totalGrade / studentCount) : 0;
}

/**
 * Get grade point for letter grade
 * @param {string} letterGrade - Letter grade
 * @returns {number} Grade point
 */
function getGradePoint(letterGrade) {
    const gradePoints = {
        'A': 4.0,
        'B': 3.0,
        'C': 2.0,
        'D': 1.0,
        'F': 0.0
    };
    return gradePoints[letterGrade] || 0.0;
}

/**
 * Calculate semester GPA
 * @param {Array} courseGrades - Array of {credits, grade} objects
 * @returns {string} GPA
 */
function calculateSemesterGPA(courseGrades) {
    let totalPoints = 0;
    let totalCredits = 0;

    courseGrades.forEach(course => {
        const gradePoint = getGradePoint(course.grade);
        totalPoints += gradePoint * course.credits;
        totalCredits += course.credits;
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    return gpa.toFixed(2);
}

/**
 * Check if student is passing
 * @param {number} percentage - Grade percentage
 * @param {number} passingGrade - Minimum passing grade (default 40)
 * @returns {boolean}
 */
function isPassing(percentage, passingGrade = 40) {
    return percentage >= passingGrade;
}
