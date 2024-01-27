import React, { useEffect, useState } from 'react'
import { IMedia, IState } from '../../types';
import { isEmpty } from '../../Utils';
import { useParams } from 'react-router-dom';
import MediaSettings from './MediaSettings';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMedia, getMedia } from '../../actions/media.actions';
import SidePanel from '../Utils/SidePanel';
import SideSettings from './SideSettings';

export default function Media() {

    const dispatch:any = useDispatch();
    const mediaReducer = useSelector((state:IState) => state.mediasReducer);

    const param = useParams();

    const [media, setMedia] = useState<IMedia>();
    const [load, setLoad] = useState(false);

    const [modal, setModal] = useState(false);
    
    const [sidePanel, setSidePanel] = useState({open:false, content:""});

    const callMedia = (id:any) => {
        dispatch(getMedia(id));
    }

    useEffect(() => {
        if(!isEmpty(param.id))
        {
            callMedia(param.id);
        }
    }, [param]);

    useEffect(() => {
        if (!isEmpty(mediaReducer))
        {
            setMedia(mediaReducer[0])
            if(!isEmpty(media)) setLoad(true)
        }
    }, [mediaReducer, media])

    return (
        <div className={sidePanel.open ? "container has-side-bar" : "container"}>
            {load && (
                <>
                    <div className="media-content">
                        <div className="top-bar">
                            <p className="button" onClick={() => setSidePanel({content:"settings", open:true})}>Settings</p>
                            
                            <p className="button" onClick={() => window.location.assign(`/f/${media?.folderId}`)}>View Folder</p>
                            <p>{media?.views.length} views</p>
                        </div>
                        <div className="single-view">
                            {media?.type === "img" && (
                                <img src={`${process.env.REACT_APP_CDN_URL}/uploads/${media?.filePath}`} alt="image" />
                            )}
                            {media?.type === "video" && (
                                <video src={`${process.env.REACT_APP_CDN_URL}/uploads/${media?.filePath}`} loop muted controls autoPlay />
                            )}
                        </div>
                    </div>
                    {modal && (
                        <div className="modal">
                            <MediaSettings media={media} close={setModal} />
                        </div>
                    )}
                    
                    {sidePanel.open && sidePanel.content === "settings" && (
                        <SidePanel>
                            <SideSettings
                                imgData={media}
                            />
                        </SidePanel>
                    )} 
                </>
            )}
            

        </div>
    )
}
