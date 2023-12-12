import React from 'react'
import { IImage } from '../../types'

export default function Card({image} : {image:IImage}) {
  return (
    <div style={{overflow:"scroll"}}>
        <div className="head">

        </div>
        <div className="body">
          <img src={`${process.env.REACT_APP_CDN_URL}/uploads/${image.filePath}`} alt="" />
        </div>
    </div>
  )
}
