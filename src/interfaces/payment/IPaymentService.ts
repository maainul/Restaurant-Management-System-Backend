
import CreatePaymentRequestDto from '../../dto/payment/CreatePaymentRequest.dto';
import { PaymentResponseDto } from '../../dto/payment/PaymentResponse.dto';

export interface IPaymentService {
    createPayment(createPaymentDto: CreatePaymentRequestDto): Promise<PaymentResponseDto>;
    getPayments(): Promise<PaymentResponseDto[]>;
    getPaymentById(paymentId: string): Promise<PaymentResponseDto | null>;
    updatePayment(paymentId: string, updatePaymentDto: CreatePaymentRequestDto): Promise<PaymentResponseDto | null>;
    deletePayment(paymentId: string): Promise<boolean>;
}
