import { Types } from "mongoose";

interface IVariant {
    _id?: Types.ObjectId;
    name: string;
    options: string[];
    createdAt: Date;
    updatedAt: Date;
}
export default IVariant