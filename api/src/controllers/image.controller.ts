import { Request, Response } from "express";
import { Document, Types, isValidObjectId } from "mongoose";
import * as fs from "fs";
import config from "../../config/config";
import imageModel, { IImage } from "../../models/image.model";
import log from "../../log";
import genUId from "../utils/genUID";
import isEmpty from "../utils/isEmpty";

export const createImages = async (req: any, res: Response) => {
    const files = req.files;
    const { folderId } = req.body;

    var results:any = [];

    try {

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            if (file.mimetype !==  "image/jpg" && file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") throw Error('user_patch_invalid_type_file');
            if (file.size > 5000000) throw Error('user_patch_file_max_size');

            var filename = `${genUId()}.png`;
            fs.writeFile(`${config.CDN_PATH}/${filename}`, file.buffer, (err:any) => {
                if (err) throw Error(err);
            });

            await imageModel.create({
                folderId,
                filePath: filename,
                tags: [""]
            }).then((data) => {
                results.push(data);
            }).catch((err) => {
                console.log(err);
            })   
        }
        return res.status(201).send(results); 
        
    } catch (error) {
        console.log(error);
    }
}

export const getImage = async (req:Request, res:Response) => {

    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) log('Error getImage : Invalid `id`', 0);
        
        const image = await imageModel.findById(id);
        if (!isEmpty(image)) return res.status(201).send(image);
        else return res.status(201).send('Image not found')

    } catch (error) {
        // TODO :        
    }
}

export const updateImage = (req:Request, res:Response) => {

    try {
        const { id } = req.params;
        if(!isValidObjectId) log("Error: updateImage : Invalid `id`", 0);

        const {tags, category} = req.body;
        const tagsArr = tags?.toLocaleString().split(',');

        imageModel.findByIdAndUpdate(id,  {
            $set: {
                tags: tagsArr,
                category
            }
        }, {upsert: true, new: true}).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            console.log(err);
        })

    } catch (error) {
        console.log(error)
    }

}

export const deleteImage = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        if(!isValidObjectId) log("Error: deleteImage : Invalid `id`", 0);

        const image:any = await imageModel.findByIdAndDelete(id);

        fs.unlink(`${config.CDN_PATH}/${image.filePath}`, (err) => {
            if (err) console.log(err);
        });

        return res.status(201).send(image);

    } catch (error) {
        console.log(error)
    }
}