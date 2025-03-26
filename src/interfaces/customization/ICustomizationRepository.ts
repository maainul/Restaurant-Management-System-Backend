import ICustomization from "./ICustomization";

interface ICustomizationRepository {
    create(customization: Partial<ICustomization>): Promise<ICustomization>;
    findById(id: string): Promise<ICustomization | null>;
    findByName(name: string): Promise<ICustomization | null>;
    findAll(): Promise<ICustomization[]>;
    update(id: string, customization: Partial<ICustomization>): Promise<ICustomization | null>;
    delete(id: string): Promise<boolean>;
}

export default ICustomizationRepository