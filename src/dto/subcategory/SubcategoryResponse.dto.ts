interface SubcategoryResponseDto {
    id: string;
    name: string;
    description?: string;
    categoryId: string;
    categoryName: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

export default SubcategoryResponseDto