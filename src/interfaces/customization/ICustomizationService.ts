
import CustomizationResponseDto from "../../dto/customization/CustomizationResponse.dto";
import CreateCustomizationRequestDto from "../../dto/customization/CreateCustomizationRequest.dto";
import UpdateCustomizationRequestDto from "../../dto/customization/UpdateCustomizationRequest.dto";


export interface ICustomizationService {
    createCustomization(createCustomizationDto: CreateCustomizationRequestDto): Promise<CustomizationResponseDto>;
    getCustomizations(): Promise<CustomizationResponseDto[]>;
    getCustomizationById(categoryId: string): Promise<CustomizationResponseDto | null>;
    updateCustomization(categoryId: string, updateCustomizationDto: UpdateCustomizationRequestDto): Promise<CustomizationResponseDto>;
    deleteCustomization(categoryId: string): Promise<boolean>;
    findByName(name: string): Promise<CustomizationResponseDto | null>;
}
