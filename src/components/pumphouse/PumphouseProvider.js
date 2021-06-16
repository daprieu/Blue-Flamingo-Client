import React, { createContext, useState } from "react"

export const PumphouseContext = createContext()

export const PumphouseProvider = (props) => {
    const [pumphouse, setPumphouse] = useState([])
    console.log('Pumphouse: ', pumphouse);

    const getPumphouse = () => {
        return fetch(`http://localhost:8000/pumphouse`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res => {
            setPumphouse(res)
            console.log('res: ', res);
            return res
        })
    }

    return(
        <PumphouseContext.Provider value={{
            pumphouse, getPumphouse
        }}>
            {props.children}
        </PumphouseContext.Provider>
    )
}