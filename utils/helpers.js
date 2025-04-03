function formatZodErrors(error) {
    return error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
    }));
}

// Export the function
module.exports = formatZodErrors;