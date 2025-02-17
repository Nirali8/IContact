import { Request, Response } from "express";
import GroupsTable from "../database/GroupSchema";
import { IGroup } from "../models/IGroup";
import mongoose from "mongoose";

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
    catch (error: any) {
        return response.status(500).json({ msg: "Data not Found" });
    }
}

/*
 @usage : to get a group
  @method :GET
  @param : groupId
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
    @url : http://localhost:9988/groups/groupId
 */

export const createGroup = async (request: Request, response: Response) => {
    let { name } = request.body;
    console.log("create group", name);
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

/*
  @usage : to update Group
  @method :PUT
  @param : groupId
  @url : http://localhost:9988/groups/groupId
 */
export const updateGroup = async (request: Request, response: Response) => {
    let { groupId } = request.params;
    let { name } = request.body;
    // console.log("create group", name);
    let updateGroup: IGroup | null | undefined = await GroupsTable.findByIdAndUpdate(groupId, { name }, { new: true });
    if (updateGroup) {
        return response.json({
            data: updateGroup,
            msg:"Group updated successfully"
        })
    }
}

/*
  @usage : to Delete Group
  @method :DELETE
  @param : groupId
  @url : http://localhost:9988/groups/groupId
 */

export const deleteGroup = async (request: Request, response: Response) => {
    let { groupId } = request.params;
    let deleteGroup: IGroup | null | undefined = await GroupsTable.findByIdAndDelete(groupId);
    if (deleteGroup) {
        return response.json({
            data: deleteGroup,
            msg:"Group Deleted successfully"
        })
    }
  }
