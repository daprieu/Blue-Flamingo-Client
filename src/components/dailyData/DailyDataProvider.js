import React, { createContext, useState } from "react"

export const DailyDataContext = createContext()

export const DailyDataProvider = (props) => {
    const [dailyData, setDailyData] = useState()

    const getDailyData = () => {
        return fetch(`http://localhost:8000/pumphousedata`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res=>res.reverse())
        .then(res => {
            setDailyData(res)
            console.log('res: ', res);
            return res
        })
    }

    return(
        <DailyDataContext.Provider value={{
            dailyData, getDailyData
        }}>
            {props.children}
        </DailyDataContext.Provider>
    )
}