import CreateOfferRequestDto  from "../../dto/offer/CreateOfferRequest.dto";
import UpdateOfferRequestDto  from "../../dto/offer/UpdateOfferRequest.dto";
import OfferResponseDto  from "../../dto/offer/OfferResponse.dto";

interface IOfferService {
    createOffer(createOfferDto: CreateOfferRequestDto): Promise<OfferResponseDto>;
    getOffers(): Promise<OfferResponseDto[]>;
    getOfferById(offerId: string): Promise<OfferResponseDto | null>;
    updateOffer(offerId: string, updateOfferDto: UpdateOfferRequestDto): Promise<OfferResponseDto | null>;
    deleteOffer(offerId: string): Promise<boolean>;
}

export default IOfferService