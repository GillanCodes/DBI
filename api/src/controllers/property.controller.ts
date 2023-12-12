import { Request, Response } from "express";
import propertyModel from "../../models/property.model";
import isEmpty from "../utils/isEmpty";
import imageModel, { IImage } from "../../models/image.model";
import { isValidObjectId } from "mongoose";

export const addProperty = (req: Request, res: Response) => {

    var results = {
        property : {},
        images : [{}],
    }

    try {
        
        const { name, type } = req.body;

        if (isEmpty(name) && isEmpty(type)) throw Error("missing args") // TODO : ERROR
        if (type === "count" || type === "string" || type === "rate")
        {
            propertyModel.create({
                name,
                type
            }).then(async (data) => {
                results.property = data;

                const images = await imageModel.find();
                for (let i = 0; i < images.length; i++) {
                    imageModel.findByIdAndUpdate(images[i]._id, {
                        $addToSet : {
                            properties: data
                        }
                    }, {upsert: true, new: true}).then((res) => {
                        results.images.push(res);
                    });
                }

                return res.status(201).send(results);
                //TODO : Fix images not on results 

            }).catch((err) => {
                console.log(err)
                // TODO :
            });
        } else {
            throw Error('wrong type');
            // TODO : ERROR
        }
    } catch (error) {
        console.log(error);
        // TODO :
    }
}

export const deleteProperty = async (req: Request, res: Response) => {

    var results:IImage[] = [];

    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) throw Error("invalid ID"); // TODO :

        const prop = await propertyModel.findByIdAndDelete(id);

        const images = await imageModel.find();
        for (let i = 0; i < images.length; i++) {
            await imageModel.findByIdAndUpdate(images[i]._id, {
                $pull: {
                    properties: {
                        _id: id
                    }
                }
            }, {upsert: true, new:true}).then((data) => {
                results.push(data)
            }).catch((err) => {
                console.log(err);
                // TODO :
            })
        }

        return res.status(201).send(results);

    } catch (error) {
        console.log(error);
        // TODO :
    }

}

export const updateValue = async (req: Request, res: Response) => {
    try {
        
        const {pid, iid} = req.params;
        const { value } = req.body;
        if (!isValidObjectId(pid)) throw Error('Invalid ID `pid`')
        if (!isValidObjectId(iid)) throw Error('Invalid ID `iid`')

        imageModel.updateOne({_id: iid, "properties._id": pid}, {
            $set: {
                "properties.$.value": value
            }
        }, {upsert: true, new:true}).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            console.log(err);
            // TODO :
        })


    } catch (error) {
        console.log(error)
        // TODO :
    }
}