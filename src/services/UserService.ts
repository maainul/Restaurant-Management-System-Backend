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

  async login(loginRequestDto: LoginRequestDto): Promise<{user: UserResponseDto;accessToken: string;refreshToken: string | null;}> {
    const user = await this.userRepository.findByEmail(loginRequestDto.email);
    if (!user) {
      throw new ValidationError(
        [{ field: "email", message: "User not found" }],
        404
      );
    }
    if (user.password) {
      const isPasswordValid = await bcrypt.compare(
        loginRequestDto.password,
        user.password.trim()
      );
      if (!isPasswordValid) {
        throw new ValidationError(
          [{ field: "password", message: "Invalid password" }],
          401
        );
      }
    }

    // Validate environment variables
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
      throw new Error("Required environment variables are not defined");
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "59m" }
    );

    const refreshToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Save the refresh token in the database
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
  async getUsers(): Promise<UserResponseDto[]> {
    console.log("UserService: getAllUsers called.");
    const users = await this.userRepository.findAll();
    if (users.length === 0) {
      throw new NotFoundError("Users Not Found");
    }
    console.log("UserService: getAllUsers data :.", users);

    return users.map(toUserDTO);
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

    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new ValidationError(
        [{ field: " email", message: "User with this email already exists" }],
        409
      );
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
    console.log("UserService: updateUser called.");

    // validate ID format
    validateObjectId(id);

    //Retrieve current user data
    const currentData = await this.userRepository.findById(id);
    if (!currentData) {
      throw new NotFoundError("User not found");
    }

    let hasChanges = false;

    // Handle nameupdate
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

  async refreshAccessToken(refreshToken: string): Promise<string> {
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

    if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
      throw new Error("Required environment variables are not defined");
    }

    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as {
      userId: string;
    };

    const user = await this.userRepository.findById(decoded.userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new ValidationError(
        [{ field: "refreshToken", message: "Invalid refresh token" }],
        403
      );
    }

    const accessToken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "59m" }
    );

    return accessToken;
  }

  // Create Customer With OTP
  async createCustomer(data: CreateCustomerRequestDto): Promise<UserResponseDto> {
    console.log("UserService: createCustomer called.");
    console.log("UserService: Request Data:", data);

    const existingUser = await this.userRepository.findByMobileNumber(data.mobileNumber);
    if (existingUser) {
      throw new ValidationError(
        [{ field: " mobileNumber", message: "User with this mobile Number already exists" }],
        403
      );
    }

    if (data.password && data.password.trim() !== "") {
      data.password =
        data.password.trim() && (await bcrypt.hash(data.password, 10));
    }

    const user = await this.userRepository.create(toCustomer(data));
    return toUserDTO(user);
  }



}

export default UserService;
