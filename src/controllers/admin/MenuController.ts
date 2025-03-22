import { Request, Response, NextFunction } from 'express';

import UpdateMenuItemRequestDto from "../../dto/menu/UpdateMenuItemRequest.dto";
import CreateMenuItemRequestDto from "../../dto/menu/CreateMenuItemRequest.dto";

import MenuRepository from './../../repositories/MenuRepository';
import MenuService from "../../services/MenuService";

import asyncHandler from "../../utils/asyncHandler"
import sendResponse from "../../utils/sendResponse";
import validateParmas from "../../utils/validateParams";
import validateObjectId from "../../utils/isValidObjectId";

const menuRepository = new MenuRepository()
const menuService = new MenuService(menuRepository)

class MenuController {

    createMenu = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("MenuController: createMenu called")
        const menuData: CreateMenuItemRequestDto = req.body
        console.log("BlogController: form data : ", menuData)
        const newMenu = await menuService.createMenuItem(menuData)
        sendResponse(res, 201, "Menu Created Successfully", newMenu)
    })

    updateMenu = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("MenuController: updateMenu called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        if (!validateObjectId(id, res)) return
        const menuData: UpdateMenuItemRequestDto = req.body
        console.log("BlogController: form data : ", menuData)
        const newMenu = await menuService.updateMenuItem(id, menuData)
        sendResponse(res, 201, "Menu updated Successfully", newMenu)
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
        if (!validateObjectId(id, res)) return
        const menu = await menuService.getMenuItemById(id)
        sendResponse(res, 201, "Menu Fetch Successfully", menu)
    })

    deleteMenuId = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("MenuController: deleteMenuId called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        if (!validateObjectId(id, res)) return
        await menuService.deleteMenuItem(id)
        sendResponse(res, 201, "Menu deleted Successfully")
    })

}

export default MenuController