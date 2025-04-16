import IOffer from "../interfaces/offer/IOffer";
import Offer from "./../models/offer/Offer.model";

import IOfferRepository from "../interfaces/offer/IOfferRepository";

class OfferRepository implements IOfferRepository {
  async findByName(name: string): Promise<IOffer | null> {
    console.log("OfferRepository:findByName called");
    const result = await Offer.findOne({ name: name });
    return result;
  }
  async create(offer: IOffer): Promise<IOffer> {
    console.log("OfferRepository:create called");
    return await Offer.create(offer);
  }

  async findById(id: string): Promise<IOffer | null> {
    console.log("OfferRepository:findById called");
    const result = await Offer.findById({ id });
    return result;
  }

  async findAll(): Promise<IOffer[]> {
    console.log("OfferRepository:findAll called");
    return await Offer.find();
  }

  async update(id: string, offer: Partial<IOffer>): Promise<IOffer | null> {
    console.log("OfferRepository:update called");
    return Offer.findByIdAndUpdate(id, offer, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    console.log("OfferRepository:delete called");
    const result = await Offer.findByIdAndDelete(id);
    return !!result;
  }
}

export default OfferRepository;
