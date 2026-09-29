export const errorHandler = (err, req, res, next) => {
    console.error(err);

    let statusCode = 500;
    let message = "Internal server error";

    if (err.message === "Company not found") {
        statusCode = 404;
        message = err.message;
    }

    if (err.message === "Application not found") {
        statusCode = 404;
        message = err.message;
    }

    if (err.message === "Interview not found") {
        statusCode = 404;
        message = err.message;
    }

    if (err.message === "Document not found") {
        statusCode = 404;
        message = err.message;
    }

    if (err.message === "Follow-up not found") {
        statusCode = 404;
        message = err.message;
    }

    if (err.message === "Notification not found") {
        statusCode = 404;
        message = err.message;
    }

    if (err.message === "Email is already registered") {
        statusCode = 409;
        message = err.message;
    }

    res.status(statusCode).json({
        success: false,
        message
    });
};