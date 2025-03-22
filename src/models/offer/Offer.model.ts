import { Schema, model } from "mongoose";
import IOffer from "../../interfaces/offer/IOffer";

const OfferSchema = new Schema<IOffer>({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    discount: { type: Number, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    available: { type: Boolean, required: true, default: true },
}, { timestamps: true });

const Offer = model<IOffer>("Offer", OfferSchema);
export default Offer;
