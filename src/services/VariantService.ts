
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import IVariant from "../interfaces/variant/IVariant";
import IVariantRepository from "../interfaces/variant/IVariantRepository";

import validateObjectId from "../utils/isValidObjectId";

import { ValidationError } from '../errors/errors';
import IVariantService  from "../interfaces/variant/IVariantService";

import { toVariant, toVariantResponse } from "../converters/variant/VariantConverter";
import VariantResponseDto from "../dto/variation/VariantResponse.dto";
import CreateVariantRequestDto from "../dto/variation/CreateVariantRequest.dto";
import UpdateVariantRequestDto from "../dto/variation/UpdateVariantRequest.dto";
import validateVariantData from "../utils/validateVariantData";

class VariantService implements IVariantService {

    private variantRepository: IVariantRepository

    constructor(variantRepository: IVariantRepository) {
        this.variantRepository = variantRepository
    }

    /**
     * Checks if a variant with the given name already exists
     * @param name - Name of the variant to check
     * @returns Promise resolving to the existing variant or null
     */
    private async checkVariantExistsByName(name: string): Promise<IVariant | null> {
        return await this.variantRepository.findByName(name)
    }

    /**
     * Retrieves all variants from the repository
     * @returns Promise resolving to array of variant responses
     * @throws NotFoundError if no variants exist
     */
    async getVariants(): Promise<VariantResponseDto[]> {
        console.log("VariantService: getAllVariants called");
        
        const variants: IVariant[] = await this.variantRepository.findAll()
        
        if (variants.length === 0) {
            throw new NotFoundError("No variants found");
        }

        console.log("VariantService: getAllVariants data : ", variants);

        return variants.map(toVariantResponse)
    }

    /**
     * Creates a new variant after validating input and checking for duplicates
     * @param data - DTO containing variant creation data
     * @returns Promise resolving to the created variant response
     * @throws ConflictError if variant with same name exists
     */
    async createVariant(data: CreateVariantRequestDto): Promise<VariantResponseDto> {
        console.log("VariantService: createVariant called");

        // Validate input data structure
        validateVariantData(data)

        // Check for existing variant with same name
        const variantExists: IVariant | null = await this.checkVariantExistsByName(data.name)
        if (variantExists) {
            throw new ConflictError("Variant already Exists")
        }

        // Convert DTO to repository model and create
        const variantData: Partial<IVariant> = toVariant(data)
        const variant: IVariant = await this.variantRepository.create(variantData)

        return toVariantResponse(variant)
    }

    /**
     * Retrieves a specific variant by ID
     * @param id - ID of the variant to retrieve
     * @returns Promise resolving to the variant response
     * @throws ValidationError if variant doesn't exist
     */
    async getVariantById(id: string): Promise<VariantResponseDto | null> {
        console.log("VariantService: getVariantById called");
        validateObjectId(id)
        const variant: IVariant | null = await this.variantRepository.findById(id)
        if (!variant) {
            throw new ValidationError([{ field: "id", message: "Variant not found" }], 404)
        }
        return toVariantResponse(variant)
    }

    /**
     * Updates an existing variant with partial data
     * @param id - ID of the variant to update
     * @param data - Partial DTO containing fields to update
     * @returns Promise resolving to the updated variant response
     * @throws NotFoundError if variant doesn't exist
     * @throws ConflictError if name change conflicts with existing variant
     */
    async updateVariant(id: string, data: Partial<UpdateVariantRequestDto>): Promise<VariantResponseDto> {
        console.log("VariantService: updateVariant called");

        // Validate ID format
        validateObjectId(id)

        // Retrieve current variant data
        const currentData = await this.variantRepository.findById(id)
        if (!currentData) {
            throw new NotFoundError("Variant Not Found")
        }

        let hasChanges = false

        // Handle name update with uniqueness check
        if (data.name && data.name !== currentData.name) {
            const variantExists: IVariant | null = await this.checkVariantExistsByName(data.name)
            if (variantExists && variantExists._id?.toString() !== id) {
                throw new ConflictError("Variant with the same name already exists")
            }
            currentData.name = data.name
            hasChanges = true
        }

        // Handle options update
        if (data.options !== undefined && data.options !== currentData.options) {
            currentData.options = data.options
            hasChanges = true
        }

        // Skip update if no changes detected
        if (!hasChanges) {
            console.log("VariantService: No Changes detected, skipping update")
            return toVariantResponse(currentData)
        }

        // Persist changes to repository
        const variant: IVariant | null = await this.variantRepository.update(id, currentData)
        if (!variant) {
            throw new NotFoundError("Variant Not Found")
        }

        return toVariantResponse(variant)
    }

    /**
     * Finds a variant by its name
     * @param name - Name of the variant to find
     * @returns Promise resolving to the variant response
     * @throws ValidationError if variant doesn't exist
     */
    async findByName(name: string): Promise<VariantResponseDto | null> {
        console.log("VariantService: findByName called");
        const variant: IVariant | null = await this.variantRepository.findByName(name)
        if (!variant) {
            throw new ValidationError([{ field: "id", message: "Variant Not Found" }], 404)
        }
        return toVariantResponse(variant)
    }

    /**
     * Deletes a variant by ID
     * @param variantId - ID of the variant to delete
     * @returns Promise resolving to boolean indicating success
     */
    async deleteVariant(variantId: string): Promise<boolean> {
        console.log("VariantService: deleteVariant called");
        return await this.variantRepository.delete(variantId)
    }
}

export default VariantService