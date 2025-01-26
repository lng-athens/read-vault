const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode) {
        case 400:
            res.json({
                title: "Bad Request",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 401:
            res.json({
                title: "Unauthorized",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 403:
            res.json({
                title: "Forbidden",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 404:
            res.json({
                title: "Not Found",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 405:
            res.json({
                title: "Method Not Allowed",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 406:
            res.json({
                title: "Not Acceptable",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 408:
            res.json({
                title: "Request Timeout",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 409:
            res.json({
                title: "Conflict",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 410:
            res.json({
                title: "Gone",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 413:
            res.json({
                title: "Payload Too Large",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 414:
            res.json({
                title: "URI Too Long",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 415:
            res.json({
                title: "Unsupported Media Type",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 422:
            res.json({
                title: "Unprocessable Entity",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 429:
            res.json({
                title: "Too Many Requests",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 500:
            res.json({
                title: "Internal Server Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 502:
            res.json({
                title: "Bad Gateway",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 503:
            res.json({
                title: "Service Unavailable",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        case 504:
            res.json({
                title: "Gateway Timeout",
                message: err.message,
                stackTrace: err.stack,
            });
            break;

        default:
            res.json({
                title: "Unexpected Error",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
    }
};

module.exports = errorHandler;