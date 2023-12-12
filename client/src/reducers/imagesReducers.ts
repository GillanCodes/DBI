import { GET_IMAGES } from "../actions/image.actions";

const initialState:object = {};

export default function imagesReducer(state = initialState, action:any)
{
    switch(action.type)
    {
        case GET_IMAGES:
            return action.payload
        default:
            return state;
    }
}