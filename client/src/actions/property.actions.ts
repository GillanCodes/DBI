import axios from "axios";

export const CREATE_PROPERTY = "CREATE_PROPERTY";
export const GET_PROPERTIES = "GET_PROPERTIES";
export const UPDATE_PROPERTY = "UPDATE_PROPERTY";
export const DELETE_PROPERTY = "DELETE_PROPERTY";

export const createProperty = (name:string, type:string) => {
    return (dispatch:any) => {
        return axios({
            method:"POST",
            url:`${process.env.REACT_APP_API_URL}/property/`,
            withCredentials:true,
            data: {
                name,
                type
            }
        }).then((res) => {
            dispatch({type: CREATE_PROPERTY, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const getProperties = () => {
    return (dispatch:any) => {
        return axios({
            method:"GET",
            url:`${process.env.REACT_APP_API_URL}/property/`,
            withCredentials:true
        }).then((res) => {
            dispatch({type: GET_PROPERTIES, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
};