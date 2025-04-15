import mongoose from "mongoose";
import CreateMenuItemRequestDto from "../dto/order/CreateOrderRequest.dto";
import { ValidationError } from "../errors/errors";

const validateOrderData = (data: CreateMenuItemRequestDto): void => {
    const errors: { field: string; message: string }[] = [];

    if (!data.userId || data.userId.trim() === "") {
        errors.push({ field: "userId", message: "userId is required" });
    }
    else if (!mongoose.Types.ObjectId.isValid(data.userId)) {
        errors.push({ field: "userId", message: "Invalid userid" });
    }

    if (!data.tableId) {
        errors.push({ field: "tableId", message: "Please enter tableId" })
    } else if (!mongoose.Types.ObjectId.isValid(data.tableId)) {
        errors.push({ field: "tableId", message: "tableId is invalid" });
    }
    // check items available or not.If then check all data
    if (!Array.isArray(data.items) || data.items.length === 0) {
        errors.push({ field: "items", message: "At least one menu item is required" });
    } else {
        data.items.forEach((item, index) => {
            if (!item.menuItemId || item.menuItemId.trim() === "") {
                errors.push({ field: `items[${index}].menuItemId`, message: "menuItemId is required" });
            } else if (!mongoose.Types.ObjectId.isValid(item.menuItemId)) {
                errors.push({ field: `items[${index}].menuItemId`, message: "Invalid menuItemId" });
            }

            if (item.quantity <= 0) {
                errors.push({ field: `items[${index}].quantity`, message: "Quantity must be greater than 0" });
            }

            if (item.price < 0) {
                errors.push({ field: `items[${index}].price`, message: "Price cannot be negative" });
            }
        });
    }

    if (errors.length > 0) {
        throw new ValidationError(errors, 400);
    }
};

export default validateOrderData