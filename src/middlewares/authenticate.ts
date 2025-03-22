import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from "./adminAuthMiddleware";


const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const request = req as AuthenticatedRequest;
    if (!process.env.ACCESS_TOKEN_SECRET) {
        throw new Error("ACCESS_TOKEN_SECRET is not defined in environment variables");
    }
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <token>"
    if (!token) {
        return sendResponse(res, 401, "Access token is required");
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return sendResponse(res, 403, "Invalid or expired token");
        }
        // Attach the decoded user information to the request object
        request.user = decoded as { role: string };
        next(); // Allow access
    })
}

export default authenticate