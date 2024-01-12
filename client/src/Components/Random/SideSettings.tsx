import { isEmpty } from "../../Utils";
import LikeButton from "../Utils/LikeButton";

export default function SideSettings({settingsModal, setSettingsModal, history, img, setImg, imgData} : {settingsModal:any, setSettingsModal:any, history:any, img:any, setImg:any, imgData:any}) {
  return (
    <div className="settings-panel">
        <h2 className="panel-title">Settings</h2>

        <div className="fields">
            <p className="button" onClick={() => setSettingsModal(!settingsModal)}>Settings</p>
            <LikeButton media={imgData} />
        </div>

        <div className="spacer"></div>

        <div className="history">

            <ul className="history-list">
                {!isEmpty(history) && history.map((item:any) => {
                    return(                    
                        <li className="history-item">
                            <p onClick={() => setImg(item.value)}>{item.name}</p>
                        </li>
                    )
                })}

            </ul>

        </div>
    </div>
  )
}
