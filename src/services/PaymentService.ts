import { toPayment, toPaymentResponse } from "../converters/payment/PaymentConverter";
import CreatePaymentRequestDto from "../dto/payment/CreatePaymentRequest.dto";
import PaymentResponseDto from "../dto/payment/PaymentResponse.dto";
import IPayment from "../interfaces/payment/IPayment";
import { IPaymentRepository } from "../interfaces/payment/IPaymentRepository";
import { IPaymentService } from "../interfaces/payment/IPaymentService";


class PaymentService implements IPaymentService {
    private paymentRepository: IPaymentRepository;

    constructor(paymentRepository: IPaymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    // Create a new payment
    async createPayment(createPaymentDto: CreatePaymentRequestDto): Promise<PaymentResponseDto> {
        console.log("PaymentService: createPayment called");

        // Convert DTO to Model
        const paymentData: Partial<IPayment> = toPayment(createPaymentDto);

        // Call the repository to save the payment
        const payment = await this.paymentRepository.create(paymentData);

        // Convert the model back to DTO for response
        return toPaymentResponse(payment);
    }

    // Get all payments
    async getPayments(): Promise<PaymentResponseDto[]> {
        console.log("PaymentService: getPayments called");

        // Fetch all payments from the repository
        const payments = await this.paymentRepository.findAll();

        // Convert each payment model to DTO
        return payments.map(toPaymentResponse);
    }

    // Get a payment by its ID
    async getPaymentById(paymentId: string): Promise<PaymentResponseDto | null> {
        console.log("PaymentService: getPaymentById called");

        // Fetch payment by ID
        const payment = await this.paymentRepository.findById(paymentId);

        // Return the payment response DTO or null
        return payment ? toPaymentResponse(payment) : null;
    }

    // Update payment details
    async updatePayment(paymentId: string, updatePaymentDto: CreatePaymentRequestDto): Promise<PaymentResponseDto | null> {
        console.log("PaymentService: updatePayment called");

        // Convert DTO to update model
        const paymentData: Partial<IPayment> = toPayment(updatePaymentDto);

        // Call the repository to update the payment
        const updatedPayment = await this.paymentRepository.update(paymentId, paymentData);

        // Return the updated payment as DTO or null
        return updatedPayment ? toPaymentResponse(updatedPayment) : null;
    }

    // Delete a payment
    async deletePayment(paymentId: string): Promise<boolean> {
        console.log("PaymentService: deletePayment called");

        // Call the repository to delete the payment
        const deleted = await this.paymentRepository.delete(paymentId);

        return deleted;
    }
}

export default PaymentService;
