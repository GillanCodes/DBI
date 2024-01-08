import React, { useEffect, useState } from 'react'
import { isEmpty } from '../../Utils'
import { useSelector } from 'react-redux'
import { IState, ITag } from '../../types'

export default function TagModal({close, FTags, setFTags} : {close:any, FTags:any, setFTags:any}) {
    
    const tags = useSelector((state:IState) => state.tagsReducer);

    const [load, setLoad] = useState<Boolean>(false);

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

    return (
        <div className='tag-modal modal-content'>
            <div className="head">
                <h2 className="title">Tags Filter</h2>
                {!isEmpty(close) && (
                    <p className="close" onClick={() => close(false)}>X</p>
                )}
            </div>

            <div className="body">
                <div className="tags">
                    {load && tags.map((tag:ITag) => {
                        return (
                            <div className="tag" onClick={() => tagHandle(tag)}>
                                <input type="checkbox" checked={FTags.includes(tag._id)} />
                                <p>{tag.name}</p>
                            </div>
                        )
                    })}
                </div>
                
            </div>
        </div>
    )
}
