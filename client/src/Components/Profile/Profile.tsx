import { useState } from "react"
import Likes from "./Likes"

export default function Profile() {

    const [tab, setTab] = useState(0)

    return (
        <div className="container">
            
            <div className="tabs-container">
                <div className="tabs">
                    <div className={tab === 0 ? "tab active" : "tab"} onClick={() => setTab(0)}>
                        <p>Likes</p>
                    </div>
                </div>
            </div>

            <>
                {tab === 0 && (
                    <Likes />
                )}
            </>

        </div>
    )
}
