import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { CyanuricAcidParametersContext } from "./CyanAcidParamsProvider"

export const CyanuricAcidForm = () => {
    const { addCyanuricAcidParam, editCyanuricAcidParamById, getCyanuricAcidParamById } = useContext(CyanuricAcidParametersContext)
    const session_user_id = parseInt(localStorage.getItem("userId"))
    const [cyanuricAcid, setCyanuricAcid] = useState({
        user: session_user_id,
        ppm: "",
        message: ""
    })

    const history = useHistory()
    const { paramId }  = useParams()
    const [isLoading, setIsLoading] = useState(true)



    const handleControlledInputChange = (event) => {
        const newCyanuricAcid= { ...cyanuricAcid }

        newCyanuricAcid[event.target.id] = event.target.value

        setCyanuricAcid(newCyanuricAcid)
    }

    const handleSaveCyanuricAcid= (event) => {
        event.preventDefault()
        if(paramId > 0) {
            editCyanuricAcidParamById({
                id: cyanuricAcid.id,
                ppm: cyanuricAcid.ppm,
                message: cyanuricAcid.message
            })
                .then(history.push("/params/cyanuricAcid"))
        } else {
            addCyanuricAcidParam({
                ppm: cyanuricAcid.ppm,
                message: cyanuricAcid.message
            })
                .then(history.push("/params/cyanuricAcid"))

        }
    }

    useEffect(() => {
        if (paramId) {

            getCyanuricAcidParamById(paramId).then(setCyanuricAcid)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSaveCyanuricAcid}>
                { paramId ? <h2>Edit CyanuricAcid</h2> : <h2>Add CyanuricAcid</h2> }
                {/* { paramId ? <div>{ CyanuricAcid.ppm }</div> : <></> }
                { paramId ? <div>{ CyanuricAcid.message }</div> : <></> } */}
                <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } Cyanuric Acid ppm: </label>
                        <input type="text" id="ppm" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={cyanuricAcid.ppm} 
                            placeholder={ paramId ? "Edit Cyanuric Acid ppm" : "New Cyanuric Acid ppm" }/>
                    </div>
                    </fieldset>
                    <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } Cyanuric Acid message: </label>
                        <input type="text" id="message" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={cyanuricAcid.message} 
                            placeholder={ paramId ? "Edit Cyanuric Acid message" : "New Cyanuric Acid message" }/>
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
