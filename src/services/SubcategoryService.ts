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
import { Types } from "mongoose";

class SubcategoryService implements ISubcategoryService {

    private subcategoryRepository: ISubcategoryRepository
    private categoryRepository: ICategoryRepository

    constructor(subcategoryRepository: ISubcategoryRepository, categoryRepository: ICategoryRepository) {
        this.subcategoryRepository = subcategoryRepository
        this.categoryRepository = categoryRepository
    }

    /**
     * Checks if a subcategory with the given name already exists
     * @param name - Name of the subcategory to check
     * @returns Promise resolving to the existing subcategory or null
     */
    private async checkSubCategoryExistsByName(name: string): Promise<ISubcategory | null> {
        return await this.subcategoryRepository.findByName(name)
    }

    /**
     * Creates a new subcategory after validating the input data and checking for duplicates
     * @param data - DTO containing subcategory creation data
     * @returns Promise resolving to the created subcategory response
     * @throws ConflictError if subcategory with same name exists
     * @throws NotFoundError if parent category doesn't exist
     */
    async createSubcategory(data: CreateSubcategoryRequestDto): Promise<SubcategoryResponseDto> {
        console.log("SubCategoryService: createSubcategory called");

        // Validate input data structure
        validateSubCategoryData(data)

        // Check for existing subcategory with same name
        const subCategoryExists: ISubcategory | null = await this.checkSubCategoryExistsByName(data.name)
        if (subCategoryExists) {
            throw new ConflictError("Sub-Category already exists")
        }

        // Validate and check parent category exists
        validateObjectId(data.categoryId)
        const categoryExists: ICategory | null = await this.categoryRepository.findById(data.categoryId)
        if (!categoryExists) {
            throw new NotFoundError("Category does not exists")
        }

        // Convert DTO to repository model and create
        const subcategoryData: Partial<ISubcategory> = toSubcategory(data)
        const subCategory: ISubcategory = await this.subcategoryRepository.create(subcategoryData)

        return toSubcategoryResponse(subCategory)
    }

    /**
     * Retrieves all subcategories with their associated category data
     * @returns Promise resolving to array of subcategory responses
     */
    async getSubcategories(): Promise<SubcategoryResponseDto[]> {
        console.log("SubCategoryService: getSubcategories called");
        const subcategories: ISubcategoryWithCategory[] = await this.subcategoryRepository.findAll()
        console.log("SubCategoryService: getSubcategories Data", subcategories);
        return subcategories.map(toSubcategoryWithCategoryResponse)
    }

    /**
     * Retrieves a specific subcategory by ID
     * @param subcategoryId - ID of the subcategory to retrieve
     * @returns Promise resolving to the subcategory response
     * @throws NotFoundError if subcategory doesn't exist
     */
    async getSubcategoryById(subcategoryId: string): Promise<SubcategoryResponseDto | null> {
        console.log("SubCategoryService: getSubcategoryById called");
        validateObjectId(subcategoryId)
        const subcategory: ISubcategoryWithCategory | null = await this.subcategoryRepository.findById(subcategoryId)
        if (!subcategory) {
            throw new NotFoundError("Subcategory Not Found")
        }
        return toSubcategoryWithCategoryResponse(subcategory)
    }

    /**
     * Updates an existing subcategory with partial data
     * @param subcategoryId - ID of the subcategory to update
     * @param data - Partial DTO containing fields to update
     * @returns Promise resolving to the updated subcategory response
     * @throws NotFoundError if subcategory doesn't exist
     * @throws ConflictError if name change conflicts with existing subcategory
     */
    async updateSubcategory(subcategoryId: string, data: Partial<UpdateSubcategoryRequestDto>): Promise<SubcategoryResponseDto> {
        console.log("SubCategoryService: updateSubcategory called");

        // Validate ID format
        validateObjectId(subcategoryId)

        // Retrieve current subcategory data
        const currentData: ISubcategoryWithCategory | null = await this.subcategoryRepository.findById(subcategoryId)
        if (!currentData) {
            throw new NotFoundError("Subcategory Not Found.")
        }

        let hasChanges = false

        // Handle name update with uniqueness check
        if (data.name && data.name !== currentData.name) {
            const subcategoryExists: ISubcategory | null = await this.checkSubCategoryExistsByName(data.name)
            if (subcategoryExists && subcategoryExists._id?.toString() !== subcategoryId) {
                throw new ConflictError("Subcategory with the same name already exists")
            }
            currentData.name = data.name
            hasChanges = true
        }

        // Handle description update
        if (data.description !== undefined && data.description !== currentData.description) {
            currentData.description = data.description
            hasChanges = true
        }

        // Handle category ID update with proper ObjectId conversion
        if (data.categoryId !== undefined &&
            data.categoryId.toString() !== currentData.categoryId.toString()) {
            currentData.categoryId = new Types.ObjectId(data.categoryId)
            hasChanges = true
        }

        // Handle status update
        if (data.status !== undefined && data.status !== currentData.status) {
            currentData.status = data.status
            hasChanges = true
        }

        // Skip update if no changes detected
        if (!hasChanges) {
            console.log("SubcategoryService: No Changes detected, skipping update")
            return toSubcategoryResponse(currentData)
        }

        // Persist changes to repository
        const subcategoryUpdateData: ISubcategory | null = await this.subcategoryRepository.update(subcategoryId, currentData)
        if (!subcategoryUpdateData) {
            throw new NotFoundError("Subcategory not found")
        }

        return toSubcategoryResponse(subcategoryUpdateData)
    }

    /**
     * Deletes a subcategory by ID
     * @param subcategoryId - ID of the subcategory to delete
     * @returns Promise resolving to boolean indicating success
     */
    async deleteSubcategory(subcategoryId: string): Promise<boolean> {
        console.log("SubCategoryService: deleteSubcategory called");
        return await this.subcategoryRepository.delete(subcategoryId)
    }
}

export default SubcategoryService