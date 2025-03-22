import { Request, Response, NextFunction } from "express"
import { ValidationError } from "../errors/errors"
import sendResponse from "../utils/sendResponse"


interface CustomError extends Error {
    statusCode?: number
    message: string,
    stack?: string,
    errors?: { field: string; message: string }[]
}

const errorMiddleware = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode: number = err.statusCode || 500
    let message: string = err.message || "Internal Server error"
    let errors: { field: string; message: string }[] = []

    // Handle Validation Error
    if (err instanceof ValidationError) {
        statusCode = err.statusCode
        message = err.message
        errors = err.errors || [];
    }

    // Log the error with a timestamp
    console.log(`[${new Date().toISOString()}] ${statusCode} - ${message}`);

    if (process.env.NODE_ENV === "production") {
        sendResponse(res, statusCode, message, undefined, errors);
    } else {
        // In development, log additional details for debugging
        console.error("Request URL:", req.originalUrl);
        console.error("Request Body:", req.body);
        console.error("Stack Trace:", err.stack);

        // Include the stack trace in the response for debugging
        sendResponse(res, statusCode, message, { stack: err.stack }, errors);
    }
}

export default errorMiddleware