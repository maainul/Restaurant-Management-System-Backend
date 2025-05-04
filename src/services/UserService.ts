import { Request } from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import IUserService from "../interfaces/user/IUserService";
import IUserRepository from "../interfaces/user/IUserRepository";

import LoginRequestDto from "./../dto/user/LoginRequest.dto";
import CreateUserRequestDto from "../dto/user/CreateUserRequest.dto";
import UserResponseDto from "../dto/user/UserResponse.dto";

import { ValidationError } from "../errors/errors";
import { toCustomer, toUser, toUserDTO } from "../converters/user/UserConverter";
import NotFoundError from "../errors/NotFoundError";
import UpdateUserRequestDto from "../dto/user/UpdateUserRequest.dto";
import validateObjectId from "../utils/isValidObjectId";
import IUser from "../interfaces/user/IUser";
import ConflictError from "../errors/ConflictError";
import CreateCustomerRequestDto from "../dto/user/CreateCustomerRequest.dto";
import { createAccessToken, createRefreshToken } from "../utils/tokenService";
import { paginateAndSearch } from "../utils/paginateAndSearch";
import UserListResponse from "../dto/user/UserListResponse.dto";

// import {createAccessToken,createRefreshToken} from "../utils/tokenService"


class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Checks if a user with the given mobile Number already exists
   * @param mobileNumber - mobile Number of the user to check
   * @returns Promise resolving to the existing user or null
   */
  private async checkUserByMobileNumber(mobileNumber: string): Promise<IUser | null> {
    return await this.userRepository.findByMobileNumber(mobileNumber);
  }


  /**
   * Checks if a user with the given name already exists
   * @param name - Name of the user to check
   * @returns Promise resolving to the existing user or null
   */
  private async checkUserByEmail(email: string): Promise<IUser | null> {
    return await this.userRepository.findByEmail(email);
  }


  /**
   * Checks if a user with the given name already exists
   * @param name - Name of the user to check
   * @returns Promise resolving to the existing user or null
   */
  private async checkUserByUserName(userName: string): Promise<IUser | null> {
    return await this.userRepository.findByUserName(userName);
  }

  async login(loginRequestDto: LoginRequestDto): Promise<{ user: UserResponseDto; accessToken: string; refreshToken: string | null; }> {
    const user: IUser | null = await this.userRepository.findByEmail(loginRequestDto.email);
    if (!user) {
      throw new ValidationError([{ field: "email", message: "User not found" }], 404);
    }

    // Hash Password and Compare Password
    const hashedPassword = user.password?.trim();
    if (hashedPassword && !(await bcrypt.compare(loginRequestDto.password, hashedPassword))) {
      throw new ValidationError([{ field: "password", message: "Invalid password" }], 401);
    }

    // Increment tokenVersion and persist it
    user.tokenVersion += 1;
    await this.userRepository.update(user._id.toString(), { tokenVersion: user.tokenVersion });

    const { _id, email, username, role, tokenVersion } = user;

    // Create Access Token and Refresh Token
    const accessToken = createAccessToken(_id.toString(), email, username, role, tokenVersion)
    const refreshToken = createRefreshToken(_id.toString(), email, username, role, tokenVersion)

    await this.userRepository.update(user._id.toString(), { refreshToken });

    const userDTO = toUserDTO(user);
    delete userDTO.password;

    return { user: userDTO, accessToken, refreshToken };
  }

  /**
   * Retrieves all users from the repository
   * @returns Promise resolving to array of category responses
   * @throws NotFoundError if no users exist
   */
  async getUsers(req: Request): Promise<UserListResponse> {
    console.log("UserService: getAllUsers called.");
    const data: UserListResponse = await paginateAndSearch<IUser>({
      repository: this.userRepository,
      query: req.query,
      searchableFields: ["name", "email", "mobileNumber", "role"],
      toResponseDto: toUserDTO,
    });

    return data;
  }


  async getUserById(id: string): Promise<UserResponseDto | null> {
    console.log("UserService: getUserById called.");
    const user = await this.userRepository.findById(id);
    return user ? toUserDTO(user) : null;
  }

  async getUserByEmail(email: string): Promise<UserResponseDto | null> {
    console.log("UserService: getUserById called.");
    const user = await this.userRepository.findByEmail(email);
    return user ? toUserDTO(user) : null;
  }

  async createUser(data: CreateUserRequestDto): Promise<UserResponseDto> {
    console.log("UserService: createUser called.");
    console.log("UserService: Request Data:", data);

    const errors = [];

    if (data.username) {
      const existingUserName = await this.userRepository.findByUserName(data.username);
      if (existingUserName) {
        errors.push({ field: "username", message: "User with this username already exists" })
      }
    }

    if (data.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser) {
        errors.push({ field: "email", message: "User with this email already exists" });
      }
    }

    if (data.mobileNumber) {
      const existingUserMobileNumber = await this.checkUserByMobileNumber(data.mobileNumber);
      if (existingUserMobileNumber) {
        errors.push({ field: "mobileNumber", message: "User with this mobile number already exists" });
      }
    }

    // If there are any errors collected, throw once
    if (errors.length > 0) {
      throw new ValidationError(errors, 409);
    }

    if (data.password && data.password.trim() !== "") {
      data.password =
        data.password.trim() && (await bcrypt.hash(data.password, 10));
    }

    const user = await this.userRepository.create(toUser(data));
    return toUserDTO(user);
  }

  /**
   * Updates an existing user with partial data
   * @param id - ID of the user to update
   * @param data - Partial DTO containing fields to update
   * @returns Promise resolving to the updated user response
   * @throws NotFoundError if user doesn't exist
   * @throws ConflictError if name change conflicts with existing user
   */
  async updateUser(id: string, data: UpdateUserRequestDto): Promise<UserResponseDto | null> {

    // validate ID format
    validateObjectId(id);

    //Retrieve current user data
    const currentData = await this.userRepository.findById(id);
    if (!currentData) {
      throw new NotFoundError("User not found");
    }

    let hasChanges = false;

    // Handle name update
    if (data.email && data.email !== currentData.email) {
      const userExists: IUser | null = await this.checkUserByEmail(data.email);
      if (userExists && userExists._id?.toString() !== id) {
        throw new ConflictError("User with this email already exists");
      }
      currentData.email = data.email;
      hasChanges = true;
    }

    if (data.role && data.role !== currentData.role) {
      currentData.role = data.role;
      hasChanges = true;
    }

    if (data.password && data.password !== currentData.password) {
      currentData.password = data.password.trim() && (await bcrypt.hash(data.password, 10));
      hasChanges = true;
    }

    if (data.name && data.name !== currentData.name) {
      currentData.name = data.name;
      hasChanges = true;
    }

    if (data.status && data.status !== currentData.status) {
      currentData.status = data.status;
      hasChanges = true;
    }

    if (data.address && data.address !== currentData.address) {
      currentData.address = data.address;
      hasChanges = true;
    }

    if (data.mobileNumber && data.mobileNumber !== currentData.mobileNumber) {
      const userExists: IUser | null = await this.checkUserByMobileNumber(data.mobileNumber);
      if (userExists && userExists._id?.toString() !== id) {
        throw new ConflictError("User with this mobile already exists");
      }
      currentData.mobileNumber = data.mobileNumber;
      hasChanges = true;
    }

    if (data.username && data.username !== currentData.username) {
      const userExists: IUser | null = await this.checkUserByUserName(data.username);
      if (userExists && userExists._id?.toString() !== id) {
        throw new ConflictError("User with this username already exists");
      }
      currentData.username = data.username;
      hasChanges = true;
    }
    if (!hasChanges) {
      console.log("UserService: No Changes detected, skipping update");
      return toUserDTO(currentData);
    }

    // User Data
    const user: IUser | null = await this.userRepository.update(id, currentData);
    if (!user) {
      throw new NotFoundError("User Not Found")
    }

    return toUserDTO(user);
  }

  async deleteUser(id: string): Promise<boolean> {
    console.log("UserService: deleteUser called.");
    const user = await this.userRepository.delete(id);
    if (!user) {
      throw new NotFoundError("Something went wrong.Please contact with administrator.")
    }
    return user
  }

  async getUserByMobileNumber(mobileNUmber: string): Promise<UserResponseDto | null> {
    console.log("UserService: getUserById called.");
    const user = await this.userRepository.findByMobileNumber(mobileNUmber);
    if (!user) {
      throw new NotFoundError("User Not Found")
    }
    return toUserDTO(user);
  }


  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
      throw new Error("Token secrets are not defined in environment variables.");
    }

    // Step 1: Decode and validate refresh token
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: string; tokenVersion: number };
    } catch (err) {
      throw new ValidationError([{ field: "refreshToken", message: "Invalid or expired refresh token" }], 403);
    }

    // Step 2: Find user and validate token
    const user = await this.userRepository.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new ValidationError([{ field: "refreshToken", message: "Invalid refresh token" }], 403);
    }

    const { _id, email, username, role, tokenVersion } = user;

    // Step 3: Increment token version (optional)
    const newTokenVersion = (tokenVersion || 0) + 1;
    user.tokenVersion = newTokenVersion;

    // Step 4: Generate new tokens
    const newAccessToken = createAccessToken(_id.toString(), email, username, role, tokenVersion)
    const newRefreshToken = createRefreshToken(_id.toString(), email, username, role, tokenVersion)

    // Step 5: Save new refresh token and tokenVersion in DB
    await this.userRepository.update(user._id.toString(), {
      refreshToken: newRefreshToken,
      tokenVersion: newTokenVersion
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken }
  }

  // Create Customer With OTP
  async createCustomer(data: CreateCustomerRequestDto): Promise<UserResponseDto> {
    console.log("UserService: createCustomer called.");
    console.log("UserService: Request Data:", data);
    //  Check User Already Exists or not
    const existingUser = await this.userRepository.findByMobileNumber(data.mobileNumber);
    if (existingUser) {
      throw new ValidationError(
        [{ field: " mobileNumber", message: "User with this mobile Number already exists" }],
        403
      );
    }
    //  Hash Password
    if (data.password && data.password.trim() !== "") {
      data.password =
        data.password.trim() && (await bcrypt.hash(data.password, 10));
    }

    const user = await this.userRepository.create(toCustomer(data));
    return toUserDTO(user);
  }

}

export default UserService;
