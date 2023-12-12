import { GET_FOLDERS } from "../actions/folder.actions";

const initialState:object = {};

export default function foldersReducer(state = initialState, action:any)
{
    switch(action.type)
    {
        case GET_FOLDERS:
            return action.payload
        default:
            return state;
    }
}