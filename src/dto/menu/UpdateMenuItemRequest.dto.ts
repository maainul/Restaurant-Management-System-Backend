interface UpdateMenuItemRequestDto {
    name?: string;
    price?: number;
    description?: string;
    subcategoryId?: string;
    categoryId?: string;
    available: boolean;
}
export default UpdateMenuItemRequestDto