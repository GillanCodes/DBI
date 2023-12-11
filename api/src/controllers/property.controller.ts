import { Request, Response } from "express";
import propertyModel from "../../models/property.model";
import isEmpty from "../utils/isEmpty";
import imageModel from "../../models/image.model";

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

