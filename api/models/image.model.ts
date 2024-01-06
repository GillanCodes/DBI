import { Date, ObjectId, Schema, model } from "mongoose";
import { IProperty, propertySchema } from "./property.model";

export interface IView {
    date: string | Date,
    viewer: string | ObjectId
}

export interface IImage extends Document
{
    _id: string | ObjectId,
    folderId: string,
    filePath:string,
    tags:[string],
    category:string,
    type:string,
    properties: [IProperty],
    views: [string],
    createdAt: Date | string,
    updatedAt: Date | string,
}

const imageSchema = new Schema<IImage>({
    folderId:   {type:String, required:true},
    filePath:   {type:String, required:true},
    tags:       {type:[String]},
    category:   {type:String},
    type:       {type: String, required:true, default:'img'},
    properties: {type: [propertySchema]},
    views:      {type: [{
        date:   {type: String, required:true},
        viewer: {type: String, required:true}
    }]}
}, {timestamps: true});

const imageModel = model<IImage>('image', imageSchema);
export default imageModel;