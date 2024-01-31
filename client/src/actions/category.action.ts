import axios from "axios";

export const GET_CATEGORIES = "GET_CATEGORIES";
export const CREATE_CATEGORIES = "CREATE_CATEGORIES";
export const UPDATE_CATEGORIES = "UPDATE_CATEGORIES";
export const DELETE_CATEGORIES = "DELETE_CATEGORIES";

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

export const createCategories = (name:string) => {
    return (dispatch:any) => {
        return axios({
            method:"POST",
            url:`${process.env.REACT_APP_API_URL}/category/`,
            withCredentials:true,
            data: {
                name
            }
        }).then((res) => {
            dispatch({type: GET_CATEGORIES, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const updateCategories = (name:string, id:string) => {
    return (dispatch:any) => {
        return axios({
            method:"PATCH",
            url:`${process.env.REACT_APP_API_URL}/category/${id}`,
            withCredentials:true,
            data: {
                name
            }
        }).then((res) => {
            dispatch({type: GET_CATEGORIES, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const deleteCategories = (id:string) => {
    return (dispatch:any) => {
        return axios({
            method:"DELETE",
            url:`${process.env.REACT_APP_API_URL}/category/${id}`,
            withCredentials:true
        }).then((res) => {
            dispatch({type: GET_CATEGORIES, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
};