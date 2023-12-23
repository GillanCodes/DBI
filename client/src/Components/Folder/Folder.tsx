import { useSelector } from "react-redux"
import { IFolder, IImage, IState } from "../../types"
import { useEffect, useState } from "react";
import { isEmpty } from "../../Utils";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Folder() {

    const params = useParams();

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

        if (!isEmpty(images)) setLoad(true);
    }, [folders, current, images])

    return (
        <div className='container'>
            {load && (
                <div className="folder">
                    <div className="content">
                        <div className="head">
                            <h1>{current?.name}</h1>
                        </div>
                        <div className="images">
                            {images!.map((image:IImage) => {
                                return (
                                    <img className="image" src={`${process.env.REACT_APP_CDN_URL}/uploads/${image.filePath}`} alt="" />
                                )
                            })}
                        </div>
                    </div>
                    
                    
                </div>
            )}
        </div>
    )
}
