import IPayment from "./IPayment";

export interface IPaymentRepository {
    create(payment: Partial<IPayment>): Promise<IPayment>;
    findById(id: string): Promise<IPayment | null>;
    findByOrderId(orderId: string): Promise<IPayment | null>;
    findAll(): Promise<IPayment[]>;
    update(id: string, payment: Partial<IPayment>): Promise<IPayment | null>;
    delete(id: string): Promise<boolean>;
}
