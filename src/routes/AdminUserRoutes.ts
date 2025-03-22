import { Router } from "express";
import isAdmin from '../middlewares/adminAuthMiddleware';
import AdminUserController from "../controllers/AdminUserController";



const router = Router()
const adminUserController = new AdminUserController()

router.put("/:id", isAdmin, adminUserController.updateUser);
router.delete("/:id", isAdmin, adminUserController.deleteUser);
router.get("/", isAdmin, adminUserController.getAllUser)


export default router;