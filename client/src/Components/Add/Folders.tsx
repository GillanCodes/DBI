import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IFolder, IState } from '../../types'
import { isEmpty } from '../../Utils';
import { createFolder, updateFolder, updateIconFolder } from '../../actions/folder.actions';

export default function Folders() {

    const dispatch:any = useDispatch();

    const folders = useSelector((state:IState) => state.foldersReducer);
    const [state, setState] = useState({name: "", description: ""});
    const [edit, setEdit] = useState("");

    const saveHandle = (id: string) => {
        dispatch(updateFolder(id, state.name, state.description));
        setEdit('');
    }

    const editHandle = (folder:IFolder) => {
        if (folder._id === edit) setEdit('');
        else {
            setState({name:folder.name, description:folder.description});
            setEdit(folder._id)
        }
    }

    const createHandle = () => {
        dispatch(createFolder(state.name, state.description));
    }

    const iconChangeHandle = (id:string, f:any) => {
        var data = new FormData();
        data.append('file', f);

        dispatch(updateIconFolder(id, data));
    }

    return (
        <div className='folders'>

            <div className="new-folder folder">
                <div className="body">
                    <div className="text">
                        <input type="text" placeholder='Name' onChange={(e) => setState({...state, name:e.target.value})} />
                        <input type="text" placeholder='Description' onChange={(e) => setState({...state, description:e.target.value})}/>
                    </div>
                </div>
                <div className="buttons">
                    <button className="button" onClick={createHandle}>Create</button>
                </div>
            </div>

            {!isEmpty(folders) && folders.map((folder:IFolder) => {
                return (
                    <div className="folder" key={folder._id}>
                        <div className="body">
                            <input type="file" name="img" id={folder._id} hidden onChange={(e) => iconChangeHandle(folder._id, e.target.files![0])} />
                            <label htmlFor={folder._id}>
                                <img className='icon' src={`${process.env.REACT_APP_CDN_URL}/icons/${folder.icon}`} alt="" />
                            </label>
                            <div className="text">
                                {edit === folder._id ? <input type="text" value={state.name} onChange={(e) => setState({...state, name: e.target.value})} /> : <p>{folder.name}</p>}
                                {edit === folder._id ? <input type="text" value={state.description} onChange={(e) => setState({...state, description: e.target.value})} /> : <p>{folder.description}</p>}
                            </div>
                            
                        </div>
                        <div className="buttons">
                            <button className='button' onClick={() => editHandle(folder)}>Edit</button>
                            <button className='button' onClick={() => saveHandle(folder._id)}>Save</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
