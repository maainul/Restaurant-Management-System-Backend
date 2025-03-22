import { Request, Response, NextFunction } from 'express';

import CategoryRepository from '../../repositories/CategoryRepository';
import CategoryService from './../../services/CategoryService';

import CreateSubcategoryRequestDto from '../../dto/subcategory/CreateSubcategoryRequest.dto';
import UpdateSubcategoryRequestDto from '../../dto/subcategory/UpdateSubcategoryRequest.dto';

import asyncHandler from "../../utils/asyncHandler"
import sendResponse from "../../utils/sendResponse";
import validateParmas from "../../utils/validateParams";

import validateParams from '../../utils/validateParams';




const categoryRepository = new CategoryRepository()
const categoryService = new CategoryService(categoryRepository)

class CategoryController {

    createCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("CategoryController: createCategory called")
        const categoryData: CreateSubcategoryRequestDto = req.body
        console.log("BlogController: form data : ", categoryData)
        const newCategory = await categoryService.createCategory(categoryData)
        sendResponse(res, 201, "Category Created Successfully", newCategory)
    })

    updateCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("CategoryController: updateCategory called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        const categoryData: UpdateSubcategoryRequestDto = req.body
        console.log("BlogController: form data : ", categoryData)
        const newCategory = await categoryService.updateCategory(id, categoryData)
        sendResponse(res, 200, "Category updated Successfully", newCategory)
    })

    getAllCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("CategoryController: getAllCategory called")
        const Categorys = await categoryService.getCategories()
        sendResponse(res, 200, "All Category Fetch Successfully", Categorys)
    })

    getCategoryById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("CategoryController: getCategoryById called")
        validateParams(req.params, ["id"])
        const id: string = req.params.id
        const category = await categoryService.getCategoryById(id)
        sendResponse(res, 200, "Category Fetch Successfully", category)
    })

    deleteCategory = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("CategoryController: deleteCategoryId called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        await categoryService.deleteCategory(id)
        sendResponse(res, 200, "Category deleted Successfully")
    })

}

export default CategoryController