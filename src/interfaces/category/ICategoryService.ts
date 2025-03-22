
import { CategoryResponseDto } from "../../dto/category/CategoryResponse.dto";
import CreateCategoryRequest from "../../dto/requests/category/CreateCategoryRequest.dto";
import UpdateCategoryRequest from "../../dto/requests/category/UpdateCategoryRequest.dto";


export interface ICategoryService {
    createCategory(createCategoryDto: CreateCategoryRequest): Promise<CategoryResponseDto>;
    getCategories(): Promise<CategoryResponseDto[]>;
    getCategoryById(categoryId: string): Promise<CategoryResponseDto | null>;
    updateCategory(categoryId: string, updateCategoryDto: UpdateCategoryRequest): Promise<CategoryResponseDto | null>;
    deleteCategory(categoryId: string): Promise<boolean>;
    findByName(name: string): Promise<CategoryResponseDto | null>;
}
