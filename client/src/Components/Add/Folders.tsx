import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IFolder, IState } from '../../types'
import { isEmpty } from '../../Utils';

export default function Folders() {

    const dispatch:any = useDispatch();

    const folders = useSelector((state:IState) => state.foldersReducer);
    const [edit, setEdit] = useState("");

    const saveHandle = (id: string) => {
        
    }

    return (
        <div className='folders'>

            <div className="new-folder folder">
                <div className="body">
                    
                </div>
            </div>

            {!isEmpty(folders) && folders.map((folder:IFolder) => {
                return (
                    <div className="folder" key={folder._id}>
                        <div className="body">
                            <img className='icon' src={`${process.env.REACT_APP_CDN_URL}/icons/${folder.icon}`} alt="" />
                            <div className="text">
                                {edit === folder._id ? <input type="text" value={folder.name} /> : <p>{folder.name}</p>}
                                {edit === folder._id ? <input type="text" value={folder.description} /> : <p>{folder.description}</p>}
                            </div>
                            
                        </div>
                        <div className="buttons">
                            <button className='button' onClick={() => edit === folder._id ? setEdit('') : setEdit(folder._id)}>Edit</button>
                            <button className='button' onClick={() => saveHandle(folder._id)}>Save</button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
