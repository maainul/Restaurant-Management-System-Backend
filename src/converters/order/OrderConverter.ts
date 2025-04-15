
import { Types } from "mongoose";
import CreateOrderRequestDto from "../../dto/order/CreateOrderRequest.dto";
import { OrderResponseDto } from "../../dto/order/OrderResponse.dto";
import UpdateOrderStatusRequestDto from "../../dto/order/UpdateOrderStatusRequest.dto";
import IOrder from "../../interfaces/order/IOrder";

// Convert CreateOrderRequest DTO to IOrder model instance
export const toOrder = (createOrderDto: CreateOrderRequestDto): Partial<IOrder> => {
    return {
        userId: new Types.ObjectId(createOrderDto.userId), // Assuming userId is passed as string
        tableId: createOrderDto.tableId ? new Types.ObjectId(createOrderDto.tableId) : undefined,
        items: createOrderDto.items.map(item => ({
            menuItemId: new Types.ObjectId(item.menuItemId), // Ensure the menuItemId is an ObjectId
            quantity: item.quantity,
            specialInstructions: item.specialInstructions || "",
            price: item.price || 0
        })),
        status: createOrderDto.status || "pending", // Default to "pending" if not provided
        totalAmount: createOrderDto.totalAmount,
        paymentMethod: createOrderDto.paymentMethod,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
};


// Convert IOrder model instance to OrderResponse DTO
export const toOrderResponse = (order: IOrder): OrderResponseDto => {
    return {
        id: order._id?.toString(),
        userId: order.userId.toString(),
        tableId: order.tableId?.toString(),
        items: order.items.map(item => ({
            menuItemId: item.menuItemId.toString(),
            quantity: item.quantity,
            specialInstructions: item.specialInstructions || "",
            price: item.price || 0
        })),
        status: order.status,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
    };
};


// Convert UpdateOrderStatusRequest DTO to IOrder model instance for updating status
export const toUpdatedOrderStatus = (updateOrderStatusDto: UpdateOrderStatusRequestDto): Partial<IOrder> => {
    return {
        status: updateOrderStatusDto.status,
    };
};
