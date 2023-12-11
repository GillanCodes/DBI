import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='main-nav'>
        <div className="nav-buttons">

            <NavLink className={"nav-button"} to={"/"}>
                <i>Icon</i>
                <p>Home</p>
            </NavLink> 

            <NavLink className={"nav-button"} to={"/"}>
                <i>Icon</i>
                <p>Research</p>
            </NavLink> 

            <NavLink className={"nav-button"} to={"/"}>
                <i>Icon</i>
                <p>Discorver</p>
            </NavLink> 

            <NavLink className={"nav-button"} to={"/"}>
                <i>Icon</i>
                <p>Random</p>
            </NavLink> 

            <NavLink className={"nav-button"} to={"/"}>
                <i>Icon</i>
                <p>Add</p>
            </NavLink> 



        </div>
    </nav>
  )
}
