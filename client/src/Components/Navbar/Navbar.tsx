import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { IState } from '../../types'
import { isEmpty } from '../../Utils';

export default function Navbar() {

    const [loaded, setLoaded] = useState(false);
    const user = useSelector((state:IState) => state.userReducer);

    useEffect(() => {
        if(!isEmpty(user)) setLoaded(true);
    }, [user]);

    return (
        <nav className='main-nav'>
            <div className="nav-buttons">

                <NavLink className={"nav-button"} to={"/"}>
                    <i className='nav-icon'>Icon</i>
                    <p className='nav-text'>Home</p>
                </NavLink> 

                <NavLink className={"nav-button"} to={"/explore"}>
                    <i className='nav-icon'>Icon</i>
                    <p className='nav-text'>Explore</p>
                </NavLink> 

                <NavLink className={"nav-button"} to={"/discover"}>
                    <i className='nav-icon'>Icon</i>
                    <p className='nav-text'>Discover</p>
                </NavLink>
                
                <NavLink className={"nav-button"} to={"/research"}>
                    <i className='nav-icon'>Icon</i>
                    <p className='nav-text'>Research</p>
                </NavLink> 
                 
                <NavLink className={"nav-button"} to={"/random"}>
                    <i className='nav-icon'>Icon</i>
                    <p className='nav-text'>Random</p>
                </NavLink> 

                <NavLink className={"nav-button"} to={"/create"}>
                    <i className='nav-icon'>Icon</i>
                    <p className='nav-text'>Add</p>
                </NavLink> 

                {loaded && (
                    <NavLink className={"nav-button"} to={"/profile"}>
                        <i className='nav-icon'>Icon</i>
                        <p className='nav-text'>{user.username}</p>
                    </NavLink>
                )}

                <p className="to-top nav-button" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
                    ToTop
                </p>

            </div>
        </nav>
    )
}
