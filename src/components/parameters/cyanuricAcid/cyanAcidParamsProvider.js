import React, { createContext, useState } from "react"

export const CyanuricAcidParametersContext = createContext()

export const CyanuricAcidParametersProvider = (props) => {
    const [cyanAcidParameters, setCyanAcidParameters] = useState()

    const getCyanuricAcidParams = () => {
        return fetch(`http://localhost:8000/cyanuricacid`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res=>res.reverse())
        .then(res => {
            setCyanAcidParameters(res)
            console.log('res: ', res);
            return res
        })
    }

    return(
        <CyanuricAcidParametersContext.Provider value={{
            cyanAcidParameters, getCyanuricAcidParams
        }}>
            {props.children}
        </CyanuricAcidParametersContext.Provider>
    )
}
