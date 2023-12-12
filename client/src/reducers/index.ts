import { combineReducers } from "redux";
import userReducer from "./userReducer";
import imagesReducer from "./imagesReducers";
import foldersReducer from "./foldersReducers";

export default combineReducers({
    userReducer,    
    imagesReducer,
    foldersReducer
});