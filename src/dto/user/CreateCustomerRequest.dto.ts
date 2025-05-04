interface CreateCustomerRequestDto {
    mobileNumber: string;
    password: string;
    name: string;
    status: string;
    address: string;
    otp?: string;
    role: string;
    refreshToken: string;
    otpExpiryTime?: Date;
}

export default CreateCustomerRequestDto
