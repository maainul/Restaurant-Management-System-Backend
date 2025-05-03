import TableResponseDto from "./TableResponse.dto";

interface TableListResponse {
    startPageData: number;
    pageDataCount: number;
    numberOfPages: number;
    totalDataCount: number;
    upToPageTotalData: number;
    data: TableResponseDto[]
}

export default TableListResponse