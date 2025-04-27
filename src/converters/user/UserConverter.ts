import CreateCustomerRequestDto from "../../dto/user/CreateCustomerRequest.dto";
import CreateUserRequestDto from "../../dto/user/CreateUserRequest.dto";
import UserResponseDto from "../../dto/user/UserResponse.dto";
import IUser from "../../interfaces/user/IUser";
import { generateOtpWithExpiry } from "../../utils/generateOtpWithExpiry";


export const toUser = (data: CreateUserRequestDto): Partial<IUser> => {
  const user: Partial<IUser> = {};

  if (data.email !== undefined) {
    user.email = data.email;
  }

  if (data.username !== undefined) {
    user.username = data.username;
  }
  if (data.role !== undefined) {
    user.role = data.role;
  }
  if (data.refreshToken !== undefined) {
    user.refreshToken = data.refreshToken;
  }
  if (data.password !== undefined) {
    user.password = data.password;
  }

  return user;
};

export const toCustomer = (data: CreateCustomerRequestDto): Partial<IUser> => {
  const user: Partial<IUser> = {};

  if (data.mobileNumber !== undefined) {
    user.mobileNumber = data.mobileNumber;
  }

  if (data.password !== undefined) {
    user.password = data.password;
  }

  user.role = "customer"
  const { otp, otpExpiryTime } = generateOtpWithExpiry();
  user.otp = otp
  user.otpExpiryTime = otpExpiryTime

  return user;
};

export const toUserDTO = (user: IUser): UserResponseDto => {
  return {
    _id: user._id?.toString() || "",
    username: user.username,
    email: user.email || "",
    mobileNumber: user.mobileNumber || "",
    otp: user.otp || "",
    isVerified:user.isVerified,
    otpExpiryTime: user.otpExpiryTime,
    isEmailVerified:user.isEmailVerified,
    verificationCode:user.verificationCode,
    verificationExpiryTime:user.verificationExpiryTime,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
