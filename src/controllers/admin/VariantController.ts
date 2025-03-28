import { Request, Response, NextFunction } from 'express';

import VariantRepository from '../../repositories/VariantRepository';
import VariantService from '../../services/VariantService';

import asyncHandler from "../../utils/asyncHandler"
import sendResponse from "../../utils/sendResponse";
import validateParmas from "../../utils/validateParams";

import validateParams from '../../utils/validateParams';
import CreateVariantRequestDto from '../../dto/variation/CreateVariantRequest.dto';
import UpdateVariantRequestDto from '../../dto/variation/UpdateVariantRequest.dto';




const variantRepository = new VariantRepository()
const variantService = new VariantService(variantRepository)

class VariantController {

    createVariant = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("VariantController: createVariant called")

        const variantData: CreateVariantRequestDto = req.body

        console.log("VariantController: form data : ", variantData)

        const newVariant = await variantService.createVariant(variantData)

        sendResponse(res, 201, "Variant Created Successfully", newVariant)
    })

    updateVariant = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("VariantController: updateVariant called")

        // validate the request parameters
        validateParmas(req.params, ["id"])
        const id: string = req.params.id

        // Get the updated data from the request body
        const variantData: Partial<UpdateVariantRequestDto> = req.body

        console.log("VariantController: form data : ", variantData)

        // Call the service to update the variant
        const updatedVariant = await variantService.updateVariant(id, variantData)

        // send the response
        sendResponse(res, 200, "Variant updated Successfully", updatedVariant)
    })

    getAllVariant = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("VariantController: getAllVariant called")

        const Variants = await variantService.getVariants()

        sendResponse(res, 200, "All Variant Fetch Successfully", Variants)
    })

    getVariantById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("VariantController: getVariantById called")

        validateParams(req.params, ["id"])

        const id: string = req.params.id

        const variant = await variantService.getVariantById(id)

        sendResponse(res, 200, "Variant Fetch Successfully", variant)
    })

    deleteVariant = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("VariantController: deleteVariantId called")

        validateParmas(req.params, ["id"])

        const id: string = req.params.id

        await variantService.deleteVariant(id)

        sendResponse(res, 200, "Variant deleted Successfully")
    })

}

export default VariantController