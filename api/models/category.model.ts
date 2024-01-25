import { Date, ObjectId, Schema, model} from "mongoose";

export type TCategory = {
    _id         :   ObjectId |string,
    name        :   string,
    createdAt   :   Date | string,
    updatedAt   :   Date | string
};

const categorySchema = new Schema<TCategory>({
    name: {type:String, required:true},
});

const categoryModel = model<TCategory>('categories', categorySchema);
export default categoryModel;