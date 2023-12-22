import { useSelector } from "react-redux"
import { IState } from "../../types"
import { useEffect, useState } from "react";
import { isEmpty } from "../../Utils";

export default function Folder() {

    const [load, setLoad] = useState<boolean>(false);

    const folders = useSelector((state:IState) => state.foldersReducer);

    useEffect(() => {
        if (!isEmpty(folders)) setLoad(true);
    }, [folders])

    return (
        <div className='container'>
            {load && (
                <div className="folder">

                </div>
            )}
        </div>
    )
}
