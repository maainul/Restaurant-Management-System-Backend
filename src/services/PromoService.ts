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

    async createPromo(createPromoDto: CreatePromoRequestDto): Promise<PromoResponseDto> {
        console.log("PromoService: createPromo called");
        const promoData: Partial<IPromo> = toPromo(createPromoDto);
        const promo = await this.promoRepository.create(promoData);
        return toPromoResponse(promo);
    }

    async getPromos(): Promise<PromoResponseDto[]> {
        console.log("PromoService: getPromos called");
        const promos = await this.promoRepository.findAll();
        return promos.map(toPromoResponse);
    }

    async getPromoById(promoId: string): Promise<PromoResponseDto | null> {
        console.log("PromoService: getPromoById called");
        const promo = await this.promoRepository.findById(promoId);
        return promo ? toPromoResponse(promo) : null;
    }

    async updatePromo(promoId: string, updatePromoDto: UpdatePromoRequestDto): Promise<PromoResponseDto | null> {
        console.log("PromoService: updatePromo called");
        const promo = await this.promoRepository.update(promoId, toUpdatedPromo(updatePromoDto));
        return promo ? toPromoResponse(promo) : null;
    }

    async deletePromo(promoId: string): Promise<boolean> {
        console.log("PromoService: deletePromo called");
        return await this.promoRepository.delete(promoId);
    }
}

export default PromoService;
