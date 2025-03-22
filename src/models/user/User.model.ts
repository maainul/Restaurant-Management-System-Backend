import { Schema, model } from "mongoose";
import IUser from "../../interfaces/user/IUser";

const UserSchema = new Schema<IUser>({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    role: { type: String, enum: ["admin", "customer", "waiter", "kitchenStuff"], default: "customer" },
}, { timestamps: true });

const User = model<IUser>("User", UserSchema);
export default User;
