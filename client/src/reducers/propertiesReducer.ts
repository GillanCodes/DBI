import { CREATE_PROPERTY, GET_PROPERTIES } from "../actions/property.actions";

const initialState:object = {};

export default function propertiesReducer(state:any = initialState, action:any)
{
    switch(action.type)
    {
        case CREATE_PROPERTY:
            return [action.payload, ...state]
        case GET_PROPERTIES:
            return action.payload;
        default:
            return state;
    }
}