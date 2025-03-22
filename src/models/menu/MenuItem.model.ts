import { Schema, model } from "mongoose";
import IMenuItem from "../../interfaces/menu/IMenuItem";

const MenuItemSchema = new Schema<IMenuItem>({
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subcategoryId: { type: Schema.Types.ObjectId, ref: "Subcategory" },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    available: { type: Boolean, default: true },
}, { timestamps: true });

const MenuItem = model("MenuItem", MenuItemSchema);
export default MenuItem;
