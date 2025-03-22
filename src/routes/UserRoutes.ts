import { Router } from "express";

import authenticate from "../middlewares/authenticate";
import UserController from "../controllers/admin/UserController";



const router = Router()
const userController = new UserController()

router.post("/login", userController.login);
router.post("/register", userController.register);
router.get("/profile/:id", authenticate, userController.getUserById);
router.post("/refresh-token", userController.refreshToken);



export default router;