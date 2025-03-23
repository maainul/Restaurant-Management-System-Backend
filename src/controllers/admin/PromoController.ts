import { Request, Response, NextFunction } from 'express';

import PromoRepository from '../../repositories/PromoRepository';
import PromoService from '../../services/PromoService';

import asyncHandler from "../../utils/asyncHandler"
import sendResponse from "../../utils/sendResponse";
import validateParmas from "../../utils/validateParams";
import validateObjectId from "../../utils/isValidObjectId";
import CreatePromoRequestDto from '../../dto/promo/CreatePromoRequest.dto';


const promoRepository = new PromoRepository()
const promoService = new PromoService(promoRepository)

class PromoController {

    createPromo = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("PromoController: createPromo called")
        const PromoData: CreatePromoRequestDto = req.body
        console.log("PromoController: form data : ", PromoData)
        const newPromo = await promoService.createPromo(PromoData)
        sendResponse(res, 201, "Promo Created Successfully", newPromo)
    })

    updatePromo = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("PromoController: updatePromo called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        const PromoData: CreatePromoRequestDto = req.body
        console.log("PromoController: form data : ", PromoData)
        const newPromo = await promoService.updatePromo(id, PromoData)
        sendResponse(res, 201, "Promo updated Successfully", newPromo)
    })

    getAllPromo = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("PromoController: getAllPromo called")
        const Promos = await promoService.getPromos()
        sendResponse(res, 201, "All Promo Fetch Successfully", Promos)
    })

    getPromoById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("PromoController: getPromoById called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        const Promo = await promoService.getPromoById(id)
        sendResponse(res, 201, "Promo Fetch Successfully", Promo)
    })

    deletePromoId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("PromoController: deletePromoId called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        await promoService.deletePromo(id)
        sendResponse(res, 201, "Promo deleted Successfully")
    })

}

export default PromoController