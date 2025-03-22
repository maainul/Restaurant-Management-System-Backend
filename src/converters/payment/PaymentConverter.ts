import { Types } from "mongoose";
import CreatePaymentRequestDto from "../../dto/payment/CreatePaymentRequest.dto";
import IPayment from "../../interfaces/payment/IPayment";
import PaymentResponseDto from "../../dto/payment/PaymentResponse.dto";

// Convert CreatePaymentRequest DTO to Model
export const toPayment = (data: CreatePaymentRequestDto): Partial<IPayment> => {
    return {
        userId: new Types.ObjectId(data.userId),
        tableId: data.tableId ? new Types.ObjectId(data.tableId) : undefined,
        totalAmount: data.totalAmount,
        paymentMethod: data.paymentMethod,
        status: data.status ? data.status : "pending", // Default to "pending" if no status provided
    };
};


// Convert Model to PaymentResponse DTO
export const toPaymentResponse = (payment: IPayment): PaymentResponseDto => {
    return {
        id: payment._id ? payment._id.toString() : "", // Fallback to empty string if _id is undefined
        userId: payment.userId.toString(), // Convert userId to string
        tableId: payment.tableId ? payment.tableId.toString() : undefined, // Convert tableId to string if present
        totalAmount: payment.totalAmount,
        paymentMethod: payment.paymentMethod,
        status: payment.status,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt,
        orderId: payment._id ? payment._id.toString() : "", // Fallback to empty string if _id is undefined
        amountts: payment.totalAmount * 100, // Example calculation, adjust based on your business logic
    };
};