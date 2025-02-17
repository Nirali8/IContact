import { Request, Response } from "express";
import ContactTable from "../database/ContactSchema";
import { IContact } from "../models/IContact";
import mongoose from "mongoose";


/*
  @usage : to get all contact
  @method :GET
  @param : no-param
  @url : http://localhost:9988/contact
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
 @usage : to get a contact
  @method :GET
  @param : no-param
  @url : http://localhost:9988/contact/contactID
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
    @params : user,name,imageUrl,mobile,emial,title,groupId
    @url : http://localhost:9988/contact
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

/*
    @usage : update a contact
    @method : PUT
    @params : user,name,imageUrl,mobile,emial,title,groupId
    @url : http://localhost:9988/contact/contactId
 */
export const contactUpdate = async (request: Request, response: Response) => {
    try {
        let { contactId } = request.params;

        let { user,name,imageUrl,mobile,email,title,groupId } = request.body;

        let updateContact: IContact | null | undefined = await ContactTable.findByIdAndUpdate(
            contactId,
            { user,name,imageUrl,mobile,email,title,groupId },
            { new: true }
        )
        if (updateContact) {
            return response.json({
                data: updateContact,
                msg: "user updated successfully"
            })
        }
    } catch (error) {
        console.error("Error retrieving user:", error);
        return response.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


/*
  @usage : to Delete contact
  @method :DELETE
  @param : contactId
  @url : http://localhost:9988/contact/contactId
 */

export const deleteContact = async (request: Request, response: Response) => {
    let { contactId } = request.params;
    let deleteContact: IContact | null | undefined = await ContactTable.findByIdAndDelete(contactId);
    if (deleteContact) {
        return response.json({
            data: deleteContact,
            msg:"user Deleted successfully"
        })
    }
  }

