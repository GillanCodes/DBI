import { GET_FOLDERS, UPDATE_FOLDER } from "../actions/folder.actions";
import { IFolder } from "../types";

const initialState:object = {};

export default function foldersReducer(state:any = initialState, action:any)
{
    switch(action.type)
    {
        case GET_FOLDERS:
            return action.payload
        case UPDATE_FOLDER:
            return state.map((folder:IFolder) => {
                if (folder._id === action.payload._id) return action.payload;
                else return folder;
            })
        default:
            return state;
    }
}