interface CreateTableRequestDto {
    number: string;
    capacity: number;
    isReserved?: boolean;
    status?: number
}

export default CreateTableRequestDto
