import axios from "axios";

export const GET_IMAGES = "GET_IMAGES";

export const getImages = (count:number) => {
    return (dispatch:any) => {
        return axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}/image/`,
            withCredentials:true
        }).then((res) => {
            const array = res.data.slice(0, count)
            dispatch({type: GET_IMAGES, payload: array});
        }).catch((err) => {
            console.log(err);
        });
    };
};