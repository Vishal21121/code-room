export const errorHandler = (error, req, res, next) => {
    console.log("Middleware error handling");
    const errorStatus = error.statusCode || 500
    const errorMessage = error.message || "Internal Server Error"
    res.status(errorStatus).json({
        status: failure,
        data: {
            statusCode: errorStatus,
            message: errorMessage,
            stack: process.env.NODE_ENV === 'development' ? err.stack : {}
        }
    })
}