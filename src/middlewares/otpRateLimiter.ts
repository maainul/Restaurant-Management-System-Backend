import rateLimit from "express-rate-limit";

// 5 requests per 10 minutes
const otpRateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max:50, //limit each ip to 5 request per windowsMs
    message:"Too many OTP attemts,Please try again later."
})

export default otpRateLimiter
