
import { Request } from 'express';
import { toTable, toTableResponse } from '../converters/table/TableConverter';
import AssignTableRequestDto from '../dto/table/AssignTableRequest.dto';
import CreateTableRequestDto from '../dto/table/CreateTableRequest.dto';
import TableResponseDto from '../dto/table/TableResponse.dto';
import UpdateTableRequestDto from '../dto/table/UpdateTableRequest.dto';
import ConflictError from '../errors/ConflictError';
import NotFoundError from '../errors/NotFoundError';
import ITable from '../interfaces/table/ITable';
import ITableRepository from '../interfaces/table/ITableRepository';
import validateObjectId from '../utils/isValidObjectId';
import { paginateAndSearch } from '../utils/paginateAndSearch';
import validateTableData from '../utils/validateTableData';
import ITableService from './../interfaces/table/ITableService';
import TableListResponse from '../dto/table/TableListResponse.dto';


class TableService implements ITableService {

    private tableRepository: ITableRepository

    constructor(tableRepository: ITableRepository) {
        this.tableRepository = tableRepository
    }

    private async checkTableByTableNumber(name: string): Promise<ITable | null> {
        return await this.tableRepository.findByTableNumber(name)
    }

    async createTable(data: CreateTableRequestDto): Promise<ITable> {
        console.log("TableService:assignTable called")

        validateTableData(data)

        const tableExists: ITable | null = await this.checkTableByTableNumber(data.number)
        if (tableExists) {
            throw new ConflictError("Table Already Exists")
        }

        const tableData: Partial<ITable> = toTable(data)
        const table: ITable = await this.tableRepository.create(tableData)
        return toTableResponse(table)
    }

    async updateTable(data: UpdateTableRequestDto, id: string): Promise<TableResponseDto> {
        console.log("TableService:assignTable called")

        validateObjectId(id)

        const currentData = await this.tableRepository.findById(id)
        if (!currentData) {
            throw new NotFoundError("Table not found")
        }

        let hasChange = false

        if (data.capacity !== undefined && data.capacity !== currentData.capacity) {
            currentData.capacity = data.capacity
            hasChange = true
        }

        if (data.isReserved !== undefined && data.isReserved !== currentData.isReserved) {
            currentData.isReserved = data.isReserved
            hasChange = true
        }

        if (data.number !== undefined && data.number !== currentData.tableNumber) {
            currentData.tableNumber = data.number
            hasChange = true
        }

        if (data.status !== undefined && data.status !== currentData.status) {
            currentData.status = data.status
            hasChange = true
        }

        // Skip update if no changes detected
        if (!hasChange) {
            console.log("CategoryService: No Changes detected, skipping update")
            return toTableResponse(currentData)
        }

        // Persist changes to repository
        const tableData: Partial<ITable> = toTable(data)

        const table: ITable | null = await this.tableRepository.update(id, tableData)
        if (!table) {
            throw new NotFoundError("Table Not Found")
        }
        return toTableResponse(table)
    }

    async assignTable(assignTableDto: AssignTableRequestDto): Promise<ITable> {
        // console.log("TableService:assignTable called")
        // const tableData: Partial<ITable> = toTable(assignTableDto)
        // const table: ITable = await this.tableRepository.create(tableData)
        // return toTableResponse(table)
        throw new Error("Not Implemented")

    }

    async getTables(req: Request): Promise<TableListResponse> {
        console.log("TableService:assignTable called")
        const data: TableListResponse = await paginateAndSearch<ITable>({
            repository: this.tableRepository,
            query: req.query,
            searchableFields: ["tableNumber"],
            toResponseDto: toTableResponse,
        });

        return data
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