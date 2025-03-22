interface PromoResponseDto {
    id: string;
    code: string;
    description: string;
    discountPercentage: number;
    validFrom: Date;
    validTill: Date;
    createdAt: Date;
    updatedAt: Date;
}

export default PromoResponseDto