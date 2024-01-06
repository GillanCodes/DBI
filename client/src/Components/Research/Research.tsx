import React, { useEffect, useState } from 'react'
import Tag from '../Add/Tag'
import TagModal from '../Random/TagModal';
import axios from 'axios';
import { IImage } from '../../types';
import { isEmpty } from '../../Utils';

export default function Research() {

    const [modal, setModal] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);
    const [category, setCategory] = useState<string>("");
    
    const [count, setCount]     = useState(20);
    const [loadImg, setLoadImg] = useState(true);

    const [query, setQuery] = useState<IImage[]>();
    const [images, setImages] = useState<IImage[]>();

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/image/params?tags=${tags}&category=${category}`,
            withCredentials: true
        }).then((res) => {
            setQuery(res.data)
            setImages(res.data.slice(0,count))
        })
    }, [tags, category]);
    
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
            setCount(count + 10)
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadImg, count, images, query])


    return (
        <div className='container'>
            <div className="research">
                <div className="head">
                    <input type="text" onChange={(e) => setCategory(e.target.value)} />
                    <p className='button' onClick={() => setModal(!modal)}>Tags</p>
                </div>
                <div className="body">
                    {!isEmpty(images) && images!.map((image:IImage) => {
                        return (
                            <img style={{height:'300px', width:"300px", objectFit:"cover"}} src={`${process.env.REACT_APP_CDN_URL}/uploads/${image.filePath}`} alt="image" />
                        )
                    })}
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
