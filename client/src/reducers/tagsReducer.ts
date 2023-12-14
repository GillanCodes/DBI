import { CREATE_TAG, DELETE_TAG, GET_TAGS, UPDATE_TAG } from "../actions/tag.actions";
import { ITag } from "../types";

const initialState:object = {};

export default function tagsReducer(state:any = initialState, action:any)
{
    switch(action.type)
    {
        case GET_TAGS:
            return action.payload
        case CREATE_TAG:
            return [action.payload, ...state]
        case UPDATE_TAG:
            return state.map((tag:ITag) => {
                if (tag._id === action.payload._id) return action.payload;
                else return tag;
            });
        case DELETE_TAG:
            return state.map((tag:ITag) => {
                if (tag._id != action.payload._id) return tag; 
            });
        default:
            return state;
    }
}