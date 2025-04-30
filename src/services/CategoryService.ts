import { Request } from "express";

import { toCategory, toCategoryResponse } from "../converters/category/CategoryConverter";

import { CategoryResponseDto } from "../dto/category/CategoryResponse.dto";
import { CreateCategoryRequestDto } from "../dto/category/CreateCategoryRequest.dto";
import { UpdateCategoryRequestDto } from "../dto/category/UpdateCategoryRequest.dto";

import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import { ValidationError } from './../errors/errors';

import ICategory from "../interfaces/category/ICategory";

import { ICategoryRepository } from "../interfaces/category/ICategoryRepository";
import { ICategoryService } from "../interfaces/category/ICategoryService";

import validateObjectId from "../utils/isValidObjectId";
import validateCategoryData from "../utils/validateCategoryData";
import { CategoryListResponse } from "../dto/category/CategoryListResponse .dto";
import { paginateAndSearch } from "../utils/paginateAndSearch";


class CategoryService implements ICategoryService {

    private categoryRepository: ICategoryRepository

    constructor(categoryRepository: ICategoryRepository) {
        this.categoryRepository = categoryRepository
    }

    /**
     * Checks if a category with the given name already exists
     * @param name - Name of the category to check
     * @returns Promise resolving to the existing category or null
     */
    private async checkCategoryExistsByName(name: string): Promise<ICategory | null> {
        return await this.categoryRepository.findByName(name)
    }

    /**
     * Retrieves all categories from the repository
     * @returns Promise resolving to array of category responses
     * @throws NotFoundError if no categories exist
     */
    async getCategories(req: Request): Promise<CategoryListResponse> {
        console.log("CategoryService: getAllCategories called");

        // Call the paginateAndSearch function
        const data: CategoryListResponse = await paginateAndSearch<ICategory>({
            repository: this.categoryRepository,
            query: req.query,
            searchableFields: ["name", "description"],
            toResponseDto: toCategoryResponse,
        });
        return data
    }


    /**
     * Creates a new category after validating input and checking for duplicates
     * @param data - DTO containing category creation data
     * @returns Promise resolving to the created category response
     * @throws ConflictError if category with same name exists
     */
    async createCategory(data: CreateCategoryRequestDto): Promise<CategoryResponseDto> {
        console.log("CategoryService: createCategory called");

        // Validate input data structure
        validateCategoryData(data)

        // Check for existing category with same name
        const categoryExists: ICategory | null = await this.checkCategoryExistsByName(data.name)
        if (categoryExists) {
            throw new ConflictError("Category already Exists")
        }

        // Convert DTO to repository model and create
        const categoryData: Partial<ICategory> = toCategory(data)
        const category: ICategory = await this.categoryRepository.create(categoryData)

        return toCategoryResponse(category)
    }

    /**
     * Retrieves a specific category by ID
     * @param id - ID of the category to retrieve
     * @returns Promise resolving to the category response
     * @throws ValidationError if category doesn't exist
     */
    async getCategoryById(id: string): Promise<CategoryResponseDto | null> {
        console.log("CategoryService: getCategoryById called");
        validateObjectId(id)
        const category: ICategory | null = await this.categoryRepository.findById(id)
        if (!category) {
            throw new ValidationError([{ field: "id", message: "Category not found" }], 404)
        }
        return toCategoryResponse(category)
    }

    /**
     * Updates an existing category with partial data
     * @param id - ID of the category to update
     * @param data - Partial DTO containing fields to update
     * @returns Promise resolving to the updated category response
     * @throws NotFoundError if category doesn't exist
     * @throws ConflictError if name change conflicts with existing category
     */
    async updateCategory(id: string, data: Partial<UpdateCategoryRequestDto>): Promise<CategoryResponseDto> {
        console.log("CategoryService: updateCategory called");

        // Validate ID format
        validateObjectId(id)

        // Retrieve current category data
        const currentData = await this.categoryRepository.findById(id)
        if (!currentData) {
            throw new NotFoundError("Category Not Found")
        }

        let hasChanges = false

        // Handle name update with uniqueness check
        if (data.name && data.name !== currentData.name) {
            const categoryExists: ICategory | null = await this.checkCategoryExistsByName(data.name)
            if (categoryExists && categoryExists._id?.toString() !== id) {
                throw new ConflictError("Category with the same name already exists")
            }
            currentData.name = data.name
            hasChanges = true
        }

        // Handle description update
        if (data.description !== undefined && data.description !== currentData.description) {
            currentData.description = data.description
            hasChanges = true
        }

        // Handle status update with deep comparison
        if (data.status !== undefined && JSON.stringify(data.status) !== JSON.stringify(currentData.status)) {
            currentData.status = data.status
            hasChanges = true
        }

        // Skip update if no changes detected
        if (!hasChanges) {
            console.log("CategoryService: No Changes detected, skipping update")
            return toCategoryResponse(currentData)
        }

        // Persist changes to repository
        const category: ICategory | null = await this.categoryRepository.update(id, currentData)
        if (!category) {
            throw new NotFoundError("Category Not Found")
        }

        return toCategoryResponse(category)
    }

    /**
     * Finds a category by its name
     * @param name - Name of the category to find
     * @returns Promise resolving to the category response
     * @throws ValidationError if category doesn't exist
     */
    async findByName(name: string): Promise<CategoryResponseDto | null> {
        console.log("CategoryService: findByName called");
        const category: ICategory | null = await this.categoryRepository.findByName(name)
        if (!category) {
            throw new ValidationError([{ field: "id", message: "Category Not Found" }], 404)
        }
        return toCategoryResponse(category)
    }

    /**
     * Deletes a category by ID
     * @param categoryId - ID of the category to delete
     * @returns Promise resolving to boolean indicating success
     */
    async deleteCategory(categoryId: string): Promise<boolean> {
        console.log("CategoryService: deleteCategory called");
        return await this.categoryRepository.delete(categoryId)
    }
}

export default CategoryService