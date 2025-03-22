import { NextFunction, Request, Response } from "express";
import sendResponse from "../utils/sendResponse";


export interface AuthenticatedRequest extends Request {
    user?: {
        role: string
    }
}

const isAdmin = (req: Request, res: Response, next: NextFunction)=>{
    const request = req as AuthenticatedRequest

    if (request.user && request.user.role === "admin") {
        next()
    } else {
        sendResponse(res, 403, "Forbidden: Admin only access");
    }
}

export default isAdmin