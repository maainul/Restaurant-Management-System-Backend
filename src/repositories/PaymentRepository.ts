import IPayment from "../interfaces/payment/IPayment";
import { IPaymentRepository } from "../interfaces/payment/IPaymentRepository";
import Payment from './../models/payment/Payment.model';

class PaymentRepository implements IPaymentRepository {
    async create(payment: IPayment): Promise<IPayment> {
        console.log("PaymentRepository:create called")
        return await Payment.create(payment)
    }

    async findById(id: string): Promise<IPayment | null> {
        console.log("PaymentRepository:findById called")
        const result = await Payment.findById({ id })
        return result
    }

    async findByOrderId(orderId: string): Promise<IPayment | null> {
        console.log("PaymentRepository:findByOrderId called")
        const result = await Payment.findOne({ orderId: orderId })
        return result
    }

    async findAll(): Promise<IPayment[]> {
        console.log("PaymentRepository:findAll called")
        return await Payment.find()
    }

    async update(id: string, payment: Partial<IPayment>): Promise<IPayment | null> {
        console.log("PaymentRepository:update called")
        return Payment.findByIdAndUpdate(id, payment, { new: true })
    }

    async delete(id: string): Promise<boolean> {
        console.log("PaymentRepository:delete called")
        const result = await Payment.findByIdAndDelete(id)
        return !!result
    }
}

export default PaymentRepository