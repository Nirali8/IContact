import { Request, Response } from "express";
import GroupsTable from "../database/GroupSchema";
import { IGroup } from "../models/IGroup";
import { request } from "http";
import mongoose from "mongoose";
import { error } from "console";


/*
  @usage : to get all group
  @method :GET
  @param : no-param
  @url : http://localhost:9988/groups
 */
export const getAllGroups = async (request: Request, response: Response) => {
    try {
        let groups: IGroup[] | undefined = await GroupsTable.find();
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
export const getGroup = async (request: Request, response: Response) => {
    let { groupId } = request.params;
    const mongoGroupId = new mongoose.Types.ObjectId(groupId);
    let theGroup: IGroup | undefined | null = await GroupsTable.findById(mongoGroupId);
    if (!theGroup) {
        return response.status(404).json({
            data: null,
            error: "No Group is Found",
        });
    }
    return response.status(200).json(theGroup);
}
/*
    @usage : create a group
    @method : POST
    @params : name
    @url : http://localhost:9988/groups
 */

export const createGroup = async (request: Request, response: Response) => {
    let { name } = request.body;
    console.log("create group",name);
    let theGroup: IGroup | null | undefined = await new GroupsTable({
        name: name,
    }).save();
    if (theGroup) {
        return response.status(200).json({
            data: theGroup,
            msg: "Group is created",
        });
    }
};
