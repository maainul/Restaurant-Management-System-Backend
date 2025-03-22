import  CreateOfferRequestDto  from "../dto/offer/CreateOfferRequest.dto";
import  UpdateOfferRequestDto  from "../dto/offer/UpdateOfferRequest.dto";
import  OfferResponseDto  from "../dto/offer/OfferResponse.dto";
import  IOfferService  from "../interfaces/offer/IOfferService";
import  IOfferRepository  from "../interfaces/offer/IOfferRepository";
import { toOffer, toOfferResponse, toUpdatedOffer } from "../converters/offer/OfferConverter";
import IOffer from "../interfaces/offer/IOffer";

class OfferService implements IOfferService {

    private offerRepository: IOfferRepository;

    constructor(offerRepository: IOfferRepository) {
        this.offerRepository = offerRepository;
    }

    async createOffer(createOfferDto: CreateOfferRequestDto): Promise<OfferResponseDto> {
        console.log("OfferService: createOffer called");
        const offerData: Partial<IOffer> = toOffer(createOfferDto);
        const offer: IOffer = await this.offerRepository.create(offerData);
        return toOfferResponse(offer);
    }

    async getOffers(): Promise<OfferResponseDto[]> {
        console.log("OfferService: getOffers called");
        const offers = await this.offerRepository.findAll();
        return offers.map(toOfferResponse);
    }

    async getOfferById(offerId: string): Promise<OfferResponseDto | null> {
        console.log("OfferService: getOfferById called");
        const offer = await this.offerRepository.findById(offerId);
        return offer ? toOfferResponse(offer) : null;
    }

    async updateOffer(offerId: string, updateOfferDto: UpdateOfferRequestDto): Promise<OfferResponseDto | null> {
        console.log("OfferService: updateOffer called");
        const offer = await this.offerRepository.update(offerId, toUpdatedOffer(updateOfferDto));
        return offer ? toOfferResponse(offer) : null;
    }

    async deleteOffer(offerId: string): Promise<boolean> {
        console.log("OfferService: deleteOffer called");
        return await this.offerRepository.delete(offerId);
    }
}

export default OfferService;
