import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { IImage, IState } from "../../types";
import { getImages } from "../../actions/image.actions";
import { isEmpty } from "../../Utils";
import Card from "./Card";

export default function Feed() {

    const [loadImg, setLoadImg] = useState(true);
    const [count, setCount]     = useState(5);
    const dispatch:any = useDispatch();
    const images = useSelector((state:IState) => state.imagesReducer);

    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement!.scrollHeight) 
        {
            setLoadImg(true);
        }
    }

    useEffect(() => {
        if(loadImg)
        {
            dispatch(getImages(count));
            setLoadImg(false);
            setCount(count + 5);
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadImg, count, dispatch])

    return (
      <div className="feed">
        <ul>
            {!isEmpty(images) && images.map((image:IImage) => {
                return <Card image={image} key={image._id} />
            })}
        </ul>
      </div>
    )
}
