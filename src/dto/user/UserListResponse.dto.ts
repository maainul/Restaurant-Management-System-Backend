import UserResponseDto from './UserResponse.dto';

interface UserListResponse {
    startPageData: number;
    pageDataCount: number;
    numberOfPages: number;
    totalDataCount: number;
    upToPageTotalData: number;
    data: UserResponseDto[]
}

export default UserListResponse