interface CreateOrderRequestDto {
    userId: string;
    items: {
        menuItemId: string;
        quantity: number;
        specialInstructions?: string;
        price: number;
    }[];
    tableId?: string;
    totalAmount: number;
    paymentMethod: string;
    status?: string
}

export default CreateOrderRequestDto;
