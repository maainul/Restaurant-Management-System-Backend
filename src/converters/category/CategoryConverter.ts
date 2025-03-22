import ICategory from "../../interfaces/category/ICategory";
import { CreateCategoryRequestDto } from "../../dto/category/CreateCategoryRequest.dto";
import { CategoryResponseDto } from "../../dto/category/CategoryResponse.dto";


// Convert CreateCategoryRequest DTO to Model
export const toCategory = (data: CreateCategoryRequestDto): Partial<ICategory> => {
    return {
        name: data.name,
        description: data.description,
        status:data.status
    };
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
