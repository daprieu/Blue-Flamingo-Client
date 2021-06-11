import React from "react"
import { Route, Redirect } from "react-router-dom"
import { BlueFlamingoViews } from "./BlueFlamingoViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"

export const BlueFlamingo = () => (
    <>
        <Route render={() => {
            if (localStorage.getItem("BF_user_id")) {
                return <>
                    <NavBar />
                    <BlueFlamingoViews />
                    </>
            } else {
                return <>
                <NavBar />
                <BlueFlamingoViews />
                </> 
            }
        }} />

        <Route path="/login" render={() => {
            if (localStorage.getItem("BF_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Login />
            }
        }} />

        <Route path="/register" render={() => {
            if (localStorage.getItem("BF_user_id")) {
                return <Redirect to="/" />
            } else {
                return <Register />
            }
        }} />
    </>
)