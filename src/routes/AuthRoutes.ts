import { Router } from "express";

import authenticate from "../middlewares/authenticate";
import AuthController from "../controllers/admin/AuthController";



const router = Router()

const authController = new AuthController()

// Login and Register
router.post("/login", authController.login);
router.post("/register",authenticate, authController.register);

// Update User info and Passwords
router.put("/user/:id",authenticate, authController.passwordUpdate);

// Get User Info Based on User ID
router.get("/profile/:id", authenticate, authController.getUserById);

// Refresh token for User Login automatically 
router.post("/refresh-token", authController.refreshToken);

// Create Customer Based on Monile Number and Password
router.post("/customer", authController.createCustomer);

// Only Admin Controller for Create Admin : No Authenticate Needed
router.post("/admin", authController.register);


export default router;