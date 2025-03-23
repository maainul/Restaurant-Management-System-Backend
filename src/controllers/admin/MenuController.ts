import { Request, Response, NextFunction } from 'express';

import UpdateMenuItemRequestDto from "../../dto/menu/UpdateMenuItemRequest.dto";
import CreateMenuItemRequestDto from "../../dto/menu/CreateMenuItemRequest.dto";

import MenuRepository from './../../repositories/MenuRepository';
import MenuService from "../../services/MenuService";

import asyncHandler from "../../utils/asyncHandler"
import sendResponse from "../../utils/sendResponse";
import validateParmas from "../../utils/validateParams";

const menuRepository = new MenuRepository()
const menuService = new MenuService(menuRepository)

class MenuController {

    createMenu = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Log the start of the menu creation process
        console.log("MenuController: createMenu called")

        // Get the created data from the request body
        const menuData: CreateMenuItemRequestDto = req.body

        // Log the menu data
        console.log("MenuController: form data : ", menuData)
        
        const newMenu = await menuService.createMenuItem(menuData)
        sendResponse(res, 201, "Menu Created Successfully", newMenu)
    })

    updateMenu = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Log the start of the menu updation process
        console.log("MenuController: updateMenu called")

        // validate the request parameters
        validateParmas(req.params, ["id"])

        // Extract the menu id from the request parameters
        const id: string = req.params.id

        // Extract the menu update data from the request body
        const menuData: UpdateMenuItemRequestDto = req.body

        // Log the received form data for debugging purpose
        console.log("MenuController: form data : ", menuData)

        // Call the service to update the menu with the provided ID and data
        const updatedMenu = await menuService.updateMenuItem(id, menuData)

        // Send a success response with the updated menu
        sendResponse(res, 201, "Menu updated Successfully", updatedMenu)
    })

    getAllMenu = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("MenuController: getAllMenu called")
        const menus = await menuService.getMenuItems()
        sendResponse(res, 201, "All Menu Fetch Successfully", menus)
    })

    getMenuById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("MenuController: getMenuById called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        const menu = await menuService.getMenuItemById(id)
        sendResponse(res, 201, "Menu Fetch Successfully", menu)
    })

    deleteMenu = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("MenuController: deleteMenuId called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        await menuService.deleteMenuItem(id)
        sendResponse(res, 201, "Menu deleted Successfully")
    })

}

export default MenuController