interface CreateCustomerRequestDto {
    mobileNumber: string;
    password: string;
    otp ?: string;
    role: string;
    refreshToken: string;
}

export default CreateCustomerRequestDto
