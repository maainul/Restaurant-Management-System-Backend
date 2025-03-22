import IMenuItem from "../interfaces/menu/IMenuItem";
import { IMenuRepository } from "../interfaces/menu/IMenuRepository";
import MenuItem from "../models/menu/MenuItem.model";


class MenuRepository implements IMenuRepository {
    async create(menuItem: IMenuItem): Promise<IMenuItem> {
        console.log("MenuRepository:create called")
        return await MenuItem.create(menuItem)
    }

    async findById(id: string): Promise<IMenuItem | null> {
        console.log("MenuRepository:findById called")
        const result = await MenuItem.findById({ id })
        return result
    }

    async findBySubcategory(subcategoryId: string): Promise<IMenuItem[]> {
        console.log("MenuRepository:findBySubcategory called")
        const result = await MenuItem.find({ subcategoryId: subcategoryId })
        return result
    }

    async findAll(): Promise<IMenuItem[]> {
        console.log("MenuRepository:findAll called")
        return await MenuItem.find()
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