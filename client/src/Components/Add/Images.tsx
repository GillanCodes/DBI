import { useEffect, useState } from "react"
import { isEmpty } from "../../Utils";
import { useDispatch, useSelector } from "react-redux";
import { IFolder, IState } from "../../types";
import Dropdown from "../Utils/Dropdown";
import { uploadImages } from "../../actions/image.actions";

var foldersItem:any[] = [];

export default function Images() {

    const dispatch:any = useDispatch()

    const [files, setFiles]:any = useState();
    const [useFolder, setUseFolder] = useState("");
    const [load, setLoad] = useState(false);

    const folders = useSelector((state:IState) => state.foldersReducer);


    useEffect(() => {
        if (!isEmpty(folders)) {
            foldersItem = [];
            folders.map((folder:IFolder) => {
                return foldersItem.push({name: folder.name, value:folder._id});
            });
            setLoad(true);
        }
    }, [folders]);

    const saveHandle = () => {
        var data = new FormData()
        for (let i = 0; i < files.length; i++) {
            var file = files[i]
            data.append('files', file)
        }
        data.append("folderId", useFolder)

        dispatch(uploadImages(data));

        setUseFolder("");
        setFiles();
        return;
    }

    return (
        <div className="images">

            <div className="head">
                    <div className="title">
                        <h1>Add Images</h1>
                    </div>
                <div className="head-content">
                    
                    <div className="input">
                        <input type="file" name="files" id="files" multiple accept="image/*,.jpg,.jpeg,.png,.gif,video/*,.mp4,.ogg,.avi,.mpeg" onChange={(e) => setFiles(e.target.files)}  />
                    </div>
                    <div className="folderSelect">
                        {load && (
                            <Dropdown id="foldersDd" title="Folder" items={foldersItem} currentValue={useFolder} setCurrentValue={setUseFolder} />
                        )}
                    </div>
                </div>
                <div className="save">
                        <button className="button" onClick={saveHandle}>Save</button>
                    </div>
            </div>

            <div className="body">


                

                <div className="images-display">
                    {!isEmpty(files) && Array.from(files).map((file:any) => {
                        var url = URL.createObjectURL(file);
                        if (file.type.includes("video"))
                        {
                            return <video className="img-preview" src={url} muted autoPlay loop />
                        }
                        else 
                        {
                            return <img className="img-preview" src={url} alt="img" />
                        }
                    })}
                </div>
                


            </div>

        </div>
    )
}
