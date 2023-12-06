//Import libs
import { connect } from 'mongoose';
import config from './config';
import log from '../log';

//Connection to DB
connect(config.DB_CONNECT_STRING)
    .then(() => {
        log("MongoDB : Connected", "success");
    }).catch((err: string) => {
        log(err, "error");
    });