import { Request, Response, NextFunction } from 'express';

import UserService from '../../services/UserService';
import UserRepository from '../../repositories/UserRepository';
import CreateUserRequestDto from '../../dto/user/CreateUserRequest.dto';

import asyncHandler from "../../utils/asyncHandler";
import sendResponse from '../../utils/sendResponse';
import validateParmas from '../../utils/validateParams';
import validateObjectId from '../../utils/isValidObjectId';
import userValidation from "../../utils/validateUser"
import CreateCustomerRequestDto from '../../dto/user/CreateCustomerRequest.dto';
import OTPRepository from '../../repositories/OTPRepository';
import OtpService from '../../services/OtpService';
import UpdateUserRequestDto from '../../dto/user/UpdateUserRequest.dto';
import TwilioSmsService from '../../services/TwilioSmsService';
import { generateOtpWithExpiry } from '../../utils/generateOtpWithExpiry';


const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const otpRepository = new OTPRepository()
const smsService = new TwilioSmsService()
const otpServcie = new OtpService(otpRepository, userRepository, smsService)


class AuthController {
    login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("AuthController: login called.");
        const { email, password } = req.body;

        console.log("AuthController: Request Body:", { email, password });
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
        console.log("AuthController: register called.");
        const userData: CreateUserRequestDto = req.body
        console.log("AuthController: createUser Request Body :", userData);
        // Perform validation
        userValidation.validateRegistrationData(userData)
        // If validation passes, proceed to register the user
        const newUser = await userService.createUser(userData)
        sendResponse(res, 201, "User Created Successfully", newUser)
    })

    // Create Customer With OTP
    createCustomer = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("AuthController: register called.");

        const userData: CreateCustomerRequestDto = req.body
        console.log("AuthController: createUser Request Body :", userData);

        // Perform validation
        userValidation.validateCustomerData(userData)

        // 1. Generate OTP
        const otpInfo = generateOtpWithExpiry()
        const mobileNumberWithCountryCode = "+88" + userData.mobileNumber
        // 2. Send OTP via SMS or Email
        await otpServcie.sendOtpToUser(mobileNumberWithCountryCode, otpInfo.otp)

        // 3. Create Customer
        userData.otp = otpInfo.otp
        userData.otpExpiryTime = otpInfo.otpExpiryTime
        const newUser = await userService.createCustomer(userData)

        sendResponse(res, 201, "User Created Successfully", newUser)
    })


    getUserById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("AuthController: getUserById called.");
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

    passwordUpdate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("AuthController: password Update called.");

        validateParmas(req.params, ["id"])
        const id: string = req.params.id

        // Get the updated data from the request body
        const userData: Partial<UpdateUserRequestDto> = req.body
        console.log("AuthController: form data : ", userData)

        // Call the service to update the category
        const updatedUser = await userService.updateUser(id, userData)

        sendResponse(res, 201, "User fetch by id Successfully", updatedUser)
    })
}

export default AuthController