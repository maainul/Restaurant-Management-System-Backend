import { Router } from "express";
import isAdmin from '../middlewares/adminAuthMiddleware';
import CategoryController from "../controllers/admin/CategoryController";
import SubCategoryController from "../controllers/admin/SubcategoryController";
import MenuController from "../controllers/admin/MenuController";
import CustomizationController from "../controllers/admin/CustomizationController";
import VariantController from "../controllers/admin/VariantController";
import upload from './../middlewares/imageUpload';
import OrderController from "../controllers/admin/OrderController";



const router = Router()

const categoryController = new CategoryController()
const subCategoryController = new SubCategoryController()
const menuController = new MenuController()
const orderController = new OrderController()
const customizationController = new CustomizationController()
const variantController = new VariantController()

/***************************** Category ********************************/
router.get("/categories/", isAdmin, categoryController.getAllCategory);
router.get("/categories/:id", isAdmin, categoryController.getCategoryById);

router.post("/categories/", isAdmin, categoryController.createCategory);

router.put("/categories/:id", isAdmin, categoryController.updateCategory);

router.delete("/categories/:id", isAdmin, categoryController.deleteCategory);


/***************************** Sub-Category ********************************/
router.get("/sub-categories/", isAdmin, subCategoryController.getAllSubCategory);
router.get("/sub-categories/:id", isAdmin, subCategoryController.getSubCategoryById);

router.post("/sub-categories/", isAdmin, subCategoryController.createSubCategory);

router.put("/sub-categories/:id", isAdmin, subCategoryController.updateSubCategory);

router.delete("/sub-categories/:id", isAdmin, subCategoryController.deleteSubCategoryId);

/***************************** Menu ********************************/
router.get("/menus/", isAdmin, menuController.getAllMenu);
router.get("/menus/:id", isAdmin, menuController.getMenuById);

router.post("/menus/", isAdmin, upload.single("imageURL"), menuController.createMenu);

router.put("/menus/:id", isAdmin, menuController.updateMenu);

router.delete("/menus/:id", isAdmin, menuController.deleteMenu);


/***************************** Customization ********************************/
router.get("/customizations/", isAdmin, customizationController.getAllCustomization);

router.get("/customizations/:id", isAdmin, customizationController.getCustomizationById);

router.post("/customizations/", isAdmin, customizationController.createCustomization);

router.put("/customizations/:id", isAdmin, customizationController.updateCustomization);

router.delete("/customizations/:id", isAdmin, customizationController.deleteCustomization);

/***************************** Variant ********************************/
router.get("/variants/", isAdmin, variantController.getAllVariant);

router.get("/variants/:id", isAdmin, variantController.getVariantById);

router.post("/variants/", isAdmin, variantController.createVariant);

router.put("/variants/:id", isAdmin, variantController.updateVariant);

router.delete("/variants/:id", isAdmin, variantController.deleteVariant);


/***************************** Order ********************************/
router.get("/orders/", isAdmin, orderController.getAllOrder);
router.get("/orders/:id", isAdmin, orderController.getOrderById);
router.post("/orders/", isAdmin, orderController.createOrder);
router.put("/orders/:id", isAdmin, orderController.updateOrder);
router.delete("/orders/:id", isAdmin, orderController.deleteOrder);




export default router;