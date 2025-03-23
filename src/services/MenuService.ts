
import IMenuItemService from "../interfaces/menu/IMenuItemService";
import CreateMenuItemRequestDto from "../dto/menu/CreateMenuItemRequest.dto";
import MenuItemResponseDto from "../dto/menu/MenuItemResponse.dto";
import UpdateMenuItemRequestDto from "../dto/menu/UpdateMenuItemRequest.dto";
import IMenuRepository from "../interfaces/menu/IMenuRepository";

import IMenuItem from "../interfaces/menu/IMenuItem";
import { toMenuItem, toMenuItemResponse } from "../converters/menu/MenuConverter";
import validateMenuData from "../utils/validateMenuData";
import ConflictError from "../errors/ConflictError";
import NotFoundError from "../errors/NotFoundError";
import validateObjectId from "../utils/isValidObjectId";
import { ValidationError } from "../errors/errors";

class MenuService implements IMenuItemService {

    private menuRepository: IMenuRepository;

    constructor(menuRepository: IMenuRepository) {
        this.menuRepository = menuRepository;
    }

    private async checkMenuExists(name: string): Promise<IMenuItem | null> {
        return await this.menuRepository.findByName(name)
    }


    async createMenuItem(createMenuItemDto: CreateMenuItemRequestDto): Promise<MenuItemResponseDto> {
        console.log("MenuService: createMenuItem called");
        validateMenuData(createMenuItemDto)

        const menuExists: IMenuItem | null = await this.checkMenuExists(createMenuItemDto.name)
        if (menuExists) {
            throw new ConflictError("Menu already exists")
        }

        const menuData: Partial<IMenuItem> = toMenuItem(createMenuItemDto);

        const menu: IMenuItem = await this.menuRepository.create(menuData);
        return toMenuItemResponse(menu);
    }

    async getMenuItems(): Promise<MenuItemResponseDto[]> {
        console.log("MenuService: getMenuItems called");
        const menus: IMenuItem[] = await this.menuRepository.findAll();
        if (menus.length === 0) {
            throw new NotFoundError("No Item Found")
        }
        return menus.map(toMenuItemResponse)
    }

    async getMenuItemById(menuItemId: string): Promise<MenuItemResponseDto> {
        console.log("MenuService: getMenuItemById called");
        validateObjectId(menuItemId)
        const menu = await this.menuRepository.findById(menuItemId);
        if (!menu) {
            throw new ValidationError([{ field: "id", message: "Menu not found" }], 404)
        }
        return toMenuItemResponse(menu)
    }

    async updateMenuItem(menuItemId: string, updateMenuItemDto: UpdateMenuItemRequestDto): Promise<MenuItemResponseDto> {
        console.log("MenuService: updateMenuItem called");

        // Validate the ObjectId
        validateObjectId(menuItemId)

        // Retrieve the current menu item from the database
        const currentMenuItem = await this.menuRepository.findById(menuItemId)

        // if the current item doesn't exist then throw a NotFoundError
        if (!currentMenuItem) {
            throw new NotFoundError("Menu Not Found")
        }

        // Flag to tract if there are any changes
        let hasChanges = false

        // Check if the name has changed and if it's unique
        if (updateMenuItemDto.name && updateMenuItemDto.name !== currentMenuItem.name) {
            const menuExists: IMenuItem | null = await this.checkMenuExists(updateMenuItemDto.name)
            if (menuExists && menuExists._id?.toString() !== menuItemId) {
                throw new ConflictError("Menu with the same name already exists")
            }
            currentMenuItem.name = updateMenuItemDto.name; // Update name
            hasChanges = true
        }

        // 2. Check if 'price' has changed
        if (updateMenuItemDto.price && JSON.stringify(updateMenuItemDto.price) !== JSON.stringify(currentMenuItem.price)) {
            currentMenuItem.price = updateMenuItemDto.price; // Update price
            hasChanges = true;
        }

        // 3. Check if 'ingredients' has changed
        if (updateMenuItemDto.ingredients.toString() !== currentMenuItem.ingredients.toString()) {
            currentMenuItem.ingredients = updateMenuItemDto.ingredients; // Update ingredients
            hasChanges = true;
        }

        // 4. Check if 'description' has changed
        if (updateMenuItemDto.description !== currentMenuItem.description) {
            currentMenuItem.description = updateMenuItemDto.description; // Update description
            hasChanges = true;
        }

        // 5. Check if 'combo' has changed
        if (updateMenuItemDto.combo !== currentMenuItem.combo) {
            currentMenuItem.combo = updateMenuItemDto.combo; // Update combo
            hasChanges = true;
        }

        // 6. Check if 'comboDetails' has changed (only if combo is true)
        if (updateMenuItemDto.combo && updateMenuItemDto.comboDetails &&
            JSON.stringify(updateMenuItemDto.comboDetails) !== JSON.stringify(currentMenuItem.comboDetails)) {
            currentMenuItem.comboDetails = updateMenuItemDto.comboDetails; // Update comboDetails
            hasChanges = true;
        }

        // If no changes are detected, return the current menu item without updating
        if (!hasChanges) {
            console.log("MenuService: No changes detected, skipping update");
            return toMenuItemResponse(currentMenuItem);
        }

        // If changes were made, proceed with updating the menu item
        const updatedMenu: IMenuItem | null = await this.menuRepository.update(menuItemId, currentMenuItem);
        if (!updatedMenu) {
            throw new NotFoundError("Menu item not found");
        }
        // Return the updated menu item
        return toMenuItemResponse(updatedMenu);
    }

    async deleteMenuItem(menuItemId: string): Promise<boolean> {
        console.log("MenuService: deleteMenuItem called");
        return await this.menuRepository.delete(menuItemId);
    }

}

export default MenuService;
