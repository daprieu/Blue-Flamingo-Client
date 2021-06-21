import React, { createContext, useState } from "react"

export const PumphouseContext = createContext()

export const PumphouseProvider = (props) => {
    const [pumphouse, setPumphouse] = useState([])

    const getPumphouse = () => {
        return fetch(`http://localhost:8000/pumphouse`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res => {
            setPumphouse(res)
            return res
        })
    }
    const addPumphouse = pumphouseObj => {
        return fetch("http://localhost:8000/pumphouse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(pumphouseObj)
        })
            .then(response => response.json())
            .then(getPumphouse)
    }
    const deletePumphouse = (id) => {
        return fetch(`http://localhost:8000/pumphouse/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
        })
            .then(getPumphouse)
    }
    const getPumphouseById = id => {
        return fetch(`http://localhost:8000/pumphouse/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
            .then(res => res.json())
    }
    const editPumphouseById = pumphouse => {
        return fetch(`http://localhost:8000/pumphouse/${pumphouse.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(pumphouse)
        })
            .then(getPumphouse)
    }

    return(
        <PumphouseContext.Provider value={{
            pumphouse, getPumphouse, addPumphouse, deletePumphouse, editPumphouseById, getPumphouseById
        }}>
            {props.children}
        </PumphouseContext.Provider>
    )
}