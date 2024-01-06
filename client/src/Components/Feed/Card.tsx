import React, { useState } from 'react'
import { IImage, IState } from '../../types'
import { convertDatetoTime, dateConverter, isEmpty } from '../../Utils';
import { useSelector } from 'react-redux';
import Media from './Media';

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
                    <p className='folder_name' onClick={() => window.location.assign(`/f/${image.folderId}`)}>{folder.name}</p>
                  </>
                )
          })}
        </div>
        <div className="card-body">
          <Media media={image} />
        </div>
        <div className="card-footer">
          <p>{image.views.length}</p>
          <p>{dateConverter(convertDatetoTime(image.createdAt))}</p>
          <p className='button' onClick={() => window.location.assign(`/i/${image._id}`)}>View</p>
        </div>
    </div>
  )
}
