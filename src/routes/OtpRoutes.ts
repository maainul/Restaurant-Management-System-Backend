import { Router } from "express";
import otpRateLimiter from "../middlewares/otpRateLimiter";
import OTPController from "../controllers/admin/OTPController";


const router = Router()

const otpController = new OTPController()


router.post("/otp/verify",otpRateLimiter, otpController.verifyOtp);
router.post("/otp/resend", otpRateLimiter, otpController.resendOtp);
router.post("/mail/verify",otpRateLimiter, otpController.verifyMail);

export default router;
