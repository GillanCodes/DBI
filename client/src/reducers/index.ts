import { combineReducers } from "redux";
import userReducer from "./userReducer";
import imagesReducer from "./imagesReducer";
import foldersReducer from "./foldersReducer";
import tagsReducer from "./tagsReducer";
import propertiesReducer from "./propertiesReducer";

export default combineReducers({
    userReducer,    
    imagesReducer,
    foldersReducer,
    tagsReducer,
    propertiesReducer
});