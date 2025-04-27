import { Schema, model } from "mongoose";
import IUser from "../../interfaces/user/IUser";

const UserSchema = new Schema<IUser>({
    username: { type: String },
    email: { type: String, },
    otp: { type: String },
    otpExpiryTime: { type: Date },
    isVerified : {type:Boolean},
    mobileNumber: { type: String },
    password: { type: String, required: true },
    refreshToken: { type: String },
    role: { type: String, enum: ["admin", "customer", "waiter", "kitchenStaff"], default: "customer" },
}, { timestamps: true });

const User = model<IUser>("User", UserSchema);
export default User;
