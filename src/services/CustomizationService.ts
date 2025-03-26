
import CustomizationResponseDto from "../dto/customization/CustomizationResponse.dto";
import CreateCustomizationRequestDto from "../dto/customization/CreateCustomizationRequest.dto";
import UpdateCustomizationRequestDto from "../dto/customization/UpdateCustomizationRequest.dto";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import ICustomization from "../interfaces/customization/ICustomization";
import ICustomizationRepository from "../interfaces/customization/ICustomizationRepository";

import validateObjectId from "../utils/isValidObjectId";

import { ValidationError } from '../errors/errors';
import { ICustomizationService } from "../interfaces/customization/ICustomizationService";

import validateCustomizationData from "../utils/validateCustomizationData";
import { toCustomization, toCustomizationResponse } from "../converters/customization/CustomizationConverter";

class CustomizationService implements ICustomizationService {

    private customizationRepository: ICustomizationRepository

    constructor(customizationRepository: ICustomizationRepository) {
        this.customizationRepository = customizationRepository
    }

    /**
     * Checks if a customization with the given name already exists
     * @param name - Name of the customization to check
     * @returns Promise resolving to the existing customization or null
     */
    private async checkCustomizationExistsByName(name: string): Promise<ICustomization | null> {
        return await this.customizationRepository.findByName(name)
    }

    /**
     * Retrieves all customizations from the repository
     * @returns Promise resolving to array of customization responses
     * @throws NotFoundError if no customizations exist
     */
    async getCustomizations(): Promise<CustomizationResponseDto[]> {
        console.log("CustomizationService: getAllCustomizations called");
        
        const customizations: ICustomization[] = await this.customizationRepository.findAll()
        
        if (customizations.length === 0) {
            throw new NotFoundError("No customizations found");
        }

        console.log("CustomizationService: getAllCustomizations data : ", customizations);

        return customizations.map(toCustomizationResponse)
    }

    /**
     * Creates a new customization after validating input and checking for duplicates
     * @param data - DTO containing customization creation data
     * @returns Promise resolving to the created customization response
     * @throws ConflictError if customization with same name exists
     */
    async createCustomization(data: CreateCustomizationRequestDto): Promise<CustomizationResponseDto> {
        console.log("CustomizationService: createCustomization called");

        // Validate input data structure
        validateCustomizationData(data)

        // Check for existing customization with same name
        const customizationExists: ICustomization | null = await this.checkCustomizationExistsByName(data.name)
        if (customizationExists) {
            throw new ConflictError("Customization already Exists")
        }

        // Convert DTO to repository model and create
        const customizationData: Partial<ICustomization> = toCustomization(data)
        const customization: ICustomization = await this.customizationRepository.create(customizationData)

        return toCustomizationResponse(customization)
    }

    /**
     * Retrieves a specific customization by ID
     * @param id - ID of the customization to retrieve
     * @returns Promise resolving to the customization response
     * @throws ValidationError if customization doesn't exist
     */
    async getCustomizationById(id: string): Promise<CustomizationResponseDto | null> {
        console.log("CustomizationService: getCustomizationById called");
        validateObjectId(id)
        const customization: ICustomization | null = await this.customizationRepository.findById(id)
        if (!customization) {
            throw new ValidationError([{ field: "id", message: "Customization not found" }], 404)
        }
        return toCustomizationResponse(customization)
    }

    /**
     * Updates an existing customization with partial data
     * @param id - ID of the customization to update
     * @param data - Partial DTO containing fields to update
     * @returns Promise resolving to the updated customization response
     * @throws NotFoundError if customization doesn't exist
     * @throws ConflictError if name change conflicts with existing customization
     */
    async updateCustomization(id: string, data: Partial<UpdateCustomizationRequestDto>): Promise<CustomizationResponseDto> {
        console.log("CustomizationService: updateCustomization called");

        // Validate ID format
        validateObjectId(id)

        // Retrieve current customization data
        const currentData = await this.customizationRepository.findById(id)
        if (!currentData) {
            throw new NotFoundError("Customization Not Found")
        }

        let hasChanges = false

        // Handle name update with uniqueness check
        if (data.name && data.name !== currentData.name) {
            const customizationExists: ICustomization | null = await this.checkCustomizationExistsByName(data.name)
            if (customizationExists && customizationExists._id?.toString() !== id) {
                throw new ConflictError("Customization with the same name already exists")
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
            console.log("CustomizationService: No Changes detected, skipping update")
            return toCustomizationResponse(currentData)
        }

        // Persist changes to repository
        const customization: ICustomization | null = await this.customizationRepository.update(id, currentData)
        if (!customization) {
            throw new NotFoundError("Customization Not Found")
        }

        return toCustomizationResponse(customization)
    }

    /**
     * Finds a customization by its name
     * @param name - Name of the customization to find
     * @returns Promise resolving to the customization response
     * @throws ValidationError if customization doesn't exist
     */
    async findByName(name: string): Promise<CustomizationResponseDto | null> {
        console.log("CustomizationService: findByName called");
        const customization: ICustomization | null = await this.customizationRepository.findByName(name)
        if (!customization) {
            throw new ValidationError([{ field: "id", message: "Customization Not Found" }], 404)
        }
        return toCustomizationResponse(customization)
    }

    /**
     * Deletes a customization by ID
     * @param customizationId - ID of the customization to delete
     * @returns Promise resolving to boolean indicating success
     */
    async deleteCustomization(customizationId: string): Promise<boolean> {
        console.log("CustomizationService: deleteCustomization called");
        return await this.customizationRepository.delete(customizationId)
    }
}

export default CustomizationService