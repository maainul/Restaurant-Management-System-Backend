import { toSubcategory, toSubcategoryResponse, toSubcategoryWithCategoryResponse } from "../converters/subcategory/SubcategoryConverter";
import CreateSubcategoryRequestDto from "../dto/subcategory/CreateSubcategoryRequest.dto";
import SubcategoryResponseDto from "../dto/subcategory/SubcategoryResponse.dto";
import UpdateSubcategoryRequestDto from "../dto/subcategory/UpdateSubcategoryRequest.dto";
import { ICategoryRepository } from "../interfaces/category/ICategoryRepository";
import ISubcategory from "../interfaces/subcategory/ISubcategory";
import { ISubcategoryRepository } from "../interfaces/subcategory/ISubcategoryRepository";
import { ISubcategoryService } from "../interfaces/subcategory/ISubcategoryService";
import validateSubCategoryData from "../utils/validateSubCategoryData";
import validateObjectId from './../utils/isValidObjectId';
import ISubcategoryWithCategory from "../interfaces/subcategory/ISubcategoryWithCategory";
import ICategory from "../interfaces/category/ICategory";
import ConflictError from './../errors/ConflictError';
import NotFoundError from './../errors/NotFoundError';


class SubcategoryService implements ISubcategoryService {

    private subcategoryRepository: ISubcategoryRepository
    private categoryRepository: ICategoryRepository

    constructor(subcategoryRepository: ISubcategoryRepository, categoryRepository: ICategoryRepository) {
        this.subcategoryRepository = subcategoryRepository
        this.categoryRepository = categoryRepository
    }

    private async checkSubCategoryExistsByName(name: string): Promise<ISubcategory | null> {
        return await this.subcategoryRepository.findByName(name)
    }



    async createSubcategory(data: CreateSubcategoryRequestDto): Promise<SubcategoryResponseDto> {
        console.log("SubCategoryService: createSubcategory called");
        validateSubCategoryData(data)
        const subCategoryExists: ISubcategory | null = await this.checkSubCategoryExistsByName(data.name)
        if (subCategoryExists) {
            throw new ConflictError("Sub-Category already exists")
        }
        validateObjectId(data.categoryId)
        const categoryExists: ICategory | null = await this.categoryRepository.findById(data.categoryId)
        if (!categoryExists) {
            throw new NotFoundError("Category does not exists")
        }

        const subcategoryData: Partial<ISubcategory> = toSubcategory(data)

        const subCategory: ISubcategory = await this.subcategoryRepository.create(subcategoryData)
        return toSubcategoryResponse(subCategory)
    }

    async getSubcategories(): Promise<SubcategoryResponseDto[]> {
        console.log("SubCategoryService: getSubcategories called");
        const subcategories: ISubcategoryWithCategory[] = await this.subcategoryRepository.findAll()
        console.log("SubCategoryService: getSubcategories Data", subcategories);
        return subcategories.map(toSubcategoryWithCategoryResponse)
    }

    async getSubcategoryById(subcategoryId: string): Promise<SubcategoryResponseDto | null> {
        console.log("SubCategoryService: getSubcategoryById called");
        validateObjectId(subcategoryId)
        const subcategory: ISubcategoryWithCategory | null = await this.subcategoryRepository.findById(subcategoryId)
        if (!subcategory) {
            throw new NotFoundError("Subcategory Not Found")
        }
        return toSubcategoryWithCategoryResponse(subcategory)
    }

    async updateSubcategory(subcategoryId: string, data: UpdateSubcategoryRequestDto): Promise<SubcategoryResponseDto | null> {
        console.log("SubCategoryService: updateSubcategory called");
        validateObjectId(subcategoryId)
        validateSubCategoryData(data)
        if (data.name) {
            const subCategoryExists: ISubcategory | null = await this.checkSubCategoryExistsByName(data.name)
            if (subCategoryExists) {
                throw new ConflictError("Sub category already exists")
            }
        }
        const subcategory: ISubcategory | null = await this.subcategoryRepository.update(subcategoryId, toSubcategory(data as UpdateSubcategoryRequestDto))
        if (!subcategory) {
            throw new NotFoundError("Subcategory not found")
        }
        return subcategory ? toSubcategoryResponse(subcategory) : null
    }

    async deleteSubcategory(subcategoryId: string): Promise<boolean> {
        console.log("SubCategoryService: deleteSubcategory called");
        return await this.subcategoryRepository.delete(subcategoryId)
    }

}

export default SubcategoryService