import ICustomization from "../../interfaces/customization/ICustomization";
import  CreateCustomizationRequestDto  from "../../dto/customization/CreateCustomizationRequest.dto";
import  CustomizationResponseDto  from "../../dto/customization/CustomizationResponse.dto";


// Convert CreateCustomizationRequest DTO to Model
export const toCustomization = (data: CreateCustomizationRequestDto): Partial<ICustomization> => {

    const customization: Partial<ICustomization> = {}

    // Only include fields that are present in the input
    if (data.name !== undefined) {
        customization.name = data.name;
    }

   

    if (data.options !== undefined) {
        customization.options = data.options;
    }
    
    return customization
};


// Convert Model to CustomizationResponse DTO
export const toCustomizationResponse = (customization: ICustomization): CustomizationResponseDto => {
    return {
        id: customization._id.toString(),
        name: customization.name,
        options: customization.options,
        createdAt: customization.createdAt,
        updatedAt: customization.updatedAt
    };
};
