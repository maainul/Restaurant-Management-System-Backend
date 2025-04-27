import CreateCustomerRequestDto from "../dto/user/CreateCustomerRequest.dto";
import { ValidationError } from "../errors/errors";





const validateOTPInputData = (userData: CreateCustomerRequestDto): void => {
    const fieldErrors: { field: string; message: string }[] = [];

    // Validate the email field
    if (!userData.mobileNumber || userData.mobileNumber.trim() === "") {
        fieldErrors.push({
            field: "mobileNumber",
            message: "Mobile Number is required",
        });
    }
    // Validate the email field
    if (!userData.otp || userData.otp.trim() === "") {
        fieldErrors.push({
            field: "otp",
            message: "otp is required",
        });
    }

    // If there are validation errors, throw a ValidationError
    if (fieldErrors.length > 0) {
        throw new ValidationError(fieldErrors, 400);
    }
};

// OTP = OTP From Database
// userOTP = otp from user Input
const verifyOTPData = (otp: string, userOTP: string, otpExpiryTime: Date): void => {
    const fieldErrors: { field: string; message: string }[] = [];

    // Check if otp and expiry exist
    if (!otp || !otpExpiryTime) {
        fieldErrors.push({
            field: "otp",
            message: "OTP not generated or expired",
        });
    }

    // Check if expiry time is a valid Date object
    if (!(otpExpiryTime instanceof Date) || isNaN(otpExpiryTime.getTime())) {
        fieldErrors.push({
            field: "otpExpiryTime",
            message: "Invalid or missing OTP expiry time",
        });
    } else if (otpExpiryTime < new Date()) {
        fieldErrors.push({
            field: "otpExpiryTime",
            message: "OTP has expired",
        });
    }

    // Compare OTPs
    if (otp !== userOTP?.trim()) {
        fieldErrors.push({
            field: "otp",
            message: "Invalid OTP",
        });
    }

    // Throw validation error if any
    if (fieldErrors.length > 0) {
        throw new ValidationError(fieldErrors, 400);
    }
};


export default { validateOTPInputData,verifyOTPData };
