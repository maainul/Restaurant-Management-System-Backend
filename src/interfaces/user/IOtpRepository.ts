import IUser from "./IUser";

interface IOtpRepository {
    markUserAsVerified(mobileNumber: string): Promise<IUser | null>;
    markUserEmailAsVerified(email: string): Promise<IUser | null>;
    updateUserOtp(mobileNumber: string, otp: string, otpExpiryTime: Date): Promise<IUser | null>;
    updateUserVerificationCode(email: string, verificationCode: string, verificationExpiryTime: Date): Promise<IUser | null>;
    sendOtpToUser(mobileNumber: string, otp: string): Promise<IUser | null>;
}

export default IOtpRepository
