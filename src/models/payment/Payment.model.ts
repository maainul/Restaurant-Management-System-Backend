import { Schema, model } from "mongoose";
import IPayment from "../../interfaces/payment/IPayment";

const PaymentSchema = new Schema<IPayment>({
    orderId: { type: Schema.Types.ObjectId, ref: "Order", required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
    paymentMethod: { type: String, enum: ["cash", "card", "online"], required: true },
}, { timestamps: true });

const Payment = model<IPayment>("Payment", PaymentSchema);
export default Payment;
