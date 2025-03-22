
import ICategory from "../interfaces/category/ICategory";
import Category from "../models/category/Category.model";
import { ICategoryRepository } from "../interfaces/category/ICategoryRepository";

class CategoryRepository implements ICategoryRepository {
    async create(category: ICategory): Promise<ICategory> {
        console.log("CategoryRepository:create called")
        const data = await Category.create(category)
        return data
    }

    async findById(id: string): Promise<ICategory | null> {
        console.log("CategoryRepository:findById called")
        const result = await Category.findById(id)
        return result;
    }

    async findByName(name: string): Promise<ICategory | null> {
        console.log("CategoryRepository:findByName called")
        const result = await Category.findOne({ name: name })
        return result;
    }

    async findAll(): Promise<ICategory[]> {
        console.log("CategoryRepository:findAll called")
        return await Category.find()
    }
    async update(id: string, category: Partial<ICategory>): Promise<ICategory | null> {
        console.log("CategoryRepository:update called")
        return Category.findByIdAndUpdate(id, category, { new: true })
    }

    async delete(id: string): Promise<boolean> {
        console.log("CategoryRepository:delete called")
        const result = await Category.findByIdAndDelete(id)
        return !!result
    }
}

export default CategoryRepository