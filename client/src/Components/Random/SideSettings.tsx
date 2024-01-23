import { useEffect, useState } from "react";
import { isEmpty } from "../../Utils";
import LikeButton from "../Utils/LikeButton";

export default function SideSettings({settingsModal, setSettingsModal, history, getMediaById, imgData, getMedia, auto, setAuto, time, setTime} : {settingsModal:any, setSettingsModal:any, history:any, getMediaById:any, imgData:any, getMedia:any, auto:any, setAuto:any, time:any, setTime:any}) {

    return (
        <div className="settings-panel">
            <h2 className="panel-title">Settings</h2>

            <div className="fields">
                <p className="button" onClick={() => setSettingsModal(!settingsModal)}>Settings</p>
                <LikeButton media={imgData} style={"button"} />
            </div>

            <div className="spacer"></div>

            <div className="fields">
                <div className="field">
                    <p className="field-text">Auto ?</p>
                    <p className="button" onClick={() => setAuto(!auto)}>{auto ? "Auto On" : "Auto Off"}</p>
                </div>
                <div className="field">
                    <p className="field-text">Timer</p>
                    <input type="number" className="field-input" min={1} max={300} value={time} onChange={(e) => setTime(Number(e.target.value))} />
                </div>
            </div>

            <div className="spacer"></div>

            <div className="history">

                <p className="history-size">{history.length} view{history.length < 2 ? "" : "s" } this session.</p>

                <ul className="history-list">
                    {!isEmpty(history) && history.map((item:any) => {
                        return(                    
                            <li className="history-item">
                                <p onClick={() => getMediaById(item.value)}>{item.name}</p>
                            </li>
                        )
                    })}

                </ul>

            </div>
        </div>
    )
}
