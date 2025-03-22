import { CreatePromoRequestDto } from "../../dto/promo/CreatePromoRequest.dto";
import { UpdatePromoRequestDto } from "../../dto/promo/UpdatePromoRequest.dto";
import PromoResponseDto from "../../dto/promo/PromoResponse.dto";
import IPromo from "../../interfaces/promo/IPromo";

// Convert CreatePromoRequest DTO to Model
export const toPromo = (data: CreatePromoRequestDto): Partial<IPromo> => {
    return {
        code: data.code,
        description: data.description,
        discountPercentage: data.discountPercentage,
        validFrom: data.validFrom,
        validTill: data.validTill,
    };
};

// Convert UpdatePromoRequest DTO to Model
export const toUpdatedPromo = (data: UpdatePromoRequestDto): Partial<IPromo> => {
    return {
        code: data.code,
        description: data.description,
        discountPercentage: data.discountPercentage,
        validFrom: data.validFrom,
        validTill: data.validTill,
    };
};

// Convert Model to PromoResponse DTO
export const toPromoResponse = (promo: IPromo): PromoResponseDto => {
    return {
        id: promo._id ? promo._id.toString() : "",
        code: promo.code,
        description: promo.description,
        discountPercentage: promo.discountPercentage,
        validFrom: promo.validFrom,
        validTill: promo.validTill,
        createdAt: promo.createdAt,
        updatedAt: promo.updatedAt,
    };
};
