import { Schema, model } from "mongoose";
import ICategory from '../../interfaces/category/ICategory';

const CategorySchema = new Schema<ICategory>({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    status: { type: Number },
}, { timestamps: true });

const Category = model<ICategory>("Category", CategorySchema);
export default Category