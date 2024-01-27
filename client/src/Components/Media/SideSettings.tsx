import { useEffect, useState } from "react";
import { isEmpty } from "../../Utils";
import LikeButton from "../Utils/LikeButton";
import Dropdown from "../Utils/Dropdown";
import { useDispatch, useSelector } from "react-redux";
import { ICategory, IProperty, IState } from "../../types";
import { updateProerties } from "../../actions/property.actions";
import TagModal from "../Random/TagModal";
import { updateMedia } from "../../actions/media.actions";
import DeleteBtn from "../Utils/DeleteBtn";
import { useToasts } from "../Utils/Toast/ToastContext";

var CatItems:any[] = [];

export default function SideSettings({ imgData } : { imgData:any }) {
    
    const dispatch:any = useDispatch();
    const { pushToast } = useToasts();

    const folders = useSelector((state:IState) => state.foldersReducer);
    const categories = useSelector((state:IState) => state.categoryReducer);

    const [load, setLoad] = useState(false);

    const [imgState, setImgState]:any = useState();
    const [fTags, setFTags]:any = useState([]);

    const [modal, setModal] = useState(false);


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

    useEffect(() => {
        setImgState(imgData);
        setFTags(imgData.tags.join(','))
        setLoad(true);
    }, [imgData]);

    useEffect(() => {
        if (!isEmpty(fTags)) setImgState({...imgState, tags: fTags.split(",")})
    }, [fTags])

    useEffect(() => {
        if (!isEmpty(categories)) {
            CatItems = [];
            categories.map((category:ICategory) => {
                return CatItems.push({name: category.name, value:category._id});
            });
            setLoad(true);
        }
    }, [categories]);


    const setCurrentValue = (cat:string) => {
        setImgState({...imgState, category: cat});
    }

    const saveHandle = () => {
        dispatch(updateMedia(imgState!._id, imgState.tags.toLocaleString(), imgState.category)).then(() => {
            pushToast({
                title: "Media Saved",
                content: "Medias data saved !",
                type: "success",
                duration: 5
            })
        }).catch(() => {
            pushToast({
                title: "ERROR : Media Saved",
                content: "Medias data saving error",
                type: "danger",
                duration: 5
            })
        });
    }

    return (
        <div className="settings-panel">
            {load && (
                <>
                    <h2 className="panel-title">Settings</h2>

                    <div className="spacer"></div>

                    <div className="fields">
                        <p className={imgState === imgData ? "button" : "button error"} onClick={saveHandle}>Save</p>
                        <LikeButton media={imgState} style={"button"} />
                    </div>

                    <div className="spacer"></div>

                    <div className="fields">

                        <div className="field">
                            <p className="field-text">Category</p>
                            <Dropdown title={imgState.category ? imgState.category : "Set Cat"} items={CatItems} id="cat" currentValue={imgState.categories} setCurrentValue={setCurrentValue} />
                        </div>

                        <div className="field">
                            <p className="field-text">Tags</p>
                            <p className="button" onClick={() => setModal(!modal)}>Tags</p>
                        </div>

                    </div>

                    <div className="spacer"></div>

                    <div className="fields">
                        <div className="field">
                            <p className="field-text">Media Full Path</p>
                            <input type="text" className="input" disabled value={`${process.env.REACT_APP_CDN_URL}/uploads/${imgState?.filePath}`} />
                        </div>
                        
                        <div className="field">
                            <p className="field-text">Media Path</p>
                            <input type="text" className="input" disabled value={`${imgState?.filePath}`} />
                        </div>

                    </div>

                    <div className="spacer"></div>

                    <div className="fields">

                        {imgData?.properties.map((prop:IProperty) => {
                            return (
                                <div className="property">
                                    <p className="name">{prop.name}</p>
                                    
                                    <div className="inputs">
                                        {prop.type === "number" && (
                                            <input className="number input" type="number" value={prop.value} onChange={(e) => propertyChange(e.target.value, prop)} />
                                        )}

                                        {prop.type === "count" && (
                                            <div className="counter">
                                                <p className="value">{prop.value}</p>
                                                <div className="buttons">
                                                    <p className="counter-button" onClick={() => countProperty(prop, "+")}>+</p>
                                                    <p className="counter-button" onClick={() => countProperty(prop, "-")}>-</p>
                                                </div>
                                            </div>
                                        )}

                                        {prop.type === "string" && (
                                            <textarea className="textarea" value={prop.value} onChange={(e) => propertyChange(e.target.value, prop)} />
                                        )}
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                    
                    <div className="spacer"></div>

                    <div className="fields">
                        <DeleteBtn itemId={imgData._id} />
                    </div>

                    {modal && (
                        <div className="modal">
                            <TagModal FTags={fTags} close={setModal} setFTags={setFTags} />
                        </div>
                    )}
                </>
            )}


            {/* <div className="fields">
                <div className="field">
                    <p className="field-text">Auto ?</p>
                    <p className="button" onClick={() => setAuto(!auto)}>{auto ? "Auto On" : "Auto Off"}</p>
                </div>
                <div className="field">
                    <p className="field-text">Timer</p>
                    <input type="number" className="field-input" min={1} max={300} value={time} onChange={(e) => setTime(Number(e.target.value))} />
                </div>
            </div> */}

            {/* <div className="spacer"></div> */}

            {/* <div className="history">

                <p className="history-size">{history.length} view{history.length < 2 ? "" : "s" } this session.</p>

                <ul className="history-list">
                    {!isEmpty(history) && history.map((item:any) => {
                        return(                    
                            <li className="history-item">
                                <p onClick={() => getMediaById(item.value)}>{item.name}</p>
                            </li>
                        )
                    })}

                </ul>

            </div> */}

            
           
        </div>
    )
}
