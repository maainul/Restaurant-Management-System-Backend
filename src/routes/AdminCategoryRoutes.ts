import express from "express";

import isAdmin from "../middlewares/adminAuthMiddleware";
import AdminCategoryController from "../controllers/AdminCategoryController";


const router = express.Router();
const adminCategoryController = new AdminCategoryController();

router.get("/", isAdmin, adminCategoryController.getAllCategories);
router.post("/", isAdmin, adminCategoryController.createCategory);
router.put("/:id", isAdmin, adminCategoryController.updateCategory);

export default router;
