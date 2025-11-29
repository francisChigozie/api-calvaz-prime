"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = notFound;
exports.errorHandler = errorHandler;
function notFound(req, res) {
    res.status(404).json({ message: "Not Found" });
}
function errorHandler(err, _req, res, _next) {
    console.error("ErrorHandler:", {
        message: err?.message,
        status: err?.status,
        name: err?.name,
        details: err?.details,
        stack: err?.stack,
    });
    let status = err.status || 500;
    let message = err.message || "Internal Server Error";
    const details = err.details || undefined;
    if (err?.name === "CastError") {
        status = 400;
        message = "Invalid identifier";
    }
    res.status(status).json({ message, details });
}
//# sourceMappingURL=errorHandler.js.map