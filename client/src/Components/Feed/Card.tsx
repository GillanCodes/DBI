import React, { useState } from 'react'
import { IMedia, IState } from '../../types'
import { convertDatetoTime, dateConverter, isEmpty } from '../../Utils';
import { useSelector } from 'react-redux';
import Media from './Media';

export default function Card({media} : {media:IMedia}) {

  const [clicked, setClicked] = useState(false);
  const folders = useSelector((state:IState) => state.foldersReducer);

  return (
    <div className='card'>
        <div className="card-head">
          {!isEmpty(folders) && folders.map((folder) => {
              if (folder._id === media.folderId)
                return (
                  <>
                    <img className='icon' src={`${process.env.REACT_APP_CDN_URL}/icons/${folder.icon}`} alt="icon" />
                    <p className='folder_name' onClick={() => window.location.assign(`/f/${media.folderId}`)}>{folder.name}</p>
                  </>
                )
          })}
        </div>
        <div className="card-body">
          <Media media={media} />
        </div>
        <div className="card-footer">
          <p>{media.views.length}</p>
          <p>{dateConverter(convertDatetoTime(media.createdAt))}</p>
          <p className='button' onClick={() => window.location.assign(`/i/${media._id}`)}>View</p>
        </div>
    </div>
  )
}
