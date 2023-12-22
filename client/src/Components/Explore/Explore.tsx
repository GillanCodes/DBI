import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { IFolder, IState } from '../../types';
import { isEmpty } from '../../Utils';

export default function Explore() {

    const [search, setSearch] = useState<string>("");

    const folders = useSelector((state:IState) => state.foldersReducer);

    return (
        <div className="container">
            <div className="explore">

                <div className="head">
                    <input type="text" placeholder='search' onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div className="content">
                    {!isEmpty(folders) && (
                        <>
                            {!isEmpty(folders) && (
                                <>
                                    {folders.map((folder:IFolder) => {
                                        if (!isEmpty(search))
                                        {
                                            if (folder.name.toLowerCase().includes(search.toLocaleLowerCase()) || folder.description.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
                                            {
                                                return (
                                                    <div className="folder">
                                                        <p>{folder.name}</p>
                                                        <p>{folder.description}</p>
                                                    </div>
                                                )
                                            }
                                            return;
                                        } 
                                        else
                                        {
                                            return (
                                                <div className="folder">
                                                    <p>{folder.name}</p>
                                                    <p>{folder.description}</p>
                                                </div>
                                            )
                                        }
                                    })}
                                </>
                            )}

                            {/* {isEmpty(search) && (
                                <>
                                    {folders.map((folder:IFolder) => {
                                        return(
                                            <div className="folder">
                                                <p>{folder.name}</p>
                                            </div>
                                        )
                                    })}
                                </>
                            )}

                            {!isEmpty(search) && (
                                <>
                                   
                                </>
                            )} */}
                        </>
                    )}
                </div>

            </div>
        </div>
    )
}
