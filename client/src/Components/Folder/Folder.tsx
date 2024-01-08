import { useSelector } from "react-redux"
import { IFolder, IMedia, IState } from "../../types"
import { useEffect, useState } from "react";
import { isEmpty } from "../../Utils";
import axios from "axios";
import { useParams } from "react-router-dom";
import MediaGrid from "../Utils/MediaGrid";

export default function Folder() {

    const params = useParams();

    const [loadedImg, setLoadedImg] = useState<IMedia[]>();
    const [count, setCount] = useState<number>(20);
    const [loadImg, setLoadImg] = useState<boolean>(true);

    const [load, setLoad] = useState<boolean>(false);
    const [medias, setMedias] = useState<IMedia[]>();
    
    const [current, setCurrent] = useState<IFolder>();

    const folders = useSelector((state:IState) => state.foldersReducer);

    useEffect(() => {
        if (!isEmpty(folders)) {
            folders.map((folder:IFolder) => {
                if (folder._id === params.id){
                    return setCurrent(folder)
                }
            })
            if (!isEmpty(current)){
               axios({
                    method:"GET",
                    withCredentials:true,
                    url: `${process.env.REACT_APP_API_URL}/media/folder/${current?._id}`
                }).then((res) => {
                    setMedias(res.data);
                }).catch((err) => console.log(err));
            }
        }

        if (!isEmpty(loadedImg)) setLoad(true);
    }, [folders, current, loadedImg])

    useEffect(() => {
        if(loadImg && !isEmpty(medias)) 
        {
            setLoadImg(false);
            setLoadedImg(medias!.slice(0, count));
            setCount(count + 10)
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadImg, count, loadedImg, medias])

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement!.scrollHeight) 
        {
            setLoadImg(true);
        }
    }

    return (
        <div className='container'>
            {load && (
                <div className="folder">
                    <div className="content">
                        <div className="head">
                            <h1>{current?.name}</h1>
                        </div>
                        <div className="medias" >
                            {loadedImg!.map((media:IMedia) => {
                                return (
                                    <MediaGrid media={media} />
                                    //<img className="media" src={`${process.env.REACT_APP_CDN_URL}/uploads/${media.filePath}`} alt="" onClick={() => window.location.assign(`/i/${media._id}`)}/>
                                )
                            })}
                        </div>
                    </div>
                    
                    
                </div>
            )}
        </div>
    )
}
