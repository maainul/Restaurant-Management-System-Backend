interface CreatePaymentRequestDto {
    userId: string;
    tableId?: string;
    totalAmount: number;
    paymentMethod: "cash" | "card" | "online";
    status?: "pending" | "completed" | "cancelled";
}

export default CreatePaymentRequestDto;
