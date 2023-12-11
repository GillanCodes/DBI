import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import userModel from "../../models/user.model";

export const getUser = async (req:Request, res:Response) => {

    try {
        
        const { id } = req.params;
        if (!isValidObjectId(id)) throw Error('Invalid user id');

        const user = await userModel.findById(id);
        res.status(200).send(user);

    } catch (error) {
        console.log(error);
    }
}