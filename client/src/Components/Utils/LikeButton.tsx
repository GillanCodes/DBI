import { useEffect, useState } from 'react'
import { IMedia, IState } from '../../types'
import { useDispatch, useSelector } from 'react-redux'
import { isEmpty } from '../../Utils';
import { likeMedia } from '../../actions/media.actions';

export default function LikeButton({media} : {media:IMedia | undefined}) {

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
        <div className='like-button button' onClick={unlikeHandle}>
            {load && (
                <>
                    {media!.likes.includes(user._id) ? (
                        <p>liked</p>
                    ) : (
                        <p>not liked</p>
                    )}
                </>
            )}
        </div>
    )
}
