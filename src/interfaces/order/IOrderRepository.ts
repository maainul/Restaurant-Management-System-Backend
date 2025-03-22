import IOrder from "./IOrder";

export interface IOrderRepository {
    create(order: Partial<IOrder>): Promise<IOrder>;
    findById(id: string): Promise<IOrder | null>;
    findByUserId(userId: string): Promise<IOrder[]>;
    findAll(): Promise<IOrder[]>;
    updateStatus(id: string, status: string): Promise<IOrder | null>;
    delete(id: string): Promise<boolean>;
}
