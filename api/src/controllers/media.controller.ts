import { Request, Response } from "express";
import { ObjectId, isValidObjectId } from "mongoose";
import * as fs from "fs";
import config from "../../config/config";
import mediaModel from "../../models/media.model";
import log from "../../log";
import genUId from "../utils/genUID";
import isEmpty from "../utils/isEmpty";
import propertyModel from "../../models/property.model";

export function addView(id:string | ObjectId, userId:string)
{
    mediaModel.findByIdAndUpdate(id, {
        $addToSet: {
            views: {
                date: Date.now(),
                viewer: userId
            }
        }
    }, {upsert: true, new:true}).then((data) => {
        return;
    }).catch((err) => console.log(err))
}

function checkType(type:any) {
    if (
        type === "image/jpg" ||
        type === "image/png" ||
        type === "image/jpeg" ||
        type === "image/gif" ||
        type === "image/x-icon"
    ) return "img"

    if (
        type === "video/webm" ||
        type === "video/webp" ||
        type === "video/x-msvideo" ||
        type === "video/mpeg" ||
        type === "video/mp4" ||
        type === "video/ogg"
    ) return "video"
}

export const createMedias = async (req: any, res: Response) => {
    const files = req.files;
    const { folderId } = req.body;

    var results:any = [];

    try {

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            
            if (
                file.mimetype !==  "image/jpg" && 
                file.mimetype !== "image/png" &&
                file.mimetype !== "image/jpeg" &&
                file.mimetype !== "image/gif" &&
                file.mimetype !== "image/x-icon" &&
                file.mimetype !== "video/webm" &&
                file.mimetype !== "video/webp" &&
                file.mimetype !== "video/x-msvideo" &&
                file.mimetype !== "video/mpeg" &&
                file.mimetype !== "video/mp4" &&
                file.mimetype !== "video/ogg")

                throw Error('image_upload_invalid_type_file');
            if (file.size > 5000000) throw Error('image_upload_file_max_size');

            var filename = `${genUId()}.png`;
            fs.writeFile(`${config.CDN_PATH}/uploads/${filename}`, file.buffer, (err:any) => {
                if (err) throw Error(err);
            });

            var properties = await propertyModel.find();

            await mediaModel.create({
                folderId,
                filePath: filename,
                tags: [""],
                type: checkType(file.mimetype),
                properties
            }).then((data) => {
                results.push(data);
            }).catch((err) => {
                console.log(err);
            })   
        }

        addView(results._id, res.locals.user._id);
        return res.status(201).send(results); 
        
    } catch (error) {
        console.log(error);
    }
}

export const getMedias = async (req: Request, res:Response) => {
    try {
        const medias = await mediaModel.find().sort({createdAt: -1});
        return res.status(200).send(medias);
    } catch (error) {
        console.log(error)
        // TODO :
    }
}

export const getMedia = async (req:Request, res:Response) => {

    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) log('Error getImage : Invalid `id`', 0);
        
        const media = await mediaModel.findById(id);
        addView(id, res.locals.user._id);
        if (!isEmpty(media)) return res.status(201).send(media);
        else return res.status(201).send('Image not found')

    } catch (error) {
        // TODO :        
    }
}

export const getMediasWithParams = async (req:Request, res:Response) => {
    try {
        const { category, tags, folderId, type} = req.query;
        const tagsArr = tags?.toLocaleString().split(',');
        var query:any = {}

        if (!isEmpty(folderId)) query.folderId = folderId;
        if (!isEmpty(type)) query.type = type;
        if (!isEmpty(category)) query.category = category?.toLocaleString().toLocaleLowerCase();
        if (!isEmpty(tagsArr)) query.tags = {
            "$all" : tagsArr
        }
        
        
        const medias = await mediaModel.find(query).sort({createdAt: -1});
        return res.status(201).send(medias);

    } catch (error) {
        // TODO :
    }
}

export const getMediasFromFolder = async (req:Request, res:Response) => {
    try {
        const { folderId } = req.params;
        console.log(folderId)
        if(isEmpty(folderId)) throw Error('id is invalid at getmediasfromfolder')
        
        const medias = await mediaModel.find({folderId: folderId}).sort({createdAt: -1});
        return res.status(201).send(medias);

    } catch (error) {
        console.log(error)
    }
}

export const updateMedia = (req:Request, res:Response) => {

    try {
        const { id } = req.params;
        if(!isValidObjectId) log("Error: updateMedia : Invalid `id`", 0);

        const {tags, category} = req.body;
        const tagsArr = tags?.toLocaleString().split(',');

        mediaModel.findByIdAndUpdate(id,  {
            $set: {
                tags: tagsArr,
                category: category.toLocaleString().toLocaleLowerCase()
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

export const deleteMedia = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        if(!isValidObjectId) log("Error: deleteImage : Invalid `id`", 0);

        const media:any = await mediaModel.findByIdAndDelete(id);

        fs.unlink(`${config.CDN_PATH}/${media.filePath}`, (err) => {
            if (err) console.log(err);
        });

        return res.status(201).send(media);

    } catch (error) {
        console.log(error)
    }
}