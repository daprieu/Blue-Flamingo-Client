import React, { createContext, useState } from "react"

export const AlkalinityParametersContext = createContext()

export const AlkalinityParametersProvider = (props) => {
    const [alkParameters, setAlkParameters] = useState()

    const getAlkalinityParams = () => {
        return fetch(`http://localhost:8000/alkalinity`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res=>res.reverse())
        .then(res => {
            setAlkParameters(res)
            console.log('res: ', res);
            return res
        })
    }

    return(
        <AlkalinityParametersContext.Provider value={{
            alkParameters, getAlkalinityParams
        }}>
            {props.children}
        </AlkalinityParametersContext.Provider>
    )
}
