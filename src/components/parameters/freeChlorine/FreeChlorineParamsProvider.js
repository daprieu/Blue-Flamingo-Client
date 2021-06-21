import React, { createContext, useState } from "react"

export const FreeChlorineParametersContext = createContext()

export const FreeChlorineParametersProvider = (props) => {
    const [freeChlorineParameters, setFreeChlorineParameters] = useState()

    const getFreeChlorineParams = () => {
        return fetch(`http://localhost:8000/freechlorine`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res => {
            setFreeChlorineParameters(res)
            return res
        })
    }
    const addFreeChlorineParam = paramObj => {
        return fetch("http://localhost:8000/freechlorine", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(paramObj)
        })
            .then(response => response.json())
            .then(getFreeChlorineParams)
    }
    const deleteFreeChlorineParam = (id) => {
        return fetch(`http://localhost:8000/freechlorine/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
        })
            .then(getFreeChlorineParams)
    }
    const getFreeChlorineParamById = id => {
        return fetch(`http://localhost:8000/freechlorine/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
            .then(res => res.json())
    }
    const editFreeChlorineParamById = param => {
        return fetch(`http://localhost:8000/freechlorine/${param.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(param)
        })
            .then(getFreeChlorineParams)
    }

    return(
        <FreeChlorineParametersContext.Provider value={{
            freeChlorineParameters, getFreeChlorineParams, addFreeChlorineParam, deleteFreeChlorineParam, getFreeChlorineParamById, editFreeChlorineParamById
        }}>
            {props.children}
        </FreeChlorineParametersContext.Provider>
    )
}
