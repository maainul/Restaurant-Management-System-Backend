import { Request } from "express";
import  CreateSubcategoryRequestDto  from "../../dto/subcategory/CreateSubcategoryRequest.dto";
import SubcategoryListResponseDto from "../../dto/subcategory/SubcategoryListResponse.dto copy";
import  SubcategoryResponseDto  from "../../dto/subcategory/SubcategoryResponse.dto";
import  UpdateSubcategoryRequestDto  from "../../dto/subcategory/UpdateSubcategoryRequest.dto";

export interface ISubcategoryService {
    createSubcategory(createSubcategoryDto: CreateSubcategoryRequestDto): Promise<SubcategoryResponseDto>;
    getSubcategories(req:Request): Promise<SubcategoryListResponseDto>;
    getSubcategoryById(subcategoryId: string): Promise<SubcategoryResponseDto | null>;
    updateSubcategory(subcategoryId: string, data: UpdateSubcategoryRequestDto): Promise<SubcategoryResponseDto>;
    deleteSubcategory(subcategoryId: string): Promise<boolean>;
}
