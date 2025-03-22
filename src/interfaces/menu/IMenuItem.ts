import { Types } from "mongoose";

interface IMenuItem {
    _id?: Types.ObjectId;
    categoryId: Types.ObjectId;
    subcategoryId?: Types.ObjectId;
    name: string;
    description?: string;
    price: number;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default IMenuItem
