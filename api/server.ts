//Imports
import * as express from "express";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import * as cors from "cors";
import config from './config/config';
import log from "./log";

// Init app
let app:express.Application = express();

//Include database
require('./config/database');

//Config body-parse && cookie-parser
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit: 50000}));
app.use(bodyParser.json({limit: "50mb"}));
app.use(cookieParser());

//Config CORS
let whiteList = [undefined, 'http://localhost:5000', 'http://localhost:3000', "http://192.168.1.49:3000"];

const corsOptions:Object = {
    origin : function (origin:string, cb: (data: any, end: boolean) => void) {
        if (whiteList.indexOf(origin) !== -1)
        {
            cb(null, true);
        } else {
            cb(new Error('Not Allowed by CORS'), true);
        }
    },
    'credentials' : true,
    'allowHeaders' : ['sessionId', 'Content-Type', 'Authorization'],
    'exposedHeaders' : ['sessionId'],
    'methods' : 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 200
}
app.use(cors(corsOptions));

let {checkUser, requireAuth} = require('./middlewares/auth.middleware');
app.use(checkUser);
app.get('/api/jwtid', requireAuth, (req:express.Request, res:express.Response) => {
    res.status(200).send(res.locals.user.id);
});

app.use('/cdn', express.static(config.CDN_PATH))

//import routes
import authRoutes from "./src/routes/auth.routes";
import userRoutes from "./src/routes/user.router";
import folderRoutes from "./src/routes/folder.routes";
import mediaRoutes from "./src/routes/media.routes";
import randomRoutes from "./src/routes/random.routes";

import tagRoutes from "./src/routes/tag.routes";
import propertyRoutes from "./src/routes/property.routes";

//Routes init
app.use("/api/auth", authRoutes);
app.use("/api/user", requireAuth, userRoutes);
app.use("/api/folder", requireAuth, folderRoutes);
app.use("/api/media", requireAuth, mediaRoutes);
app.use("/api/random", requireAuth, randomRoutes);

app.use("/api/tag", requireAuth, tagRoutes);
app.use("/api/property", requireAuth, propertyRoutes);

//Set up server listen
app.listen(config.PORT, () : void => {
    log('App starting ...', 'info');
    log("App launched !", "success");
    log(`Listening on PORT : ${config.PORT}`, "info");
});