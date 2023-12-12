import { combineReducers } from "redux";
import userReducer from "./userReducer";
import imagesReducer from "./imagesReducers";

export default combineReducers({
    userReducer,    
    imagesReducer
});