import { Types } from "mongoose";

interface IOffer {
    _id?: Types.ObjectId;
    name: string;
    description?: string;
    price: number;
    discount: number;
    discountPercentage: number;
    startDate: Date;
    endDate: Date;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}


export default IOffer