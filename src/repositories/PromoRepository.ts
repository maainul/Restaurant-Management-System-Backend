import IPromo from "../interfaces/promo/IPromo";
import { IPromoRepository } from "../interfaces/promo/IPromoRepository";
import Promo from './../models/promo/Promo.model';


class PromoRepository implements IPromoRepository {

    async create(promo: Partial<IPromo>): Promise<IPromo> {
        console.log("PromoRepository:create called")
        return await Promo.create(promo)
    }

    async findAll(): Promise<IPromo[]> {
        console.log("PromoRepository:findAll called")
        return await Promo.find()
    }

    async update(id: string, promo: Partial<IPromo>): Promise<IPromo | null> {
        console.log("PromoRepository:update called")
        return await Promo.findByIdAndUpdate(id, promo, { new: true })
    }
    async delete(id: string): Promise<boolean> {
        console.log("PromoRepository:delete called")
        const result = await Promo.findByIdAndDelete(id)
        return !!result
    }

    async findById(id: string): Promise<IPromo | null> {
        console.log("PromoRepository:update called")
        return await Promo.findById(id)
    }
}

export default PromoRepository