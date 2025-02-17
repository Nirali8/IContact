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
  @param : userId
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
    @params : username,email,password,imageUrl,isAdmin
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

/*
    @usage : update a user
    @method : PUT
    @params : username,email,password,imageUrl,isAdmin
    @url : http://localhost:9988/users/userId
 */
export const userUpdate = async (request: Request, response: Response) => {
    try {
        let { userId } = request.params;

        let { username,email,password,imageUrl,isAdmin } = request.body;

        let updateUser: IUser | null | undefined = await UserTable.findByIdAndUpdate(
            userId,
            { username, email, password, imageUrl, isAdmin },
            { new: true }
        )
        if (updateUser) {
            return response.json({
                data: updateUser,
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
  @usage : to Delete user
  @method :DELETE
  @param : userId
  @url : http://localhost:9988/user/userId
 */

export const deleteUser = async (request: Request, response: Response) => {
    let { userId } = request.params;
    let deleteUser: IUser | null | undefined = await UserTable.findByIdAndDelete(userId);
    if (deleteUser) {
        return response.json({
            data: deleteUser,
            msg:"user Deleted successfully"
        })
    }
  }
