import { CreatePromoRequestDto } from '../../dto/promo/CreatePromoRequest.dto';
import { UpdatePromoRequestDto } from '../../dto/promo/UpdatePromoRequest.dto';
import IPromo from '../../interfaces/promo/IPromo';

export interface IPromoService {
    createPromo(createPromoDto: CreatePromoRequestDto): Promise<IPromo>;
    getPromos(): Promise<IPromo[]>;
    getPromoById(promoId: string): Promise<IPromo | null>;
    updatePromo(promoId: string, updatePromoDto: UpdatePromoRequestDto): Promise<IPromo | null>;
    deletePromo(promoId: string): Promise<boolean>;
}
