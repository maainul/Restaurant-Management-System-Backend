interface UpdateUserRequestDto {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string; // "user" | "admin" | "waiter" | "kitchenStaff"
  refreshToken?: string;
}

export default UpdateUserRequestDto;
