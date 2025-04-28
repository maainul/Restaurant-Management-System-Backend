interface UpdateUserRequestDto {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  role?: string; // "user" | "admin" | "waiter" | "kitchenStaff"
  refreshToken?: string;

  name?: string;
  status?: string;
  address?: string;

  mobileNumber?: string;
}

export default UpdateUserRequestDto;
