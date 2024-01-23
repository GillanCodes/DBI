import axios from "axios"
import { useEffect, useState } from "react"
import { isEmpty } from "../../Utils";
import Dropdown from "../Utils/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { IFolder, IMedia, IState } from "../../types";
import MediaSettings from "../Media/MediaSettings";
import TagModal from "./TagModal";
import { getMedia, getRandomMedias } from "../../actions/media.actions";
import SidePanel from "../Utils/SidePanel";
import SideFilter from "./SideFilter";
import SideSettings from "./SideSettings";
import { useToasts } from "../Utils/Toast/ToastContext";
import FolderModal from "./FolderModal";

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
    const [FFolders, setFFolders] = useState<string>("");
    const [params, setParams] = useState({category: "", tags: "", type: "", like:"false", folderIds:""});
    

    //Store all the previus pic
    const [history, setHistory]:any = useState([]);    
    
    const [auto, setAuto] = useState<boolean>(false);
    const [time, setTime] = useState(1);

    //Open modal
    const [modal, setModal] = useState(false);
    const [tagModal, setTagModal] = useState(false);
    const [folderModal, setFolderModal] = useState(false);
    
    const [sidePanel, setSidePanel] = useState({open:false, content:""});

    //folder selector
    const folders = useSelector((state:IState) => state.foldersReducer);

    //to get a pic
    const getRdmMedia = () => {
        dispatch(getRandomMedias(params)).then(() => {
            setLoad(true);
        });
    }

    useEffect(() => {
        if (auto)
        {
            var IAuto = setInterval(() => {
                getRdmMedia();
            }, time * 1000);

            return () => {
                clearInterval(IAuto);
            }
        }
    }, [auto, time]);

    useEffect(() => {
        if(!isEmpty(mediaData))
        {
            var media:IMedia = mediaData[0];
            setImgData(media);
            setImg(media.filePath);
            if (media._id !== imgData?._id) setHistory([{name: folders.find((folder:IFolder) => folder._id === media.folderId)?.name, value: media._id}, ...history]);   
        }
    }, [mediaData]);

    const getMediaById = (id:string) => {
        dispatch(getMedia(id));
        setImg(mediaData[0]._id);
    }

    //To call next pic
    const nextHandle = () => {
        setPrevius(imgData!._id);
        getRdmMedia();
    }

    //Handle previus pic
    const prevHandle = () => {
        getMediaById(previus)
    }

    //Set up page
    useEffect(() =>{
        getRdmMedia();
        if (!isEmpty(imgData)) setPrevius(imgData!._id);
    }, [])

    useEffect(() => {
        setParams({...params, tags:FTags});
    }, [FTags]);

    useEffect(() => {
        setParams({...params, folderIds:FFolders})
    }, [FFolders])

    //Shortcuts
    useEffect(() => {
        const keyDownHandler = (event:any) => {
            var key = event.keyCode;
            if (key === 39) nextHandle(); //next media right arrow
        }
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [imgData]);

    useEffect(() => {
        console.log(folderModal);
    }, [folderModal])

    return (
        <div className={sidePanel.open ? "container has-side-bar" : "container"}>
            <>
                <div className="random">
                    <div className="top-bar">
                        <div className="left group">
                            <p className="button" onClick={prevHandle}>Prev</p>
                            <p className="button" onClick={nextHandle}>Next</p>
                        </div>
                        <div className="right group">
                            {sidePanel.open ? (
                                <>
                                    <p className="button" onClick={() => setSidePanel({content:"", open:false})}>Close</p>
                                </>
                            ) : (
                                <>
                                    <p className="button" onClick={() => setSidePanel({content:"filter", open:!sidePanel.open})}>Filter</p>
                                    <p className="button" onClick={() => setSidePanel({content:"settings", open:!sidePanel.open})}>Settings</p>
                                </>
                            )}
                            
                        </div>
                    </div>

                    <div className="display">
                        {load && !isEmpty(img) && !isEmpty(imgData) && (
                            <>
                                {imgData?.type === "img" && (
                                    <img src={`${process.env.REACT_APP_CDN_URL}/uploads/${img}`} alt="img" />
                                )}
                                {imgData?.type === "video" && (
                                    <video src={`${process.env.REACT_APP_CDN_URL}/uploads/${img}`} loop muted autoPlay controls />
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
                
                {folderModal && (
                    <div className="modal">
                        <FolderModal close={setFolderModal} FFolders={FFolders} setFFolders={setFFolders} />
                    </div>
                )}

                {sidePanel.open && sidePanel.content === "filter" && (
                    <SidePanel>
                        <SideFilter 
                            fTags={FTags} 
                            setFtags={setFTags} 
                            params={params} 
                            setParams={setParams} 
                            tagModal={tagModal} 
                            setTagModal={setTagModal}
                            FFolders={FFolders}
                            setFolderModal={setFolderModal}
                            folderModal={folderModal}
                        />
                    </SidePanel>
                )} 

                {sidePanel.open && sidePanel.content === "settings" && (
                    <SidePanel>
                        <SideSettings 
                            settingsModal={modal} 
                            setSettingsModal={setModal} 
                            history={history} 
                            getMediaById={getMediaById} 
                            imgData={imgData}
                            getMedia={getRdmMedia}
                            auto={auto}
                            setAuto={setAuto}
                            time={time}
                            setTime={setTime}
                        />
                    </SidePanel>
                )}
            </>

        </div>
    )
}
