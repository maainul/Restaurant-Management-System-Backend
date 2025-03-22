import IOrder from "../interfaces/order/IOrder";
import { IOrderRepository } from "../interfaces/order/IOrderRepository";
import Order from './../models/order/Order.model';

class OrderRepository implements IOrderRepository {
    async create(order: IOrder): Promise<IOrder> {
        console.log("OrderRepository:create called")
        const result = await Order.create(order)
        return result
    }

    async findById(id: string): Promise<IOrder | null> {
        console.log("OrderRepository:findById called")
        const result = await Order.findById({ id })
        return result
    }

    async findByUserId(userId: string): Promise<IOrder[]> {
        console.log("OrderRepository:findByUserId called")
        const result = await Order.find({ userId: userId })
        return result
    }

    async findAll(): Promise<IOrder[]> {
        console.log("OrderRepository:findAll called")
        return await Order.find()
    }

    async updateStatus(id: string, status: string): Promise<IOrder | null> {
        console.log("OrderRepository:updateStatus called")
        const data = await Order.findByIdAndUpdate(id, {}, { new: true })
        return data
    }

    async delete(id: string): Promise<boolean> {
        console.log("OrderRepository:delete called")
        const result = await Order.findByIdAndDelete(id)
        return !!result
    }

}

export default OrderRepository