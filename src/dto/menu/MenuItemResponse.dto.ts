interface MenuItemResponseDto {
    id: string;
    name: string;
    price: number | { [size: string]: number };
    ingredients: string[];
    description?: string;
    categoryId?: string;
    subcategoryId: string;
    available: boolean;
    combo: boolean;
    comboDetails?: {
        includedItems: string[];
        drinkOptions: string[];
        upgradeOptions: string[];
        comboPrice: number;
    };
    createdAt: Date;
    updatedAt: Date;
}

export default MenuItemResponseDto