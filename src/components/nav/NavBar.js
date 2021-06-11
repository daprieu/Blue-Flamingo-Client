import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"
import Logo from "./BFP.png"

export const NavBar = () => {
    const history = useHistory()
    const userId = localStorage.getItem("userId")
    const isStaff = JSON.parse(localStorage.getItem("isStaff"))

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <img className="navbar__logo" src={Logo} />
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Enter Daily Data</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Daily Logs</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Equipment</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Pump House MGMT</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Parameter MGMT</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Equipment MGMT</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">???</Link>
            </li>
            {
                (localStorage.getItem("BF_user_id") !== null) ?
                    <div className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("BF_user_id")
                                localStorage.removeItem("isStaff")
                                localStorage.removeItem("userId")
                                // history.push({ pathname: "/" })
                            }}
                        ><Link className="navbar__link" to="/">Logout</Link></button>
                    </div> :
                    <div className="nav-item">
                    <button className="nav-link fakeLink"
                    ><Link className="navbar__link" to="/login">Login</Link></button>
                    </div> 
                    
            }         
        </ul>
    )
}