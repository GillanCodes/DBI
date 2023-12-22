import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { IFolder, IState } from '../../types';
import { isEmpty } from '../../Utils';
import FolderCard from './FolderCard';

export default function Explore() {

    const [search, setSearch] = useState<string>("");

    const folders = useSelector((state:IState) => state.foldersReducer);

    return (
        <div className="container">
            <div className="explore">

                <div className="head">
                    <input type="text" className='input' placeholder='Search' onChange={(e) => setSearch(e.target.value)} />
                </div>

                <div className="content">
                    <div className="folders">
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
                                                        <FolderCard folder={folder} />
                                                    )
                                                }
                                                return;
                                            } 
                                            else
                                            {
                                                return (
                                                    <FolderCard folder={folder} />
                                                )
                                            }
                                        })}
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}
