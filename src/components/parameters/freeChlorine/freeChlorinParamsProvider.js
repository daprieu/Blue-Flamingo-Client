import React, { createContext, useState } from "react"

export const FreeChlorineParametersContext = createContext()

export const FreeChlorineParametersProvider = (props) => {
    const [freeChlorineParameters, setFreeChlorineParameters] = useState()

    const getFreeChlorineParams = () => {
        return fetch(`http://localhost:8000/freechlorine`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res=>res.reverse())
        .then(res => {
            setFreeChlorineParameters(res)
            console.log('res: ', res);
            return res
        })
    }

    return(
        <FreeChlorineParametersContext.Provider value={{
            freeChlorineParameters, getFreeChlorineParams
        }}>
            {props.children}
        </FreeChlorineParametersContext.Provider>
    )
}
