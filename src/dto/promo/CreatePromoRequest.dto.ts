export interface CreatePromoRequestDto {
    code: string;               // Promo code (e.g., "SAVE10")
    description: string;        // Description of the promo (e.g., "10% off on your next order")
    discountPercentage: number; // Discount percentage (e.g., 10 for 10%)
    validFrom: Date;            // Start date for the promo's validity
    validTill: Date;            // End date for the promo's validity
}

export default CreatePromoRequestDto;
