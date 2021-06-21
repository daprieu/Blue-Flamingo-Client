import React, { createContext, useState } from "react"

export const CyanuricAcidParametersContext = createContext()

export const CyanuricAcidParametersProvider = (props) => {
    const [cyanAcidParameters, setCyanAcidParameters] = useState()

    const getCyanuricAcidParams = () => {
        return fetch(`http://localhost:8000/cyanuricacid`, {
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
        return fetch("http://localhost:8000/cyanuricacid", {
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
        return fetch(`http://localhost:8000/cyanuricacid/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
        })
            .then(getCyanuricAcidParams)
    }
    const getCyanuricAcidParamById = id => {
        return fetch(`http://localhost:8000/cyanuricacid/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
            .then(res => res.json())
    }
    const editCyanuricAcidParamById = param => {
        return fetch(`http://localhost:8000/cyanuricacid/${param.id}`, {
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
