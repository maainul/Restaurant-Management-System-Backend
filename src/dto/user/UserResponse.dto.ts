interface UserResponseDto {
    _id: string;
    username: string;
    email: string;
    password?: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export default UserResponseDto