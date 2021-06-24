import React, { createContext, useState } from "react"

export const TotalChlorineParametersContext = createContext()

export const TotalChlorineParametersProvider = (props) => {
    const [totalChlorineParameters, setTotalChlorineParameters] = useState()

    const getTotalChlorineParams = () => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/totalchlorine`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res => {
            setTotalChlorineParameters(res)
            return res
        })
    }
    const addTotalChlorineParam = paramObj => {
        return fetch("https://blue-flamingo-server.herokuapp.com/totalchlorine", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(paramObj)
        })
            .then(response => response.json())
            .then(getTotalChlorineParams)
    }
    const deleteTotalChlorineParam = (id) => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/totalchlorine/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
        })
            .then(getTotalChlorineParams)
    }
    const getTotalChlorineParamById = id => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/totalchlorine/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
            .then(res => res.json())
    }
    const editTotalChlorineParamById = param => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/totalchlorine/${param.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(param)
        })
            .then(getTotalChlorineParams)
    }

    return(
        <TotalChlorineParametersContext.Provider value={{
            totalChlorineParameters, getTotalChlorineParams, addTotalChlorineParam, deleteTotalChlorineParam, getTotalChlorineParamById, editTotalChlorineParamById
        }}>
            {props.children}
        </TotalChlorineParametersContext.Provider>
    )
}
