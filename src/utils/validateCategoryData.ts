
import { CreateCategoryRequestDto } from "../dto/category/CreateCategoryRequest.dto";
import { UpdateCategoryRequestDto } from "../dto/category/UpdateCategoryRequest.dto";
import { ValidationError } from "../errors/errors";

const validateCategoryData = (categoryDTO: CreateCategoryRequestDto | UpdateCategoryRequestDto): void => {
    const errors: { field: string; message: string }[] = [];


    if (!categoryDTO.name || categoryDTO.name.trim() === "") {
        errors.push({ field: "categoryName", message: "Category name is required" });
    } else if (typeof categoryDTO.name !== "string") {
        errors.push({ field: "name", message: "Category Name must be at least 10 characters" });
    } else if (categoryDTO.name.length < 2) {
        errors.push({ field: "name", message: "Category Name must be at least 3 characters" });
    }


    if (errors.length > 0) {
        throw new ValidationError(errors, 400);
    }
};

export default validateCategoryData