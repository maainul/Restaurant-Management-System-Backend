import { Request, Response, NextFunction } from 'express';

import OfferRepository from '../../repositories/OfferRepository';
import OfferService from '../../services/OfferService';

import asyncHandler from "../../utils/asyncHandler"
import sendResponse from "../../utils/sendResponse";
import validateParmas from "../../utils/validateParams";
import validateObjectId from "../../utils/isValidObjectId";
import CreateOfferRequestDto from '../../dto/offer/CreateOfferRequest.dto';
import UpdateOfferRequestDto from '../../dto/offer/UpdateOfferRequest.dto';



const offerRepository = new OfferRepository()
const offerService = new OfferService(offerRepository)

class OfferController {

    createOffer = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("OfferController: createOffer called")
        const OfferData: CreateOfferRequestDto = req.body
        console.log("OfferController: form data : ", OfferData)
        const newOffer = await offerService.createOffer(OfferData)
        sendResponse(res, 201, "Offer Created Successfully", newOffer)
    })

    updateOffer = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("OfferController: updateOffer called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        
        const OfferData: UpdateOfferRequestDto = req.body
        console.log("OfferController: form data : ", OfferData)
        const newOffer = await offerService.updateOffer(id, OfferData)
        sendResponse(res, 201, "Offer updated Successfully", newOffer)
    })

    getAllOffer = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("OfferController: getAllOffer called")
        const Offers = await offerService.getOffers()
        sendResponse(res, 201, "All Offer Fetch Successfully", Offers)
    })

    getOfferById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("OfferController: getOfferById called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
     
        const Offer = await offerService.getOfferById(id)
        sendResponse(res, 201, "Offer Fetch Successfully", Offer)
    })

    deleteOfferId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("OfferController: deleteOfferId called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
    
        await offerService.deleteOffer(id)
        sendResponse(res, 201, "Offer deleted Successfully")
    })

}

export default OfferController