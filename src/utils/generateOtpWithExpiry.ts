export const generateOtpWithExpiry = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiryMinutes = parseInt(process.env.OTP_EXPIRY_MINUTES || "3", 10);
    const otpExpiryTime = new Date(Date.now() + expiryMinutes * 60 * 1000);
    
    return { otp, otpExpiryTime };
};