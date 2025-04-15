import { Request, Response, NextFunction } from 'express';

import OrderRepository from '../../repositories/OrderRepository';
import OrderService from '../../services/OrderService';

import asyncHandler from "../../utils/asyncHandler"
import sendResponse from "../../utils/sendResponse";
import validateParmas from "../../utils/validateParams";
import validateObjectId from "../../utils/isValidObjectId";
import CreateOrderRequestDto from '../../dto/order/CreateOrderRequest.dto';
import UpdateOrderStatusRequestDto from '../../dto/order/UpdateOrderStatusRequest.dto';



const orderRepository = new OrderRepository()
const orderService = new OrderService(orderRepository)

class OrderController {

    createOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Log the start of the order creation process
        console.log("OrderController: createOrder called")

        // Get the created data from the request body
        const OrderData: CreateOrderRequestDto = req.body
        // Log the order data
        console.log("OrderController: form data : ", OrderData)

        const newOrder = await orderService.createOrder(OrderData)

        sendResponse(res, 201, "Order Created Successfully", newOrder)
    })

    updateOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Log the start of the order updation process
        console.log("OrderController: updateOrder called")

        // validate the request parameters
        validateParmas(req.params, ["id"])

        // Extract the menu id from the request parameters
        const id: string = req.params.id

        // Extract the order update data from the request body
        const OrderData: UpdateOrderStatusRequestDto = req.body

        // Log the received form data for debugging purpose
        console.log("OrderController: form data : ", OrderData)

        const updatedOrder = await orderService.updateOrderStatus(id, OrderData)

        // Send a success response with the updated order
        sendResponse(res, 201, "Order updated Successfully", updatedOrder)
    })

    getAllOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("OrderController: getAllOrder called")
        const Orders = await orderService.getOrders()
        sendResponse(res, 201, "All Order Fetch Successfully", Orders)
    })

    getOrderById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("OrderController: getOrderById called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        const Order = await orderService.getOrderById(id)
        sendResponse(res, 201, "Order Fetch Successfully", Order)
    })

    deleteOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("OrderController: deleteOrderId called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        await orderService.deleteOrder(id)
        sendResponse(res, 201, "Order deleted Successfully")
    })

}

export default OrderController