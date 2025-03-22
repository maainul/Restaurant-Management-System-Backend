
import { CategoryResponseDto } from "../../dto/category/CategoryResponse.dto";
import { CreateCategoryRequestDto } from "../../dto/category/CreateCategoryRequest.dto";
import { UpdateCategoryRequestDto } from "../../dto/category/UpdateCategoryRequest.dto";


export interface ICategoryService {
    createCategory(createCategoryDto: CreateCategoryRequestDto): Promise<CategoryResponseDto>;
    getCategories(): Promise<CategoryResponseDto[]>;
    getCategoryById(categoryId: string): Promise<CategoryResponseDto | null>;
    updateCategory(categoryId: string, updateCategoryDto: UpdateCategoryRequestDto): Promise<CategoryResponseDto>;
    deleteCategory(categoryId: string): Promise<boolean>;
    findByName(name: string): Promise<CategoryResponseDto | null>;
}
