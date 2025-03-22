import { Types } from "mongoose";

interface IPromo {
    _id?: Types.ObjectId;
    code: string;
    description: string;
    discountPercentage: number;
    validFrom: Date;
    validTill: Date;
    createdAt: Date;
    updatedAt: Date;
}

export default IPromo;
