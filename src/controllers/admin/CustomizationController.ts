import { Request, Response, NextFunction } from 'express';

import CustomizationRepository from '../../repositories/CustomizationRepository';
import CustomizationService from '../../services/CustomizationService';

import asyncHandler from "../../utils/asyncHandler"
import sendResponse from "../../utils/sendResponse";
import validateParmas from "../../utils/validateParams";

import validateParams from '../../utils/validateParams';

import CreateCustomizationRequestDto from '../../dto/customization/CreateCustomizationRequest.dto';
import UpdateCustomizationRequestDto from '../../dto/customization/UpdateCustomizationRequest.dto';




const customizationRepository = new CustomizationRepository()
const customizationService = new CustomizationService(customizationRepository)

class CustomizationController {

    createCustomization = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("CustomizationController: createCustomization called")

        const customizationData: CreateCustomizationRequestDto = req.body

        console.log("CustomizationController: form data : ", customizationData)

        const newCustomization = await customizationService.createCustomization(customizationData)

        sendResponse(res, 201, "Customization Created Successfully", newCustomization)
    })

    updateCustomization = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("CustomizationController: updateCustomization called")

        // validate the request parameters
        validateParmas(req.params, ["id"])
        const id: string = req.params.id

        // Get the updated data from the request body
        const customizationData: Partial<UpdateCustomizationRequestDto> = req.body

        console.log("CustomizationController: form data : ", customizationData)

        // Call the service to update the customization
        const updatedCustomization = await customizationService.updateCustomization(id, customizationData)

        // send the response
        sendResponse(res, 200, "Customization updated Successfully", updatedCustomization)
    })

    getAllCustomization = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("CustomizationController: getAllCustomization called")

        const Customizations = await customizationService.getCustomizations()

        sendResponse(res, 200, "All Customization Fetch Successfully", Customizations)
    })

    getCustomizationById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("CustomizationController: getCustomizationById called")

        validateParams(req.params, ["id"])

        const id: string = req.params.id

        const customization = await customizationService.getCustomizationById(id)

        sendResponse(res, 200, "Customization Fetch Successfully", customization)
    })

    deleteCustomization = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("CustomizationController: deleteCustomizationId called")

        validateParmas(req.params, ["id"])

        const id: string = req.params.id

        await customizationService.deleteCustomization(id)

        sendResponse(res, 200, "Customization deleted Successfully")
    })

}

export default CustomizationController