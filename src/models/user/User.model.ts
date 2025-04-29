import { Schema, model } from "mongoose";
import IUser from "../../interfaces/user/IUser";

const UserSchema = new Schema<IUser>({
    username: { type: String },
    name: { type: String },
    status: { type: String },
    email: { type: String, },
    address: { type: String, },
    otp: { type: String },
    otpExpiryTime: { type: Date },
    isVerified : {type:Boolean},
    mobileNumber: { type: String },
    password: { type: String },
    refreshToken: { type: String },
    tokenVersion: { type: Number, default: 0 },
    role: { type: String, enum: ["admin", "customer", "waiter", "kitchenStaff"], default: "customer" },
}, { timestamps: true });

const User = model<IUser>("User", UserSchema);
export default User;
