import React, { useState } from 'react'
import { IImage, IState } from '../../types'
import { convertDatetoTime, dateConverter, isEmpty } from '../../Utils';
import { useSelector } from 'react-redux';

export default function Card({image} : {image:IImage}) {

  const [clicked, setClicked] = useState(false);
  const folders = useSelector((state:IState) => state.foldersReducer);

  return (
    <div className='card'>
        <div className="card-head">
          {!isEmpty(folders) && folders.map((folder) => {
              if (folder._id === image.folderId)
                return (
                  <>
                    <img className='icon' src={`${process.env.REACT_APP_CDN_URL}/icons/${folder.icon}`} alt="icon" />
                    <p className='folder_name'>{folder.name}</p>
                  </>
                )
          })}
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
