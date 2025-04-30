import { ISubcategoryRepository } from "../interfaces/subcategory/ISubcategoryRepository";
import ISubcategory from "../interfaces/subcategory/ISubcategory";
import Subcategory from "../models/subcategory/Subcategory.model";
import ISubcategoryWithCategory from "../interfaces/subcategory/ISubcategoryWithCategory";
import { Types } from "mongoose";


class SubcategoryRepository implements ISubcategoryRepository {

    async create(subcategory: ISubcategory): Promise<ISubcategory> {
        console.log("SubcategoryRepository:create called")
        return await Subcategory.create(subcategory)
    }

    async findById(id: string): Promise<ISubcategoryWithCategory | null> {
        console.log("SubcategoryRepository: findById called");

        const result = await Subcategory.aggregate([
            {
                $match: { _id: new Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId", // ✅ Fixed field name
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            {
                $unwind: "$categoryDetails"
            },
            {
                $project: {
                    _id: 1,
                    name: 1,  // 
                    description: 1,
                    categoryId: "$categoryId", // 
                    categoryName: "$categoryDetails.name",
                    status: 1,
                    categoryStatus: "$categoryDetails.status",
                    createdAt: 1,
                    updatedAt: 1
                }
            }
        ]);

        return result.length > 0 ? result[0] : null; // ✅ Ensure correct return type
    }


    async findByName(name: string): Promise<ISubcategory | null> {
        console.log("SubcategoryRepository:findByName called")
        const result = await Subcategory.findOne({ name: name })
        return result
    }

    async findByCategory(categoryId: string): Promise<ISubcategory[]> {
        console.log("SubcategoryRepository:findByCategory called")
        const result = await Subcategory.find({ categoryId: categoryId })
        return result
    }

    async findAll(): Promise<ISubcategoryWithCategory[]> {
        console.log("SubcategoryRepository:findAll called")
        const data = await Subcategory.aggregate([
            {
                $lookup: {
                    from: "categories",
                    localField: "categoryId",
                    foreignField: "_id",
                    as: "categoryDetails"
                }
            },
            {
                $unwind: "$categoryDetails"
            },
            {
                $project: {
                    "name": 1,
                    "categoryId": "$categoryDetails._id",
                    "categoryName": "$categoryDetails.name",
                    "description": 1,
                    "status": 1,
                    "categoryStatus": "$categoryDetails.status",
                    "createdAt": 1,
                    "updatedAt": 1
                }
            }
        ]
        )
        console.log("SubcategoryRepository:findAll Data :", data)
        return data
    }

    async update(id: string, subcategory: Partial<ISubcategory>): Promise<ISubcategory | null> {
        console.log("SubcategoryRepository:update called")
        return await Subcategory.findByIdAndUpdate(id, subcategory, { new: true })
    }

    async delete(id: string): Promise<boolean> {
        console.log("SubcategoryRepository:delete called")
        const result = await Subcategory.findByIdAndDelete(id)
        return !!result
    }

    async countDocuments(filter: any = {}): Promise<number> {
        return await Subcategory.countDocuments(filter);
      }
}

export default SubcategoryRepository