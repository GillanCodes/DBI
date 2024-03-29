import { combineReducers } from "redux";
import userReducer from "./userReducer";
import mediasReducer from "./mediasReducer";
import foldersReducer from "./foldersReducer";
import tagsReducer from "./tagsReducer";
import propertiesReducer from "./propertiesReducer";
import categoryReducer from "./categoryReducer";

export default combineReducers({
    userReducer,    
    mediasReducer,
    foldersReducer,
    tagsReducer,
    propertiesReducer,
    categoryReducer,
});