import { Types } from "mongoose";

interface IMenuItem {
    _id?: Types.ObjectId;
    categoryId: Types.ObjectId;
    subcategoryId?: Types.ObjectId;
    name: string;
    description?: string;
    ingredients: string[];
    price: number | Record<string, number>;
    comboDetails?: {
        includedItems: string[],
        drinkOptions: string[],
        upgradeOptions: string[],
        comboPrice: number
    };
    customizations: Types.ObjectId[]; // References to Customization documents
    variants: Types.ObjectId[]; // References to Variant documents
    available: boolean;
    combo: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default IMenuItem
