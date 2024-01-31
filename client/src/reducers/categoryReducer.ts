import { CREATE_CATEGORIES, DELETE_CATEGORIES, GET_CATEGORIES, UPDATE_CATEGORIES } from "../actions/category.action";
import { ICategory } from "../types";

const initialState:object = {};

export default function categoryReducer(state:any = initialState, action:any)
{
    switch(action.type)
    {
        case GET_CATEGORIES:
            return action.payload;
        case CREATE_CATEGORIES:
            return [action.payload, ...state];
        case UPDATE_CATEGORIES:
            return state.map((category:ICategory) => {
                if (category._id === action.payload._id) return action.payload;
                else return category;
            });
        case DELETE_CATEGORIES:
            return state.filter((cat:ICategory) => cat._id !== action.payload._id);
        default:
            return state;
    }
}