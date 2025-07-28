const express = require('express');
const router = express.Router();
const studentsController = require('../controller/students.controller');
const { asyncHandler, errorHandler } = require('../../utils/constants');

// Apply JSON middleware
router.use(express.json());

// Students routes - delegate to controller methods
router.get('/', asyncHandler(studentsController.getAllStudents.bind(studentsController)));
router.post('/', asyncHandler(studentsController.createStudent.bind(studentsController)));
router.get('/:id', asyncHandler(studentsController.getStudentById.bind(studentsController)));
router.put('/:id', asyncHandler(studentsController.updateStudent.bind(studentsController)));
router.delete('/:id', asyncHandler(studentsController.deleteStudent.bind(studentsController)));

// Apply error handler middleware
router.use(errorHandler);

module.exports = router;