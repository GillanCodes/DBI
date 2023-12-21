import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { IImage, IState } from "../../types";
import { getImages } from "../../actions/image.actions";
import { isEmpty } from "../../Utils";
import Card from "./Card";
import axios from "axios";

export default function Feed() {

    const [loadImg, setLoadImg] = useState(true);
    const [count, setCount]     = useState(5);
    const dispatch:any = useDispatch();
    // const images = useSelector((state:IState) => state.imagesReducer);
    const [images , setImages] = useState<IImage[]>();

    function getImages(count:number)
    {
        return axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}/image/`,
            withCredentials:true
        }).then((res) => {
            const array = res.data.slice(0, count)
            setImages(array);
        }).catch((err) => {
            console.log(err);
        });
    }


    const loadMore = () => {
        if (window.innerHeight + document.documentElement.scrollTop + 1 > document.scrollingElement!.scrollHeight) 
        {
            setLoadImg(true);
        }
    }

    useEffect(() => {
        if(loadImg)
        {
            getImages(count)
            setLoadImg(false);
            setCount(count + 5);
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadImg, count, dispatch])

    return (
      <div className="feed">
        <div className="cards">
            {!isEmpty(images) && images!.map((image:IImage) => {
                return <Card image={image} key={image._id} />
            })}
        </div>
      </div>
    )
}
