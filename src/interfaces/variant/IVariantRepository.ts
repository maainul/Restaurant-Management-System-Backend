import IVariant from "./IVariant";

interface IVariantRepository {
    create(customization: Partial<IVariant>): Promise<IVariant>;
    findById(id: string): Promise<IVariant | null>;
    findById(id: string): Promise<IVariant | null>;
    findByName(name: string): Promise<IVariant | null>;
    findAll(): Promise<IVariant[]>;
    update(id: string, customization: Partial<IVariant>): Promise<IVariant | null>;
    delete(id: string): Promise<boolean>;
}

export default IVariantRepository
