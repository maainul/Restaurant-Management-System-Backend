import IMenuItem from "./IMenuItem";

interface IMenuRepository {
    create(menuItem: Partial<IMenuItem>): Promise<IMenuItem>;
    findById(id: string): Promise<IMenuItem | null>;
    findBySubcategory(subcategoryId: string): Promise<IMenuItem[]>;
    findAll(): Promise<IMenuItem[]>;
    update(id: string, menuItem: Partial<IMenuItem>): Promise<IMenuItem | null>;
    delete(id: string): Promise<boolean>;
}

export default IMenuRepository