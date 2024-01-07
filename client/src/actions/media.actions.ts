import axios from "axios";

export const GET_MEDIAS = "GET_MEDIAS";
export const CREATE_MEDIAS = "CREATE_MEDIAS";
export const UPDATE_MEDIA = "UPDATE_MEDIA";
export const DELETE_MEDIA = "DELETE_MEDIA";


export const getMedias = (count:number) => {
    return (dispatch:any) => {
        return axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}/media/`,
            withCredentials:true
        }).then((res) => {
            const array = res.data.slice(0, count)
            dispatch({type: GET_MEDIAS, payload: array});
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const getAllMedias = () => {
    return (dispatch:any) => {
        return axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}/media/`,
            withCredentials:true
        }).then((res) => {
            const array = res.data
            dispatch({type: GET_MEDIAS, payload: array});
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const getMedia = (id:string) => {
    return (dispatch:any) => {
        return axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}/media/${id}`,
            withCredentials:true
        }).then((res) => {
            dispatch({type: GET_MEDIAS, payload: [res.data]});
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const uploadMedias = (data:any) => {
    return (dispatch:any) => {
        return axios({
            method:"post",
            url:`${process.env.REACT_APP_API_URL}/media/`,
            withCredentials:true,
            data
        }).then((res) => {
            dispatch({type: CREATE_MEDIAS, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
};

export const updateMedia = (id:string, tags:string, category:string) => {
    return (dispatch:any) => {
        return axios({
            method:"patch",
            url:`${process.env.REACT_APP_API_URL}/media/${id}`,
            withCredentials:true,
            data: {
                tags,
                category
            }
        }).then((res) => {
            dispatch({type: UPDATE_MEDIA, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
}

export const deleteMedia = (id:string) => {
    return (dispatch:any) => {
        return axios({
            method:"DELETE",
            url:`${process.env.REACT_APP_API_URL}/media/${id}`,
            withCredentials:true,
        }).then((res) => {
            dispatch({type: DELETE_MEDIA, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    };
}