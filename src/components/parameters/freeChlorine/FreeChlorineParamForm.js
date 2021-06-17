import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { FreeChlorineParametersContext } from "./FreeChlorinParamsProvider"


export const FreeChlorineForm = () => {
    const { addFreeChlorineParam, editFreeChlorineParamById, getFreeChlorineParamById } = useContext(FreeChlorineParametersContext)
    const session_user_id = parseInt(localStorage.getItem("userId"))
    const [freeChlorine, setFreeChlorine] = useState({
        user: session_user_id,
        ppm: "",
        message: ""
    })

    const history = useHistory()
    const { paramId }  = useParams()
    const [isLoading, setIsLoading] = useState(true)



    const handleControlledInputChange = (event) => {
        const newFreeChlorine= { ...freeChlorine }

        newFreeChlorine[event.target.id] = event.target.value

        setFreeChlorine(newFreeChlorine)
    }

    const handleSaveFreeChlorine= (event) => {
        event.preventDefault()
        if(paramId > 0) {
            editFreeChlorineParamById({
                id: freeChlorine.id,
                ppm: freeChlorine.ppm,
                message: freeChlorine.message
            })
                .then(history.push("/params/freechlorine"))
        } else {
            addFreeChlorineParam({
                ppm: freeChlorine.ppm,
                message: freeChlorine.message
            })
                .then(history.push("/params/freechlorine"))

        }
    }

    useEffect(() => {
        if (paramId) {

            getFreeChlorineParamById(paramId).then(setFreeChlorine)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSaveFreeChlorine}>
                { paramId ? <h2>Edit FreeChlorine</h2> : <h2>Add FreeChlorine</h2> }
                {/* { paramId ? <div>{ FreeChlorine.ppm }</div> : <></> }
                { paramId ? <div>{ FreeChlorine.message }</div> : <></> } */}
                <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } Filter Pressure ppm: </label>
                        <input type="text" id="ppm" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={freeChlorine.ppm} 
                            placeholder={ paramId ? "Edit Filter Pressure ppm" : "New Filter Pressure ppm" }/>
                    </div>
                    </fieldset>
                    <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } Filter Pressure message: </label>
                        <input type="text" id="message" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={freeChlorine.message} 
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
