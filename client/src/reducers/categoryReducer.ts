import { GET_CATEGORIES } from "../actions/category.action";

const initialState:object = {};

export default function categoryReducer(state:any = initialState, action:any)
{
    switch(action.type)
    {
        case GET_CATEGORIES:
            return action.payload;
        default:
            return state;
    }
}