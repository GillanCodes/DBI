import { isEmpty } from "../../Utils";

export default function SideSettings({settingsModal, setSettingsModal, history, img, setImg} : {settingsModal:any, setSettingsModal:any, history:any, img:any, setImg:any}) {
  return (
    <div className="settings-panel">
        <h2 className="panel-title">Settings</h2>

        <div className="fields">
            <p className="button" onClick={() => setSettingsModal(!settingsModal)}>Settings</p>
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
