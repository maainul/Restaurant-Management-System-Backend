import { Router } from "express";

import authenticate from "../middlewares/authenticate";
import AuthController from "../controllers/admin/AuthController";
import UserController from "../controllers/admin/UserController";



const router = Router()
// const userController = new UserController()
const authController = new AuthController()

router.post("/login", authController.login);
router.post("/register", authController.register);
router.get("/profile/:id", authenticate, authController.getUserById);
router.post("/refresh-token", authController.refreshToken);



export default router;