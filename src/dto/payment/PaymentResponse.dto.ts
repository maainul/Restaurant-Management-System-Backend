interface PaymentResponseDto {
    id: string;
    userId: string;
    tableId?: string;
    totalAmount: number;
    paymentMethod: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    orderId: string; // Make sure this is included
    amountts: number; // Make sure this is included
}

export default PaymentResponseDto