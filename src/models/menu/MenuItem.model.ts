import { Schema, model } from "mongoose";
import IMenuItem from "../../interfaces/menu/IMenuItem";

const MenuItemSchema = new Schema<IMenuItem>({
    categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    subcategoryId: { type: Schema.Types.ObjectId, ref: "Subcategory" },
    name: { type: String, required: true },
    description: { type: String },
    ingredients: { type: [String] },
    price: {
        type: Schema.Types.Mixed,
        required: true
    }, // Can be a number or a Map
    available: { type: Boolean, default: true },
    combo: { type: Boolean, default: true },
    comboDetails: {
        includedItems: [{ type: String }],
        drinkOptions: [{ type: String }],
        upgradeOptions: [{ type: String }],
        comboPrice: { type: Number }
    }
}, { timestamps: true });

// Ensure comboDetails is only set when combo is true
MenuItemSchema.pre("save", function (next) {
    if (!this.combo) {
        this.comboDetails = undefined
    }
    next()
})
const MenuItem = model("MenuItem", MenuItemSchema);
export default MenuItem;
