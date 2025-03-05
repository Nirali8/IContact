import { Request, Response } from "express";
import mongoose from "mongoose";
import { IUser } from "../models/IUser";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"
import bcryptjs from "bcryptjs"
import gravatar from "gravatar"
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
export const registerUser = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors:errors.array()})
    }
    try {
        //read the form data
        let { username, email, password } = request.body;
        
        //check if user is exists
        const userObj = await UserTable.findOne({ email: email });
        if (userObj) {
            return response.status(400).json({
                data:null,
                error:"The user is already exists"
            })
        }
        //password encryption
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);

        // gravatar url
        const imageUrl = gravatar.url(email, {
            size:"200",
            rating:"pg",
            default:"mm"
        })

        //insert to db
        const newUser: IUser = {
            username: username,
            email: email,
            password: hashPassword,
            imageUrl: imageUrl,
            isAdmin:false
        }

        const theUserObj = await new UserTable(newUser).save();
        if (theUserObj) {
            return response.status(200).json({
                data: theUserObj,
                msg:"Registration is success!"
            })
        }
        
    } catch (error: any) {
        return response.status(500).json({
            // data:null,
            error: error.message
        });
    }
 }


 /*
    @usage : login user
    @method : POST
    @params : email,password
    @url : http://localhost:8800/users
*/

 export const loginUser = async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors:errors.array()})
    }
    try {
        //read the form data
        let {  email, password } = request.body;
        
        //check if user is exists
        const userObj :IUser|undefined|null= await UserTable.findOne({ email: email });
        if (!userObj) {
            return response.status(400).json({
                data:null,
                error:"The user is not exists"
            })
        }
        //check for password
        console.log("password",userObj.password);
        
        let isMatch: boolean = await bcryptjs.compare(password, userObj.password);
        if (!isMatch) {
            return response.status(500).json({
                error:"Invalid Password"
            })
        }

        //create a token
        const secretKey: string | undefined = process.env.JWT_SECRET_KEY;
        const payload: any = {
            user: {
                id: userObj._id,
                email: userObj.email
            }
        };
        if (secretKey && payload) {
            jwt.sign(payload, secretKey, {
                expiresIn:100000000000
            }, (error, encoded) => {
                if (error) throw error;
                if (encoded) {
                    return response.status(200).json({
                        token: encoded,
                        data: userObj,
                        msg:"Login is Success!"
                    })
                }
            })
        }        
    } catch (error: any) {
        return response.status(500).json({
            // data:null,
            error: error.message
        });
    }
 }
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
