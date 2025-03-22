import  CreateSubcategoryRequestDto  from "../../dto/subcategory/CreateSubcategoryRequest.dto";
import  SubcategoryResponseDto  from "../../dto/subcategory/SubcategoryResponse.dto";
import  UpdateSubcategoryRequestDto  from "../../dto/subcategory/UpdateSubcategoryRequest.dto";

export interface ISubcategoryService {
    createSubcategory(createSubcategoryDto: CreateSubcategoryRequestDto): Promise<SubcategoryResponseDto>;
    getSubcategories(): Promise<SubcategoryResponseDto[]>;
    getSubcategoryById(subcategoryId: string): Promise<SubcategoryResponseDto | null>;
    updateSubcategory(subcategoryId: string, data: UpdateSubcategoryRequestDto): Promise<SubcategoryResponseDto | null>;
    deleteSubcategory(subcategoryId: string): Promise<boolean>;
}
