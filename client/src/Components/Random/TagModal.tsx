import React, { useEffect, useState } from 'react'
import { isEmpty } from '../../Utils'
import { useSelector } from 'react-redux'
import { IState, ITag } from '../../types'

export default function TagModal({close} : {close:any}) {
    
    const tags = useSelector((state:IState) => state.tagsReducer);

    const [load, setLoad] = useState<Boolean>(false);

    useEffect(() => {
        if (!isEmpty(tags)) setLoad(true)
    }, [tags])

    return (
        <div className='tag-modal modal-content'>
            <div className="head">
                <h2 className="title">Tags Filter</h2>
                {!isEmpty(close) && (
                    <p className="close" onClick={() => close(false)}>X</p>
                )}
            </div>

            <div className="body">
                {load && tags.map((tag:ITag) => {
                    return (
                        <p>{tag.name}</p>
                    )
                })}
            </div>
        </div>
    )
}
