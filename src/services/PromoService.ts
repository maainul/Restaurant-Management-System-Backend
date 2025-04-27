import { toPromo, toPromoResponse, toUpdatedPromo } from "../converters/promo/PromoConverter";
import { CreatePromoRequestDto } from "../dto/promo/CreatePromoRequest.dto";
import PromoResponseDto from "../dto/promo/PromoResponse.dto";
import { UpdatePromoRequestDto } from "../dto/promo/UpdatePromoRequest.dto";
import IPromo from "../interfaces/promo/IPromo";
import { IPromoRepository } from "../interfaces/promo/IPromoRepository";
import { IPromoService } from "../interfaces/promo/IPromoService";



class PromoService implements IPromoService {

    private promoRepository: IPromoRepository;

    constructor(promoRepository: IPromoRepository) {
        this.promoRepository = promoRepository;
    }
    createPromo(createPromoDto: CreatePromoRequestDto): Promise<IPromo> {
        throw new Error("Method not implemented.");
    }
    getPromos(): Promise<IPromo[]> {
        throw new Error("Method not implemented.");
    }
    getPromoById(promoId: string): Promise<IPromo | null> {
        throw new Error("Method not implemented.");
    }
    updatePromo(promoId: string, updatePromoDto: UpdatePromoRequestDto): Promise<IPromo | null> {
        throw new Error("Method not implemented.");
    }
    deletePromo(promoId: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

  
}

export default PromoService;
