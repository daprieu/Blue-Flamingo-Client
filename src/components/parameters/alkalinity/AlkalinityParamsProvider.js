import React, { createContext, useState } from "react"

export const AlkalinityParametersContext = createContext()

export const AlkalinityParametersProvider = (props) => {
    const [alkParameters, setAlkParameters] = useState()

    const getAlkalinityParams = () => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/alkalinity`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res => {
            setAlkParameters(res)
            return res
        })
    }
    const addAlkalinityParam = paramObj => {
        return fetch("https://blue-flamingo-server.herokuapp.com/alkalinity", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(paramObj)
        })
            .then(response => response.json())
            .then(getAlkalinityParams)
    }
    const deleteAlkalinityParam = (id) => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/alkalinity/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
        })
            .then(getAlkalinityParams)
    }
    const getAlkalinityParamById = id => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/alkalinity/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
            .then(res => res.json())
    }
    const editAlkalinityParamById = param => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/alkalinity/${param.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(param)
        })
            .then(getAlkalinityParams)
    }

    return(
        <AlkalinityParametersContext.Provider value={{
            alkParameters, getAlkalinityParams, addAlkalinityParam, deleteAlkalinityParam, editAlkalinityParamById, getAlkalinityParamById
        }}>
            {props.children}
        </AlkalinityParametersContext.Provider>
    )
}
