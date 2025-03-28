import { Schema, model } from "mongoose";
import ICustomization from '../../interfaces/customization/ICustomization';

const VariantSchema = new Schema<ICustomization>({
    name: { type: String },
    options: { type: [String] }
}, { timestamps: true });

const Customization = model<ICustomization>("Variant", VariantSchema);
export default Customization