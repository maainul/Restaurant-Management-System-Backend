import { Schema, model } from "mongoose";
import IPromo from "../../interfaces/promo/IPromo";

const PromoSchema = new Schema<IPromo>({
    code: { type: String, required: true, unique: true },
    discountAmount: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },
    validFrom: { type: Date, required: true },
    validTill: { type: Date, required: true },
}, { timestamps: true });

const Promo = model<IPromo>("Promo", PromoSchema);
export default Promo;
