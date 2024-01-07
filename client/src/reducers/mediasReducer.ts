import { GET_MEDIAS, UPDATE_MEDIA } from "../actions/media.actions";
import { IMedia } from "../types";

const initialState:object = {};

export default function mediasReducer(state:any = initialState, action:any)
{
    switch(action.type)
    {
        case GET_MEDIAS:
            return action.payload
        case UPDATE_MEDIA:
            return state.map((media:IMedia) => {
                if (media._id === action.payload._id) return action.payload;
                else return media;
            })
        default:
            return state;
    }
}