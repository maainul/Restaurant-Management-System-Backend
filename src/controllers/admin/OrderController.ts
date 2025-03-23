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
        console.log("OrderController: createOrder called")
        const OrderData: CreateOrderRequestDto = req.body
        console.log("OrderController: form data : ", OrderData)
        const newOrder = await orderService.createOrder(OrderData)
        sendResponse(res, 201, "Order Created Successfully", newOrder)
    })

    updateOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("OrderController: updateOrder called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
     
        const OrderData: UpdateOrderStatusRequestDto = req.body
        console.log("OrderController: form data : ", OrderData)
        const newOrder = await orderService.updateOrderStatus(id, OrderData)
        sendResponse(res, 201, "Order updated Successfully", newOrder)
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
        if (!validateObjectId(id, res)) return
        const Order = await orderService.getOrderById(id)
        sendResponse(res, 201, "Order Fetch Successfully", Order)
    })

    deleteOrderId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("OrderController: deleteOrderId called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        if (!validateObjectId(id, res)) return
        await orderService.deleteOrder(id)
        sendResponse(res, 201, "Order deleted Successfully")
    })

}

export default OrderController