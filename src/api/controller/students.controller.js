const { validateStudent, validateStudentUpdate } = require('../validator/students');
const studentsService = require('./students.service');

class StudentsController {
    // Get all students
    async getAllStudents(req, res) {
        try {
            const students = await studentsService.getStudents();
            res.status(200).json({
                success: true,
                message: 'Students fetched successfully',
                data: students
            });
        } catch (error) {
            console.error('Error in getAllStudents controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching students',
                error: error.message
            });
        }
    }

    // Create a new student
    async createStudent(req, res) {
        try {
            // Validate input
            const { error } = validateStudent(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    error: error.details[0].message
                });
            }

            const studentData = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                gender: req.body.gender,
                date_of_birth: req.body.date_of_birth,
                country_of_birth: req.body.country_of_birth
            };
            
            const newStudent = await studentsService.createStudent(studentData);
            
            if (!newStudent) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to create student'
                });
            }

            res.status(201).json({
                success: true,
                message: 'Student created successfully',
                data: newStudent
            });
        } catch (error) {
            console.error('Error in createStudent controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error creating student',
                error: error.message
            });
        }
    }

    // Get student by ID
    async getStudentById(req, res) {
        try {
            const { id } = req.params;
            
            const student = await studentsService.getStudentById(id);
            
            if (!student) {
                return res.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Student fetched successfully',
                data: student
            });
        } catch (error) {
            console.error('Error in getStudentById controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error fetching student',
                error: error.message
            });
        }
    }

    // Update student
    async updateStudent(req, res) {
        try {
            const { id } = req.params;

            // Check if student exists
            const existingStudent = await studentsService.getStudentById(id);
            if (!existingStudent) {
                return res.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }

            // Validate input
            const { error } = validateStudentUpdate(req.body);
            if (error) {
                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    error: error.details[0].message
                });
            }

            const updateData = {
                id: id,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                email: req.body.email,
                gender: req.body.gender,
                date_of_birth: req.body.date_of_birth,
                country_of_birth: req.body.country_of_birth
            };

            const updatedStudent = await studentsService.updateStudent(updateData);
            
            if (!updatedStudent) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to update student'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Student updated successfully',
                data: updatedStudent
            });
        } catch (error) {
            console.error('Error in updateStudent controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error updating student',
                error: error.message
            });
        }
    }

    // Delete student
    async deleteStudent(req, res) {
        try {
            const { id } = req.params;

            // Check if student exists
            const existingStudent = await studentsService.getStudentById(id);
            if (!existingStudent) {
                return res.status(404).json({
                    success: false,
                    message: 'Student not found'
                });
            }

            const deletedStudent = await studentsService.deleteStudent(id);
            
            if (!deletedStudent) {
                return res.status(500).json({
                    success: false,
                    message: 'Failed to delete student'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Student deleted successfully',
                data: deletedStudent
            });
        } catch (error) {
            console.error('Error in deleteStudent controller:', error);
            res.status(500).json({
                success: false,
                message: 'Error deleting student',
                error: error.message
            });
        }
    }
}

module.exports = new StudentsController(); 