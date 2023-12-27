import { Request, Response } from "express";
import imageModel, { IImage } from "../../models/image.model";
import isEmpty from "../utils/isEmpty";
import { addView } from "./image.controller";

export const getRandomImage = async (req:Request, res:Response) => {
    try {
        const images = await imageModel.find();
        var rdm = Math.floor(Math.random() * images.length);

        return res.status(201).send(images[rdm]);

    } catch (error) {
        console.log(error, 0);
    }
}

export const getRandomWithParams = async (req:Request, res:Response) => {
    try {
        const { category, tags } = req.query;
        const tagsArr = tags?.toLocaleString().split(',');
        var query:any = {}

        if (!isEmpty(category)) query.category = category!.toLocaleString().toLowerCase();
        if (!isEmpty(tagsArr)) query.tags = {
            "$all" : tagsArr
        }
        
        const image = await imageModel.find(query);
        var rdm = Math.floor(Math.random() * image.length);
        var FImage:IImage = image[rdm];

        addView(FImage._id, res.locals.user._id);

        return res.status(201).send(FImage);

    } catch (error) {
        // TODO :
    }
}