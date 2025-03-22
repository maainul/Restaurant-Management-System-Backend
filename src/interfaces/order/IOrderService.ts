
import CreateOrderRequestDto from '../../dto/order/CreateOrderRequest.dto';
import { OrderResponseDto } from '../../dto/order/OrderResponse.dto';
import UpdateOrderStatusRequestDto from '../../dto/order/UpdateOrderStatusRequest.dto';

export interface IOrderService {
    createOrder(createOrderDto: CreateOrderRequestDto): Promise<OrderResponseDto>;
    getOrders(): Promise<OrderResponseDto[]>;
    getOrderById(orderId: string): Promise<OrderResponseDto | null>;
    updateOrderStatus(orderId: string, updateOrderStatusDto: UpdateOrderStatusRequestDto): Promise<OrderResponseDto | null>;
    deleteOrder(orderId: string): Promise<boolean>;
}
