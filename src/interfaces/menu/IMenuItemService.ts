import CreateMenuItemRequestDto  from '../../dto/menu/CreateMenuItemRequest.dto';
import MenuItemResponseDto from '../../dto/menu/MenuItemResponse.dto';
import UpdateMenuItemRequestDto from '../../dto/menu/UpdateMenuItemRequest.dto';

 interface IMenuItemService {
    createMenuItem(createMenuItemDto: CreateMenuItemRequestDto): Promise<MenuItemResponseDto>;
    getMenuItems(): Promise<MenuItemResponseDto[]>;
    getMenuItemById(menuItemId: string): Promise<MenuItemResponseDto | null>;
    updateMenuItem(menuItemId: string, updateMenuItemDto: UpdateMenuItemRequestDto): Promise<MenuItemResponseDto>;
    deleteMenuItem(menuItemId: string): Promise<boolean>;
}
export default IMenuItemService