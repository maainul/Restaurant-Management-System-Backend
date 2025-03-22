import CreateTableRequestDto from "../../dto/table/CreateTableRequest.dto";
import AssignTableRequestDto from '../../dto/table/AssignTableRequest.dto';
import TableResponseDto from "../../dto/table/TableResponse.dto";
import ITable from "../../interfaces/table/ITable";


export const toTable = (data: CreateTableRequestDto): Partial<ITable> => {
    return {
        tableNumber: data.number,
        isReserved: data.isReserved,
        capacity: data.capacity,
        status: data.status
    }
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