import axios from "axios"
import { useEffect, useState } from "react"
import { isEmpty } from "../../Utils";
import Dropdown from "../Utils/Dropdown";
import { useSelector } from "react-redux";
import { IFolder, IState } from "../../types";

export default function Random() {

    //load state
    const [load, setLoad] = useState(false);

    //Pics
    const [img, setImg] = useState('');
    const [previus, setPrevius] = useState('');

    //Store all the previus pic
    const [history, setHistory]:any = useState([]);

    //folder selector
    const folders = useSelector((state:IState) => state.foldersReducer);

    //to get a pic
    const getImage = () => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/random/`,
            withCredentials:true
        }).then((res) => {
            setImg(res.data.filePath);
            setHistory([{name: folders.find((folder:IFolder) => folder._id === res.data.folderId)?.name, value: res.data.filePath}, ...history]);
        })
    }

    //To call next pic
    const nextHandle = () => {
        setPrevius(img);
        getImage();
    }

    //Handle previus pic
    const prevHandle = () => {
        setImg(previus)
    }

    //Check if all page is load    
    useEffect(() => {
        if (!isEmpty(folders)){
            setLoad(true);
        }
    }, [folders])

    //Set up page
    useEffect(() =>{
        if (load)
        {
            getImage();
            setPrevius(img);
        }
    }, [load])

    return (
        <div className="container">
            <div className="random">
                <div className="top-bar">
                    <p className="button" onClick={prevHandle}>Prev</p>
                    <p className="button" onClick={nextHandle}>Next</p>
                    {!isEmpty(history) && (
                        <Dropdown id="his" title="history" setCurrentValue={setImg} currentValue={img} items={history} />
                    )}
                </div>

                <div className="display">
                    {!isEmpty(img) && (
                        <img src={`${process.env.REACT_APP_CDN_URL}/uploads/${img}`} alt="image"></img>
                    )}
                    
                </div>
            </div>


        </div>
    )
}
