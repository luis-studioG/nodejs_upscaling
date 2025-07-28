const Joi = require('joi');

// Student validation schemas
const validateStudent = (student) => {
    const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        gender: Joi.string().required(),
        date_of_birth: Joi.date().required(),
        country_of_birth: Joi.string().required()
    });
    return schema.validate(student);
};

// Validation for updates (email not editable)
const validateStudentUpdate = (student) => {
    const schema = Joi.object({
        first_name: Joi.string().required().messages({ message: 'First name is required' }),
        last_name: Joi.string().required(),
        gender: Joi.string().required(),
        email: Joi.string().email().required(),
        date_of_birth: Joi.date().required(),
        country_of_birth: Joi.string().required()
    });
    return schema.validate(student);
};

// Export all validation functions
module.exports = {
    validateStudent,
    validateStudentUpdate,
}; 