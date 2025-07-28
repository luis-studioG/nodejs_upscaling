// Async error handler wrapper
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Global error handler middleware
const errorHandler = (error, req, res, next) => {
    console.error(`Error in ${req.method} ${req.path}:`, error);
    res.status(500).send(`Error: ${error.message || 'Internal server error'}`);
};

module.exports = {
    asyncHandler,
    errorHandler
}