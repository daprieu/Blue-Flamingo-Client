import React, { createContext, useState } from "react"

export const DailyDataContext = createContext()

export const DailyDataProvider = (props) => {
    const [dailyData, setDailyData] = useState([])

    const getDailyData = () => {
        return fetch(`http://localhost:8000/pumphousedata`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res => {
            setDailyData(res)
            return res
        })
    }
    const addDailyData = dailyDataObj => {
        return fetch("http://localhost:8000/pumphousedata", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(dailyDataObj)
        })
            .then(response => response.json())
            .then(getDailyData)
    }
    const deleteDailyData = (id) => {
        return fetch(`http://localhost:8000/pumphousedata/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
        })
            .then(getDailyData)
    }
    const getDailyDataById = id => {
        return fetch(`http://localhost:8000/pumphousedata/${id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log('res: ', res);
                setDailyData(res)
                return res
            })
    }
    const editDailyDataById = param => {
        return fetch(`http://localhost:8000/pumphousedata/${param.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            },
            body: JSON.stringify(param)
        })
            .then(getDailyData)
    }

    return(
        <DailyDataContext.Provider value={{
            dailyData, getDailyData, addDailyData, deleteDailyData, getDailyDataById, editDailyDataById
        }}>
            {props.children}
        </DailyDataContext.Provider>
    )
}