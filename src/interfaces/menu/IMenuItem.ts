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
    }
    available: boolean;
    combo: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default IMenuItem
