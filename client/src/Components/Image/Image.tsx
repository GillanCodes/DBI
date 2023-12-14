import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IImage, IState } from '../../types';
import { isEmpty } from '../../Utils';
import { useParams } from 'react-router-dom';
import ImageSettings from './ImageSettings';
import { useDispatch, useSelector } from 'react-redux';
import { getImage } from '../../actions/image.actions';

export default function Image() {

    const dispatch:any = useDispatch();
    const imageReducer = useSelector((state:IState) => state.imagesReducer);

    const param = useParams();

    const [img, setImg] = useState<IImage>();
    const [load, setLoad] = useState(false);

    const [modal, setModal] = useState(false);

    const callImage = (id:any) => {
        dispatch(getImage(id));
    }

    useEffect(() => {
        if(!isEmpty(param.id))
        {
            callImage(param.id);
        }
    }, [param]);

    useEffect(() => {
        if (!isEmpty(imageReducer))
        {
            setImg(imageReducer[0])
            if(!isEmpty(img)) setLoad(true)
        }
    }, [imageReducer ,img])

    return (
        <div className='container'>
            {load && (
                <>
                    <div className="image">
                        <div className="top-bar">
                            <p className='button' onClick={() => setModal(!modal)}>Settings</p>
                        </div>
                        <div className="single-view">
                            <img src={`${process.env.REACT_APP_CDN_URL}/uploads/${img?.filePath}`} alt="img" />
                        </div>
                    </div>
                    {modal && (
                        <div className="modal">
                            <ImageSettings image={img} close={setModal} />
                        </div>
                    )}
                </>
            )}
            

        </div>
    )
}
