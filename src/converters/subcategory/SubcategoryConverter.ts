import { Types } from "mongoose";
import ISubcategory from "../../interfaces/subcategory/ISubcategory";
import SubcategoryResponseDto from "../../dto/subcategory/SubcategoryResponse.dto";
import CreateSubcategoryRequestDto from "../../dto/subcategory/CreateSubcategoryRequest.dto";
import ISubcategoryWithCategory from "../../interfaces/subcategory/ISubcategoryWithCategory";


// Convert CreateCategoryRequest DTO to Model
export const toSubcategory = (data: CreateSubcategoryRequestDto): Partial<ISubcategory> => {
    const subcategoryData: Partial<ISubcategory> = {}

    if (data.name !== undefined) {
        subcategoryData.name = data.name
    }
    if (data.categoryId !== undefined) {
        subcategoryData.categoryId = new Types.ObjectId(data.categoryId)
    }
    if (data.description !== undefined) {
        subcategoryData.description = data.description
    }
    if (data.status !== undefined) {
        subcategoryData.status = data.status
    }

    return subcategoryData
};

// Convert Model to CategoryResponse DTO
export const toSubcategoryResponse = (data: ISubcategory): SubcategoryResponseDto => {
    return {
        id: data._id.toString(),
        name: data.name,
        description: data.description,
        categoryId: data.categoryId.toString(),
        categoryName: "Unknown",
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    };
};


export const toSubcategoryWithCategoryResponse = (data: ISubcategoryWithCategory): SubcategoryResponseDto => {
    return {
        id: data._id.toString(),
        name: data.name,
        description: data.description,
        categoryId: data.categoryId.toString(),
        categoryName: data.categoryName, // Directly from lookup
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt
    };
};
