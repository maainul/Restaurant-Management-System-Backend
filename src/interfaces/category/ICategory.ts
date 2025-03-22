import { Types } from "mongoose";

interface ICategory {
    _id: Types.ObjectId;
    name: string;
    description?: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}
export default ICategory