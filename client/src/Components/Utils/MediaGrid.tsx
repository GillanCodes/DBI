import { IImage } from '../../types'

export default function MediaGrid({media} : {media:IImage}) {

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
                <video 
                    src={`${process.env.REACT_APP_CDN_URL}/uploads/${media.filePath}`} 
                    muted 
                    loop
                    onMouseOver={(e) => e.currentTarget.play()} 
                    onMouseLeave={(e) => e.currentTarget.pause()}
                    className='media'
                    onClick={() => window.location.assign(`/i/${media._id}`)}
                />
            )}
        </>
    )
}