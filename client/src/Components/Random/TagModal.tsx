import React, { useEffect, useState } from 'react'
import { isEmpty } from '../../Utils'
import { useSelector } from 'react-redux'
import { IState, ITag } from '../../types'

export default function TagModal({close, FTags, setFTags} : {close:any, FTags:any, setFTags:any}) {
    
    const tags = useSelector((state:IState) => state.tagsReducer);

    const [load, setLoad] = useState<Boolean>(false);
    const [name, setName] = useState("");

    useEffect(() => {
        if (!isEmpty(tags)) setLoad(true)
    }, [tags])

    const tagHandle = (tag:ITag) => {
        if (!isEmpty(FTags))
        {
            var tagsArr = FTags!.split(','); //Array
            const index = tagsArr.findIndex((i:string) => i === tag._id)
            if (index >= 0)
            {
                var filtered = tagsArr.filter((t:string) => {
                    return t !== tag._id
                });
                var tagsStr = filtered.join(',');
                setFTags(tagsStr);
            }
            else
            {
                tagsArr.push(tag._id);
                var tagsStr = tagsArr.join(',');
                setFTags(tagsStr);
            }
        }
        else
        {
            var tagsArr:any = [];
            tagsArr.push(tag._id);
            var tagsStr = tagsArr.join(",");
            setFTags(tagsStr);
        }
        return;
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
                {!isEmpty(close) && (
                    <p className="close" onClick={() => close(false)}>X</p>
                )}
            </div>

            <div className="body">
                <div className="search" style={{width:"100%", display:"flex", justifyContent:"center"}}>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='input' placeholder='Search' />
                </div>
                <div className="tags">
                    {load && tags.sort((a:any,b:any) => a.name.localeCompare(b.name)).map((tag:ITag) => {
                        if (name.length >= 2){
                            if (tag.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())){
                                return (
                                    <div className="tag" onClick={() => tagHandle(tag)}>
                                        <input type="checkbox" checked={FTags.includes(tag._id)} />
                                        <p>{tag.name}</p>
                                    </div>
                                )
                            }
                        } else {
                            return (
                                <div className="tag" onClick={() => tagHandle(tag)}>
                                    <input type="checkbox" checked={FTags.includes(tag._id)} />
                                    <p>{tag.name}</p>
                                </div>
                            )
                        }
                        
                    })}
                </div>
                
            </div>
        </div>
    )
}
