import { Request, Response } from "express";
import imageModel from "../../models/image.model";

export const getRandomImage = async (req:Request, res:Response) => {
    try {
        const images = await imageModel.find();
        var rdm = Math.floor(Math.random() * images.length);

        return res.status(201).send(images[rdm]);

    } catch (error) {
        console.log(error, 0);
    }
}