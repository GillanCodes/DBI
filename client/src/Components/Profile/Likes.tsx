import { useSelector } from "react-redux"
import { IState } from "../../types"
import { useEffect, useState } from "react";
import { isEmpty } from "../../Utils";

export default function Likes() {

    const userData = useSelector((state:IState) => state.userReducer);

    const [load, setLoad] = useState<boolean>(false);

    useEffect(() => {
        if (!isEmpty(userData)) setLoad(true);
    }, [userData]);

    

    return (
        <>
            {load && (
                <div className="likes">



                </div>
            )}
        </>
    )
}
