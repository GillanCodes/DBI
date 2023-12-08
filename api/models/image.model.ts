import { Schema, model } from "mongoose";

export interface IProperty
{
    type: string,
    value: string
}

export interface IImage extends Document
{
    folderId: string,
    filePath:string,
    tags:[string],
    category:string
}

const imageSchema = new Schema<IImage>({
    folderId:   {type:String, required:true},
    filePath:   {type:String, required:true},
    tags:       {type:[String]},
    category:   {type:String}
});

const imageModel = model<IImage>('image', imageSchema);
export default imageModel;