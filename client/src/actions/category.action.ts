import axios from "axios";

export const GET_CATEGORIES = "GET_CATEGORIES";

export const getCategories = () => {
    return (dispatch:any) => {
        return axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}/category/`,
            withCredentials:true
        }).then((res) => {
            dispatch({type: GET_CATEGORIES, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
};