import { Router } from "express";
import isAdmin from '../middlewares/adminAuthMiddleware';
import CategoryController from "../controllers/admin/CategoryController";
import SubCategoryController from "../controllers/admin/SubcategoryController";
import MenuController from "../controllers/admin/MenuController";



const router = Router()

const categoryController = new CategoryController()
const subCategoryController = new SubCategoryController()
const menuController = new MenuController()

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

router.post("/menus/", isAdmin, menuController.createMenu);

router.put("/menus/:id", isAdmin, menuController.updateMenu);

router.delete("/menus/:id", isAdmin, menuController.deleteMenu);

export default router;