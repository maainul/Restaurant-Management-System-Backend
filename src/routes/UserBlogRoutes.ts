import express from "express";
import UserBlogController from "../controllers/UserBlogController";

const router = express.Router();

const userBlogController = new UserBlogController()


router.get("/", userBlogController.getAllBlogs);
router.get("/home", userBlogController.getCategoryWiseBlogs);
router.get("/:id", userBlogController.getBlogById);
router.get("/category/:categoryId", userBlogController.getBlogByCategoryId);

export default router;
