import React, { useState } from 'react'
import { IImage } from '../../types'

export default function Media({media} : {media:IImage}) {

    const [clicked, setClicked] = useState(false);

    return (
        <>
            {media.type === "img" && (
                <img 
                    className={clicked ? "card-image full-width" : "card-image full-height"} 
                    src={`${process.env.REACT_APP_CDN_URL}/uploads/${media.filePath}`} 
                    alt="img" 
                    onClick={() => setClicked(!clicked) }    
                />
            
            )}
            
            {media.type === "video" && (
                <video 
                    className={clicked ? "card-image full-width" : "card-image full-height"} 
                    src={`${process.env.REACT_APP_CDN_URL}/uploads/${media.filePath}`} 
                    muted 
                    loop
                    onMouseOver={(e) => e.currentTarget.play()} 
                    onMouseLeave={(e) => e.currentTarget.pause()} 
                    onClick={() => setClicked(!clicked) }    
                />
            )}
        </>
    )
}
