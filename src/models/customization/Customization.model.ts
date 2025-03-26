import { Schema, model } from "mongoose";
import ICustomization from '../../interfaces/customization/ICustomization';

const CustomizationSchema = new Schema<ICustomization>({
    name: { type: String },
    options: { type: [String] }
}, { timestamps: true });

const Customization = model<ICustomization>("Customization", CustomizationSchema);
export default Customization