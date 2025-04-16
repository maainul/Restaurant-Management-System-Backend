interface UpdateOfferRequestDto {
  name?: string;
  description?: string;
  discount?: number;
  discountPercentage?: number;
  startDate?: Date;
  endDate?: Date;
  available?: boolean;
}

export default UpdateOfferRequestDto;
