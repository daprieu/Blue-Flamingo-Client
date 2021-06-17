import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { TotalChlorineParametersContext } from "./TotalChlorineParamsProvider"


export const TotalChlorineForm = () => {
    const { addTotalChlorineParam, editTotalChlorineParamById, getTotalChlorineParamById } = useContext(TotalChlorineParametersContext)
    const session_user_id = parseInt(localStorage.getItem("userId"))
    const [totalChlorine, setTotalChlorine] = useState({
        user: session_user_id,
        ppm: "",
        message: ""
    })

    const history = useHistory()
    const { paramId }  = useParams()
    const [isLoading, setIsLoading] = useState(true)



    const handleControlledInputChange = (event) => {
        const newTotalChlorine= { ...totalChlorine }

        newTotalChlorine[event.target.id] = event.target.value

        setTotalChlorine(newTotalChlorine)
    }

    const handleSaveTotalChlorine= (event) => {
        event.preventDefault()
        if(paramId > 0) {
            editTotalChlorineParamById({
                id: totalChlorine.id,
                ppm: totalChlorine.ppm,
                message: totalChlorine.message
            })
                .then(history.push("/params/totalchlorine"))
        } else {
            addTotalChlorineParam({
                ppm: totalChlorine.ppm,
                message: totalChlorine.message
            })
                .then(history.push("/params/totalchlorine"))

        }
    }

    useEffect(() => {
        if (paramId) {

            getTotalChlorineParamById(paramId).then(setTotalChlorine)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSaveTotalChlorine}>
                { paramId ? <h2>Edit Total Chlorine</h2> : <h2>Add Total Chlorine</h2> }
                {/* { paramId ? <div>{ TotalChlorine.ppm }</div> : <></> }
                { paramId ? <div>{ TotalChlorine.message }</div> : <></> } */}
                <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } Total Chlorine ppm: </label>
                        <input type="text" id="ppm" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={totalChlorine.ppm} 
                            placeholder={ paramId ? "Edit Total Chlorine ppm" : "New Total Chlorine ppm" }/>
                    </div>
                    </fieldset>
                    <fieldset>
                    <div>
                        <label htmlFor="label">{ paramId ? "Edit" : "New" } Total Chlorine message: </label>
                        <input type="text" id="message" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={totalChlorine.message} 
                            placeholder={ paramId ? "Edit Total Chlorine message" : "New Total Chlorine message" }/>
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
