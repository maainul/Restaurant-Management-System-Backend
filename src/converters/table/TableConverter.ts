import CreateTableRequestDto from "../../dto/table/CreateTableRequest.dto";
import AssignTableRequestDto from '../../dto/table/AssignTableRequest.dto';
import TableResponseDto from "../../dto/table/TableResponse.dto";
import ITable from "../../interfaces/table/ITable";
import UpdateTableRequestDto from "../../dto/table/UpdateTableRequest.dto";


export const toTable = (data: CreateTableRequestDto | UpdateTableRequestDto): Partial<ITable> => {

    const tableData: Partial<ITable> = {}
    if (data.number) {
        tableData.tableNumber = data.number
    }
    if (data.isReserved) {
        tableData.isReserved = data.isReserved
    }
    if (data.capacity) {
        tableData.capacity = data.capacity
    }
    if (data.status) {
        tableData.status = data.status
    }

    return tableData
}

export const toAssignTable = (data: AssignTableRequestDto): Partial<ITable> => {
    return {

    }
}


export const toTableResponse = (data: ITable): TableResponseDto => {
    return {
        id: data._id?.toString(),
        tableNumber: data.tableNumber,
        status: data.status,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        capacity: 0,
        isReserved: data.isReserved

    }
}

// export default { toTableResponse, toAssignTable }