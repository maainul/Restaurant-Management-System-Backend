interface CreateMenuItemRequestDto {
    name: string;
    price: number | { [size: string]: number };
    description?: string;
    ingredients: string[];
    subcategoryId: string;
    categoryId: string;
    available: boolean;
    combo: boolean;
    // Optional: Only needed when `combo: true`
    comboDetails?: {
        includedItems: string[];
        drinkOptions: string[];
        upgradeOptions: string[];
        comboPrice: number;
    };
    variants: string[];
    customizations: string[];
    createdAt: Date;
    updatedAt: Date;
}

export default CreateMenuItemRequestDto
