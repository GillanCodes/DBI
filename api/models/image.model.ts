import { Date, ObjectId, Schema, model } from "mongoose";

export interface IProperty
{
    type: string,
    value: string
}

export interface IImage extends Document
{
    _id: ObjectId,
    folderId: string,
    filePath:string,
    tags:[string],
    category:string,
    properties: [IProperty],
    views: [string],
    createdAt: Date,
    updatedAt: Date,
}

const imageSchema = new Schema<IImage>({
    folderId:   {type:String, required:true},
    filePath:   {type:String, required:true},
    tags:       {type:[String]},
    category:   {type:String},
    properties: {type: [{
        type: String,
        value: String
    }]}
}, {timestamps: true});

const imageModel = model<IImage>('image', imageSchema);
export default imageModel;