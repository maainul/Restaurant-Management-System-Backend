interface TableResponseDto {
    id?: string;
    tableNumber: number;
    status: number;
    capacity: number,
    isReserved: boolean,
    assignedOrderId?: string;
    createdAt: Date;
    updatedAt: Date;
}

export default TableResponseDto