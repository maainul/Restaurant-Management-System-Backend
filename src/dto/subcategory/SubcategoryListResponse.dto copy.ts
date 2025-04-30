import { CategoryResponseDto } from "../category/CategoryResponse.dto";

interface SubcategoryListResponseDto {
    startPageData: number;
       pageDataCount: number;
       numberOfPages: number;
       totalDataCount: number;
       upToPageTotalData: number;
       data: CategoryResponseDto[];
}

export default SubcategoryListResponseDto