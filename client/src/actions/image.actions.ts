import axios from "axios";

export const GET_IMAGES = "GET_IMAGES";
export const CREATE_IMAGES = "CREATE_IMAGES";
export const UPDATE_IMAGE = "UPDATE_IMAGE";
export const DELETE_IMAGE = "DELETE_IMAGE";


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

export const getAllImages = () => {
    return (dispatch:any) => {
        return axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}/image/`,
            withCredentials:true
        }).then((res) => {
            const array = res.data
            dispatch({type: GET_IMAGES, payload: array});
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const getImage = (id:string) => {
    return (dispatch:any) => {
        return axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}/image/${id}`,
            withCredentials:true
        }).then((res) => {
            dispatch({type: GET_IMAGES, payload: [res.data]});
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const uploadImages = (data:any) => {
    return (dispatch:any) => {
        return axios({
            method:"post",
            url:`${process.env.REACT_APP_API_URL}/image/`,
            withCredentials:true,
            data
        }).then((res) => {
            dispatch({type: CREATE_IMAGES, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const updateImage = (id:string, tags:string, category:string) => {
    return (dispatch:any) => {
        return axios({
            method:"patch",
            url:`${process.env.REACT_APP_API_URL}/image/${id}`,
            withCredentials:true,
            data: {
                tags,
                category
            }
        }).then((res) => {
            dispatch({type: UPDATE_IMAGE, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
}

export const deleteImage = (id:string) => {
    return (dispatch:any) => {
        return axios({
            method:"DELETE",
            url:`${process.env.REACT_APP_API_URL}/image/${id}`,
            withCredentials:true,
        }).then((res) => {
            dispatch({type: DELETE_IMAGE, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
}