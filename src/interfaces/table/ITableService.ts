import { Request } from 'express';

import AssignTableRequestDto from '../../dto/table/AssignTableRequest.dto';
import CreateTableRequestDto from '../../dto/table/CreateTableRequest.dto';
import TableListResponse from '../../dto/table/TableListResponse.dto';
import TableResponseDto from '../../dto/table/TableResponse.dto';
import ITable from '../../interfaces/table/ITable';

interface ITableService {
    createTable(assignTableDto: CreateTableRequestDto): Promise<ITable>;
    assignTable(assignTableDto: AssignTableRequestDto): Promise<ITable>;
    getTables(req: Request): Promise<TableListResponse>;
    getTableById(tableId: string): Promise<TableResponseDto | null>;
    releaseTable(tableId: string): Promise<void>;
}

export default ITableService
