import { toCategory, toCategoryResponse } from "../converters/category/CategoryConverter";
import { CategoryResponseDto } from "../dto/category/CategoryResponse.dto";
import { CreateCategoryRequestDto } from "../dto/category/CreateCategoryRequest.dto";
import { UpdateCategoryRequestDto } from "../dto/category/UpdateCategoryRequest.dto";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import ICategory from "../interfaces/category/ICategory";
import { ICategoryRepository } from "../interfaces/category/ICategoryRepository";
import { ICategoryService } from "../interfaces/category/ICategoryService";
import validateObjectId from "../utils/isValidObjectId";
import validateCategoryData from "../utils/validateCategoryData";
import { ValidationError } from './../errors/errors';



class CategoryService implements ICategoryService {

    private categoryRepository: ICategoryRepository

    constructor(categoryRepository: ICategoryRepository) {
        this.categoryRepository = categoryRepository
    }

    private async checkCategoryExistsByName(name: string): Promise<ICategory | null> {
        return await this.categoryRepository.findByName(name)
    }

    async getCategories(): Promise<CategoryResponseDto[]> {
        console.log("CategoryService: getAllCategories called");
        const categories: ICategory[] = await this.categoryRepository.findAll()
        if (categories.length === 0) {
            throw new NotFoundError("No categories found");
        }
        console.log("CategoryService: getAllCategories data : ", categories);

        return categories.map(toCategoryResponse)
    }

    async createCategory(data: CreateCategoryRequestDto): Promise<CategoryResponseDto> {
        console.log("CategoryService: createCategory called");
        validateCategoryData(data)
        const categoryExists: ICategory | null = await this.checkCategoryExistsByName(data.name)
        if (categoryExists) {
            throw new ConflictError("Category already Exists")
        }

        const categoryData: Partial<ICategory> = toCategory(data)
        const category: ICategory = await this.categoryRepository.create(categoryData)
        return toCategoryResponse(category)
    }

    async getCategoryById(id: string): Promise<CategoryResponseDto | null> {
        console.log("CategoryService: getCategoryById called");
        validateObjectId(id)
        const category: ICategory | null = await this.categoryRepository.findById(id)
        if (!category) {
            throw new ValidationError([{ field: "id", message: "Category not found" }], 404)
        }
        return toCategoryResponse(category)
    }

    async updateCategory(id: string, data: Partial<UpdateCategoryRequestDto>): Promise<CategoryResponseDto> {
        console.log("CategoryService: updateCategory called");

        // validate the ID
        validateObjectId(id)

        // Retrieve the current category item from the database
        const currentData = await this.categoryRepository.findById(id)

        // if the current doesn't exists then throw a NotFoundError
        if (!currentData) {
            throw new NotFoundError("Category Not Found")
        }

        let hasChanges = false

        // Check if the name has changed and if it's unique
        if (data.name && data.name !== currentData.name) {
            const categoryExists: ICategory | null = await this.checkCategoryExistsByName(data.name)
            if (categoryExists && categoryExists._id?.toString() !== id) {
                throw new ConflictError("Catgory with the same name already exists")
            }
            currentData.name = data.name
            hasChanges = true
        }

        if (data.description !== currentData.description) {
            currentData.description = data.description
            hasChanges = true
        }

        if (data.status !== undefined && JSON.stringify(data.status) !== JSON.stringify(currentData.status)) {
            currentData.status = data.status
            hasChanges = true
        }

        // If no changes are detected, return the current category item without updating
        if (!hasChanges) {
            console.log("CategoryService: No Changes detected,skipping update")
            return toCategoryResponse(currentData)
        }

        // If changes were made, proceed with updating the category item
        const category: ICategory | null = await this.categoryRepository.update(id, currentData)
        if (!category) {
            throw new NotFoundError("Category Not Found")
        }

        // Return the updated category
        return toCategoryResponse(category)
    }

    async findByName(name: string): Promise<CategoryResponseDto | null> {
        console.log("CategoryService: findByName called");
        const category: ICategory | null = await this.categoryRepository.findByName(name)
        if (!category) {
            throw new ValidationError([{ field: "id", message: "Category Not Found" }], 404)
        }
        return toCategoryResponse(category)
    }

    async deleteCategory(categoryId: string): Promise<boolean> {
        console.log("CategoryService: deleteCategory called");
        return await this.categoryRepository.delete(categoryId)
    }

}

export default CategoryService