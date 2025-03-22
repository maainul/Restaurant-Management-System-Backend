import { Response } from "express";

interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    errors?: { field: string; message: string }[];
}

const sendResponse = <T>(
    res: Response,
    statusCode: number,
    message: string,
    data?: T,
    errors: { field: string; message: string }[] = [] // Ensures errors is always an array
) => {
    const response: ApiResponse<T> = {
        success: statusCode >= 200 && statusCode < 300,
        message,
        ...(data !== undefined && { data }), // Only include `data` if it's not undefined
        ...(errors.length > 0 && { errors }), // Only include `errors` if there are any
    };

    res.status(statusCode).json(response);
};

export default sendResponse;
