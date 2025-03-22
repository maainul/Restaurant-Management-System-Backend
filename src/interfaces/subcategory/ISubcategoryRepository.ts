import ISubcategory from "./ISubcategory";
import ISubcategoryWithCategory from "./ISubcategoryWithCategory";

export interface ISubcategoryRepository {
    create(subcategory: Partial<ISubcategory>): Promise<ISubcategory>;
    update(id: string, subcategory: Partial<ISubcategory>): Promise<ISubcategory | null>;
    delete(id: string): Promise<boolean>;
    findByCategory(categoryId: string): Promise<ISubcategory[]>;
    findByName(name: string): Promise<ISubcategory | null>;

    findById(id: string): Promise<ISubcategoryWithCategory | null>;
    findAll(): Promise<ISubcategoryWithCategory[]>;
}

