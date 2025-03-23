interface UpdateMenuItemRequestDto {
    name?: string;
    price?: number | { [size: string]: number };
    ingredients: string[];
    description?: string;
    subcategoryId?: string;
    categoryId?: string;
    available: boolean;
    combo: boolean;
    comboDetails?: {
        includedItems: string[];
        drinkOptions: string[];
        upgradeOptions: string[];
        comboPrice: number;
    };
}
export default UpdateMenuItemRequestDto