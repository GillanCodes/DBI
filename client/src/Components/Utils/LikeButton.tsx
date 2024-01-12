import { useEffect, useState } from 'react'
import { IMedia, IState } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../../Utils';
import { likeMedia } from '../../actions/media.actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartReg} from '@fortawesome/free-regular-svg-icons';

export default function LikeButton({media, style} : {media:IMedia | undefined, style: string | null}) {

    const dispatch:any = useDispatch();

    const user = useSelector((state:IState) => state.userReducer);

    const [load, setLoad] = useState(false);

    useEffect(() => {
        if(!isEmpty(user) && !isEmpty(media)) setLoad(true)
        else setLoad(false);
    }, [user, media]);

    const unlikeHandle = () => {
        dispatch(likeMedia(media!._id));
    }

    return (
        <div className={style === "button" ? "like-button button" : "like-button"} onClick={unlikeHandle}>
            {load && (
                <>
                    {media!.likes.includes(user._id) ? (
                        <FontAwesomeIcon icon={faHeart} />
                    ) : (
                        <FontAwesomeIcon icon={faHeartReg} />
                    )}
                </>
            )}
        </div>
    )
}
