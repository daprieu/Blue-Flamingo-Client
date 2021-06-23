import React from "react"
import { Link } from "react-router-dom"
// import "./nav/NavBar.css"


export const ParamNavBar = () => {

    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/params/hardness">Hardness</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/params/totalchlorine">Total Chlorine</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/params/freechlorine">Free Chlorine</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/params/ph">pH</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/params/alkalinity">Alkalinity</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/params/cyanuricacid">Cyanuric Acid</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/params/salinity">Salinity</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/params/filterpressure">Filter Pressure</Link>
            </li>
        </ul>
    )
}
