import { Request } from 'express';
import LoginRequestDto from '../../dto/user/LoginRequest.dto';
import UserResponseDto from '../../dto/user/UserResponse.dto';
import CreateUserRequestDto from '../../dto/user/CreateUserRequest.dto';
import UserListResponse from './../../dto/user/UserListResponse.dto';

interface IUserService {
    login(loginUserDto: LoginRequestDto): Promise<{ user: UserResponseDto; accessToken: string; refreshToken: string | null }>;
    createUser(createUserDto: CreateUserRequestDto): Promise<UserResponseDto>;
    getUsers(req: Request): Promise<UserListResponse>;
    getUserById(userId: string): Promise<UserResponseDto | null>;
    getUserByMobileNumber(mobileNUmber: string): Promise<UserResponseDto | null>;
    updateUser(userId: string, updateUserDto: CreateUserRequestDto): Promise<UserResponseDto | null>;
    deleteUser(userId: string): Promise<boolean>;
    refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }>;

}

export default IUserService
