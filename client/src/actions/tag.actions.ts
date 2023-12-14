import axios from "axios";

export const GET_TAGS = "GET_TAGS";
export const CREATE_TAG = "CREATE_TAG";
export const UPDATE_TAG = "UPDATE_TAG";
export const DELETE_TAG = "DELETE_TAG";

export const getTags = () => {
    return (dispatch:any) => {
        return axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}/tag/`,
            withCredentials:true
        }).then((res) => {
            dispatch({type: GET_TAGS, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const createTag = (name:string) => {
    return (dispatch:any) => {
        return axios({
            method:"POST",
            url:`${process.env.REACT_APP_API_URL}/tag/`,
            withCredentials:true,
            data: {
                name
            }
        }).then((res) => {
            dispatch({type: CREATE_TAG, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const updateTag = (name:string, id:string) => {
    return (dispatch:any) => {
        return axios({
            method:"PATCH",
            url:`${process.env.REACT_APP_API_URL}/tag/${id}`,
            withCredentials:true,
            data: {
                name
            }
        }).then((res) => {
            dispatch({type: UPDATE_TAG, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const deleteTag = (id:string) => {
    return (dispatch:any) => {
        return axios({
            method:"DELETE",
            url:`${process.env.REACT_APP_API_URL}/tag/${id}`,
            withCredentials:true,
        }).then((res) => {
            dispatch({type: DELETE_TAG, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
};