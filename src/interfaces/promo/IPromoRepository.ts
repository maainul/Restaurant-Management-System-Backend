
import IPromo from './IPromo';

export interface IPromoRepository {
    create(promo: Partial<IPromo>): Promise<IPromo>;
    findAll(): Promise<IPromo[]>;
    findById(id: string): Promise<IPromo | null>;
    update(id: string, promo: Partial<IPromo>): Promise<IPromo | null>;
    delete(id: string): Promise<boolean>;
}
