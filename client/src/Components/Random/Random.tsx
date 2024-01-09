import axios from "axios"
import { useEffect, useState } from "react"
import { isEmpty } from "../../Utils";
import Dropdown from "../Utils/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { IFolder, IMedia, IState } from "../../types";
import MediaSettings from "../Media/MediaSettings";
import TagModal from "./TagModal";
import { getRandomMedias } from "../../actions/media.actions";
import mediasReducer from "../../reducers/mediasReducer";

export default function Random() {

    const dispatch:any = useDispatch();
    const mediaData = useSelector((state:any) => state.mediasReducer);

    //load state
    const [load, setLoad] = useState(false);

    //Pics
    const [img, setImg] = useState('');
    const [imgData, setImgData] = useState<IMedia>();
    const [previus, setPrevius] = useState('');

    const [FTags, setFTags] = useState<string>("");
    const [params, setParams] = useState({category: "", tags: "", type: ""});
    

    //Store all the previus pic
    const [history, setHistory]:any = useState([]);

    //Open modal
    const [modal, setModal] = useState(false);
    const [tagModal, setTagModal] = useState(false);

    //folder selector
    const folders = useSelector((state:IState) => state.foldersReducer);

    //to get a pic
    const getMedia = () => {
        dispatch(getRandomMedias(params));
    }

    useEffect(() => {
        if(!isEmpty(mediaData))
        {
            var media:IMedia = mediaData[0];
            setImgData(media);
            setImg(media.filePath);
            setHistory([{name: folders.find((folder:IFolder) => folder._id === media.folderId)?.name, value: media.filePath}, ...history]);   
        }
    }, [mediaData]);

    //To call next pic
    const nextHandle = () => {
        setPrevius(img);
        getMedia();
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
            getMedia();
            setPrevius(img);
        }
    }, [load])

    useEffect(() => {
        setParams({...params, tags:FTags});
    }, [FTags]);

    //Shortcuts
    useEffect(() => {
        const keyDownHandler = (event:any) => {
            var key = event.keyCode;
            if (key === 39) getMedia(); //next media right arrow
        }
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [])

    return (
        <div className="container">
            <>
                <div className="random">
                    <div className="top-bar">
                        <p className="button" onClick={prevHandle}>Prev</p>
                        <p className="button" onClick={nextHandle}>Next</p>
                        <p className="button" onClick={() => setModal(!modal)}>Settings</p>
                        {!isEmpty(history) && (
                            <Dropdown id="his" title="history" setCurrentValue={setImg} currentValue={img} items={history} />
                        )}
                        <input type="text" className="input" placeholder="Category" onChange={(e) => setParams({...params, category:e.target.value})}  />
                        <input type="text" className="input" placeholder="type" onChange={(e) => setParams({...params, type:e.target.value})}  />
                        <p className="button" onClick={() => setTagModal(!tagModal)}>Tag</p>
                    </div>

                    <div className="display">
                        {!isEmpty(img) && !isEmpty(imgData) && (
                            <>
                                {imgData?.type === "img" && (
                                    <img src={`${process.env.REACT_APP_CDN_URL}/uploads/${img}`} alt="img" />
                                )}
                                {imgData?.type === "video" && (
                                    <video src={`${process.env.REACT_APP_CDN_URL}/uploads/${img}`} loop muted onMouseEnter={(e) => e.currentTarget.play()} onMouseLeave={(e) => e.currentTarget.pause()} />
                                )}
                            </>
                        )}
                        
                    </div>
                </div>
                {modal && (
                    <div className="modal">
                        <MediaSettings media={imgData} close={setModal} />
                    </div>
                )}

                {tagModal && (
                    <div className="modal">
                        <TagModal close={setTagModal} FTags={FTags} setFTags={setFTags} />
                    </div>
                )}

                
            </>

        </div>
    )
}
