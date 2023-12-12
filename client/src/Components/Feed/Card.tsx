import React, { useState } from 'react'
import { IImage } from '../../types'
import { convertDatetoTime, dateConverter } from '../../Utils';

export default function Card({image} : {image:IImage}) {

  const [clicked, setClicked] = useState(false);

  return (
    <div className='card'>
        <div className="card-head">

        </div>
        <div className="card-body">
          <img 
            className={clicked ? "card-image full-width" : "card-image full-height"} 
            src={`${process.env.REACT_APP_CDN_URL}/uploads/${image.filePath}`} 
            alt="" 
            onClick={() => setClicked(!clicked)}
          />
        </div>
        <div className="card-footer">
          <p>{image.views.length}</p>
          <p>{dateConverter(convertDatetoTime(image.createdAt))}</p>
        </div>
    </div>
  )
}
