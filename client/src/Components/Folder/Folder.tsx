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
    const [current, setCurrent] = useState<string>();

    const folders = useSelector((state:IState) => state.foldersReducer);

    useEffect(() => {
        if (!isEmpty(folders)) {
            folders.map((folder:IFolder) => {
                if (folder._id === params.id){
                    return setCurrent(folder._id)
                }
            })
            if (!isEmpty(current)){
                var imgs = axios({
                    method:"GET",
                    withCredentials:true,
                    url: `${process.env.REACT_APP_API_URL}/image/folder/${current}`
                }).then((res) => {
                    setImages(res.data);
                }).catch((err) => console.log(err));
            }
        }

        if (!isEmpty(images)) setLoad(true);
    }, [folders, current])

    return (
        <div className='container'>
            {load && (
                <div className="folder">
                    {images!.map((image:IImage) => {
                        return (
                            <img src={`${process.env.REACT_APP_CDN_URL}/uploads/${image.filePath}`} alt="" />
                        )
                    })}
                </div>
            )}
        </div>
    )
}
