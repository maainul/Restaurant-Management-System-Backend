import { Types } from "mongoose";

interface IOrder {
    _id?: Types.ObjectId;
    userId: Types.ObjectId;
    tableId?: Types.ObjectId;
    items: {
        menuItemId: Types.ObjectId; // MenuItem reference
        quantity: number;
        specialInstructions?: string;
        price: number
    }[];
    status: string;
    totalAmount: number;
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
}

export default IOrder