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
        console.log("SubCategoryController: createSubCategory called")
        const subCategoryData: CreateSubcategoryRequestDto = req.body
        console.log("SubCategoryController: form data : ", subCategoryData)
        const newSubCategory = await subCategoryService.createSubcategory(subCategoryData)
        sendResponse(res, 201, "SubCategory Created Successfully", newSubCategory)
    })

    updateSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("SubCategoryController: updateSubCategory called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        const subCategoryData: UpdateSubcategoryRequestDto = req.body
        console.log("SubCategoryController: form data : ", subCategoryData)
        const newSubCategory = await subCategoryService.updateSubcategory(id, subCategoryData)
        sendResponse(res, 201, "SubCategory updated Successfully", newSubCategory)
    })

    getAllSubCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("SubCategoryController: getAllSubCategory called")
        const SubCategorys = await subCategoryService.getSubcategories()
        sendResponse(res, 201, "All SubCategory Fetch Successfully", SubCategorys)
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