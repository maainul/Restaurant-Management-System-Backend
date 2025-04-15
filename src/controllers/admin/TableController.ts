import { Request, Response, NextFunction } from 'express';

import TableRepository from '../../repositories/TableRepository';
import TableService from '../../services/TableService';

import asyncHandler from "../../utils/asyncHandler"
import sendResponse from "../../utils/sendResponse";
import validateParmas from "../../utils/validateParams";

import CreateTableRequestDto from '../../dto/table/CreateTableRequest.dto';
import UpdateTableRequestDto from '../../dto/table/UpdateTableRequest.dto';



const tableRepository = new TableRepository()
const tableService = new TableService(tableRepository)

class TableController {

    createTable = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Log the start of the table creation process
        console.log("TableController: createTable called")

        // Get the created data from the request body
        const TableData: CreateTableRequestDto = req.body
        // Log the table data
        console.log("TableController: form data : ", TableData)

        const newTable = await tableService.createTable(TableData)

        sendResponse(res, 201, "Table Created Successfully", newTable)
    })

    updateTable = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        // Log the start of the table updation process
        console.log("TableController: updateTable called")

        // validate the request parameters
        validateParmas(req.params, ["id"])

        // Extract the menu id from the request parameters
        const id: string = req.params.id

        // Extract the table update data from the request body
        const TableData: UpdateTableRequestDto = req.body

        // Log the received form data for debugging purpose
        console.log("TableController: form data : ", TableData)

        const updatedTable = await tableService.updateTable(TableData, id)

        // Send a success response with the updated table
        sendResponse(res, 201, "Table updated Successfully", updatedTable)
    })

    getAllTable = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("TableController: getAllTable called")
        const Tables = await tableService.getTables()
        sendResponse(res, 201, "All Table Fetch Successfully", Tables)
    })

    getTableById = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("TableController: getTableById called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        const Table = await tableService.getTableById(id)
        sendResponse(res, 201, "Table Fetch Successfully", Table)
    })

    releaseTable = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        console.log("TableController: deleteTableId called")
        validateParmas(req.params, ["id"])
        const id: string = req.params.id
        await tableService.releaseTable(id)
        sendResponse(res, 201, "Table deleted Successfully")
    })

}

export default TableController