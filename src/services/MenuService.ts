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
import ICustomization from "../interfaces/customization/ICustomization";
import ICustomizationRepository from "../interfaces/customization/ICustomizationRepository";
import IVariantRepository from "../interfaces/variant/IVariantRepository";
import IVariant from "../interfaces/variant/IVariant";
import ICategory from "../interfaces/category/ICategory";
import { ICategoryRepository } from "../interfaces/category/ICategoryRepository";
import { ISubcategoryRepository } from "../interfaces/subcategory/ISubcategoryRepository";
import ISubcategory from "../interfaces/subcategory/ISubcategory";

class MenuService implements IMenuItemService {

    private menuRepository: IMenuRepository;
    private customizationRepository: ICustomizationRepository;
    private variantRepository: IVariantRepository;
    private categoryRepository: ICategoryRepository;
    private subcategoryRepository: ISubcategoryRepository;

    constructor(menuRepository: IMenuRepository, customizationRepository: ICustomizationRepository, variantRepository: IVariantRepository, categoryRepository: ICategoryRepository, subcategoryRepository: ISubcategoryRepository) {
        this.menuRepository = menuRepository;
        this.customizationRepository = customizationRepository;
        this.variantRepository = variantRepository;
        this.categoryRepository = categoryRepository;
        this.subcategoryRepository = subcategoryRepository
    }

    /**
     * Checks if a menu item with the given name already exists
     * @param name - Name of the menu item to check
     * @returns Promise resolving to the existing menu item or null
     */
    private async checkMenuExists(name: string): Promise<IMenuItem | null> {
        return await this.menuRepository.findByName(name);
    }

    /**
     * Checks if a customization item with the given name  exists
     * @param id - Name of the customization item to check
     * @returns Promise resolving to the existing customization item or null
     */
    private async checkCustomizationExists(id: string): Promise<ICustomization | null> {
        return await this.customizationRepository.findById(id);
    }

    /**
     * Checks if a customization variant with the given id exists
     * @param id - Name of the customization variant to check
     * @returns Promise resolving to the existing  variant or null
     */
    private async checkVariantExists(id: string): Promise<IVariant | null> {
        return await this.variantRepository.findById(id);
    }

    /**
       * Checks if a category with the given id exists
       * @param id - Name of the category variant to check
       * @returns Promise resolving to the existing  category or null
       */
    private async checkCategoryExists(id: string): Promise<ICategory | null> {
        return await this.categoryRepository.findById(id);
    }

    /**
     * Checks if a subcategory with the given id exists
     * @param id - Name of the subcategory variant to check
     * @returns Promise resolving to the existing  subcategory or null
     */
    private async checksubCategoryExists(id: string): Promise<ISubcategory | null> {
        return await this.subcategoryRepository.findById(id);
    }


    /**
     * Creates a new menu item after validating input data and checking for duplicates
     * @param createMenuItemDto - DTO containing menu item creation data
     * @returns Promise resolving to the created menu item response
     * @throws ConflictError if menu item with same name exists
     */
    async createMenuItem(createMenuItemDto: CreateMenuItemRequestDto): Promise<MenuItemResponseDto> {
        console.log("MenuService: createMenuItem called");

        // Validate input data structure
        validateMenuData(createMenuItemDto);

        // Check for existing menu item with same name
        const menuExists: IMenuItem | null = await this.checkMenuExists(createMenuItemDto.name);
        if (menuExists) throw new ConflictError("Menu already exists");

        // Check for existing for category
        const categoryExists: ICategory | null = await this.checkCategoryExists(createMenuItemDto.categoryId);
        if (!categoryExists) throw new ConflictError("category Not exists");

        // Check for existing for subcategory
        const subcategoryExists: ISubcategory | null = await this.checksubCategoryExists(createMenuItemDto.subcategoryId)
        if (!subcategoryExists) throw new ConflictError("subcategory Not exists");

        // Check for existing for customization
        // Check customizations sequentially
        for (const id of createMenuItemDto.customizations) {
            const customizationExists: ICustomization | null = await this.checkCustomizationExists(id);
            if (!customizationExists) throw new ConflictError("Customization Not exists");
        }

        // Check for existing vairant
        // Check variants sequentially
        for (const id of createMenuItemDto.variants) {
            const variantExists: IVariant | null = await this.checkVariantExists(id);
            if (!variantExists) throw new ConflictError("Variant Not exists");
        }

        // Convert DTO to repository model and create
        const menuData: Partial<IMenuItem> = toMenuItem(createMenuItemDto);
        const menu: IMenuItem = await this.menuRepository.create(menuData);

        return toMenuItemResponse(menu);
    }

