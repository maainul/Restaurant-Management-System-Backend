interface UserResponseDto {
    _id: string;
    username: string;
    email: string;
    mobileNumber:string;
    otpExpiryTime : Date;
    isVerified : Boolean;
    isEmailVerified:Boolean;
    verificationCode:string;
    verificationExpiryTime:Date;
    password?: string;
    otp: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;

    
    name: string;
    status: string;
    address: string;
}

export default UserResponseDto