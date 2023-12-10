import { Date, ObjectId, Schema, model } from "mongoose"

export interface IFolder extends Document
{
    _id:            ObjectId,
    name:           string,
    description:    string,
    icon:           string,
    createdAt:      Date,
    updatedAt:      Date,
}

const folderSchema = new Schema<IFolder>({
    name: {type:String, required:true},
    description: {type:String, required:true},
    icon:{type:String, default:"none"}
}, {timestamps: true});

const folderModel = model<IFolder>('folder', folderSchema);
export default folderModel;