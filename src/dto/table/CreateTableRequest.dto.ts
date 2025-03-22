interface CreateTableRequestDto {
    number: number;
    capacity: number;
    isReserved?: boolean;
    status?: number
}

export default CreateTableRequestDto
