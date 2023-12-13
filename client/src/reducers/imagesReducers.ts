import { CREATE_FOLDER } from "../actions/folder.actions";
import { GET_IMAGES } from "../actions/image.actions";

const initialState:object = {};

export default function imagesReducer(state = initialState, action:any)
{
    switch(action.type)
    {
        case GET_IMAGES:
            return action.payload
        case CREATE_FOLDER:
            return console.log(action.payload);
        default:
            return state;
    }
}