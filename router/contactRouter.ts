import { Request, Response, Router } from "express";
import * as contactController from "../controller/contactController";
const contactRouter: Router = Router();


/*
   @usage:to get all contact
   @method:GET
   @param:no-param
   @url:http://127.0.0.1:9988/groups
 */

contactRouter.get("/", async (request: Request, response: Response) => {
    await contactController.getAllContact(request, response);
})

/*
     @usage:to get a contact
    @method:GET
    @param:no-param
    @url:http://localhost:9999/groups/:groupId
 */
contactRouter.get("/:contactId",async(request:Request,response:Response)=>{
    await contactController.getContact(request, response);
})

/*
    @usage : create a contact
    @method : POST
    @params : name
    @url : http://localhost:8800/groups
*/

contactRouter.post("/",[
], async (request: Request, response: Response) => {
    console.log("post");
    await contactController.createContact(request, response)
})

/*
    @usage : update a user
    @method : PUT
    @params : name
    @url : http://localhost:8800/users/userId
*/

contactRouter.put("/:contactId", async (request: Request, response: Response) => {
    console.log("pUT contact");
    await contactController.contactUpdate(request, response);
})

/*
     @usage : delete a user
    @method : DELETE
    @params : userId
    @url : http://localhost:8800/users/userId
 */
contactRouter.delete("/:contactId", async (request: Request, response: Response) => {
    console.log("Delete contact");
    await contactController.deleteContact(request,response)
   
})

export default contactRouter;
