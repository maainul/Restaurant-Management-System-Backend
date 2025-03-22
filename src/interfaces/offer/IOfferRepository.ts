import IOffer from "./IOffer";

 interface IOfferRepository {
    create(offer: Partial<IOffer>): Promise<IOffer>;
    findById(id: string): Promise<IOffer | null>;
    findAll(): Promise<IOffer[]>;
    update(id: string, offer: Partial<IOffer>): Promise<IOffer | null>;
    delete(id: string): Promise<boolean>;
}

export default IOfferRepository