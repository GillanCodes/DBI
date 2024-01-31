import React, { useState } from 'react'
import Folders from './Folders'
import Images from './Medias'
import Tag from './Tag'
import Properties from './Properties'
import Categories from './Categories'

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
                        <div className={tab === 3 ? "tab active" : "tab"} onClick={() => setTab(3)}>
                            <p>Properties</p>
                        </div>
                        <div className={tab === 4 ? "tab active" : "tab"} onClick={() => setTab(4)}>
                            <p>Categories</p>
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
                    
                    {tab === 3 && (
                        <Properties />
                    )}
                    
                    {tab === 4 && (
                        <Categories />
                    )}
                </div>

               


            </div>
        </div>
    )
}
