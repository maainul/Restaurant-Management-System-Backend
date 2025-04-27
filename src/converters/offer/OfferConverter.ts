import  CreateOfferRequestDto  from "../../dto/offer/CreateOfferRequest.dto";
import  OfferResponseDto  from "../../dto/offer/OfferResponse.dto";
import  UpdateOfferRequestDto  from "../../dto/offer/UpdateOfferRequest.dto";
import IOffer from "../../interfaces/offer/IOffer";

// Convert CreateOfferRequest DTO to Model
export const toOffer = (data: CreateOfferRequestDto): Partial<IOffer> => {
    return {
        name: data.name,
        description: data.description,
        discount: data.discount,
        startDate: data.startDate,
        endDate: data.endDate,
        available: data.available,
    };
};

// Convert UpdateOfferRequest DTO to Model
export const toUpdatedOffer = (data: UpdateOfferRequestDto): Partial<IOffer> => {
    return {
        name: data.name,
        description: data.description,
        discount: data.discount,
        startDate: data.startDate,
        endDate: data.endDate,
        available: data.available,
    };
};

// Convert Model to OfferResponse DTO
export const toOfferResponse = (offer: IOffer): OfferResponseDto => {
    return {
        id: offer._id?.toString() || "",
        name: offer.name,
        description: offer.description,
        price: offer.price,
        discount: offer.discount,
        startDate: offer.startDate,
        endDate: offer.endDate,
        available: offer.available,
        createdAt: offer.createdAt,
        updatedAt: offer.updatedAt,
    };
};
