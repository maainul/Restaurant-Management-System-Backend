import CreateUserRequestDto from "../../dto/user/CreateUserRequest.dto"
import UserResponseDto from "../../dto/user/UserResponse.dto"
import IUser from "../../interfaces/user/IUser"

export const toUser = (userDTO: CreateUserRequestDto): Partial<IUser> => {
    return {
        username: userDTO.username,
        email: userDTO.email,
        password: userDTO.password,
        role: userDTO.role,
        refreshToken: userDTO.refreshToken
    }
}

export const toUserDTO = (user: IUser): UserResponseDto => {
    return {
        _id: user._id?.toString() || "",
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}