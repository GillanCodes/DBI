import config from "../config/config";
import * as jwt from 'jsonwebtoken';
import userModel from "../models/user.model";
import * as express from 'express';

module.exports.checkUser = async(req: express.Request, res: express.Response, next: () => void) => {
    let token = req.cookies.auth;
    if (token)
    {
        jwt.verify(token, config.JWT_TOKEN, async(err: any, decodedToken: any) => {
            if (err)
            {
                res.locals.user = null;
                next();
            } else {
                let user = await userModel.findById(decodedToken.id).select('-password');
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}

module.exports.requireAuth = (req: express.Request, res: express.Response, next: () => void) => {
    const token = req.cookies.auth;
    if (token)
    {
        jwt.verify(token, config.JWT_TOKEN, async (err: any, decodedToken: any) => {
            if (err)
            {
                console.log(err);
            } else {
                next();
            }
        })
    } else {
        return res.status(200);
    }
}