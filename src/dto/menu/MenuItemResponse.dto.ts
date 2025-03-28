import ICustomization from '../../interfaces/customization/ICustomization';
import IVariant from './../../interfaces/variant/IVariant';
interface MenuItemResponseDto {
    id: string;
    name: string;
    price: number | { [size: string]: number };
    ingredients: string[];
    description?: string;
    categoryId?: string;
    subcategoryId: string;
    available: boolean;
    combo: boolean;
    comboDetails?: {
        includedItems: string[];
        drinkOptions: string[];
        upgradeOptions: string[];
        comboPrice: number;
    };
    variants: Array<{ id: string; data?: IVariant }>
    customizations: Array<{ id: string; data?: ICustomization }>;
    createdAt: Date;
    updatedAt: Date;
}

export default MenuItemResponseDto