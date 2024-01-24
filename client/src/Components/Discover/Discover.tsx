import React, { useEffect, useState } from 'react'
import Tag from '../Add/Tag'
import TagModal from '../Random/TagModal';
import axios from 'axios';
import { IMedia } from '../../types';
import { isEmpty } from '../../Utils';
import MediaGrid from '../Utils/MediaGrid';
import FolderModal from '../Random/FolderModal';

export default function Discover() {

    const [modal, setModal] = useState<boolean>(false);
    const [modalFolder, setModalFolder] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);
    const [folders, setFolders] = useState<string[]>([]);
    const [category, setCategory] = useState<string>("");
    const [type, setType] = useState<string>("");
    
    const [count, setCount]     = useState(24);
    const [loadImg, setLoadImg] = useState(true);

    const [query, setQuery] = useState<IMedia[]>();
    const [medias, setMedias] = useState<IMedia[]>();

    function shuffleArr(array:any[]) {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    useEffect(() => {
        axios({
            method: "GET",
            url: `${process.env.REACT_APP_API_URL}/media/params?tags=${tags}&category=${category}&type=${type}&folderIds=${folders}`,
            withCredentials: true
        }).then(async (res) => {
            setCount(24);
            var shuffle = await shuffleArr(res.data)
            setQuery(shuffle)
            setMedias(shuffle.slice(0,count))
        })
    }, [tags, category, type, folders]);


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
            setMedias(query!.slice(0, count));
            setCount(count + 12)
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadImg, count, medias, query])

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
                    <p className='button' onClick={() => setModalFolder(!modalFolder)}>Folders</p>
                </div>
                <div className="body">
                    <div className="medias">
                        {!isEmpty(medias) && medias!.map((media:IMedia) => {
                            return (
                                <MediaGrid media={media} />
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
            
            {modalFolder && (
                <div className="modal">
                    <FolderModal close={setModalFolder} FFolders={folders} setFFolders={setFolders} />
                </div>
            )}
        </div>
    )
}
