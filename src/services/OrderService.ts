import CreateOrderRequestDto from "../dto/order/CreateOrderRequest.dto";
import UpdateOrderStatusRequestDto from "../dto/order/UpdateOrderStatusRequest.dto";
import IOrder from "../interfaces/order/IOrder";
import { IOrderRepository } from "../interfaces/order/IOrderRepository";
import { IOrderService } from "../interfaces/order/IOrderService";

import { OrderResponseDto } from "../dto/order/OrderResponse.dto";
import { toOrder, toOrderResponse } from "../converters/order/OrderConverter";
import { toUpdatedOrderStatus } from './../converters/order/OrderConverter';

class OrderService implements IOrderService {
    private orderRepository: IOrderRepository;

    constructor(orderRepository: IOrderRepository) {
        this.orderRepository = orderRepository;
    }

    async createOrder(createOrderDto: CreateOrderRequestDto): Promise<OrderResponseDto> {
        console.log("OrderService: createOrder called");
        // Convert DTO to model
        const orderData: Partial<IOrder> = toOrder(createOrderDto);
        // Call repository to save order
        const order: IOrder = await this.orderRepository.create(orderData);
        // Return the converted response DTO
        return toOrderResponse(order);
    }

    async getOrders(): Promise<OrderResponseDto[]> {
        console.log("OrderService: getOrders called");
        // Fetch orders from the repository
        const orders = await this.orderRepository.findAll();
        // Return the response DTOs
        return orders.map(toOrderResponse);
    }

    async getOrderById(orderId: string): Promise<OrderResponseDto | null> {
        console.log("OrderService: getOrderById called");
        // Fetch the order from the repository
        const order = await this.orderRepository.findById(orderId);
        // Return the response DTO or null if not found
        return order ? toOrderResponse(order) : null;
    }

    async updateOrderStatus(orderId: string, updateOrderStatusDto: UpdateOrderStatusRequestDto): Promise<OrderResponseDto | null> {
        console.log("OrderService: updateOrderStatus called");
        // Convert DTO to model update data
        const updatedOrderData: Partial<IOrder> = toUpdatedOrderStatus(updateOrderStatusDto);
        if (updatedOrderData.status) {
            const data = updatedOrderData.status
            // Call repository to update the order
            const updatedOrder = await this.orderRepository.updateStatus(orderId, data);
            // Return updated order response DTO
            return updatedOrder ? toOrderResponse(updatedOrder) : null;
        } else {
            return null
        }
    }

    async deleteOrder(orderId: string): Promise<boolean> {
        console.log("OrderService: deleteOrder called");
        // Call repository to delete the order
        const isDeleted = await this.orderRepository.delete(orderId);
        // Return whether the delete was successful
        return isDeleted;
    }
}

export default OrderService;
