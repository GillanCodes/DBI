import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { IImage, IState } from "../../types";
import { isEmpty } from "../../Utils";
import { getAllImages } from "../../actions/image.actions";

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
    const [count, setCount] = useState(25)

    const [imgs, setImgs]     = useState<IImage[]>();
    const [suffle, setShuffle]= useState<IImage[]>();

    const images = useSelector((state:IState) => state.imagesReducer);    

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement!.scrollHeight) 
        {
            setLoadImg(true);
        }
    }

    useEffect(() => {
        if (!isEmpty(images)) shuffleArr(images);
    }, [images])

    useEffect(() => {
        if(loadImg && !isEmpty(suffle)) 
        {
            setLoadImg(false);
            setImgs(suffle!.slice(0, count));
            setCount(count + 25)
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadImg, count, imgs, suffle])

    useEffect(() =>{
        dispatch(getAllImages());
    }, [])

    return (
        <div className="container">
            <div className="discover">
                <div className="images">
                    {!isEmpty(imgs) && imgs!.map((image:IImage) => {
                        return (
                            <div className="image" onClick={() => window.location.assign(`/i/${image._id}`)}>
                                <img src={`${process.env.REACT_APP_CDN_URL}/uploads/${image.filePath}`} alt="img" />
                            </div>
                        ) 
                    })}
                </div>
            </div>

        </div>
    )
}
