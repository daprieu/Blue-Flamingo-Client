import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { SalinityParametersContext } from "./SalinityParamsProvider"


export const SalinityForm = () => {
    const { addSalinityParam, editSalinityParamById, getSalinityParamById } = useContext(SalinityParametersContext)
    const session_user_id = parseInt(localStorage.getItem("userId"))
    const [salinity, setSalinity] = useState({
        user: session_user_id,
        ppm: "",
        message: ""
    })

    const history = useHistory()
    const { paramId }  = useParams()
    const [isLoading, setIsLoading] = useState(true)



    const handleControlledInputChange = (event) => {
        const newSalinity= { ...salinity }

        newSalinity[event.target.id] = event.target.value

        setSalinity(newSalinity)
    }

    const handleSaveSalinity= (event) => {
        event.preventDefault()
        if(paramId > 0) {
            editSalinityParamById({
                id: salinity.id,
                ppm: salinity.ppm,
                message: salinity.message
            })
                .then(history.push("/params/salinity"))
        } else {
            addSalinityParam({
                ppm: salinity.ppm,
                message: salinity.message
            })
                .then(history.push("/params/salinity"))

        }
    }

    useEffect(() => {
        if (paramId) {

            getSalinityParamById(paramId).then(setSalinity)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSaveSalinity}>
                { paramId ? <h2>Edit Salinity</h2> : <h2>Add Salinity</h2> }
                {/* { paramId ? <div>{ Salinity.ppm }</div> : <></> }
                { paramId ? <div>{ Salinity.message }</div> : <></> } */}
                <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } Filter Pressure ppm: </label>
                        <input type="text" id="ppm" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={salinity.ppm} 
                            placeholder={ paramId ? "Edit Filter Pressure ppm" : "New Filter Pressure ppm" }/>
                    </div>
                    </fieldset>
                    <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } Filter Pressure message: </label>
                        <input type="text" id="message" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={salinity.message} 
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
