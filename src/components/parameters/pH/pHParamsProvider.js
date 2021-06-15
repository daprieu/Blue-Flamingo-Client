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

    return(
        <PHParametersContext.Provider value={{
            pHParameters, getPHParams
        }}>
            {props.children}
        </PHParametersContext.Provider>
    )
}
