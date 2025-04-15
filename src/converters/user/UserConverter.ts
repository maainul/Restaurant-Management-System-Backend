import CreateUserRequestDto from "../../dto/user/CreateUserRequest.dto";
import UpdateUserRequestDto from "../../dto/user/UpdateUserRequest.dto";
import UserResponseDto from "../../dto/user/UserResponse.dto";
import IUser from "../../interfaces/user/IUser";

export const toUser = (data: CreateUserRequestDto): Partial<IUser> => {
  const user: Partial<IUser> = {};

  if (data.email !== undefined) {
    user.email = data.email;
  }
  if (data.username !== undefined) {
    user.username = data.username;
  }
  if (data.role !== undefined) {
    user.role = data.role;
  }
  if (data.refreshToken !== undefined) {
    user.refreshToken = data.refreshToken;
  }
  if (data.password !== undefined) {
    user.password = data.password;
  }

  return user;
};

export const toUserDTO = (user: IUser): UserResponseDto => {
  return {
    _id: user._id?.toString() || "",
    username: user.username,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
