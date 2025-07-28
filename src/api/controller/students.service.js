const { client } = require('../../config/pg');

class StudentsService {
    // Get all students from database
    async getStudents() {
        try {
            const result = await client.query('SELECT * FROM students ORDER BY id');
            return result.rows;
        } catch (error) {
            console.error('Database error in getStudents:', error);
            throw new Error('Failed to fetch students from database');
        }
    }

    // Create a new student in database
    async createStudent(studentData) {
        const { first_name, last_name, email, gender, date_of_birth, country_of_birth } = studentData;
        
        try {
            const query = `
                INSERT INTO students (first_name, last_name, email, gender, date_of_birth, country_of_birth) 
                VALUES ($1, $2, $3, $4, $5, $6) 
                RETURNING *
            `;
            const values = [first_name, last_name, email, gender, date_of_birth, country_of_birth];
            
            const result = await client.query(query, values);
            return result.rows[0];
        } catch (error) {
            console.error('Database error in createStudent:', error);
            
            // Handle specific database errors
            if (error.code === '23505') { // Unique violation
                throw new Error('Email already exists');
            }
            throw new Error('Failed to create student in database');
        }
    }

    // Get student by ID from database
    async getStudentById(id) {
        try {
            const query = 'SELECT * FROM students WHERE id = $1';
            const result = await client.query(query, [id]);
            return result.rows[0] || null;
        } catch (error) {
            console.error('Database error in getStudentById:', error);
            throw new Error('Failed to fetch student from database');
        }
    }

    // Update student in database
    async updateStudent(studentData) {
        const { id, first_name, last_name, email, gender, date_of_birth, country_of_birth } = studentData;
        
        try {
            const query = `
                UPDATE students 
                SET first_name = $1, last_name = $2, email = $3, gender = $4, date_of_birth = $5, country_of_birth = $6
                WHERE id = $7 
                RETURNING *
            `;
            const values = [first_name, last_name, email, gender, date_of_birth, country_of_birth, id];
            
            const result = await client.query(query, values);
            return result.rows[0] || null;
        } catch (error) {
            console.error('Database error in updateStudent:', error);
            
            // Handle specific database errors
            if (error.code === '23505') { // Unique violation
                throw new Error('Email already exists');
            }
            throw new Error('Failed to update student in database');
        }
    }

    // Delete student from database
    async deleteStudent(id) {
        try {
            const query = 'DELETE FROM students WHERE id = $1 RETURNING *';
            const result = await client.query(query, [id]);
            return result.rows[0] || null;
        } catch (error) {
            console.error('Database error in deleteStudent:', error);
            throw new Error('Failed to delete student from database');
        }
    }
}

module.exports = new StudentsService(); 