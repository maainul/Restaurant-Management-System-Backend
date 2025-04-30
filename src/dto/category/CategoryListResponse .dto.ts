import { CategoryResponseDto } from "./CategoryResponse.dto";

export interface CategoryListResponse {
    startPageData: number;
    pageDataCount: number;
    numberOfPages: number;
    totalDataCount: number;
    upToPageTotalData: number;
    data: CategoryResponseDto[];
  }
  