import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { AlkalinityParametersContext } from "./AlkalinityParamsProvider"

export const AlkalinityForm = () => {
    const { addAlkalinityParam, editAlkalinityParamById, getAlkalinityParamById } = useContext(AlkalinityParametersContext)
    const session_user_id = parseInt(localStorage.getItem("userId"))
    const [alkalinity, setAlkalinity] = useState({
        user: session_user_id,
        ppm: "",
        message: ""
    })

    const history = useHistory()
    const { paramId }  = useParams()
    const [isLoading, setIsLoading] = useState(true)



    const handleControlledInputChange = (event) => {
        const newAlkalinity = { ...alkalinity }
        let newLabel = event.target.value

        newAlkalinity[event.target.id] = newLabel

        setAlkalinity(newAlkalinity)
    }

    const handleSaveAlkalinity = (event) => {
        event.preventDefault()
        if(paramId > 0) {
            editAlkalinityParamById({
                id: alkalinity.id,
                ppm: alkalinity.ppm,
                message: alkalinity.message
            })
                .then(history.push("/params/alkalinity"))
        } else {
            addAlkalinityParam({
                ppm: alkalinity.ppm,
                message: alkalinity.message
            })
                .then(history.push("/params/alkalinity"))

        }
    }

    useEffect(() => {
        if (paramId) {

            getAlkalinityParamById(paramId).then(setAlkalinity)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSaveAlkalinity}>
                { paramId ? <h2>Edit Alkalinity</h2> : <h2>Add Alkalinity</h2> }
                {/* { paramId ? <div>{ alkalinity.ppm }</div> : <></> }
                { paramId ? <div>{ alkalinity.message }</div> : <></> } */}
                <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } Alkalinity ppm: </label>
                        <input type="text" id="ppm" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={alkalinity.ppm} 
                            placeholder={ paramId ? "Edit Alkalinity ppm" : "New Alkalinity ppm" }/>
                    </div>
                    </fieldset>
                    <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } Alkalinity message: </label>
                        <input type="text" id="message" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={alkalinity.message} 
                            placeholder={ paramId ? "Edit Alkalinity message" : "New Alkalinity message" }/>
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
