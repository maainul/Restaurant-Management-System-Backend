interface CreateUserRequestDto {
    username: string;
    email: string;
    name: string;
    status: string;
    address: string;
    mobileNumber: string;
    password: string;
    role: string;  // "user" | "admin"
    refreshToken: string;
}

export default CreateUserRequestDto
