interface CreateSubcategoryRequestDto {
    name: string;
    categoryId: string,
    description?: string;
    status: number
}

export default CreateSubcategoryRequestDto