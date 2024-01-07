import { IMedia } from '../../types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faVideo} from "@fortawesome/free-solid-svg-icons"

export default function MediaGrid({media} : {media:IMedia}) {

    return (
        <>
            {media.type === "img" && (
                <img 
                    src={`${process.env.REACT_APP_CDN_URL}/uploads/${media.filePath}`} 
                    alt="img" 
                    className='media'
                    onClick={() => window.location.assign(`/i/${media._id}`)}
                />
            
            )}
            
            {media.type === "video" && (
                <div>
                <video 
                    src={`${process.env.REACT_APP_CDN_URL}/uploads/${media.filePath}`} 
                    muted 
                    loop
                    onMouseOver={(e) => e.currentTarget.play()} 
                    onMouseLeave={(e) => e.currentTarget.pause()}
                    className='media'
                    onClick={() => window.location.assign(`/i/${media._id}`)}
                />
                <FontAwesomeIcon icon={faVideo} style={{position:"relative", marginLeft: "-240px", bottom: 10, fontSize: "24px"}} />
                </div>
            )}
        </>
    )
}