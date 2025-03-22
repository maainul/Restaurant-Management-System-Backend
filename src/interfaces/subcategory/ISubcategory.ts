import { Types } from "mongoose";

interface ISubcategory {
    _id: Types.ObjectId;
    categoryId: Types.ObjectId;
    name: string;
    description?: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export default ISubcategory
