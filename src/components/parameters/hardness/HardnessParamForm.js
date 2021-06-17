import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { HardnessParametersContext } from "./HardnessParamsProvider"


export const HardnessForm = () => {
    const { addHardnessParam, editHardnessParamById, getHardnessParamById } = useContext(HardnessParametersContext)
    const session_user_id = parseInt(localStorage.getItem("userId"))
    const [hardness, setHardness] = useState({
        user: session_user_id,
        ppm: "",
        message: ""
    })

    const history = useHistory()
    const { paramId }  = useParams()
    const [isLoading, setIsLoading] = useState(true)



    const handleControlledInputChange = (event) => {
        const newHardness= { ...hardness }

        newHardness[event.target.id] = event.target.value

        setHardness(newHardness)
    }

    const handleSaveHardness= (event) => {
        event.preventDefault()
        if(paramId > 0) {
            editHardnessParamById({
                id: hardness.id,
                ppm: hardness.ppm,
                message: hardness.message
            })
                .then(history.push("/params/hardness"))
        } else {
            addHardnessParam({
                ppm: hardness.ppm,
                message: hardness.message
            })
                .then(history.push("/params/hardness"))

        }
    }

    useEffect(() => {
        if (paramId) {

            getHardnessParamById(paramId).then(setHardness)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSaveHardness}>
                { paramId ? <h2>Edit Hardness</h2> : <h2>Add Hardness</h2> }
                {/* { paramId ? <div>{ Hardness.ppm }</div> : <></> }
                { paramId ? <div>{ Hardness.message }</div> : <></> } */}
                <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } Filter Pressure ppm: </label>
                        <input type="text" id="ppm" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={hardness.ppm} 
                            placeholder={ paramId ? "Edit Filter Pressure ppm" : "New Filter Pressure ppm" }/>
                    </div>
                    </fieldset>
                    <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } Filter Pressure message: </label>
                        <input type="text" id="message" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={hardness.message} 
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
