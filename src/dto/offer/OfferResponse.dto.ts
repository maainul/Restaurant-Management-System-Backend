interface OfferResponseDto {
    id: string;
    name: string;
    description?: string;
    price: number;
    discount: number;
    startDate: Date;
    endDate: Date;
    available: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export default OfferResponseDto