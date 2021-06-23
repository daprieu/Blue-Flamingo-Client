import React, { createContext, useState } from "react"

export const HardnessParametersContext = createContext()

export const HardnessParametersProvider = (props) => {
    const [hardnessParameters, setHardnessParameters] = useState()

    const getHardnessParams = () => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/hardness`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res => {
            setHardnessParameters(res)
            return res
        })
    }
    const addHardnessParam = paramObj => {
        return fetch("https://blue-flamingo-server.herokuapp.com/hardness", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(paramObj)
        })
            .then(response => response.json())
            .then(getHardnessParams)
    }
    const deleteHardnessParam = (id) => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/hardness/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
        })
            .then(getHardnessParams)
    }
    const getHardnessParamById = id => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/hardness/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
            .then(res => res.json())
    }
    const editHardnessParamById = param => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/hardness/${param.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(param)
        })
            .then(getHardnessParams)
    }

    return(
        <HardnessParametersContext.Provider value={{
            hardnessParameters, getHardnessParams, addHardnessParam, deleteHardnessParam, getHardnessParamById, editHardnessParamById
        }}>
            {props.children}
        </HardnessParametersContext.Provider>
    )
}
