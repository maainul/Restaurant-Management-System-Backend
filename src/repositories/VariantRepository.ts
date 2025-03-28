import IVariant from "../interfaces/variant/IVariant"
import IVariantRepository from "../interfaces/variant/IVariantRepository"
import Variant from "../models/variant/Variant.model"



class VariantRepository implements IVariantRepository {
    async create(category: IVariant): Promise<IVariant> {
        console.log("VariantRepository:create called")
        const data = await Variant.create(category)
        return data
    }

    async findById(id: string): Promise<IVariant | null> {
        console.log("VariantRepository:findById called")
        const result = await Variant.findById(id)
        return result;
    }

    async findByName(name: string): Promise<IVariant | null> {
        console.log("VariantRepository:findByName called")
        const result = await Variant.findOne({ name: name })
        return result;
    }

    async findAll(): Promise<IVariant[]> {
        console.log("VariantRepository:findAll called")
        return await Variant.find()
    }

    async update(id: string, category: Partial<IVariant>): Promise<IVariant | null> {
        console.log("VariantRepository:update called")
        return await Variant.findByIdAndUpdate(id, category, { new: true })
    }

    async delete(id: string): Promise<boolean> {
        console.log("VariantRepository:delete called")
        const result = await Variant.findByIdAndDelete(id)
        return !!result
    }
}

export default VariantRepository