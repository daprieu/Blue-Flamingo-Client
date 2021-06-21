import React, { useContext, useEffect, useState } from "react"
import { TotalChlorineParametersContext } from "./TotalChlorineParamsProvider"
import { Link, useHistory } from "react-router-dom"
import "../params.css"

export const TotalChlorineParamsList = () => {
    const { totalChlorineParameters, getTotalChlorineParams, deleteTotalChlorineParam } = useContext(TotalChlorineParametersContext)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getTotalChlorineParams()
                .then(() => setIsLoading(false))
    }, [])

    const handleDelete = (id) => {

        if (window.confirm("Confirm Deletion")) {
            deleteTotalChlorineParam(id)
                .then(() => history.push(`/params/Totalchlorine`))
        }
    }
    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if (isLoading) return (<div>Loading</div>)

    return (<>
        <div>
            <div>Total Chlorine</div>
            {totalChlorineParameters.map(tcp =>
                <div className="post_card" key={tcp.id}>
                    <p><b>Total Chlorine: </b>{tcp.ppm}</p>
                    <p><b>Message: </b>{tcp.message}</p>
                    <button type="button" id="deleteTotalChlorineParam" onClick={(e) => {
                        e.preventDefault()
                        handleDelete(tcp.id)
                    }}>Delete</button>
                    <button >
                        <Link to={{
                            pathname: `/params/totalchlorine/edit/${tcp.id}`
                        }}>Edit</Link>
                    </button>
                </div>
            )}
            <Link to="/params/totalchlorine/create">
                <button className="createTag" type="button">
                    Create Total Chlorine
                </button> 
            </Link>
        </div>
    </>)
}
