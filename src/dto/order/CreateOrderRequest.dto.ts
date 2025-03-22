interface CreateOrderRequestDto {
    userId: string;
    items: {
        menuItemId: string;
        quantity: number;
        specialInstructions?: string;
    }[];
    tableId?: string;
    totalAmount: number;
    paymentMethod: string;
    status?: string
}

export default CreateOrderRequestDto;
