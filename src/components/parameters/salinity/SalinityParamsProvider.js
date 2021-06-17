import React, { createContext, useState } from "react"

export const SalinityParametersContext = createContext()

export const SalinityParametersProvider = (props) => {
    const [salinityParameters, setSalinityParameters] = useState()

    const getSalinityParams = () => {
        return fetch(`http://localhost:8000/salinity`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res=>res.reverse())
        .then(res => {
            setSalinityParameters(res)
            console.log('res: ', res);
            return res
        })
    }

    return(
        <SalinityParametersContext.Provider value={{
            salinityParameters, getSalinityParams
        }}>
            {props.children}
        </SalinityParametersContext.Provider>
    )
}
