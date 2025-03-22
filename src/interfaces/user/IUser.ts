import { Types } from "mongoose";

interface IUser {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  role: string;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default IUser