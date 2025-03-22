import express from "express";
import UserCategoryController from "../controllers/UserCategoryController";

const router = express.Router();
const userCategoryController = new UserCategoryController();

router.get("/", userCategoryController.getAllCategories);

export default router;
