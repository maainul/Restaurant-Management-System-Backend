import CreateOfferRequestDto from "../../dto/offer/CreateOfferRequest.dto";
import OfferResponseDto from "../../dto/offer/OfferResponse.dto";
import UpdateOfferRequestDto from "../../dto/offer/UpdateOfferRequest.dto";
import IOffer from "../../interfaces/offer/IOffer";

// Convert CreateOfferRequest DTO to Model
export const toOffer = (data: CreateOfferRequestDto | UpdateOfferRequestDto): Partial<IOffer> => {
  const offerData: Partial<IOffer> = {};
  if (data.name) {
    offerData.name = data.name;
  }
  if (data.description) {
    offerData.description = data.description;
  }
  if (data.discount) {
    offerData.discount = data.discount;
  }
  if (data.startDate) {
    offerData.startDate = data.startDate;
  }
  if (data.endDate) {
    offerData.endDate = data.endDate;
  }
  if (data.available) {
    offerData.available = data.available;
  }
  return offerData;
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
