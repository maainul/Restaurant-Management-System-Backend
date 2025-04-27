import { Request, Response, NextFunction } from 'express';

import UserService from '../../services/UserService';
import UserRepository from '../../repositories/UserRepository';

import asyncHandler from "../../utils/asyncHandler";
import sendResponse from '../../utils/sendResponse';

import CreateCustomerRequestDto from '../../dto/user/CreateCustomerRequest.dto';
import UserResponseDto from '../../dto/user/UserResponse.dto';
import validateOtp from '../../utils/validateOtp';
import OTPRepository from '../../repositories/OTPRepository';
import OtpService from '../../services/OtpService';
import { generateOtpWithExpiry } from '../../utils/generateOtpWithExpiry';


const userRepository = new UserRepository()
const otpRepository = new OTPRepository()

const userService = new UserService(userRepository)
const otpService = new OtpService(otpRepository, userRepository)


class OTPController {

    verifyOtp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("OTPController: verifyOtp called.");
        const userData: CreateCustomerRequestDto = req.body
        console.log("OTPController: verifyOtp Request Body :", userData);

        // Validate input fields (mobileNumber & otp)
        validateOtp.validateOTPInputData(userData)

        // Fetch user by mobile number
        const user: UserResponseDto | null = await userService.getUserByMobileNumber(userData.mobileNumber)
        if (!user) {
            return sendResponse(res, 404, "User not found with this mobile Number");
        }

        // Check if user is already verified
        if (user.isVerified) {
            return sendResponse(res, 400, "User already verified.");
        }

        // Check if user has OTP and expiry time
        if (!user.otp || !user.otpExpiryTime) {
            return sendResponse(res, 400, "OTP not generated or expired");
        }

        if (!userData.otp) {
            return sendResponse(res, 400, "OTP input is missing");
        }

        // Verify OTP
        validateOtp.verifyOTPData(user.otp, userData.otp, user.otpExpiryTime)

        // Mark user as verified (optional DB update)
        await otpService.markUserAsVerified(user.mobileNumber);

        // Success response
        sendResponse(res, 200, "OTP Verified Successfully", { mobileNumber: user.mobileNumber });
    })

    resendOtp = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("OTPController: resendotp called.");
        const { mobileNumber } = req.body
        console.log("OTPController: verifyOtp Request Body :", mobileNumber);

        if (!mobileNumber || mobileNumber.trim() === "") {
            return sendResponse(res, 400, "Mobile number is required");
        }

        // Fetch user by mobile number
        const user: UserResponseDto | null = await userService.getUserByMobileNumber(mobileNumber)
        if (!user) {
            return sendResponse(res, 404, "User not found with this mobile Number");
        }

        // Already verified?
        if (user.isVerified) {
            return sendResponse(res, 400, "User is already verified. No need to resend OTP.");
        }

        const isOtpExpired = !user.otpExpiryTime || new Date(user.otpExpiryTime) < new Date();
        if (!user.otp || isOtpExpired) {
            const {otp,otpExpiryTime} = generateOtpWithExpiry();
            // Mark user as verified (optional DB update)
            await otpService.updateUserOtp(mobileNumber, otp, otpExpiryTime);

            // Send OTP via SMS or Email
            await otpService.sendOtpToUser(mobileNumber, otp)

            // Success response
            sendResponse(res, 200, "OTP Verified Successfully", { mobileNumber: user.mobileNumber });
        }

        // OTP still valid — don’t send again
        return sendResponse(res, 400, "Your OTP is still valid. Please wait until it expires to request a new one.");

    })

    verifyMail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("OTPController: verifyOtp called.");
        const {email,verificationCode}= req.body
        console.log("OTPController: verifyOtp Request Body :", email);

        // Fetch user by mobile number
        const user: UserResponseDto | null = await userService.getUserByEmail(email)
        if (!user) {
            return sendResponse(res, 404, "User not found with this email");
        }

        // Check if user is already verified
        if (user.isEmailVerified) {
            return sendResponse(res, 400, "User already verified.");
        }

        // Check if user has OTP and expiry time
        if (!user.verificationCode || !user.verificationExpiryTime) {
            return sendResponse(res, 400, "OTP not generated or expired");
        }

        if (!verificationCode) {
            return sendResponse(res, 400, "OTP input is missing");
        }

        // Verify Verification Code
        await otpService.updateUserVerificationCode(email, verificationCode, user.verificationExpiryTime);
        
        // Mark user as verified (optional DB update)
        await otpService.markUserAsVerified(email);

        // Success response
        sendResponse(res, 200, "OTP Verified Successfully", { mobileNumber: user.mobileNumber });
    })

}

export default OTPController
