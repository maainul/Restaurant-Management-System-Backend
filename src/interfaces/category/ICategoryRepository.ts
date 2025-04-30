import ICategory from "./ICategory";

export interface ICategoryRepository {
    create(category: Partial<ICategory>): Promise<ICategory>;
    findById(id: string): Promise<ICategory | null>;
    findByName(name: string): Promise<ICategory | null>;
    findAll(filter:any,options:{sort?:any,skip:number,limit?:number}): Promise<ICategory[]>;
    update(id: string, category: Partial<ICategory>): Promise<ICategory | null>;
    delete(id: string): Promise<boolean>;
    countDocuments(filter: any): Promise<number>;
}
