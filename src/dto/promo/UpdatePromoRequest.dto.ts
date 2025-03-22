export interface UpdatePromoRequestDto {
    code?: string;              // Promo code (optional for updates)
    description?: string;       // Description of the promo (optional for updates)
    discountPercentage?: number; // Discount percentage (optional for updates)
    validFrom?: Date;           // Start date for the promo's validity (optional for updates)
    validTill?: Date;           // End date for the promo's validity (optional for updates)
}

export default UpdatePromoRequestDto;
