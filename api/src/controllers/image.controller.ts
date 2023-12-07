import { Request, Response } from "express";
import { Document, Types, isValidObjectId } from "mongoose";
import * as fs from "fs";
import config from "../../config/config";
import imageModel, { IImage } from "../../models/image.model";

function genUId()
{
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

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