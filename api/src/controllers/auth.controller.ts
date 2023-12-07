import {sign} from "jsonwebtoken";
import config from "../../config/config";
import * as express from "express";
import userModel from '../../models/user.model';
import { loginErrors, registerErrors } from "../errors/auth.errors";
import log from "../../log";

/**
 * @param {number} maxAge Define the max age of the auth cookie 
 */
const maxAge:number = 3*21*60*60*1000;

/** @method 
 * @name createToken
*/
const createToken = (id:string) => {
    return sign({id}, config.JWT_TOKEN as string, {
        expiresIn: maxAge
    });
};

//create a new user "signup"
export const signup = async (req: express.Request, res: express.Response) => {
    const {username, email, password}: {username:string,email:string,password:string} = req.body;
    try {
        const user = await userModel.create({username, email, password});
        log(`New user created : ${user._id}`, "info")
        return res.status(201).json({user:user._id});
    } catch (error:any) {
        const errors = registerErrors(error);
        res.status(200).send({errors});
    };
};

//to login a user "signin"
export const signin = async (req: express.Request, res: express.Response) => {
    const {log, password}: {log:string,password:string} = req.body;
    
    try {
        var user = await userModel.login(log, password);
        const token:string = createToken(user._id);
        res.cookie('auth', token, {httpOnly: true, maxAge});
        return res.status(200).json({user});
    } catch (error) {
        const errors = loginErrors(error);
        res.status(201).send({errors});
    };
};

//to logout a user "signout"
export const signout = async(req: express.Request, res: express.Response) => {
    res.cookie("auth", null, {httpOnly: true, maxAge: 1});
    return res.status(200).send('logout');
};