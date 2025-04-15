interface UpdateTableRequestDto {
    number: string;
    capacity: number;
    isReserved?: boolean;
    status?: number
}

export default UpdateTableRequestDto
