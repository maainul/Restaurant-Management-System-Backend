import { Request, Response, NextFunction } from 'express';

import PaymentRepository from '../../repositories/PaymentRepository';
import PaymentService from '../../services/PaymentService';

import asyncHandler from "../../utils/asyncHandler"
import sendResponse from "../../utils/sendResponse";
import validateParmas from "../../utils/validateParams";
import validateObjectId from "../../utils/isValidObjectId";
import CreatePaymentRequestDto from '../../dto/payment/CreatePaymentRequest.dto';


const paymentRepository = new PaymentRepository()
const paymentService = new PaymentService(paymentRepository)

class PaymentController {

    createPayment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("PaymentController: createPayment called")
        const PaymentData: CreatePaymentRequestDto = req.body
        console.log("BlogController: form data : ", PaymentData)
        const newPayment = await paymentService.createPayment(PaymentData)
        sendResponse(res, 201, "Payment Created Successfully", newPayment)
    })

    updatePayment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("PaymentController: updatePayment called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        if (!validateObjectId(id, res)) return
        const PaymentData: CreatePaymentRequestDto = req.body
        console.log("BlogController: form data : ", PaymentData)
        const newPayment = await paymentService.updatePayment(id, PaymentData)
        sendResponse(res, 201, "Payment updated Successfully", newPayment)
    })

    getAllPayment = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("PaymentController: getAllPayment called")
        const Payments = await paymentService.getPayments()
        sendResponse(res, 201, "All Payment Fetch Successfully", Payments)
    })

    getPaymentById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("PaymentController: getPaymentById called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        if (!validateObjectId(id, res)) return
        const Payment = await paymentService.getPaymentById(id)
        sendResponse(res, 201, "Payment Fetch Successfully", Payment)
    })

    deletePaymentId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("PaymentController: deletePaymentId called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        if (!validateObjectId(id, res)) return
        await paymentService.deletePayment(id)
        sendResponse(res, 201, "Payment deleted Successfully")
    })

}

export default PaymentController