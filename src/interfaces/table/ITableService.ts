import AssignTableRequestDto from '../../dto/table/AssignTableRequest.dto';
import CreateTableRequestDto from '../../dto/table/CreateTableRequest.dto';
import TableResponseDto from '../../dto/table/TableResponse.dto';
import ITable from '../../interfaces/table/ITable';

interface ITableService {
    createTable(assignTableDto: CreateTableRequestDto): Promise<ITable>;
    assignTable(assignTableDto: AssignTableRequestDto): Promise<ITable>;
    getTables(): Promise<TableResponseDto[]>;
    getTableById(tableId: string): Promise<TableResponseDto | null>;
    releaseTable(tableId: string): Promise<void>;
}

export default ITableService
