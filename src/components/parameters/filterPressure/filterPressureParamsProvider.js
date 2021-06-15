import React, { createContext, useState } from "react"

export const FilterPressureParametersContext = createContext()

export const FilterPressureParametersProvider = (props) => {
    const [filterPressureParameters, setFilterPressureParameters] = useState()

    const getFilterPressureParams = () => {
        return fetch(`http://localhost:8000/filterpressure`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("BF_user_id")}`
            }
        })
        .then(res=>res.json())
        .then(res=>res.reverse())
        .then(res => {
            setFilterPressureParameters(res)
            console.log('res: ', res);
            return res
        })
    }

    return(
        <FilterPressureParametersContext.Provider value={{
            filterPressureParameters, getFilterPressureParams
        }}>
            {props.children}
        </FilterPressureParametersContext.Provider>
    )
}
