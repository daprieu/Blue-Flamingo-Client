import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"
import Logo from "./BFP.png"

export const NavBar = () => {
    const isStaff = JSON.parse(localStorage.getItem("isStaff"))
    return (
        <>
        <ul className="navbar">
            <li className="navbar__item">
                <img className="navbar__logo" src={Logo} alt="" />
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" type="link" data-toggle="modal" data-backdrop="static" data-backdrop='false' data-target="#exampleModal" to="/enter_daily_data">
                Enter Daily Data
                </Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/daily_logs">Daily Logs</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/">Equipment</Link>
            </li>
            { isStaff ? 
            <ul className="navbar">
                <li className="navbar__item">
                    <Link className="navbar__link" to="/pumphouse">Pump House MGMT</Link>
                </li> 
                <li className="navbar__item">
                    <Link className="navbar__link" to="/params">Parameter MGMT</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/">Equipment MGMT</Link>
                </li>
            </ul> : ""}
            
            {
                (localStorage.getItem("BF_user_id") !== null) ?
                    <div className="nav-item">
                        <button className="nav-link fakeLink"
                            onClick={() => {
                                localStorage.removeItem("BF_user_id")
                                localStorage.removeItem("isStaff")
                                localStorage.removeItem("userId")
                                
                            }}
                        ><Link className="navbar__link" to="/">Logout</Link></button>
                    </div> :
                    <div className="nav-item">
                    <button className="nav-link fakeLink"
                    ><Link className="navbar__link" to="/login">Login</Link></button>
                    </div> 
                    
            }         
        </ul>
        </>
    )
}