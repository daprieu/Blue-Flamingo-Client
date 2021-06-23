import React, { createContext, useState } from "react"

export const CyanuricAcidParametersContext = createContext()

export const CyanuricAcidParametersProvider = (props) => {
    const [cyanAcidParameters, setCyanAcidParameters] = useState()

    const getCyanuricAcidParams = () => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/cyanuricacid`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res => {
            setCyanAcidParameters(res)
            return res
        })
    }
    const addCyanuricAcidParam = paramObj => {
        return fetch("https://blue-flamingo-server.herokuapp.com/cyanuricacid", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(paramObj)
        })
            .then(response => response.json())
            .then(getCyanuricAcidParams)
    }
    const deleteCyanuricAcidParam = (id) => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/cyanuricacid/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
        })
            .then(getCyanuricAcidParams)
    }
    const getCyanuricAcidParamById = id => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/cyanuricacid/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
            .then(res => res.json())
    }
    const editCyanuricAcidParamById = param => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/cyanuricacid/${param.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(param)
        })
            .then(getCyanuricAcidParams)
    }

    return(
        <CyanuricAcidParametersContext.Provider value={{
            cyanAcidParameters, getCyanuricAcidParams, addCyanuricAcidParam, deleteCyanuricAcidParam, getCyanuricAcidParamById, editCyanuricAcidParamById
        }}>
            {props.children}
        </CyanuricAcidParametersContext.Provider>
    )
}
