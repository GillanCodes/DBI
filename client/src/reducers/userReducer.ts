import { LIKE_MEDIA } from "../actions/media.actions";
import { GET_USER } from "../actions/user.actions";

const initialState:object = {};

export default function userReducer(state = initialState, action:any)
{
    switch(action.type)
    {
        case GET_USER:
            return action.payload
        case LIKE_MEDIA:
            return action.payload.uData
        default:
            return state;
    }
}