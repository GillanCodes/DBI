import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteMedia } from '../../actions/media.actions';
import { useToasts } from './Toast/ToastContext';

export default function DeleteBtn({itemId} : {itemId:string}) {

    const dispatch:any = useDispatch();
    const { pushToast } = useToasts();

    const deleteHandle = () => {
        dispatch(deleteMedia(itemId));
        pushToast({
            title: "Deleting ...",
            content : "Delete in progress ...",
            duration: 1
        });
        const timer = setTimeout(() => {
            window.history.back();
            pushToast({
                title:"Deleted !",
                content: "Media was delete successfully !",
                type: "success",
                duration: 5
            })
        }, 1000);

        return () => {
            clearTimeout(timer);
        }
    }

    return (
        <p className='button' onClick={deleteHandle}>DELETE</p>
    )
}
