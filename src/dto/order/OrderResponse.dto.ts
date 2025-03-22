export interface OrderResponseDto {
    id?: string;
    userId?: string;
    tableId?: string;
    items: { menuItemId: string; quantity: number }[];
    status: string;
    totalAmount: number;
    paymentMethod: string;
    createdAt: Date;
    updatedAt: Date;
}
