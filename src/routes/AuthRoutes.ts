import { Router } from "express";

import authenticate from "../middlewares/authenticate";
import AuthController from "../controllers/admin/AuthController";
import otpRateLimiter from "../middlewares/otpRateLimiter";


const router = Router()

const authController = new AuthController()

router.post("/login", authController.login);
router.post("/register",authenticate, authController.register);
router.get("/profile/:id", authenticate, authController.getUserById);
router.post("/refresh-token", authController.refreshToken);

router.post("/customer", authController.createCustomer);


export default router;