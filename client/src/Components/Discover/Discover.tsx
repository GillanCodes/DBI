import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { IMedia, IState } from "../../types";
import { isEmpty } from "../../Utils";
import { getAllMedias } from "../../actions/media.actions";
import MediaGrid from "../Utils/MediaGrid";

export default function Discover() {

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

        setShuffle(array);
    }

    const dispatch:any = useDispatch();
    const [loadImg, setLoadImg] = useState(true);
    const [count, setCount] = useState(20)

    const [imgs, setImgs]     = useState<IMedia[]>();
    const [suffle, setShuffle]= useState<IMedia[]>();

    const medias = useSelector((state:IState) => state.mediasReducer);    

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement!.scrollHeight) 
        {
            setLoadImg(true);
        }
    }

    useEffect(() => {
        if (!isEmpty(medias)) shuffleArr(medias);
    }, [medias])

    useEffect(() => {
        if(loadImg && !isEmpty(suffle)) 
        {
            setLoadImg(false);
            setImgs(suffle!.slice(0, count));
            setCount(count + 10)
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadImg, count, imgs, suffle])

    useEffect(() =>{
        dispatch(getAllMedias());
    }, [])

    return (
        <div className="container">
            <div className="discover">
                <div className="medias">
                    {!isEmpty(imgs) && imgs!.map((media:IMedia) => {
                        return (
                            <MediaGrid media={media} />
                        ) 
                    })}
                </div>
            </div>

        </div>
    )
}
