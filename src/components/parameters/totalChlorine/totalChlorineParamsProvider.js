import React, { createContext, useState } from "react"

export const TotalChlorineParametersContext = createContext()

export const TotalChlorineParametersProvider = (props) => {
    const [totalChlorineParameters, setTotalChlorineParameters] = useState()

    const getTotalChlorineParams = () => {
        return fetch(`http://localhost:8000/totalchlorine`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res=>res.reverse())
        .then(res => {
            setTotalChlorineParameters(res)
            console.log('res: ', res);
            return res
        })
    }

    return(
        <TotalChlorineParametersContext.Provider value={{
            totalChlorineParameters, getTotalChlorineParams
        }}>
            {props.children}
        </TotalChlorineParametersContext.Provider>
    )
}
