import CreateOrderRequestDto from "../dto/order/CreateOrderRequest.dto";
import UpdateOrderStatusRequestDto from "../dto/order/UpdateOrderStatusRequest.dto";
import IOrder from "../interfaces/order/IOrder";
import { IOrderRepository } from "../interfaces/order/IOrderRepository";
import { IOrderService } from "../interfaces/order/IOrderService";

import { OrderResponseDto } from "../dto/order/OrderResponse.dto";
import { toOrder, toOrderResponse } from "../converters/order/OrderConverter";
import { toUpdatedOrderStatus } from './../converters/order/OrderConverter';
import validateOrderData from "../utils/validateOrderData";
import NotFoundError from './../errors/NotFoundError';
import validateObjectId from "../utils/isValidObjectId";
import { ValidationError } from './../errors/errors';

class OrderService implements IOrderService {
    private orderRepository: IOrderRepository;

    constructor(orderRepository: IOrderRepository) {
        this.orderRepository = orderRepository;
    }

    /**
  * Creates a new order after validating input data and checking for duplicates
  * @param createOrderDto - DTO containing order item creation data
  * @returns Promise resolving to the created order item response
  * @throws ConflictError if order item with same name exists
  */
    async createOrder(createOrderDto: CreateOrderRequestDto): Promise<OrderResponseDto> {
        console.log("OrderService: createOrder called");

        // validate input data structure
        validateOrderData(createOrderDto)

        // Convert DTO to model
        const orderData: Partial<IOrder> = toOrder(createOrderDto);
        const order: IOrder = await this.orderRepository.create(orderData);

        // Return the converted response DTO
        return toOrderResponse(order);
    }

    /**
  * Retrieves all order items from the repository
  * @returns Promise resolving to array of order item responses
  * @throws NotFoundError if no order items exist
  */
    async getOrders(): Promise<OrderResponseDto[]> {
        console.log("OrderService: getOrders called");
        // Fetch orders from the repository
        const orders: IOrder[] = await this.orderRepository.findAll();
        if (orders.length === 0) {
            throw new NotFoundError("No order found")
        }
        // Return the response DTOs
        return orders.map(toOrderResponse);
    }

    /**
     * Retrieves a specific order item by ID
     * @param orderId - ID of the order item to retrieve
     * @returns Promise resolving to the order item response
     * @throws ValidationError if order item doesn't exist
     */
    async getOrderById(orderId: string): Promise<OrderResponseDto> {
        console.log("OrderService: getOrderById called");

        // Validate ID format
        validateObjectId(orderId)

        // Fetch the order from the repository
        const order = await this.orderRepository.findById(orderId);
        if (!order) {
            throw new ValidationError([{ field: "id", message: "Order not found" }], 404)
        }
        return toOrderResponse(order);
    }

    /**
    * Updates an existing order status with partial data
    * @param orderItemId - ID of the order item to update
    * @param updateOrderStatusDto - Partial DTO containing fields to update
    * @returns Promise resolving to the updated order item response
    * @throws NotFoundError if order item doesn't exist
    * @throws ConflictError if name change conflicts with existing order item
    */
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

    /**
    * Deletes a order item by ID
    * @param orderItemId - ID of the order item to delete
    * @returns Promise resolving to boolean indicating success
    */
    async deleteOrder(orderId: string): Promise<boolean> {
        console.log("OrderService: deleteOrder called");
        // Call repository to delete the order
        const isDeleted = await this.orderRepository.delete(orderId);
        // Return whether the delete was successful
        return isDeleted;
    }
}

export default OrderService;
