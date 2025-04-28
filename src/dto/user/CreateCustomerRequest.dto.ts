interface CreateCustomerRequestDto {
    mobileNumber: string;
    password: string;
    name: string;
    status: string;
    address: string;
    otp?: string;
    role: string;
    refreshToken: string;
}

export default CreateCustomerRequestDto
