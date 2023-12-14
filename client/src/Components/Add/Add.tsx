import React, { useState } from 'react'
import Folders from './Folders'
import Images from './Images'
import Tag from './Tag'

export default function Add() {

    const [tab, setTab] = useState(0)

    return (
        <div className='container'>

            <div className="add">
                <div className="tabs-container">
                    <div className="tabs">
                        <div className={tab === 0 ? "tab active" : "tab"} onClick={() => setTab(0)}>
                            <p>Images</p>
                        </div>
                        <div className={tab === 1 ? "tab active" : "tab"} onClick={() => setTab(1)}>
                            <p>Folders</p>
                        </div>
                        <div className={tab === 2 ? "tab active" : "tab"} onClick={() => setTab(2)}>
                            <p>Tags</p>
                        </div>
                    </div>
                </div>

                <div className="content">
                    {tab === 0 && (
                       <Images /> 
                    )}

                    {tab === 1 && (
                        <Folders />
                    )}

                    {tab === 2 && (
                        <Tag />
                    )}
                </div>

               


            </div>
        </div>
    )
}
