import axios from "axios";

export const GET_FOLDERS = "GET_FOLDERS";

export const getFolders = () => {
    return (dispatch:any) => {
        return axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}/folder/`,
            withCredentials:true
        }).then((res) => {
            dispatch({type: GET_FOLDERS, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
};