import { IFolder } from "../../types";

export default function FolderCard({folder} : {folder:IFolder}) {
  return (
    <div className="folder-card">

        <div className="content">

            <div className="head">
                <img src={`${process.env.REACT_APP_CDN_URL}/icons/${folder.icon}`} alt="icon" />
            </div>
            
            <div className="body">
                <p className="title">{folder.name}</p>
                <p className="desc">{folder.description}</p>
            </div>

        </div>

    </div>
  )
}
