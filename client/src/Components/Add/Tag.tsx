import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IState, ITag } from '../../types'
import { isEmpty } from '../../Utils';
import { createTag, deleteTag } from '../../actions/tag.actions';

export default function Tag() {

    const dispatch:any = useDispatch();

    const tags = useSelector((state:IState) => state.tagsReducer)

    const [tag, setTag] = useState("");
    const [search, setSearch] = useState("");

    const addTag = () => {
        dispatch(createTag(tag))
        setTag("");
    }

    return (
        <div className='tags'>

            <div className="head">

                <div className="title">
                    <h1>Add Tags</h1>
                </div>
                <div className="head-content">
                    <div className="input">
                        <input className='input' type="text" value={tag} onChange={(e) => setTag(e.target.value)}  />
                        <button className='button' onClick={addTag}>Add</button>
                    </div>
                </div>
            </div>

            <div className="body">
                <input type="text" className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Search a tag' />
                <div className="tags">
                    {!isEmpty(tags) && Array.from(tags).sort((a:any,b:any) => a.name.localeCompare(b.name)).map((tag:ITag, key:number) => {
                        if (!isEmpty(search)) {
                            if(tag.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                                return <div className='tag' key={key}>
                                    <p>{tag.name.toLocaleLowerCase()}</p>
                                    <div className="buttons">
                                        <p className="button" onClick={() => dispatch(deleteTag(tag._id))}>Delete</p>
                                    </div>
                                </div>
                            } else {
                                return
                            }
                        } else {
                            return <div className='tag' key={key}>
                                <p>{tag.name}</p>
                                <div className="buttons">
                                    <p className="button" onClick={() => dispatch(deleteTag(tag._id))}>Delete</p>
                                </div>
                            </div>
                        }
                    })}
                </div>
            </div>

        </div>
    )
}
