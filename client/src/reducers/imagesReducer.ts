import { GET_IMAGES, UPDATE_IMAGE } from "../actions/image.actions";
import { IImage } from "../types";

const initialState:object = {};

export default function imagesReducer(state:any = initialState, action:any)
{
    switch(action.type)
    {
        case GET_IMAGES:
            return action.payload
        case UPDATE_IMAGE:
            return state.map((image:IImage) => {
                if (image._id === action.payload._id) return action.payload;
                else return image;
            })
        default:
            return state;
    }
}