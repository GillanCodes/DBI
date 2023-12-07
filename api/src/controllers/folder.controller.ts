import { Request, Response } from "express"
import folderModel from "../../models/folder.model";
import log from "../../log";
import { isValidObjectId } from "mongoose";

export const createFolder = (req: Request, res: Response) => {
    try {
        const {name, description} = req.body;

        folderModel.create({
            name,
            description,
            creator: res.locals.user.id,
            icon: "default"
        }).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            log(err, 0);  
        })

    } catch (error) {
        return error
    }
}

export const getAllFolders = async (req:Request, res:Response) => {
    try {
        const folders = await folderModel.find();
        return res.status(201).send(folders);
    } catch (error) {
        // TODO : 
    }
}

export const getFolder = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        
        if (!isValidObjectId(id)) log('error not valid propertie `id` at getFolder', 0)

        const folders = await folderModel.findById(id);
        return res.status(201).send(folders);
    } catch (error) {
        // TODO :
    }
}

export const editFolder = (req:Request, res:Response) => {
    try {

        const { id } = req.params;
        if (!isValidObjectId(id)) log('error: Not Valid property `ID` at editFolder', 0);

        const {name, description, tags} = req.body;

        folderModel.findByIdAndUpdate(id, {
            $set: {
                name,
                description,
                tags
            }
        }, {upsert: true, new: true}).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            // TODO : 
        })

    } catch (error) {
        // TODO : 
    }
}