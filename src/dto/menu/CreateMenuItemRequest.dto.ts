interface CreateMenuItemRequestDto {
    name: string;
    price: number;
    description?: string;
    subcategoryId: string;
    categoryId: string;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default CreateMenuItemRequestDto
