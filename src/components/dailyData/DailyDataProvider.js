import React, { createContext, useState } from "react"

export const DailyDataContext = createContext()

export const DailyDataProvider = (props) => {
    const [dailyData, setDailyData] = useState([])
    console.log('dailyData: ', dailyData);

    const getDailyData = () => {
        return fetch(`http://localhost:8000/pumphousedata`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res => {
            setDailyData(res)
            console.log('res: ', res);
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

    return(
        <DailyDataContext.Provider value={{
            dailyData, getDailyData, addDailyData
        }}>
            {props.children}
        </DailyDataContext.Provider>
    )
}