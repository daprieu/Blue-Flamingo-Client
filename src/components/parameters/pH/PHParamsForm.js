import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { PHParametersContext } from "./PHParamsProvider"


export const PHForm = () => {
    const { addPHParam, editPHParamById, getPHParamById } = useContext(PHParametersContext)
    const session_user_id = parseInt(localStorage.getItem("userId"))
    const [ph, setPH] = useState({
        user: session_user_id,
        ph: "",
        message: ""
    })

    const history = useHistory()
    const { paramId }  = useParams()
    const [isLoading, setIsLoading] = useState(true)

    const handleControlledInputChange = (event) => {
        const newPH= { ...ph }

        newPH[event.target.id] = event.target.value

        setPH(newPH)
    }

    const handleSavePH= (event) => {
        event.preventDefault()
        if(paramId > 0) {
            editPHParamById({
                id: ph.id,
                ph: ph.ph,
                message: ph.message
            })
                .then(history.push("/params/ph"))
        } else {
            addPHParam({
                ph: ph.ph,
                message: ph.message
            })
                .then(history.push("/params/ph"))

        }
    }

    useEffect(() => {
        if (paramId) {

            getPHParamById(paramId).then(setPH)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSavePH}>
                { paramId ? <h2>Edit PH</h2> : <h2>Add PH</h2> }
                {/* { paramId ? <div>{ PH.ph }</div> : <></> }
                { paramId ? <div>{ PH.message }</div> : <></> } */}
                <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } pH: </label>
                        <input type="text" id="ph" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={ph.ph} 
                            placeholder={ paramId ? "Edit pH" : "New pH" }/>
                    </div>
                    </fieldset>
                    <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } message: </label>
                        <input type="text" id="message" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={ph.message} 
                            placeholder={ paramId ? "Edit message" : "New message" }/>
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
