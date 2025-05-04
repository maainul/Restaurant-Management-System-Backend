import UserResponseDto from '../../dto/user/UserResponse.dto';

interface IOtpService {
    updateUserOtp(mobileNumber: string, otp: string, otpExpiryTime: Date): Promise<UserResponseDto | null>;
    updateUserVerificationCode(email: string, verificationCode: string, verificationExpiryTime: Date): Promise<UserResponseDto | null>;
    markUserAsVerified(mobileNumber: string): Promise<UserResponseDto | null>;
    markUserEmailAsVerified(email: string): Promise<UserResponseDto | null>;
    sendOtpToUser(mobileNumber: string, otp: string): Promise<string>;
}

export default IOtpService
