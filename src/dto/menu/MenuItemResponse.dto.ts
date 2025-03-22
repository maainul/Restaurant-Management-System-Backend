interface MenuItemResponseDto {
    id: string;
    name: string;
    price: number;
    description?: string;
    categoryId?: string;
    subcategoryId: string;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default MenuItemResponseDto