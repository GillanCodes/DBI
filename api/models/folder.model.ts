import { Date, ObjectId, Schema, model } from "mongoose"

export interface IFolder extends Document
{
    _id:            ObjectId | string,
    name:           string,
    description:    string,
    icon:           string,
    createdAt:      Date | string,
    updatedAt:      Date | string
}

const folderSchema = new Schema<IFolder>({
    name: {type:String, required:true},
    description: {type:String, required:true},
    icon:{type:String, default:"none"}
}, {timestamps: true});

const folderModel = model<IFolder>('folder', folderSchema);
export default folderModel;