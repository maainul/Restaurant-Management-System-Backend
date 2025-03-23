import CreateMenuItemRequestDto from "../dto/menu/CreateMenuItemRequest.dto";
import UpdateMenuItemRequestDto from "../dto/menu/UpdateMenuItemRequest.dto";

import { ValidationError } from "../errors/errors";

const validateMenuData = (data: CreateMenuItemRequestDto | UpdateMenuItemRequestDto): void => {
    const errors: { field: string; message: string }[] = [];


    if (!data.name || data.name.trim() === "") {
        errors.push({ field: "menuName", message: "Menu name is required" });
    } else if (typeof data.name !== "string") {
        errors.push({ field: "name", message: "Menu Name must be string" });
    } else if (data.name.length < 3) {
        errors.push({ field: "name", message: "Menu Name must be at least 4 characters" });
    }

    // if (!data.price || data.price. === 0) {
    //     errors.push({ field: "price", message: "Please enter price" })
    // } else if (typeof data.price !== "number") {
    //     errors.push({ field: "price", message: "price must be number" });
    // } else if (data.price > 25000) {
    //     errors.push({ field: "price", message: "price must be smaller than 25000" });
    // }

    if (!data.subcategoryId) {
        errors.push({ field: "subcategoryId", message: "Please enter subcategory Id" })
    } else if (typeof data.subcategoryId !== "string") {
        errors.push({ field: "price", message: "price must be string" });
    }

    if (errors.length > 0) {
        throw new ValidationError(errors, 400);
    }
};

export default validateMenuData