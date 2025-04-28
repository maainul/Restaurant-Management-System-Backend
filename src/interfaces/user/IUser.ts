import { Types } from "mongoose";

interface IUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  name: string;
  status: string;
  address: string;
  otp:string;
  otpExpiryTime:Date;
  mobileNumber: string;
  isVerified:Boolean;

  isEmailVerified:Boolean;
  verificationCode:string;
  verificationExpiryTime:Date;
  
  password: string;
  role: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IUser