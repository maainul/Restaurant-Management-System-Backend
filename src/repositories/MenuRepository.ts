import { Types } from "mongoose";
import IMenuItem from "../interfaces/menu/IMenuItem";
import IMenuRepository from "../interfaces/menu/IMenuRepository";

import MenuItem from "../models/menu/MenuItem.model";


class MenuRepository implements IMenuRepository {
    async create(menuItem: IMenuItem): Promise<IMenuItem> {
        console.log("MenuRepository:create called",)
        const result = await MenuItem.create(menuItem)
        return result
    }

    async findById(id: string): Promise<IMenuItem | null> {
        console.log("MenuRepository:findById called")
        const result = await MenuItem.aggregate([
            {
                $match: { _id: new Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            { $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: "subcategories",
                    localField: "subcategoryId",
                    foreignField: "_id",
                    as: "subcategoryDetails"
                }
            },
            { $unwind: { path: "$subcategoryDetails", preserveNullAndEmptyArrays: true } },

            // Lookup for customizations (array of IDs)
            {
                $lookup: {
                    from: "customizations",
                    localField: "customizations",
                    foreignField: "_id",
                    as: "customizationDetails"
                }
            },

            // Lookup for variants (array of IDs)
            {
                $lookup: {
                    from: "variants",
                    localField: "variants",
                    foreignField: "_id",
                    as: "variantDetails"
                }
            },

            {
                $project: {
                    "name": 1,
                    "price": 1,
                    "combo": 1,
                    "comboDetails": 1,
                    "ingredients": 1,
                    "available": 1,
                    "description": 1,

                    // Category info
                    "categoryId": "$categoryDetails._id",
                    "categoryName": "$categoryDetails.name",

                    // Subcategory info
                    "subcategoryId": "$subcategoryDetails._id",
                    "subcategoryName": "$subcategoryDetails.name",

                    // Customizations (full objects)
                    "customizations": "$customizationDetails",

                    // Variants (full objects)
                    "variants": "$variantDetails",

                    "imageURL": 1,

                    // Timestamps
                    "createdAt": 1,
                    "updatedAt": 1
                }
            }

        ])

        return result.length > 0 ? result[0] : null

    }

    async findBySubcategory(subcategoryId: string): Promise<IMenuItem[]> {
        console.log("MenuRepository:findBySubcategory called")
        const result = await MenuItem.find({ subcategoryId: subcategoryId })
        return result
    }

    async findByName(name: string): Promise<IMenuItem | null> {
        const result = await MenuItem.findOne({ name: name })
        return result
    }

    async findAll(): Promise<IMenuItem[]> {
        console.log("MenuRepository:findAll called")
        const result = await MenuItem.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            { $unwind: { path: "$categoryDetails", preserveNullAndEmptyArrays: true } },

            {
                $lookup: {
                    from: "subcategories",
                    localField: "subcategoryId",
                    foreignField: "_id",
                    as: "subcategoryDetails"
                }
            },
            { $unwind: { path: "$subcategoryDetails", preserveNullAndEmptyArrays: true } },

            // Lookup for customizations (array of IDs)
            {
                $lookup: {
                    from: "customizations",
                    localField: "customizations",
                    foreignField: "_id",
                    as: "customizationDetails"
                }
            },

            // Lookup for variants (array of IDs)
            {
                $lookup: {
                    from: "variants",
                    localField: "variants",
                    foreignField: "_id",
                    as: "variantDetails"
                }
            },

            {
                $project: {
                    "name": 1,
                    "price": 1,
                    "combo": 1,
                    "comboDetails": 1,
                    "ingredients": 1,
                    "available": 1,
                    "description": 1,

                    // Category info
                    "categoryId": "$categoryDetails._id",
                    "categoryName": "$categoryDetails.name",

                    // Subcategory info
                    "subcategoryId": "$subcategoryDetails._id",
                    "subcategoryName": "$subcategoryDetails.name",

                    // Customizations (full objects)
                    "customizations": "$customizationDetails",

                    // Variants (full objects)
                    "variants": "$variantDetails",

                    "imageURL": 1,

                    // Timestamps
                    "createdAt": 1,
                    "updatedAt": 1
                }
            }

        ])

        return result
    }

    async update(id: string, menuItem: Partial<IMenuItem>): Promise<IMenuItem | null> {
        console.log("MenuRepository:update called")
        return MenuItem.findByIdAndUpdate(id, menuItem, { new: true })
    }

    async delete(id: string): Promise<boolean> {
        console.log("MenuRepository:delete called")
        const result = await MenuItem.findByIdAndDelete(id)
        return !!result
    }

}
export default MenuRepository