import { useSelector } from "react-redux"
import { IFolder, IImage, IState } from "../../types"
import { useEffect, useState } from "react";
import { isEmpty } from "../../Utils";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Folder() {

    const params = useParams();

    const [loadedImg, setLoadedImg] = useState<IImage[]>();
    const [count, setCount] = useState<number>(20);
    const [loadImg, setLoadImg] = useState<boolean>(true);

    const [load, setLoad] = useState<boolean>(false);
    const [images, setImages] = useState<IImage[]>();
    
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
                    url: `${process.env.REACT_APP_API_URL}/image/folder/${current?._id}`
                }).then((res) => {
                    setImages(res.data);
                }).catch((err) => console.log(err));
            }
        }

        if (!isEmpty(loadedImg)) setLoad(true);
    }, [folders, current, loadedImg])

    useEffect(() => {
        if(loadImg && !isEmpty(images)) 
        {
            setLoadImg(false);
            setLoadedImg(images!.slice(0, count));
            setCount(count + 10)
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadImg, count, loadedImg, images])

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
                        <div className="images" >
                            {loadedImg!.map((image:IImage) => {
                                return (
                                    <img className="image" src={`${process.env.REACT_APP_CDN_URL}/uploads/${image.filePath}`} alt="" onClick={() => window.location.assign(`/i/${image._id}`)}/>
                                )
                            })}
                        </div>
                    </div>
                    
                    
                </div>
            )}
        </div>
    )
}
