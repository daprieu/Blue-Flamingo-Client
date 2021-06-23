import React, { createContext, useState } from "react"

export const FilterPressureParametersContext = createContext()

export const FilterPressureParametersProvider = (props) => {
    const [filterPressureParameters, setFilterPressureParameters] = useState()

    const getFilterPressureParams = () => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/filterpressure`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res => {
            setFilterPressureParameters(res)
            return res
        })
    }
    const addFilterPressureParam = paramObj => {
        return fetch("https://blue-flamingo-server.herokuapp.com/filterpressure", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(paramObj)
        })
            .then(response => response.json())
            .then(getFilterPressureParams)
    }
    const deleteFilterPressureParam = (id) => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/filterpressure/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
        })
            .then(getFilterPressureParams)
    }
    const getFilterPressureParamById = id => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/filterpressure/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
            .then(res => res.json())
    }
    const editFilterPressureParamById = param => {
        return fetch(`https://blue-flamingo-server.herokuapp.com/filterpressure/${param.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(param)
        })
            .then(getFilterPressureParams)
    }

    return(
        <FilterPressureParametersContext.Provider value={{
            filterPressureParameters, getFilterPressureParams, addFilterPressureParam, deleteFilterPressureParam, getFilterPressureParamById, editFilterPressureParamById
        }}>
            {props.children}
        </FilterPressureParametersContext.Provider>
    )
}
