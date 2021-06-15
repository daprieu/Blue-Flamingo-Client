import React, { createContext, useState } from "react"

export const ParametersContext = createContext()

export const ParametersProvider = (props) => {
    const [parameters, setParameters] = useState()

    const getAlkalinityParams = () => {
        return fetch(`http://localhost:8000/alkalinity`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res=>res.reverse())
        .then(res => {
            setParameters(res)
            console.log('res: ', res);
            return res
        })
    }

    return(
        <ParametersContext.Provider value={{
            parameters, getAlkalinityParams
        }}>
            {props.children}
        </ParametersContext.Provider>
    )
}
