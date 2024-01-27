import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteMedia } from '../../actions/media.actions';

export default function DeleteBtn({itemId} : {itemId:string}) {

    const dispatch:any = useDispatch();

    const deleteHandle = () => {
        dispatch(deleteMedia(itemId));
        const timer = setTimeout(() => {
            window.location.assign('/');
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }

    return (
        <p className='button' onClick={deleteHandle}>DELETE</p>
    )
}
