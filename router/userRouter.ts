import { Request, Response, Router } from "express";
import * as userController from "../controller/userController";
import {body} from "express-validator"
const userRouter: Router = Router();


/*
   @usage:to get all data
   @method:GET
   @param:no-param
   @url:http://127.0.0.1:9988/users
 */

userRouter.get("/", async (request: Request, response: Response) => {
    await userController.getAllUsers(request, response);
})

/*
     @usage:to get a user
    @method:GET
    @param:no-param
    @url:http://localhost:9999/users/:userId
 */
userRouter.get("/:userId",async(request:Request,response:Response)=>{
    await userController.getUser(request, response);
})

/*
    @usage : create a user
    @method : POST
    @params : name
    @url : http://localhost:8800/users
*/

userRouter.post("/", async (request: Request, response: Response) => {
    console.log("post");
    await userController.createUser(request, response)
})


export default userRouter;
