import { Request, Response } from "express";
import isEmpty from "../utils/isEmpty";
import log from "../../log";
import tagModel from "../../models/tag.model";
import { isValidObjectId } from "mongoose";

export const addTag = (req:Request, res: Response) => {
    const { name } = req.body;
    if (isEmpty(name)) return log('Error in add Tag : empty or invalid field value `name`', 0);

    try {
        tagModel.create({
            name
        }).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error)
        // TODO :
    }
}

export const getTag = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) log("Error getTags : Invalid field `id`", 0);

        const tag = await tagModel.findById(id);
        return res.status(201).send(tag);
    } catch (error) {
        console.log(error);
        // TODO : 
    }
}

