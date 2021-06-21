import React, { useContext, useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { PumphouseContext } from "./PumphouseProvider"



export const PumphouseForm = () => {
    const { addPumphouse, editPumphouseById, getPumphouseById } = useContext(PumphouseContext)
    const session_user_id = parseInt(localStorage.getItem("userId"))
    const [pumphouse, setPumphouse] = useState({
        
        user: session_user_id,
        name: ""
    })

    const history = useHistory()
    const { pumphouseId }  = useParams()
    const [isLoading, setIsLoading] = useState(true)



    const handleControlledInputChange = (event) => {
        const newPumphouse= { ...pumphouse }

        newPumphouse[event.target.id] = event.target.value

        setPumphouse(newPumphouse)
    }

    const handleSavePumphouse= (event) => {
        event.preventDefault()
        if(pumphouseId > 0) {
            editPumphouseById({
                id: pumphouse.id,
                name: pumphouse.name
            })
                .then(history.push("/pumphouse"))
        } else {
            addPumphouse({
                name: pumphouse.name
            })
                .then(history.push("/pumphouse"))

        }
    }

    useEffect(() => {
        if (pumphouseId) {

            getPumphouseById(pumphouseId).then(setPumphouse)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    }, [])

    return (
        <>
            <form onSubmit={handleSavePumphouse}>
                { pumphouseId ? <h2>Edit Pumphouse</h2> : <h2>Add Pumphouse</h2> }
                <fieldset>
                    <div>
                        <label htmlFor="label">{ pumphouseId ? "Edit" : "New" } Pumphouse: </label>
                        <input type="text" id="name" onChange={handleControlledInputChange} 
                            required 
                            autoFocus 
                            value={pumphouse.name} 
                            placeholder={ pumphouseId ? "Edit Pumphouse name" : "New Pumphouse name" }/>
                    </div>
                    </fieldset>
                <button type="submit"
                    disabled={isLoading}>
                    { pumphouseId ? "Update" : "Save" }
                </button>
            </form>
        </>
    )
}
