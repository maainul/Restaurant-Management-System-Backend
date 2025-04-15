import { Types } from "mongoose";

interface ITable {
    _id?: Types.ObjectId;
    tableNumber: string;
    capacity: number;
    isReserved: boolean;
    status: number
    createdAt: Date;
    updatedAt: Date;
}

export default ITable