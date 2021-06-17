import React, { createContext, useState } from "react"

export const PHParametersContext = createContext()

export const PHParametersProvider = (props) => {
    const [pHParameters, setPHParameters] = useState()

    const getPHParams = () => {
        return fetch(`http://localhost:8000/ph`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res=>res.reverse())
        .then(res => {
            setPHParameters(res)
            console.log('res: ', res);
            return res
        })
    }

    const addPHParam = paramObj => {
        return fetch("http://localhost:8000/ph", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(paramObj)
        })
            .then(response => response.json())
            .then(getPHParams)
    }
    const deletePHParam = (id) => {
        return fetch(`http://localhost:8000/ph/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
        })
            .then(getPHParams)
    }
    const getPHParamById = id => {
        return fetch(`http://localhost:8000/ph/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
            .then(res => res.json())
    }
    const editPHParamById = param => {
        return fetch(`http://localhost:8000/ph/${param.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(param)
        })
            .then(getPHParams)
    }


    return(
        <PHParametersContext.Provider value={{
            pHParameters, getPHParams, addPHParam, deletePHParam, getPHParamById, editPHParamById
        }}>
            {props.children}
        </PHParametersContext.Provider>
    )
}
