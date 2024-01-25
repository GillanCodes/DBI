import { useDispatch, useSelector } from "react-redux"
import { IFolder, IMedia, IState } from "../../types"
import { useEffect, useState } from "react";
import { isEmpty } from "../../Utils";
import axios from "axios";
import { useParams } from "react-router-dom";
import MediaGrid from "../Utils/MediaGrid";
import SidePanel from "../Utils/SidePanel";
import SideFilter from "../Random/SideFilter";
import TagModal from "../Random/TagModal";
import CategoryModal from "../Random/CategoryModal";

export default function Folder() {

    const dispatch:any = useDispatch();

    const params = useParams();

    const [loadedImg, setLoadedImg] = useState<IMedia[]>();
    const [count, setCount] = useState<number>(20);
    const [loadImg, setLoadImg] = useState<boolean>(true);

    const [load, setLoad] = useState<boolean>(false);
    const [medias, setMedias] = useState<IMedia[]>();

    const [sidePan, setSidePan] = useState<boolean>(false);
    const [tagModal, setTagModal] = useState<boolean>(false);
    const [catModal, setCatModal] = useState<boolean>(false);

    const [tags, setTags] = useState([]);
    const [cat, setCat] = useState([]);
    const [oParams, setParams] = useState({type: "", category: ""});

    const [current, setCurrent] = useState<IFolder>();

    const folders = useSelector((state:IState) => state.foldersReducer);

    useEffect(() => {
        if (!isEmpty(folders))
        {
            folders.map((folder:IFolder) => {
                if (folder._id === params.id)
                {
                    return setCurrent(folder);
                }
            })
        }
    }, [folders]);

    useEffect(() => {
        if (!isEmpty(current))
        {
            axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_URL}/media/params?tags=${tags}&categories=${cat}&type=${oParams.type}&folderId=${current?._id}`,
                withCredentials: true
            }).then(async (res) => {
                setCount(20);
                setMedias(res.data);
                setLoadedImg(res.data.slice(0, count));
                setLoad(true);
            })
        }
    }, [current, tags, oParams, cat]);

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

    const deleteHandle = () => {
        axios({
            method: "delete",
            url: `${process.env.REACT_APP_API_URL}/folder/${current?._id}`,
            withCredentials: true,
        }).then(() => {
            const timer = setTimeout(() => {
                window.location.assign('/');
            }, 1500)

            return () => {
                clearTimeout(timer);
            }
        })
    }

    return (
        <div className={sidePan ? "container has-side-bar" : "container"}>
            {load && (
                <div className="folder">
                    <div className="content">
                        <div className="head">
                            <p className="button" onClick={deleteHandle}>Delete</p>
                            <h1>{current?.name}</h1>
                            <p className="button" onClick={() => setSidePan(!sidePan)}>{sidePan ? "Close" : "Filters"}</p>
                        </div>
                        <div className="medias" >
                            {loadedImg!.map((media:IMedia) => {
                                return (
                                    <MediaGrid media={media} />
                                )
                            })}
                        </div>
                    </div>
                    
                    
                </div>
            )}

            <>
                {sidePan && (
                    <SidePanel>
                        <SideFilter 
                            fTags={tags} 
                            setFtags={setTags} 
                            params={oParams} 
                            setParams={setParams} 
                            tagModal={tagModal} 
                            setTagModal={setTagModal} 
                            setCatModal={setCatModal} 
                            catModal={catModal} 
                            fCat={cat} 
                        />
                    </SidePanel>
                )}
                {tagModal && (
                    <div className="modal">
                        <TagModal close={setTagModal} FTags={tags} setFTags={setTags} />
                    </div>
                )}
                {catModal && (
                    <div className="modal">
                        <CategoryModal close={setCatModal} FCategories={cat} setFCategories={setCat} />
                    </div>
                )}
            </>
        </div>
    )
}
