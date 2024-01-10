import { GET_MEDIAS, GET_RANDOM_MEDIAS, LIKE_MEDIA, UPDATE_MEDIA } from "../actions/media.actions";
import { UPDATE_PROPERTY } from "../actions/property.actions";
import { IMedia } from "../types";

const initialState:object = {};

export default function mediasReducer(state:any = initialState, action:any)
{
    switch(action.type)
    {
        case GET_MEDIAS:
            return action.payload
        case GET_RANDOM_MEDIAS:
            return [action.payload]
        case UPDATE_MEDIA:
            return state.map((media:IMedia) => {
                if (media._id === action.payload._id) return action.payload;
                else return media;
            });
        case LIKE_MEDIA:
            return state.map((media:IMedia) => {
                if (media._id === action.payload.mData._id) return action.payload.mData;
                else return media;
            });
        case UPDATE_PROPERTY:
            return state.map((media:IMedia) => {
                if (media._id === action.payload._id) return action.payload;
                else return media;
            });
        default:
            return state;
    }
}