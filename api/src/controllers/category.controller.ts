import { Request, Response } from "express";
import { isValidObjectId } from "mongoose";
import categoryModel from "../../models/category.model";
import isEmpty from "../utils/isEmpty";

export const addCategory = (req:Request, res:Response) => {
    const { name } = req.body;
    try {
        categoryModel.create({
            name
        }).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => {
            console.log(err);
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCategory = async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
        if (!isValidObjectId(id)) throw Error('Error: Invalid id in getCategory');

        const category = await categoryModel.findById(id);
        res.status(201).send(category);
    } catch(error) {
        console.log(error);
    }
}

export const getCategories = async (req:Request, res:Response) => {
    try {
       const categories = await categoryModel.find();
       res.status(201).send(categories); 
    } catch (error) {
        console.log(error)
    }
}

export const updateCategory = (req:Request, res:Response) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        if (!isValidObjectId(id)) throw Error('Error : not valid id from updateCategory');
        if (isEmpty(name)) throw Error('Error : name is empty');

        categoryModel.findByIdAndUpdate(id, {
            $set: {
                name
            }
        }, {upsert: true, new: true}).then((data) => {
            return res.status(201).send(data);
        }).catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
    }
}

export const deleteCategory = async (req:Request, res:Response) => {
    const { id } = req.params;
    try {
        if (!isValidObjectId(id)) throw Error('Error : Invalid id from deleteCategory');
        const category = await categoryModel.findByIdAndDelete(id);
        res.status(201).send(category)

    } catch (error) {
        console.log(error);
    }
}