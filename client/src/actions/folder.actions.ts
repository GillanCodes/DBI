import axios from "axios";

export const GET_FOLDERS = "GET_FOLDERS";
export const UPDATE_FOLDER = "UPDATE_FOLDER";
export const CREATE_FOLDER = "CREATE_FOLDER";

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

export const updateFolder = (id:string, name:string, description:string) => {
    return (dispatch:any) => {
        return axios({
            method:"patch",
            url:`${process.env.REACT_APP_API_URL}/folder/${id}`,
            withCredentials:true,
            data: {
                name,
                description
            }
        }).then((res) => {
            dispatch({type: UPDATE_FOLDER, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    }
}

export const createFolder = (name:string, description:string) => {
    return (dispatch:any) => {
        return axios({
            method:"POST",
            url:`${process.env.REACT_APP_API_URL}/folder/`,
            withCredentials:true,
            data: {
                name,
                description
            }
        }).then((res) => {
            dispatch({type: CREATE_FOLDER, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    }
}

export const updateIconFolder = (id:string, data:any) => {
    return (dispatch:any) => {
        return axios({
            method:"patch",
            url:`${process.env.REACT_APP_API_URL}/folder/icon/${id}`,
            withCredentials:true,
            data
        }).then((res) => {
            dispatch({type: UPDATE_FOLDER, payload: res.data});
        }).catch((err) => {
            console.log(err);
        });
    }
}