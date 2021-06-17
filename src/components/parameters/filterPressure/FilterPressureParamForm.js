import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { FilterPressureParametersContext } from "./FilterPressureParamsProvider"

export const FilterPressureForm = () => {
    const { addFilterPressureParam, editFilterPressureParamById, getFilterPressureParamById } = useContext(FilterPressureParametersContext)
    const session_user_id = parseInt(localStorage.getItem("userId"))
    const [filterPressure, setFilterPressure] = useState({
        user: session_user_id,
        psi: "",
        message: ""
    })

    const history = useHistory()
    const { paramId }  = useParams()
    const [isLoading, setIsLoading] = useState(true)



    const handleControlledInputChange = (event) => {
        const newFilterPressure= { ...filterPressure }

        newFilterPressure[event.target.id] = event.target.value

        setFilterPressure(newFilterPressure)
    }

    const handleSaveFilterPressure= (event) => {
        event.preventDefault()
        if(paramId > 0) {
            editFilterPressureParamById({
                id: filterPressure.id,
                psi: filterPressure.psi,
                message: filterPressure.message
            })
                .then(history.push("/params/filterpressure"))
        } else {
            addFilterPressureParam({
                psi: filterPressure.psi,
                message: filterPressure.message
            })
                .then(history.push("/params/filterpressure"))

        }
    }

    useEffect(() => {
        if (paramId) {

            getFilterPressureParamById(paramId).then(setFilterPressure)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSaveFilterPressure}>
                { paramId ? <h2>Edit FilterPressure</h2> : <h2>Add FilterPressure</h2> }
                {/* { paramId ? <div>{ FilterPressure.psi }</div> : <></> }
                { paramId ? <div>{ FilterPressure.message }</div> : <></> } */}
                <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } Filter Pressure psi: </label>
                        <input type="text" id="psi" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={filterPressure.psi} 
                            placeholder={ paramId ? "Edit Filter Pressure psi" : "New Filter Pressure psi" }/>
                    </div>
                    </fieldset>
                    <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } Filter Pressure message: </label>
                        <input type="text" id="message" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={filterPressure.message} 
                            placeholder={ paramId ? "Edit Filter Pressure message" : "New Filter Pressure message" }/>
                    </div>
                </fieldset>
                <button type="submit"
                    disabled={isLoading}>
                    { paramId ? "Update" : "Save" }
                </button>
            </form>
        </>
    )
}
