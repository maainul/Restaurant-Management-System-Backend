import IOtpRepository from "../interfaces/user/IOtpRepository";
import IUser from "../interfaces/user/IUser";
import User from "../models/user/User.model";

class OTPRepository implements IOtpRepository {

  async updateUserOtp(mobileNumber: string, otp: string, otpExpiryTime: Date): Promise<IUser | null> {
    return await User.findOneAndUpdate(
      { mobileNumber },
      { otp, otpExpiryTime },
      { new: true }
    )
  }

  async updateUserVerificationCode(email: string, verificationCode: string, verificationExpiryTime: Date): Promise<IUser | null> {
    return await User.findOneAndUpdate(
      { email },
      { verificationCode,verificationExpiryTime  },
      { new: true }
    )
  }

  async sendOtpToUser(mobileNumber: string, otp: string): Promise<IUser | null> {
    console.log(`Sending OTP ${otp} to mobile number ${mobileNumber}`);
    return null
  }

  async markUserAsVerified(mobileNumber: string): Promise<IUser | null> {
    console.log("UserRepository:markUserAsVerified called");
    const updatedUser = await User.findOneAndUpdate(
      { mobileNumber: mobileNumber },
      {
        isVerified: true,
        otp: null,
        otpExpiryTime: null
      },
      { new: true }
    )
    return updatedUser;
  }

  async markUserEmailAsVerified(email: string): Promise<IUser | null> {
    console.log("UserRepository:markUserEmailAsVerified called");
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        isEmailVerified: true,
        verificationCode: null,
        verificationExpiryTime: null
      },
      { new: true }
    )
    return updatedUser;
  }

}

export default OTPRepository;
