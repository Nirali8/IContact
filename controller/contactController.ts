import { Request, Response } from "express";
import ContactTable from "../database/ContactSchema";
import { IContact } from "../models/IContact";
import mongoose from "mongoose";
import UserTable from "../database/UserSchema";


/*
  @usage : to get all contact
  @method :GET
  @param : no-param
  @url : http://localhost:9988/groups
 */
export const getAllContact = async (request: Request, response: Response) => {
    try {
        let groups: IContact[] | undefined = await ContactTable.find();
        if (groups) {
            return response.status(200).json(groups);
        }
    }
    catch (error:any){
        return response.status(500).json({ msg: "Data not Found" });
    }
 }
/*
 @usage : to get a group
  @method :GET
  @param : no-param
  @url : http://localhost:9988/groups/:groupId
 */
export const getContact = async (request: Request, response: Response) => {
    let { contactId } = request.params;
    const mongoContactId = new mongoose.Types.ObjectId(contactId);
    let theContact: IContact | undefined | null = await ContactTable.findById(mongoContactId);
    if (!theContact) {
        return response.status(404).json({
            data: null,
            error: "No Group is Found",
        });
    }
    return response.status(200).json(theContact);
}
/*
    @usage : create a contact
    @method : POST
    @params : name
    @url : http://localhost:9988/groups
 */

export const createContact = async (request: Request, response: Response) => {
    let { user,name,imageUrl,mobile,email,company,title,groupId } = request.body;
    let theContact: IContact | null | undefined = await new ContactTable({
        user:user,
        name: name,
        imageUrl: imageUrl,
        mobile: mobile,
        email: email,
        company: company,
        title: title,
        groupId:groupId
    }).save();
    if (theContact) {
        return response.status(200).json({
            data: theContact,
            msg: "Contact is created",
        });
    }
};
