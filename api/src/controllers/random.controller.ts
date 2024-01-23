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
        var tagsArr:string[] = [] 
        var folderIdArr:string[] = []
        var query:any = {}

        if (!isEmpty(folderIds)) folderIdArr = folderIds!.toLocaleString().split(',');
        if (!isEmpty(tags)) tagsArr = tags!.toLocaleString().split(',');

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
                
        const media = await mediaModel.find(query);
        var rdm = Math.floor(Math.random() * media.length);
        var FMedia:IMedia = media[rdm]

        if (!isEmpty(FMedia)) addView(FMedia._id, res.locals.user._id);

        return res.status(201).send(FMedia);

    } catch (error) {
        console.log(error)
    }
}