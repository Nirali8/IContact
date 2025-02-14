import { Request, Response } from "express";
import mongoose from "mongoose";
import { IUser } from "../models/IUser";
import UserTable from "../database/UserSchema";


/*
  @usage : to get all user
  @method :GET
  @param : no-param
  @url : http://localhost:9988/users
 */
export const getAllUsers = async (request: Request, response: Response) => {
    try {
        let user: IUser[] | undefined = await UserTable.find();
        if (user) {
            return response.status(200).json(user);
        }
    }
    catch (error:any){
        return response.status(500).json({ msg: "Data not Found" });
    }
 }
/*
 @usage : to get a user
  @method :GET
  @param : no-param
  @url : http://localhost:9988/users/:userId
 */
export const getUser = async (request: Request, response: Response) => {
    let { userId } = request.params;
    const mongouserId = new mongoose.Types.ObjectId(userId);
    let theUser: IUser | undefined | null = await UserTable.findById(mongouserId);
    if (!theUser) {
        return response.status(404).json({
            data: null,
            error: "No user is Found",
        });
    }
    return response.status(200).json(theUser);
}
/*
    @usage : create a user
    @method : POST
    @params : name
    @url : http://localhost:9988/users
 */

export const createUser = async (request: Request, response: Response) => {
    let { username,email,password,imageUrl,isAdmin } = request.body;
    let theUser: IUser | null | undefined = await new UserTable({
        username: username,
        email: email,
        password: password,
        imageUrl: imageUrl,
        isAdmin:isAdmin
    }).save();
    if (theUser) {
        return response.status(200).json({
            data: theUser,
            msg: "user is created",
        });
    }
};