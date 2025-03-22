import { Types } from "mongoose";

interface IAuth {
    userId: Types.ObjectId;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
}

export default IAuth