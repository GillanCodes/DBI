import { useDispatch, useSelector } from "react-redux";
import { isEmpty } from "../../Utils";
import { IFolder, IMedia, IProperty, IState, ITag } from "../../types";
import { useEffect, useState } from "react";
import { updateMedia } from "../../actions/media.actions";
import { updateProerties } from "../../actions/property.actions";

export default function MediaSettings({media, close}: {media:IMedia | undefined, close:any}) {
    
    const dispatch:any = useDispatch();

    const folders = useSelector((state:IState) => state.foldersReducer);
    const tags = useSelector((state:IState) => state.tagsReducer);

    const [load, setLoad] = useState(false);

    const [imgState, setImgState]:any = useState();

    useEffect(() => {
        if(!isEmpty(media)) setImgState(media);
        if (!isEmpty(folders) && !isEmpty(media)) setLoad(true);
    }, [folders, media])

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
        dispatch(updateMedia(media!._id, imgState.tags.toLocaleString(), imgState.category));
    }    

    const propertyChange = (value:string | number, prop:IProperty) => 
    {
        if (prop.type === "string") dispatch(updateProerties(imgState._id, prop._id, value));    
        if (prop.type === "number") dispatch(updateProerties(imgState._id, prop._id, Number(value)));    
    }

    const countProperty = (prop:IProperty, op:string) =>
    {
        if (op === "+") dispatch(updateProerties(imgState._id, prop._id, Number(prop.value) + 1));
        if (op === "-") dispatch(updateProerties(imgState._id, prop._id, Number(prop.value) - 1));
    }

    return (
        <div className="media-settings">
            {load && (
                <>
                    <div className="head">
                        <h2 className="title">{media?._id} - {folders.find((folder:IFolder) => folder._id === media?.folderId)?.name}</h2>
                        <p className="close" onClick={saveHandle}>Save</p>
                        
                        {!isEmpty(close) && (
                            <p className="close" onClick={() => close(false)}>X</p>
                        )}
                    </div>
                    <div className="body">
                        <div className="fields inline">
                            <div className="field">
                                <span>Media Full Path</span>
                                <input className="input" type="text" disabled value={`${process.env.REACT_APP_CDN_URL}/uploads/${media?.filePath}`} />
                            </div>
                            <div className="field">
                                <span>Media Path</span>
                                <input className="input" type="text" disabled value={`${media?.filePath}`} />
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
                                    {media?.properties.map((prop:IProperty) => {
                                        return (
                                            <div className="property">
                                                <p className="name">{prop.name}</p>
                                                
                                                {prop.type === "number" && (
                                                    <input type="number" value={prop.value} onChange={(e) => propertyChange(e.target.value, prop)} />
                                                )}

                                                {prop.type === "count" && (
                                                    <div>
                                                        <p>{prop.value}</p>
                                                        <div>
                                                            <p onClick={() => countProperty(prop, "+")}>+</p>
                                                            <p onClick={() => countProperty(prop, "-")}>-</p>
                                                        </div>
                                                    </div>
                                                )}

                                                {prop.type === "string" && (
                                                    <input type="text" value={prop.value} onChange={(e) => propertyChange(e.target.value, prop)} />
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
