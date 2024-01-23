import React, { useEffect, useState } from 'react'
import { isEmpty } from '../../Utils'
import { useSelector } from 'react-redux'
import { IFolder, IState } from '../../types'

export default function FolderModal({close, FFolders, setFFolders} : {close:any, FFolders:any, setFFolders:any}) {
    
    const folders = useSelector((state:IState) => state.foldersReducer);

    const [load, setLoad] = useState<Boolean>(false);

    useEffect(() => {
        if (!isEmpty(folders)) setLoad(true)
    }, [folders])

    const folderHandle = (folder:IFolder) => {
        if (!isEmpty(FFolders))
        {
            var foldersArr = FFolders!.split(','); //Array
            const index = foldersArr.findIndex((i:string) => i === folder._id)
            if (index >= 0)
            {
                var filtered = foldersArr.filter((t:string) => {
                    return t !== folder._id
                });
                var foldersStr = filtered.join(',');
                setFFolders(foldersStr);
            }
            else
            {
                foldersArr.push(folder._id);
                var foldersArr = foldersArr.join(',');
                setFFolders(foldersArr);
            }
        }
        else
        {
            var foldersArr:any = [];
            foldersArr.push(folder._id);
            var foldersStr = foldersArr.join(",");
            setFFolders(foldersStr);
        }
        return;
    }

    const allHandle = () => {
        var foldersArr:string[] = [];
        
        if (folders.length === FFolders.split(',').length)
        {
            setFFolders('');
        }
        else
        {
            folders.map((f:IFolder) => {
                foldersArr.push(f._id)
            });

            var foldersStr = foldersArr!.join(',');
            setFFolders(foldersStr)
        }     
    }

    //Shortcuts
    useEffect(() => {
        const keyDownHandler = (event:any) => {
            var key = event.keyCode;
            if (key === 27) close(false);
        }
        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [])

    return (
        <div className='tag-modal modal-content'>
            <div className="head">
                <h2 className="title">Tags Filter</h2>
                <p className='button' onClick={allHandle}>Un/Check All</p>
                {!isEmpty(close) && (
                    <p className="close" onClick={() => close(false)}>X</p>
                )}
            </div>

            <div className="body">
                <div className="tags">
                    {load && folders.map((folder:IFolder) => {
                        return (
                            <div className="tag" onClick={() => folderHandle(folder)}>
                                <input type="checkbox" checked={FFolders.includes(folder._id)} />
                                <p>{folder.name}</p>
                            </div>
                        )
                    })}
                </div>
                
            </div>
        </div>
    )
}
