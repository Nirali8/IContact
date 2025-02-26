import { request, Request, Response, Router } from "express";
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
     @usage:to get a group
    @method:GET
    @param:no-param
    @url:http://localhost:9999/groups/:groupId
 */
groupRouter.get("/:groupId",async(request:Request,response:Response)=>{
    await groupController.getGroup(request, response);
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
    console.log("post Group");
    await groupController.createGroup(request, response)
})

/*
  @usage : to update Group
  @method :GET
  @param : no-param
  @url : http://localhost:9988/groups
 */
groupRouter.put("/:groupId", [
     body('name').not().isEmpty().withMessage("Name is required")
], async (request: Request, response: Response) => {
    console.log("PUT Group");
    await groupController.updateGroup(request,response)
})

/*
  @usage : to Delete Group
  @method :DELETE
  @param : groupId
  @url : http://localhost:9988/groups/groupId
 */
groupRouter.delete("/:groupId", async (request: Request, response: Response) => {
    console.log("Delete Group")
        await groupController.deleteGroup(request,response);
})

export default groupRouter;
