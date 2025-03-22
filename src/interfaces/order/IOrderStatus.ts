import { Types } from "mongoose";

interface IOrderStatus {
    _id: Types.ObjectId;
    orderId: Types.ObjectId;
    status: 'pending' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
    updatedAt: Date;
}

export default IOrderStatus