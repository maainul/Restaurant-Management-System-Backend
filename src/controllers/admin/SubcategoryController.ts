import { Request, Response, NextFunction } from 'express';

import SubCategoryService from '../../services/SubcategoryService';
import SubcategoryRepository from '../../repositories/SubcategoryRepository';

import asyncHandler from "../../utils/asyncHandler"
import sendResponse from "../../utils/sendResponse";
import validateParmas from "../../utils/validateParams";

import CreateSubcategoryRequestDto from '../../dto/subcategory/CreateSubcategoryRequest.dto';
import UpdateSubcategoryRequestDto from './../../dto/subcategory/UpdateSubcategoryRequest.dto';
import CategoryRepository from '../../repositories/CategoryRepository';



const subCategoryRepository = new SubcategoryRepository()
const categoryRepository = new CategoryRepository()
const subCategoryService = new SubCategoryService(subCategoryRepository, categoryRepository)

class SubCategoryController {

    createSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {

        // Log the start of the subcategory creation process
        console.log("SubCategoryController: createSubCategory called")

        // Extract subcategory data from the request body
        const subCategoryData: CreateSubcategoryRequestDto = req.body

        // Log the received form data for debugging purpose
        console.log("SubCategoryController: form data : ", subCategoryData)

        // Set the default status for the new subcategory
        subCategoryData.status = 1 // Assuming 1 represents an "active" status

        // Call the service to create the subcategory
        const newSubCategory = await subCategoryService.createSubcategory(subCategoryData)

        // Send a success response with newly created subcategory
        sendResponse(res, 201, "SubCategory Created Successfully", newSubCategory)
    })

    updateSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Log the start of the subcategory creation process
        console.log("SubCategoryController: updateSubCategory called")

        // Validate the request params to ensure the id is provided
        validateParmas(req.params, ["id"])

        // Extract the subcategory id from the request parameters
        const id: string = req.params.id

        // Extract the subcateogry update data from the request body
        const subCategoryData: UpdateSubcategoryRequestDto = req.body

        // Log the received form data for debugging purpose
        console.log("SubCategoryController: form data : ", subCategoryData)

        // Call the service to update the subcategory with the provided ID and data
        const updatedSubCategory = await subCategoryService.updateSubcategory(id, subCategoryData)

        // Send a success response with the updated subcategory
        sendResponse(res, 201, "SubCategory updated Successfully", updatedSubCategory)
    })

    getAllSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("SubCategoryController: getAllSubCategory called")
        const subCategories = await subCategoryService.getSubcategories(req)
        sendResponse(res, 201, "All SubCategory Fetch Successfully", subCategories)
    })

    getSubCategoryById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("SubCategoryController: getSubCategoryById called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        const SubCategory = await subCategoryService.getSubcategoryById(id)
        sendResponse(res, 201, "SubCategory Fetch Successfully", SubCategory)
    })

    deleteSubCategoryId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("SubCategoryController: deleteSubCategoryId called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        await subCategoryService.deleteSubcategory(id)
        sendResponse(res, 201, "SubCategory deleted Successfully")
    })

}

export default SubCategoryController