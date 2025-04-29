import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from "./adminAuthMiddleware";
import UserRepository from "../repositories/UserRepository";
const userRepository = new UserRepository();


const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    const request = req as AuthenticatedRequest;
    const accessToken = process.env.ACCESS_TOKEN_SECRET

    if (!accessToken) {
        return sendResponse(res, 500, "ACCESS_TOKEN_SECRET is not defined in environment variables");
    }

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Format: "Bearer <token>"

    if (!token) {
        return sendResponse(res, 401, "Access token is required");
    }
    try {
        // Verify and decode the token
        const decoded = jwt.verify(token, accessToken) as { userId: string; tokenVersion: number };
        // Retrieve user and token version from the database
        const user = await userRepository.findById(decoded.userId)
        if (!user) {
            return sendResponse(res, 404, "User not found");
        }
        // Compare tokenVersion from the token with the one in the database
        if (user.tokenVersion !== decoded.tokenVersion) {
            return sendResponse(res, 403, "Token is invalid or expired");
        }
        // Attach the user data to the request object
        request.user = user;
        next(); // Proceed to the next middleware or route handler
    } catch (err) {
        return sendResponse(res, 403, "Invalid or expired token");
    }

}

export default authenticate