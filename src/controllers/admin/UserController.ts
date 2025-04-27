import { Request, Response, NextFunction } from 'express';

import UserService from '../../services/UserService';
import UserRepository from '../../repositories/UserRepository';

import asyncHandler from "../../utils/asyncHandler";
import sendResponse from '../../utils/sendResponse';
import validateParmas from '../../utils/validateParams';
import validateObjectId from '../../utils/isValidObjectId'
import UpdateUserRequestDto from '../../dto/user/UpdateUserRequest.dto';


const userRepository = new UserRepository()
const userService = new UserService(userRepository)



class UserController {
   
     updateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
       console.log("UserController: updateUser called.");

       // validate the request parameters
       validateParmas(req.params, ["id"]);
       const id: string = req.params.id;

       // Get the updated data from the request body
       const userData: Partial<UpdateUserRequestDto> = req.body;
       console.log("UserController: form data : ", userData);

       // Call the service to update the user
       const updatedUser = await userService.updateUser(id,userData);
      
       sendResponse(res, 201, "User updated Successfully", updatedUser);
     })

    getUsers = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        console.log("UserController:getUsers called")
        const users = await userService.getUsers()
        sendResponse(res,200,"User Fetch Successfully",users)
    })

    deleteUser = asyncHandler(async(req:Request,res:Response,next:NextFunction)=>{
        console.log("UserController:delete User called")
        validateParmas(req.params, ["id"]);
        const id: string = req.params.id;
        validateObjectId(id);
        const users = await userService.deleteUser(id);
        sendResponse(res,200,"User delete Successfully",users)
    })
   
}

export default UserController