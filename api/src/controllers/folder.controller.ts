import { Request, Response } from "express"
import folderModel from "../../models/folder.model";
import log from "../../log";

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