import { Types } from "mongoose";
import CreateMenuItemRequestDto from "../../dto/menu/CreateMenuItemRequest.dto";
import MenuItemResponseDto from "../../dto/menu/MenuItemResponse.dto";
import IMenuItem from "../../interfaces/menu/IMenuItem";
import IVariant from "../../interfaces/variant/IVariant";
import ICustomization from "../../interfaces/customization/ICustomization";

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
        variants: data.variants.map(id => new Types.ObjectId(id)),
        customizations: data.customizations.map(id => new Types.ObjectId(id)),
        combo: data.combo,
        imageURL: data.imageURL,
        ...(data.combo && data.comboDetails) ? { comboDetails: data.comboDetails } : {}
    };
};


// Convert Model to MenuItemResponse DTO
export const toMenuItemResponse = (menuItem: IMenuItem): MenuItemResponseDto => {


    const mapVariant = (item: Types.ObjectId | IVariant) => {
        if (item instanceof Types.ObjectId) {
            return { id: item.toString() }
        }
        return {
            id: item._id?.toString() || "",
            name: item.name,
            options: item.options
        }
    }

    const mapCustomization = (item: Types.ObjectId | ICustomization) => {
        if (item instanceof Types.ObjectId) {
            return { id: item.toString() }
        }
        return {
            id: item._id?.toString() || "",
            name: item.name,
            options: item.options
        }
    }

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
        variants: menuItem.variants.map(mapVariant),
        customizations: menuItem.customizations?.map(mapCustomization),
        createdAt: menuItem.createdAt,
        updatedAt: menuItem.updatedAt,
    };
};
