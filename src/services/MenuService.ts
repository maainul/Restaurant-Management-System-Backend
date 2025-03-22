
import IMenuItemService from "../interfaces/menu/IMenuItemService";
import CreateMenuItemRequestDto from "../dto/menu/CreateMenuItemRequest.dto";
import MenuItemResponseDto from "../dto/menu/MenuItemResponse.dto";
import UpdateMenuItemRequestDto from "../dto/menu/UpdateMenuItemRequest.dto";
import IMenuRepository from "../interfaces/menu/IMenuRepository";

import IMenuItem from "../interfaces/menu/IMenuItem";
import { toMenuItem, toMenuItemResponse, toUpdatedMenuItem } from "../converters/menu/MenuConverter";

class MenuService implements IMenuItemService {

    private menuRepository: IMenuRepository;

    constructor(menuRepository: IMenuRepository) {
        this.menuRepository = menuRepository;
    }

    async createMenuItem(createMenuItemDto: CreateMenuItemRequestDto): Promise<MenuItemResponseDto> {
        console.log("MenuService: createMenuItem called");
        const menuData: Partial<IMenuItem> = toMenuItem(createMenuItemDto);
        const menu: IMenuItem = await this.menuRepository.create(menuData);
        return toMenuItemResponse(menu);
    }

    async getMenuItems(): Promise<MenuItemResponseDto[]> {
        console.log("MenuService: getMenuItems called");
        const menus = await this.menuRepository.findAll();
        return menus.map(toMenuItemResponse)
    }

    async getMenuItemById(menuItemId: string): Promise<MenuItemResponseDto | null> {
        console.log("MenuService: getMenuItemById called");
        const menu = await this.menuRepository.findById(menuItemId);
        return menu ? toMenuItemResponse(menu) : null;
    }

    async updateMenuItem(menuItemId: string, updateMenuItemDto: UpdateMenuItemRequestDto): Promise<MenuItemResponseDto | null> {
        console.log("MenuService: updateMenuItem called");
        const menu = await this.menuRepository.update(menuItemId, toUpdatedMenuItem(updateMenuItemDto));
        return menu ? toMenuItemResponse(menu) : null
    }

    async deleteMenuItem(menuItemId: string): Promise<boolean> {
        console.log("MenuService: deleteMenuItem called");
        return await this.menuRepository.delete(menuItemId);
    }

}

export default MenuService;
