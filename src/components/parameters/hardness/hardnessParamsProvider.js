import React, { createContext, useState } from "react"

export const HardnessParametersContext = createContext()

export const HardnessParametersProvider = (props) => {
    const [hardnessParameters, setHardnessParameters] = useState()

    const getHardnessParams = () => {
        return fetch(`http://localhost:8000/hardness`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res=>res.reverse())
        .then(res => {
            setHardnessParameters(res)
            console.log('res: ', res);
            return res
        })
    }

    return(
        <HardnessParametersContext.Provider value={{
            hardnessParameters, getHardnessParams
        }}>
            {props.children}
        </HardnessParametersContext.Provider>
    )
}
