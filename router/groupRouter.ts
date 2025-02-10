import { Request, Response, Router } from "express";
import * as groupController from "../controller/groupController";
import {body} from "express-validator"
const groupRouter: Router = Router();


/*
   @usage:to get all data
   @method:GET
   @param:no-param
   @url:http://127.0.0.1:9988/groups
 */

groupRouter.get("/", async (request: Request, response: Response) => {
    await groupController.getAllGroups(request, response);
})


/*
    @usage : create a group
    @method : POST
    @params : name
    @url : http://localhost:8800/groups
*/

groupRouter.post("/",[
    body('name').not().isEmpty().withMessage("Name is required")
], async (request: Request, response: Response) => {
    console.log("post");
    await groupController.createGroup(request, response)
})


export default groupRouter;
