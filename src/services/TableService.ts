
import { toTable, toTableResponse } from '../converters/table/TableConverter';
import AssignTableRequestDto from '../dto/table/AssignTableRequest.dto';
import CreateTableRequestDto from '../dto/table/CreateTableRequest.dto';
import ITable from '../interfaces/table/ITable';
import ITableRepository from '../interfaces/table/ITableRepository';
import ITableService from './../interfaces/table/ITableService';


class TableService implements ITableService {

    private tableRepository: ITableRepository

    constructor(tableRepository: ITableRepository) {
        this.tableRepository = tableRepository
    }

    async createTable(assignTableDto: CreateTableRequestDto): Promise<ITable> {
        console.log("TableService:assignTable called")
        const tableData: Partial<ITable> = toTable(assignTableDto)
        const table: ITable = await this.tableRepository.create(tableData)
        return toTableResponse(table)
    }

    async assignTable(assignTableDto: AssignTableRequestDto): Promise<ITable> {
        // console.log("TableService:assignTable called")
        // const tableData: Partial<ITable> = toTable(assignTableDto)
        // const table: ITable = await this.tableRepository.create(tableData)
        // return toTableResponse(table)
        throw new Error("Not Implemented")

    }

    async getTables(): Promise<ITable[]> {
        console.log("TableService:assignTable called")
        const tables = await this.tableRepository.findAll()
        return tables.map(toTableResponse)
    }

    async getTableById(tableId: string): Promise<ITable | null> {
        console.log("TableService:getTableById called")
        const table = await this.tableRepository.findById(tableId)
        return table ? toTableResponse(table) : null
    }

    async releaseTable(tableId: string): Promise<void> {
        console.log("TableService:assignTable called")
    }

}

export default TableService