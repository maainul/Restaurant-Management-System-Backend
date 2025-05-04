import IUserRepository from "../interfaces/user/IUserRepository";
import UserResponseDto from "../dto/user/UserResponse.dto";
import { toUserDTO } from "../converters/user/UserConverter";
import NotFoundError from "../errors/NotFoundError";
import IUser from "../interfaces/user/IUser";
import IOtpService from "../interfaces/user/IOtpService";
import IOtpRepository from "../interfaces/user/IOtpRepository";
import IMessagingService from "../interfaces/messagingService/IMessagingService";



class OtpService implements IOtpService {

    private otpRepository: IOtpRepository;
    private userRepository: IUserRepository;
    private messagingService: IMessagingService;

    constructor(otpRepository: IOtpRepository, userRepository: IUserRepository, messagingService: IMessagingService) {
        this.otpRepository = otpRepository;
        this.userRepository = userRepository;
        this.messagingService = messagingService
    }

    async markUserAsVerified(mobileNumber: string): Promise<UserResponseDto | null> {
        console.log("UserService: markUserAsVerified called.");
        const isVerified = await this.otpRepository.markUserAsVerified(mobileNumber);
        if (!isVerified) {
            throw new NotFoundError("Failed to mark user as verified.")
        }

        return toUserDTO(isVerified);
    }

    async markUserEmailAsVerified(email: string): Promise<UserResponseDto | null> {
        console.log("UserService: markUserEmailAsVerified called.");
        const isVerified = await this.otpRepository.markUserAsVerified(email);
        if (!isVerified) {
            throw new NotFoundError("Failed to mark user as verified.")
        }

        return toUserDTO(isVerified);
    }

    async updateUserOtp(mobileNumber: string, otp: string, otpExpiryTime: Date): Promise<UserResponseDto | null> {
        console.log("UserService: updateUserOtp called.");

        const user = await this.userRepository.findByMobileNumber(mobileNumber);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        user.otp = otp;
        user.otpExpiryTime = new Date(otpExpiryTime)

        const updatedUser: IUser | null = await this.otpRepository.updateUserOtp(mobileNumber, otp, otpExpiryTime)
        if (!updatedUser) {
            throw new NotFoundError("User Not Found")
        }

        return toUserDTO(updatedUser)
    }

    async updateUserVerificationCode(email: string, verificationCode: string, verificationExpiryTime: Date): Promise<UserResponseDto | null> {
        console.log("UserService: updateUserOtp called.");

        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new NotFoundError("User not found");
        }

        user.verificationCode = verificationCode;
        user.verificationExpiryTime = new Date(verificationExpiryTime)

        const updatedUser: IUser | null = await this.otpRepository.updateUserVerificationCode(email, verificationCode, verificationExpiryTime)
        if (!updatedUser) {
            throw new NotFoundError("User Not Found")
        }

        return toUserDTO(updatedUser)
    }

    async sendOtpToUser(to: string, otp: string): Promise<string> {
        console.log(`Trying to send ${otp} OTP to this number : ${to}: `);
        const message = `Your OTP is ${otp}. It expires in 5 minutes`
        const sid = await this.messagingService.sendOtp(to, message)
        console.log(`Success : Otp Send Successfully to this Number : ${to}: `);
        return sid
    }
}

export default OtpService;
