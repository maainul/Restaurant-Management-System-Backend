import { Request, Response, NextFunction } from 'express';

import UserService from '../../services/UserService';
import UserRepository from '../../repositories/UserRepository';
import CreateUserRequestDto from '../../dto/user/CreateUserRequest.dto';

import asyncHandler from "../../utils/asyncHandler";
import sendResponse from '../../utils/sendResponse';
import validateParmas from '../../utils/validateParams';
import validateObjectId from '../../utils/isValidObjectId';
import userValidation from "../../utils/validateUser"
import UpdateUserRequestDto from '../../dto/user/UpdateUserRequest.dto';


const userRepository = new UserRepository()
const userService = new UserService(userRepository)



class UserController {
    login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("BaseUserController: login called.");
        const { email, password } = req.body;
        console.log("BaseUserController: Request Body:", { email, password });
        // Perform validation
        userValidation.validateLoginData(email, password)
        // If validation passes, proceed to log in the user
        const result = await userService.login({ email, password });
        if (!result) {
            return sendResponse(res, 401, "Invalid credentials");
        }
        const { user, accessToken, refreshToken } = result
        // Send the token in the response
        sendResponse(res, 200, "User logged in successfully", { user, accessToken, refreshToken });
    })

    register = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("UserController: register called.");
        const userData: CreateUserRequestDto = req.body
        console.log("AdminUserController: createUser Request Body :", userData);
        // Perform validation
        userValidation.validateRegistrationData(userData)
        // If validation passes, proceed to register the user
        const newUser = await userService.createUser(userData)
        sendResponse(res, 201, "User Created Successfully", newUser)
    })

    getUserById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("AdminUserController: getUserById called.");
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        validateObjectId(id)
        const user = await userService.getUserById(id)
        if (!user) {
            return sendResponse(res, 404, "User not found by this id");
        }
        sendResponse(res, 201, "User fetch by id Successfully", user)
    })

    refreshToken = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const { refreshToken } = req.body
        if (!refreshToken) {
            return sendResponse(res, 401, "Refresh token is required")
        }
        const newAccessToken = await userService.refreshAccessToken(refreshToken)
        sendResponse(res, 200, "Access token refreshed", { accessToken: newAccessToken })
    })
}

export default UserController