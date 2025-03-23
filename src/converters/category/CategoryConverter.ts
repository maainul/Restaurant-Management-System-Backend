import ICategory from "../../interfaces/category/ICategory";
import { CreateCategoryRequestDto } from "../../dto/category/CreateCategoryRequest.dto";
import { CategoryResponseDto } from "../../dto/category/CategoryResponse.dto";


// Convert CreateCategoryRequest DTO to Model
export const toCategory = (data: CreateCategoryRequestDto): Partial<ICategory> => {

    const category: Partial<ICategory> = {}

    // Only include fields that are present in the input
    if (data.name !== undefined) {
        category.name = data.name;
    }

    if (data.description !== undefined) {
        category.description = data.description;
    }

    if (data.status !== undefined) {
        category.status = data.status;
    }
    return category
};


// Convert Model to CategoryResponse DTO
export const toCategoryResponse = (category: ICategory): CategoryResponseDto => {
    return {
        id: category._id.toString(),
        name: category.name,
        description: category.description,
        createdAt: category.createdAt,
        status: category.status,
        updatedAt: category.updatedAt
    };
};
