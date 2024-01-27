import { useEffect, useState } from "react"
import TagModal from "./TagModal";
import { isEmpty } from "../../Utils";
import Dropdown from "../Utils/Dropdown";
import { useSelector } from "react-redux";
import { IFolder, IState } from "../../types";

var foldersItem:any[] = [];

export default function SideFilter({
    fTags, 
    setFtags, 
    params, 
    setParams,
    tagModal, 
    setTagModal, 
    folderModal, 
    setFolderModal, 
    FFolders, 
    catModal, 
    setCatModal, 
    fCat,
    auto,
    setAuto,
    time,
    setTime,
    history,
    getMediaById
} : {
    fTags:any, 
    setFtags:any, 
    params:any, 
    setParams:any, 
    tagModal:any, 
    setTagModal:any, 
    folderModal?:any, 
    setFolderModal?:any, 
    FFolders?:any, 
    catModal:any, 
    setCatModal:any, 
    fCat:any,
    auto?: any,
    setAuto?: any,
    time?: any,
    setTime?: any,
    history?: any,
    getMediaById?:any
}) {
  
    const folders = useSelector((state:IState) => state.foldersReducer);

    const [load, setLoad] = useState(false);
    const [value, setValue] = useState('');

    const likedHandle = () => {
        if (params.like === "true") setParams({...params, like: "false"});
        else setParams({...params, like: "true"});
    }
    
    useEffect(() => {
        if (!isEmpty(folders)) {
            foldersItem = [];
            foldersItem.push({name: "None", value:""});
            folders.map((folder:IFolder) => {
                return foldersItem.push({name: folder.name, value:folder._id});
            });
            setLoad(true);
        }
    }, [folders]);

    useEffect(() => {
        setParams({...params, folderId: value});
    }, [value]);

    const setCurrentValue = (cat:string) => {
        setParams({...params, category:cat});
    }

    return (
        <div className="filter-panel">
                <h2 className="panel-title">Filters</h2>

                <div className="spacer"></div>

                <div className="fields">

                    

                    <div className="field">
                        <p className="field-text">Type</p>
                        <input type="text" list="types" className="field-input" onChange={(e) => setParams({...params, type:e.target.value})}/>
                        <datalist id="types">
                            <option value="video">Videos</option>
                            <option value="img">Images</option>
                        </datalist>
                    </div>
                    
                    <div className="field">
                        <div className="field-text">Liked</div>
                        <p className="button" onClick={likedHandle}>{params.like === "true" ? "On" : "Off"}</p>
                    </div>
                </div>
                
                {!isEmpty(folderModal) && (
                    <div className="fields">
                        <p className="button" onClick={() => setFolderModal(!folderModal)}>Folders ({!isEmpty(FFolders) ? FFolders.split(',').length : 0})</p>
                    </div> 
                )}
                
                
                <div className="fields">
                    <p className="button" onClick={() => setTagModal(!tagModal)}>Tags ({!isEmpty(fTags) ? fTags.split(",").length : 0})</p>
                </div>   
                
                <div className="field">
                    <p className="button" onClick={() => setCatModal(!catModal)}>Category ({!isEmpty(fCat) ? fCat.split(",").length : 0})</p>
                </div>


                

                {setAuto && setTime && (
                    <>
                        <div className="spacer"></div>
                        <div className="fields">
                            <div className="field">
                                <div className="field-text">Auto</div>
                                <p className="button" onClick={() => setAuto(!auto)}>{auto ? "On" : "Off"}</p>
                                <input type="number" min={1} max={120} className="input" value={time} onChange={(e) => setTime(e.target.value)} />
                            </div>
                        </div>
                    </>
                )}

                

                {history && getMediaById && (
                    <>
                        <div className="spacer"></div>

                        <div className="history">

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

                        </div>
                    </>
                )}
                

            </div>
    )
}
