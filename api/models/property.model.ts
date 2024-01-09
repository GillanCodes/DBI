import { Document, Schema, model } from "mongoose";

export interface IProperty extends Document
{
    _id:    string,
    name:   string,
    type:   string,
    value:  string | number,
    createAt: Date | string,
    updatedAt: Date | string,
}

export const propertySchema = new Schema<IProperty>({
    name: {type:String, required:true},
    type: {type:String, required:true, default:"string"},
    value: {type: String}
}, {timestamps: true});

const propertyModel = model<IProperty>("properties", propertySchema);
export default propertyModel;