    /**
     * Retrieves all menu items from the repository
     * @returns Promise resolving to array of menu item responses
     * @throws NotFoundError if no menu items exist
     */
    async getMenuItems(): Promise<MenuItemResponseDto[]> {
        console.log("MenuService: getMenuItems called");
        const menus: IMenuItem[] = await this.menuRepository.findAll();
        if (menus.length === 0) {
            throw new NotFoundError("No Item Found");
        }
        return menus.map(toMenuItemResponse);
    }

    /**
     * Retrieves a specific menu item by ID
     * @param menuItemId - ID of the menu item to retrieve
     * @returns Promise resolving to the menu item response
     * @throws ValidationError if menu item doesn't exist
     */
    async getMenuItemById(menuItemId: string): Promise<MenuItemResponseDto> {
        console.log("MenuService: getMenuItemById called");

        // Validate ID format
        validateObjectId(menuItemId);

        const menu = await this.menuRepository.findById(menuItemId);
        if (!menu) {
            throw new ValidationError([{ field: "id", message: "Menu not found" }], 404);
        }
        return toMenuItemResponse(menu);
    }

    /**
     * Updates an existing menu item with partial data
     * @param menuItemId - ID of the menu item to update
     * @param updateMenuItemDto - Partial DTO containing fields to update
     * @returns Promise resolving to the updated menu item response
     * @throws NotFoundError if menu item doesn't exist
     * @throws ConflictError if name change conflicts with existing menu item
     */
    async updateMenuItem(menuItemId: string, updateMenuItemDto: UpdateMenuItemRequestDto): Promise<MenuItemResponseDto> {
        console.log("MenuService: updateMenuItem called");

        // Validate ID format
        validateObjectId(menuItemId);

        // Retrieve current menu item data
        const currentMenuItem = await this.menuRepository.findById(menuItemId);
        if (!currentMenuItem) {
            throw new NotFoundError("Menu Not Found");
        }

        let hasChanges = false;

        // 1. Handle name update with uniqueness check
        if (updateMenuItemDto.name && updateMenuItemDto.name !== currentMenuItem.name) {
            const menuExists: IMenuItem | null = await this.checkMenuExists(updateMenuItemDto.name);
            if (menuExists && menuExists._id?.toString() !== menuItemId) {
                throw new ConflictError("Menu with the same name already exists");
            }
            currentMenuItem.name = updateMenuItemDto.name;
            hasChanges = true;
        }

        // 2. Handle price update with deep comparison
        if (updateMenuItemDto.price && JSON.stringify(updateMenuItemDto.price) !== JSON.stringify(currentMenuItem.price)) {
            currentMenuItem.price = updateMenuItemDto.price;
            hasChanges = true;
        }

        // 3. Handle ingredients update
        if (updateMenuItemDto.ingredients &&
            updateMenuItemDto.ingredients.toString() !== currentMenuItem.ingredients.toString()) {
            currentMenuItem.ingredients = updateMenuItemDto.ingredients;
            hasChanges = true;
        }

        // 4. Handle description update
        if (updateMenuItemDto.description !== undefined &&
            updateMenuItemDto.description !== currentMenuItem.description) {
            currentMenuItem.description = updateMenuItemDto.description;
            hasChanges = true;
        }

        // 5. Handle combo flag update
        if (updateMenuItemDto.combo !== undefined &&
            updateMenuItemDto.combo !== currentMenuItem.combo) {
            currentMenuItem.combo = updateMenuItemDto.combo;
            hasChanges = true;
        }

        // 6. Handle combo details update (only when combo is true)
        if (updateMenuItemDto.combo && updateMenuItemDto.comboDetails &&
            JSON.stringify(updateMenuItemDto.comboDetails) !== JSON.stringify(currentMenuItem.comboDetails)) {
            currentMenuItem.comboDetails = updateMenuItemDto.comboDetails;
            hasChanges = true;
        }

        // Skip update if no changes detected
        if (!hasChanges) {
            console.log("MenuService: No changes detected, skipping update");
            return toMenuItemResponse(currentMenuItem);
        }

        // Persist changes to repository
        const updatedMenu: IMenuItem | null = await this.menuRepository.update(menuItemId, currentMenuItem);
        if (!updatedMenu) {
            throw new NotFoundError("Menu item not found");
        }

        return toMenuItemResponse(updatedMenu);
    }

    /**
     * Deletes a menu item by ID
     * @param menuItemId - ID of the menu item to delete
     * @returns Promise resolving to boolean indicating success
     */
    async deleteMenuItem(menuItemId: string): Promise<boolean> {
        console.log("MenuService: deleteMenuItem called");
        return await this.menuRepository.delete(menuItemId);
    }
}

export default MenuService;
