import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { IMedia, IState } from "../../types";
import { getMedias } from "../../actions/media.actions";
import { isEmpty } from "../../Utils";
import Card from "./Card";
import axios from "axios";

export default function Feed() {

    const [loadImg, setLoadImg] = useState(true);
    const [count, setCount]     = useState(5);
    const dispatch:any = useDispatch();
    // const medias = useSelector((state:IState) => state.mediasReducer);
    const [medias , setMedias] = useState<IMedia[]>();

    function getMedias(count:number)
    {
        return axios({
            method:"get",
            url:`${process.env.REACT_APP_API_URL}/media/`,
            withCredentials:true
        }).then((res) => {
            const array = res.data.slice(0, count)
            setMedias(array);
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
            getMedias(count)
            setLoadImg(false);
            setCount(count + 5);
        }

        window.addEventListener('scroll', loadMore);
        return () => window.removeEventListener('scroll', loadMore);
    }, [loadImg, count, dispatch])

    return (
      <div className="feed">
        <div className="cards">
            {!isEmpty(medias) && medias!.map((media:IMedia) => {
                return <Card media={media} key={media._id} />
            })}
        </div>
      </div>
    )
}
