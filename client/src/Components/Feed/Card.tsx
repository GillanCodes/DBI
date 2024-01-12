import React, { useState } from 'react'
import { IMedia, IState } from '../../types'
import { convertDatetoTime, dateConverter, isEmpty } from '../../Utils';
import { useSelector } from 'react-redux';
import Media from './Media';
import LikeButton from '../Utils/LikeButton';

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
                    <div className='folder'>
                      <img className='icon' src={`${process.env.REACT_APP_CDN_URL}/icons/${folder.icon}`} alt="icon" />
                      <p className='folder_name' onClick={() => window.location.assign(`/f/${media.folderId}`)}>{folder.name}</p>
                    </div>
                    <p className='button' onClick={() => window.location.assign(`/i/${media._id}`)}>View</p>
                  </>
                )
          })}
        </div>
        <div className="card-body">
          <Media media={media} />
        </div>
        <div className="card-footer">
          <p className='view'>{media.views.length} views</p>
          <p className='date'>{dateConverter(convertDatetoTime(media.createdAt))}</p>
          <LikeButton media={media} style={null} />
        </div>
    </div>
  )
}
