import React, { createContext, useState } from "react"

export const SalinityParametersContext = createContext()

export const SalinityParametersProvider = (props) => {
    const [salinityParameters, setSalinityParameters] = useState()

    const getSalinityParams = () => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/salinity`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res => {
            setSalinityParameters(res)
            return res
        })
    }

    const addSalinityParam = paramObj => {
        return fetch("https://blue-flamingo-server.herokuapp.com/salinity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(paramObj)
        })
            .then(response => response.json())
            .then(getSalinityParams)
    }
    const deleteSalinityParam = (id) => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/salinity/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
        })
            .then(getSalinityParams)
    }
    const getSalinityParamById = id => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/salinity/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
            .then(res => res.json())
    }
    const editSalinityParamById = param => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/salinity/${param.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(param)
        })
            .then(getSalinityParams)
    }
    return(
        <SalinityParametersContext.Provider value={{
            salinityParameters, getSalinityParams, addSalinityParam, deleteSalinityParam, getSalinityParamById, editSalinityParamById
        }}>
            {props.children}
        </SalinityParametersContext.Provider>
    )
}
