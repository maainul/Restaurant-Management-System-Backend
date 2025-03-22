import LoginRequestDto from '../../dto/user/LoginRequest.dto';
import UserResponseDto from '../../dto/user/UserResponse.dto';
import CreateUserRequestDto from '../../dto/user/CreateUserRequest.dto';

interface IUserService {
    login(loginUserDto: LoginRequestDto): Promise<{ user: UserResponseDto; accessToken: string; refreshToken: string | null }>;
    createUser(createUserDto: CreateUserRequestDto): Promise<UserResponseDto>;
    getUsers(): Promise<UserResponseDto[]>;
    getUserById(userId: string): Promise<UserResponseDto | null>;
    updateUser(userId: string, updateUserDto: CreateUserRequestDto): Promise<UserResponseDto | null>;
    deleteUser(userId: string): Promise<boolean>;
    refreshAccessToken(refreshToken: string): Promise<string>;
}

export default IUserService
