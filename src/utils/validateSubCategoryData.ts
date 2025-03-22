
import CreateSubcategoryRequestDto from "../dto/subcategory/CreateSubcategoryRequest.dto";
import UpdateSubcategoryRequestDto from "../dto/subcategory/UpdateSubcategoryRequest.dto";
import { ValidationError } from "../errors/errors";

const validateSubCategoryData = (subcategoryDTO: CreateSubcategoryRequestDto | UpdateSubcategoryRequestDto): void => {
    const errors: { field: string; message: string }[] = [];

    // Validate the title field
    if (!subcategoryDTO.name || subcategoryDTO.name.trim() === "") {
        errors.push({ field: "subCategoryName", message: "Name is required" });
    } else if (typeof subcategoryDTO.name !== "string") {
        errors.push({ field: "name", message: "Name must be a string" });
    } else if (subcategoryDTO.name.length < 2) {
        errors.push({ field: "name", message: "Name must be at least 3 characters long" });
    }

    if (!subcategoryDTO.categoryId) {
        errors.push({ field: "categoryId", message: "Category is Required" })
    } else if (typeof subcategoryDTO.categoryId !== "string") {
        errors.push({ field: "categoryId", message: "Category Must be string Required" })

        if (errors.length > 0) {
            throw new ValidationError(errors, 400);
        }
    };
}

export default validateSubCategoryData