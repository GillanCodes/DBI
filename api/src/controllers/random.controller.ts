import { Request, Response } from "express";
import mediaModel, { IMedia } from "../../models/media.model";
import isEmpty from "../utils/isEmpty";
import { addView } from "./media.controller";

export const getRandomMedia = async (req:Request, res:Response) => {
    try {
        const medias = await mediaModel.find();
        var rdm = Math.floor(Math.random() * medias.length);

        return res.status(201).send(medias[rdm]);

    } catch (error) {
        console.log(error, 0);
    }
}

export const getRandomWithParams = async (req:Request, res:Response) => {
    try {
        const { category, tags, type, like, folderIds } = req.query;
        const tagsArr = tags?.toLocaleString().split(',');
        const folderIdArr = folderIds?.toLocaleString().split(',');
        var query:any = {}

        if (!isEmpty(category)) query.category = category!.toLocaleString().toLowerCase();
        if(!isEmpty(type)) query.type = type
        if (!isEmpty(tagsArr)) query.tags = {
            "$all" : tagsArr
        }
        if (like === "true") query.likes = {
            "$all" : res.locals.user._id
        }
        if (!isEmpty(folderIdArr)) query.folderId = {
            "$in" : folderIdArr
        }
        // if (!isEmpty(folderId)) query.folderId = folderId;
        
        const media = await mediaModel.find(query);
        var rdm = Math.floor(Math.random() * media.length);
        var FMedia:IMedia = media[rdm]

        addView(FMedia._id, res.locals.user._id);

        return res.status(201).send(FMedia);

    } catch (error) {
        // TODO :
    }
}