import { Schema, model } from "mongoose"

export interface IFolder extends Document
{
    name:           string,
    description:    string,
    icon:           string
}

const folderSchema = new Schema<IFolder>({
    name: {type:String, required:true},
    description: {type:String, required:true},
    icon:{type:String, default:"none"}
}, {timestamps: true});

const folderModel = model<IFolder>('folder', folderSchema);
export default folderModel;