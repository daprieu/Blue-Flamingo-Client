import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { AlkalinityParametersContext } from "./AlkalinityParamsProvider"

export const AlkalinityForm = () => {
    const { addAlkalinityParam, getAlkalinityById, editAlkalinityById } = useContext(AlkalinityParametersContext)
    const session_user_id = parseInt(localStorage.getItem("userId"))
    const [alkalinity, setAlkalinity] = useState({
        user: session_user_id,
        ppm: "",
        message: ""
    })

    const history = useHistory()
    const { alkalinityId }  = useParams()
    const [isLoading, setIsLoading] = useState(true)



    const handleControlledInputChange = (event) => {
        const newAlkalinity = { ...alkalinity }
        let newLabel = event.target.value

        newAlkalinity[event.target.id] = newLabel

        setAlkalinity(newAlkalinity)
    }

    const handleSaveAlkalinity = (event) => {
        event.preventDefault()
        if(alkalinityId) {
            editAlkalinityById(alkalinity)
                .then(history.push("/params/alkalinity"))
        } else {
            addAlkalinityParam({
                ppm: alkalinity.ppm,
              message: alkalinity.message,
            })
                .then(history.push("/params/alkalinity"))

        }
    }

    useEffect(() => {
        if (alkalinityId) {

            getAlkalinityById(alkalinityId).then(setAlkalinity)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSaveAlkalinity}>
                { alkalinityId ? <h2>Edit Alkalinity</h2> : <h2>Add Alkalinity</h2> }
                {/* { alkalinityId ? <div>{ alkalinity.ppm }</div> : <></> }
                { alkalinityId ? <div>{ alkalinity.message }</div> : <></> } */}
                <fieldset>
                    <div>
                        <label htmlFor="label">{ alkalinityId ? "Edit" : "New" } Alkalinity ppm: </label>
                        <input type="text" id="ppm" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={alkalinity.ppm} 
                            placeholder={ alkalinityId ? "Edit Alkalinity ppm" : "New Alkalinity ppm" }/>
                    </div>
                    </fieldset>
                    <fieldset>
                    <div>
                        <label htmlFor="label">{ alkalinityId ? "Edit" : "New" } Alkalinity message: </label>
                        <input type="text" id="message" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={alkalinity.message} 
                            placeholder={ alkalinityId ? "Edit Alkalinity message" : "New Alkalinity message" }/>
                    </div>
                </fieldset>
                <button type="submit"
                    disabled={isLoading}>
                    { alkalinityId ? "Update" : "Save" }
                </button>
            </form>
        </>
    )
}
