import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../Utils";
import { IFolder, IImage, IState } from "../../types";
import { useEffect, useState } from "react";
import { updateImage } from "../../actions/image.actions";

export default function ImageSettings({image, close}: {image:IImage | undefined, close:any}) {
    
    const dispatch:any = useDispatch();

    const folders = useSelector((state:IState) => state.foldersReducer);

    const [load, setLoad] = useState(false);

    const [imgState, setImgState]:any = useState();

    useEffect(() => {
        if(!isEmpty(image)) setImgState(image);
        if (!isEmpty(folders) && !isEmpty(image)) setLoad(true);
    }, [folders])

    const saveHandle = () => {
        dispatch(updateImage(image!._id, "", imgState.category));
    }

    return (
        <div className="image-settings">
            {load && (
                <>
                    <div className="head">
                        <h2 className="title">{image?._id} - {folders.find((folder:IFolder) => folder._id === image?.folderId)?.name}</h2>
                        <p className="close" onClick={saveHandle}>Save</p>
                        
                        {!isEmpty(close) && (
                            <p className="close" onClick={() => close(false)}>X</p>
                        )}
                    </div>
                    <div className="body">
                        <div className="fields inline">
                            <div className="field">
                                <span>Image Full Path</span>
                                <input className="input" type="text" disabled value={`${process.env.REACT_APP_CDN_URL}/uploads/${image?.filePath}`} />
                            </div>
                            <div className="field">
                                <span>Image Path</span>
                                <input className="input" type="text" disabled value={`${image?.filePath}`} />
                            </div>
                        </div>

                        <div className="fields inline">
                            <div className="field">
                                <span>Category</span>
                                <input className="input" type="text" value={imgState.category} onChange={(e) => setImgState({...imgState, category:e.target.value})} />
                            </div>
                        </div>

                        <div className="fields">

                        </div>

                    </div>
                </>
            )}
        </div>
    )
}
