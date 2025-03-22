import { Schema, model } from "mongoose";
import IOrder from "../../interfaces/order/IOrder";

const OrderSchema = new Schema<IOrder>({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tableId: { type: Schema.Types.ObjectId, ref: "Table" },
    items: [
        {
            menuItemId: { type: Schema.Types.ObjectId, ref: "MenuItem", required: true }, // Reference to MenuItem model
            quantity: { type: Number, required: true },
            specialInstructions: { type: String },
        },
    ],
    status: {
        type: String,
        enum: ["pending", "confirmed", "preparing", "served", "completed", "cancelled"],
        default: "pending",
    },

    totalAmount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["cash", "card", "online"], required: true },
}, { timestamps: true });

const Order = model<IOrder>("Order", OrderSchema);
export default Order;
