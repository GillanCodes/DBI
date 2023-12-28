import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../Utils";
import { IFolder, IImage, IProperty, IState, ITag } from "../../types";
import { useEffect, useState } from "react";
import { updateImage } from "../../actions/image.actions";

export default function ImageSettings({image, close}: {image:IImage | undefined, close:any}) {
    
    const dispatch:any = useDispatch();

    const folders = useSelector((state:IState) => state.foldersReducer);
    const tags = useSelector((state:IState) => state.tagsReducer);

    const [load, setLoad] = useState(false);

    const [imgState, setImgState]:any = useState();

    useEffect(() => {
        if(!isEmpty(image)) setImgState(image);
        if (!isEmpty(folders) && !isEmpty(image)) setLoad(true);
    }, [folders])

    const tagHandle = (tag:ITag) => {
        if (!isEmpty(imgState) && !isEmpty(imgState.tags)) {
            const index = imgState.tags.findIndex((e:string) => e === tag._id)
            if (index >= 0)
            {
                const tArray:string[] = imgState.tags.filter((t:string) => {
                    return t !== tag._id
                });
                setImgState({...imgState, tags:tArray});
            } else {
                const tArray:string[] = imgState.tags
                tArray.push(tag._id);
                setImgState({...imgState, tags: tArray});
            }
        }
        return
    }

    const saveHandle = () => {
        dispatch(updateImage(image!._id, imgState.tags.toLocaleString(), imgState.category));
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
                            <div className="field">
                                <span>Tags</span>
                                <div className="tags">
                                    {tags.map((tag:ITag) => {
                                        return (
                                            <div className="tag" onClick={() => tagHandle(tag)}>
                                                <input type="checkbox" checked={imgState.tags.includes(tag._id) ? true : false} />
                                                <p>{tag.name}</p>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="fields">
                            <div className="field">
                                <div className="properties">
                                    {image?.properties.map((prop:IProperty) => {
                                        return (
                                            <div className="property">
                                                <p className="name">{prop.name}</p>
                                                {prop.type === "number" && (
                                                    <input type="number" value={prop.value} />
                                                )}
                                                {prop.type === "count" && (
                                                    <div>
                                                        <p>{prop.value}</p>
                                                        <div>
                                                            <p>+</p>
                                                            <p>-</p>
                                                        </div>
                                                    </div>
                                                )}
                                                {prop.type === "text" && (
                                                    <input type="text" value={prop.value} />
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                </>
            )}
        </div>
    )
}
