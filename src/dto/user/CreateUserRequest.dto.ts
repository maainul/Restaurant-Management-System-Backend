interface CreateUserRequestDto {
    username: string;
    email: string;
    mobileNumber: string;
    password: string;
    role: string;  // "user" | "admin"
    refreshToken: string;
}

export default CreateUserRequestDto
