
import CreateVariantRequestDto from "../dto/variation/CreateVariantRequest.dto";

import { ValidationError } from "../errors/errors";

const validateVariantData = (variantDTO: CreateVariantRequestDto): void => {
    const errors: { field: string; message: string }[] = [];


    if (!variantDTO.name || variantDTO.name.trim() === "") {
        errors.push({ field: "name", message: "Variant name is required" });
    } else if (!variantDTO.options) {
        errors.push({ field: "options", message: "Variant Options is required" });
    }

    if (errors.length > 0) {
        throw new ValidationError(errors, 400);
    }
};

export default validateVariantData