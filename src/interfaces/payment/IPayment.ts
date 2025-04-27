import { Types } from "mongoose";

interface IPayment {
    _id?: Types.ObjectId; // Unique identifier (MongoDB ObjectId)
    orderId: Types.ObjectId; // Reference to the User who made the payment
    userId: Types.ObjectId; // Reference to the User who made the payment
    tableId?: Types.ObjectId; // Optional reference to the Table for the payment
    totalAmount: number; // Total payment amount
    paymentMethod: "cash" | "card" | "online"; // The method used for payment
    status: "pending" | "completed" | "cancelled"; // Payment status
    createdAt: Date; // Timestamp of when the payment was created
    updatedAt: Date; // Timestamp of when the payment was last updated
}

export default IPayment;
