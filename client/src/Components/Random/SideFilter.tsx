import { useEffect, useState } from "react"
import TagModal from "./TagModal";
import { isEmpty } from "../../Utils";
import Dropdown from "../Utils/Dropdown";
import { useSelector } from "react-redux";
import { IFolder, IState } from "../../types";

var foldersItem:any[] = [];

export default function SideFilter({fTags, setFtags, params, setParams, tagModal, setTagModal, folderModal, setFolderModal, FFolders}: {fTags:any, setFtags:any, params:any, setParams:any, tagModal:any, setTagModal:any, folderModal?:any, setFolderModal?:any, FFolders?:any}) {
  
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

    return (
        <div className="filter-panel">
                <h2 className="panel-title">Filters</h2>

                <div className="spacer"></div>

                <div className="fields">

                    <div className="field">
                        <p className="field-text">Category</p>
                        <input type="text" className="field-input" onChange={(e) => setParams({...params, category:e.target.value})} />
                    </div>

                    <div className="field">
                        <p className="field-text">Type</p>
                        <input type="text" list="types" className="field-input" onChange={(e) => setParams({...params, type:e.target.value})}/>
                        <datalist id="types">
                            <option value="video">Videos</option>
                            <option value="img">Images</option>
                        </datalist>
                    </div>
                    
                    {/* <div className="field">
                        <p className="field-text">Folder</p>
                        {load && (
                            <Dropdown id="folderDd" title="Folder" items={foldersItem} currentValue={value} setCurrentValue={setValue} />
                        )}
                    </div> */}

                    <div className="field">
                        <div className="field-text">Liked</div>
                        <p className="button" onClick={likedHandle}>{params.like === "true" ? "On" : "Off"}</p>
                    </div>
                </div>
                
                <div className="spacer"></div>
                
                {!isEmpty(folderModal) && (
                    <div className="fields">
                        <p className="button" onClick={() => setFolderModal(!folderModal)}>Folders ({!isEmpty(FFolders) ? FFolders.split(',').length : 0})</p>
                    </div> 
                )}
                
                
                <div className="fields">
                    <p className="button" onClick={() => setTagModal(!tagModal)}>Tags ({!isEmpty(fTags) ? fTags.split(",").length : 0})</p>
                </div>   

            </div>
    )
}
