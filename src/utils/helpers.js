function formatZodErrors(error) {
    return error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
    }));
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// Export the function
module.exports = { formatZodErrors, capitalizeFirstLetter };
