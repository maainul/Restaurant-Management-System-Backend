import { Types } from "mongoose";
import CreateMenuItemRequestDto from "../../dto/menu/CreateMenuItemRequest.dto";
import MenuItemResponseDto from "../../dto/menu/MenuItemResponse.dto";
import UpdateMenuItemRequestDto from "../../dto/menu/UpdateMenuItemRequest.dto";
import IMenuItem from "../../interfaces/menu/IMenuItem";

// Convert CreateMenuItemRequest DTO to Model
export const toMenuItem = (data: CreateMenuItemRequestDto): Partial<IMenuItem> => {
    return {
        categoryId: new Types.ObjectId(data.categoryId),
        subcategoryId: data.subcategoryId ? new Types.ObjectId(data.subcategoryId) : undefined,
        name: data.name,
        description: data.description,
        price: data.price,
        ingredients: data.ingredients,
        available: data.available,
        combo: data.combo,
        ...(data.combo && data.comboDetails) ? { comboDetails: data.comboDetails } : {}
    };
};

// Convert UpdateMenuItemRequest DTO to Model
export const toUpdatedMenuItem = (data: UpdateMenuItemRequestDto): Partial<IMenuItem> => {
    return {
        categoryId: new Types.ObjectId(data.categoryId),
        subcategoryId: new Types.ObjectId(data.subcategoryId),
        name: data.name,
        description: data.description,
        ingredients: data.ingredients,
        combo: data.combo,
        price: data.price,
        available: data.available,
        ...(data.combo && data.comboDetails) ? { comboDetails: data.comboDetails } : {}
    };
};

// Convert Model to MenuItemResponse DTO
export const toMenuItemResponse = (menuItem: IMenuItem): MenuItemResponseDto => {
    return {
        id: menuItem._id?.toString() || "",
        categoryId: menuItem.categoryId.toString(),
        subcategoryId: menuItem.subcategoryId?.toString() || "",
        name: menuItem.name,
        description: menuItem.description,
        ingredients: menuItem.ingredients,
        price: menuItem.price,
        available: menuItem.available,
        combo: menuItem.combo,
        comboDetails: menuItem.combo ? menuItem.comboDetails : undefined,
        createdAt: menuItem.createdAt,
        updatedAt: menuItem.updatedAt
    };
};
