import { ObjectId, Schema, model } from "mongoose";

export interface ITag extends Document{
    _id:    ObjectId,
    name:   string,
}

const tagSchema = new Schema<ITag>({
    name: {type:String, required:true},
}, {timestamps: true});

const tagModel = model<ITag>('tag', tagSchema);
export default tagModel;