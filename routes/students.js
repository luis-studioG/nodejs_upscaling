const express = require('express');
const router = express.Router();
const { client } = require('../utils/pg');
const { validateStudent, validateStudentUpdate } = require('../utils/validations');
const { asyncHandler, errorHandler } = require('../utils/constants');

router.use(express.json());

async function getStudents() {
    try {
        const res = await client.query('SELECT * FROM students');
        console.log(res);
        return res.rows;
    } catch (error) {
        console.error('Error fetching students:', error);
        return [];
    }
}

async function createStudent(student) {
    try {
        const res = await client.query('INSERT INTO students (first_name, last_name, email, gender, date_of_birth, country_of_birth) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [student.first_name, student.last_name, student.email, student.gender, student.date_of_birth, student.country_of_birth]);
        return res.rows[0];
    } catch (error) {
        console.error('Error creating student:', error);
        return null;
    }
}

async function getStudentById(id) {
    try {
        const res = await client.query('SELECT * FROM students WHERE id = $1', [id]);
        return res.rows[0];
    } catch (error) {
        console.error('Error fetching student by id:', error);
        return null;
    }
}
async function updateStudent(student) {
    try {
        const res = await client.query('UPDATE students SET first_name = $1, last_name = $2, gender = $3, date_of_birth = $4, country_of_birth = $5 WHERE id = $6 RETURNING *', [student.first_name, student.last_name, student.gender, student.date_of_birth, student.country_of_birth, student.id]);
        return res.rows[0];
    } catch (error) {
        console.error('Error updating student:', error);
        return null;
    }
}

async function deleteStudent(id) {
    try {
        const res = await client.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
        return res.rows[0]; 
    } catch (error) {
        console.error('Error deleting student:', error);
        return null;
    }
}

// Using asyncHandler wrapper - no need for try/catch!
router.get('/', asyncHandler(async (req, res) => {
    const students = await getStudents();
    res.send(students);
}));

router.post('/', async (req, res) => {
    try {
        const { error } = validateStudent(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const student = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            gender: req.body.gender,
            date_of_birth: req.body.date_of_birth,
            country_of_birth: req.body.country_of_birth
        }
        
        const newStudent = await createStudent(student);
        res.status(201).send({ message: 'Student created successfully!', student: newStudent });
    } catch (error) {
        console.error('Error in POST /students:', error);
        res.status(500).send('Error creating student!');
    }
});

router.get('/:id', async (req, res) => {
    try {
        const student = await getStudentById(req.params.id);
        if (!student) return res.status(404).send('Student not found!');
        res.send({ message: 'Student fetched successfully!', student: student });
    } catch (error) {
        console.error('Error in GET /students/:id:', error);
        res.status(500).send('Error fetching student');
    }
});

router.put('/:id', async (req, res) => {
    try {
        const student = await getStudentById(req.params.id);
        if (!student) return res.status(404).send('Student not found');
        
        const { error } = validateStudentUpdate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        
        student.first_name = req.body.first_name;
        student.last_name = req.body.last_name;
        student.gender = req.body.gender;
        student.date_of_birth = req.body.date_of_birth;
        student.country_of_birth = req.body.country_of_birth;
        
        const updatedStudent = await updateStudent(student);
        res.send({ message: 'Student updated successfully!', status: 200, student: updatedStudent });
    } catch (error) {
        console.error('Error in PUT /students/:id:', error);
        res.status(500).send('Error updating student');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const student = await getStudentById(req.params.id);
        if (!student) return res.status(404).send('Student not found');
        
        const deletedStudent = await deleteStudent(req.params.id);
        res.send({ message: 'Student deleted successfully!', student: deletedStudent });
    } catch (error) {
        console.error('Error in DELETE /students/:id:', error);
        res.status(500).send('Error deleting student');
    }
});

// Apply error handler middleware
router.use(errorHandler);

module.exports = router;