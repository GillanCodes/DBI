import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';

export default function Auth() {

    const [tab, setTab] = useState(0);

    return (
        <div className="auth-box-container">
            <div className="app-container">
                <div className="tabs">
                    <p className={tab === 0 ? 'tab active select-none' : 'tab select-none'} onClick={() => setTab(0)}>Login</p>
                    <p className={tab === 1 ? 'tab active select-none' : 'tab select-none'} onClick={() => setTab(1)}>Register</p>
                </div>
                <>
                    {tab === 0 && (<Login />)}            
                    {tab === 1 && (<Register />)}            
                </>
            </div>
        </div>

    )
}
