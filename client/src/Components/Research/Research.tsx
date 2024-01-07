import React, { useEffect, useState } from 'react'
import Tag from '../Add/Tag'
import TagModal from '../Random/TagModal';
import axios from 'axios';
import { IImage } from '../../types';
import { isEmpty } from '../../Utils';
import MediaGrid from '../Utils/MediaGrid';
import Dropdown from '../Utils/Dropdown';

export default function Research() {

    const [modal, setModal] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);
    const [category, setCategory] = useState<string>("");
    const [type, setType] = useState<string>("");
    
    const [count, setCount]     = useState(24);
    const [loadImg, setLoadImg] = useState(true);

    const [query, setQuery] = useState<IImage[]>();
    const [images, setImages] = useState<IImage[]>();

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/image/params?tags=${tags}&category=${category}&type=${type}`,
            withCredentials: true
        }).then((res) => {
            setCount(24);
            setQuery(res.data)
            setImages(res.data.slice(0,count))
        })
    }, [tags, category, type]);
    
     const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement!.scrollHeight) 
        {
            setLoadImg(true);
        }
    }

    useEffect(() => {
        if(loadImg && !isEmpty(query)) 
        {
            setLoadImg(false);
            setImages(query!.slice(0, count));
            setCount(count + 12)
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadImg, count, images, query])

    return (
        <div className='container'>
            <div className="research">
                <div className="head">
                    <input type="text" className='input' onChange={(e) => setCategory(e.target.value)} placeholder='Category' />
                    <input type='text' className='input' list='type' placeholder='Type' onChange={(e) => setType(e.target.value)} />
                    <datalist id='type'>
                        <option value="">Tous</option>
                        <option value="video">Videos</option>
                        <option value="img">Images</option>
                    </datalist>
                    <p className='button' onClick={() => setModal(!modal)}>Tags</p>
                </div>
                <div className="body">
                    <div className="images">
                        {!isEmpty(images) && images!.map((image:IImage) => {
                            return (
                                <MediaGrid media={image} />
                            )
                        })}
                    </div>
                </div>
            </div>
            {modal && (
                <div className="modal">
                    <TagModal close={setModal} FTags={tags} setFTags={setTags} />
                </div>
            )}
        </div>
    )
}
