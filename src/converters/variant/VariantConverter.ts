import CreateVariantRequestDto from "../../dto/variation/CreateVariantRequest.dto";
import VariantResponseDto from "../../dto/variation/VariantResponse.dto";
import IVariant from "../../interfaces/variant/IVariant";


// Convert CreateVariantRequest DTO to Model
export const toVariant = (data: CreateVariantRequestDto): Partial<IVariant> => {

    const customization: Partial<IVariant> = {}

    // Only include fields that are present in the input
    if (data.name !== undefined) {
        customization.name = data.name;
    }

   

    if (data.options !== undefined) {
        customization.options = data.options;
    }
    
    return customization
};


// Convert Model to VariantResponse DTO
export const toVariantResponse = (customization: IVariant): VariantResponseDto => {
    return {
        id: customization._id.toString(),
        name: customization.name,
        options: customization.options,
        createdAt: customization.createdAt,
        updatedAt: customization.updatedAt
    };
};
