import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import IUserService from "../interfaces/user/IUserService";
import IUserRepository from "../interfaces/user/IUserRepository";

import LoginRequestDto from './../dto/user/LoginRequest.dto';
import CreateUserRequestDto from "../dto/user/CreateUserRequest.dto";
import UserResponseDto from '../dto/user/UserResponse.dto';

import { ValidationError } from "../errors/errors";
import { toUser, toUserDTO } from '../converters/user/UserConverter';


class UserService implements IUserService {

    private userRepository: IUserRepository;

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async login(loginRequestDto: LoginRequestDto): Promise<{ user: UserResponseDto; accessToken: string; refreshToken: string | null }> {
        const user = await this.userRepository.findByEmail(loginRequestDto.email)
        if (!user) {
            throw new ValidationError([{ field: "email", message: "User not found" }], 404);
        }
        if (user.password) {
            const isPasswordValid = await bcrypt.compare(loginRequestDto.password, user.password.trim());
            if (!isPasswordValid) {
                throw new ValidationError([{ field: "password", message: "Invalid password" }], 401);
            }
        }

        // Validate environment variables
        const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
        const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
        if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
            throw new Error("Required environment variables are not defined");
        }

        const accessToken = jwt.sign(
            { userId: user._id, email: user.email, username: user.username, role: user.role },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "59m" }
        );

        const refreshToken = jwt.sign(
            { userId: user._id, email: user.email, username: user.username, role: user.role },
            REFRESH_TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        // Save the refresh token in the database
        await this.userRepository.update(user._id.toString(), { refreshToken })
        const userDTO = toUserDTO(user);
        delete userDTO.password
        return { user: userDTO, accessToken, refreshToken };
    }

    async getUsers(): Promise<UserResponseDto[]> {
        console.log("UserService: getAllUsers called.")
        const users = await this.userRepository.findAll()
        console.log("UserService: getAllUsers data :.", users)
        return users.map(toUserDTO)
    }

    async getUserById(id: string): Promise<UserResponseDto | null> {
        console.log("UserService: getUserById called.")
        const user = await this.userRepository.findById(id)
        return user ? toUserDTO(user) : null
    }

    async getUserByEmail(email: string): Promise<UserResponseDto | null> {
        console.log("UserService: getUserById called.")
        const user = await this.userRepository.findByEmail(email)
        return user ? toUserDTO(user) : null
    }

    async createUser(data: CreateUserRequestDto): Promise<UserResponseDto> {
        console.log("UserService: createUser called.")
        console.log("UserService: Request Data:", data);

        const existingUser = await this.userRepository.findByEmail(data.email);
        if (existingUser) {
            throw new ValidationError([{ field: " email", message: "User with this email already exists" }], 409);
        }

        if (data.password && data.password.trim() !== "") {
            data.password = data.password.trim() && await bcrypt.hash(data.password, 10)
        }

        const user = await this.userRepository.create(toUser(data))
        return toUserDTO(user)
    }

    async updateUser(id: string, data: CreateUserRequestDto): Promise<UserResponseDto | null> {
        console.log("UserService: updateUser called.")
        const user = await this.userRepository.update(id, toUser(data))
        return user ? toUserDTO(user) : null
    }

    async deleteUser(id: string): Promise<boolean> {
        console.log("UserService: deleteUser called.")
        return await this.userRepository.delete(id)
    }

    async refreshAccessToken(refreshToken: string): Promise<string> {

        const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
        const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET

        if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
            throw new Error("Required environment variables are not defined");
        }

        const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: string }

        const user = await this.userRepository.findById(decoded.userId)
        if (!user || user.refreshToken !== refreshToken) {
            throw new ValidationError([{ field: "refreshToken", message: "Invalid refresh token" }], 403);
        }

        const accessToken = jwt.sign({ userId: user._id, email: user.email, username: user.username, role: user.role }, ACCESS_TOKEN_SECRET, { expiresIn: "59m" })

        return accessToken
    }
}

export default UserService