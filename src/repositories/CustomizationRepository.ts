import ICustomization from "../interfaces/customization/ICustomization"
import ICustomizationRepository from "../interfaces/customization/ICustomizationRepository"
import Customization from "../models/customization/Customization.model"



class CustomizationRepository implements ICustomizationRepository {
    async create(category: ICustomization): Promise<ICustomization> {
        console.log("CustomizationRepository:create called")
        const data = await Customization.create(category)
        return data
    }

    async findById(id: string): Promise<ICustomization | null> {
        console.log("CustomizationRepository:findById called")
        const result = await Customization.findById(id)
        return result;
    }

    async findByName(name: string): Promise<ICustomization | null> {
        console.log("CustomizationRepository:findByName called")
        const result = await Customization.findOne({ name: name })
        return result;
    }

    async findAll(): Promise<ICustomization[]> {
        console.log("CustomizationRepository:findAll called")
        return await Customization.find()
    }

    async update(id: string, category: Partial<ICustomization>): Promise<ICustomization | null> {
        console.log("CustomizationRepository:update called")
        return await Customization.findByIdAndUpdate(id, category, { new: true })
    }

    async delete(id: string): Promise<boolean> {
        console.log("CustomizationRepository:delete called")
        const result = await Customization.findByIdAndDelete(id)
        return !!result
    }
}

export default CustomizationRepository