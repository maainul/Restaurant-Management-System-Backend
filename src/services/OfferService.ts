import CreateOfferRequestDto from "../dto/offer/CreateOfferRequest.dto";
import UpdateOfferRequestDto from "../dto/offer/UpdateOfferRequest.dto";
import OfferResponseDto from "../dto/offer/OfferResponse.dto";
import IOfferService from "../interfaces/offer/IOfferService";
import IOfferRepository from "../interfaces/offer/IOfferRepository";
import { toOffer, toOfferResponse } from "../converters/offer/OfferConverter";

import IOffer from "../interfaces/offer/IOffer";
import ConflictError from "../errors/ConflictError";
import validateOfferData from "../utils/validateOfferData";
import validateObjectId from "../utils/isValidObjectId";
import { ValidationError } from "../errors/errors";
import NotFoundError from "../errors/NotFoundError";

class OfferService implements IOfferService {
  private offerRepository: IOfferRepository;

  constructor(offerRepository: IOfferRepository) {
    this.offerRepository = offerRepository;
  }

  private async checkOfferExistsByName(name: string): Promise<IOffer | null> {
    return await this.offerRepository.findByName(name);
  }

  async createOffer(data: CreateOfferRequestDto): Promise<OfferResponseDto> {
    console.log("OfferService: createOffer called");

    // validate input data
    validateOfferData(data);

    // Check offer exists with this name
    const offerExists: IOffer | null = await this.checkOfferExistsByName(
      data.name
    );
    if (offerExists) {
      throw new ConflictError("Offer already exists");
    }

    const offerData: Partial<IOffer> = toOffer(data);
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
    validateObjectId(offerId);
    const offer: IOffer | null = await this.offerRepository.findById(offerId);
    if (!offer) {
      throw new ValidationError([{ field: "id", message: "Offer not found" }]);
    }
    return toOfferResponse(offer);
  }

  async updateOffer(id: string,data: Partial<UpdateOfferRequestDto>): Promise<OfferResponseDto> {
    console.log("OfferService: updateCategory called");

    // Validate ID format
    validateObjectId(id);

    // Retrieve current category data
    const currentData: IOffer | null = await this.offerRepository.findById(id);
    if (!currentData) {
      throw new NotFoundError("Offer Not Found");
    }

    let hasChanges = false;

    // Handle name update with uniqueness check
    if (data.name && data.name !== currentData.name) {
      const offerExists: IOffer | null = await this.checkOfferExistsByName(
        data.name
      );
      if (offerExists && offerExists._id?.toString() !== id) {
        throw new ConflictError("offer with the same name already exists");
      }
      currentData.name = data.name;
      hasChanges = true;
    }

    // Handle description update
    if (
      data.description !== undefined &&
      data.description !== currentData.description
    ) {
      currentData.description = data.description;
      hasChanges = true;
    }
    // Handle discount update
    if (data.discount !== undefined && data.discount !== currentData.discount) {
      currentData.discount = data.discount;
      hasChanges = true;
    }

    // Handle discountPercentage update
    if (
      data.discountPercentage !== undefined &&
      data.discountPercentage !== currentData.discountPercentage
    ) {
      currentData.discountPercentage = data.discountPercentage;
      hasChanges = true;
    }

    // Skip update if no changes detected
    if (!hasChanges) {
      console.log("CategoryService: No Changes detected, skipping update");
      return toOfferResponse(currentData);
    }

    // Persist changes to repository
    const offer: IOffer | null = await this.offerRepository.update(
      id,
      currentData
    );
    if (!offer) {
      throw new NotFoundError("Category Not Found");
    }

    return toOfferResponse(offer);
  }

  async deleteOffer(offerId: string): Promise<boolean> {
    console.log("OfferService: deleteOffer called");
    return await this.offerRepository.delete(offerId);
  }
}

export default OfferService;
