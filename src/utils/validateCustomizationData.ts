
import CreateCustomizationRequestDto from "../dto/customization/CreateCustomizationRequest.dto";
import UpdateCustomizationRequestDto from "../dto/customization/UpdateCustomizationRequest.dto";
import { ValidationError } from "../errors/errors";

const validateCustomizationData = (customizationDTO: CreateCustomizationRequestDto | UpdateCustomizationRequestDto): void => {
    const errors: { field: string; message: string }[] = [];


    if (!customizationDTO.name || customizationDTO.name.trim() === "") {
        errors.push({ field: "name", message: "Customization name is required" });
    } else if (!customizationDTO.options) {
        errors.push({ field: "options", message: "Customization Options is required" });
    }

    if (errors.length > 0) {
        throw new ValidationError(errors, 400);
    }
};

export default validateCustomizationData