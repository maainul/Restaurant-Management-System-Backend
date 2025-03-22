import { Schema, model } from "mongoose";
import ISubcategory from "../../interfaces/subcategory/ISubcategory";

const SubcategorySchema = new Schema<ISubcategory>({
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    name: { type: String, required: true },
    description: { type: String },
    status: { type: Number },
}, { timestamps: true });

const Subcategory = model<ISubcategory>("Subcategory", SubcategorySchema);
export default Subcategory;
