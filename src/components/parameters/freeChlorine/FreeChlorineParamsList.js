import React, { useContext, useEffect, useState } from "react"
import { FreeChlorineParametersContext } from "./FreeChlorineParamsProvider"
import { Link, useHistory, } from "react-router-dom"
import "../params.css"

export const FreeChlorineParamsList = () => {
    const { freeChlorineParameters, getFreeChlorineParams, deleteFreeChlorineParam } = useContext(FreeChlorineParametersContext)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getFreeChlorineParams()
                .then(() => setIsLoading(false))
    }, [])

    const handleDelete = (id) => {

        if (window.confirm("Confirm Deletion")) {
            deleteFreeChlorineParam(id)
                .then(() => history.push(`/params/freechlorine`))
        }
    }
    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if (isLoading) return (<div>Loading</div>)

    return (<>
        <div>
            <div>Free Chlorine</div>
            {freeChlorineParameters.map(fcp =>
                <div className="post_card" key={fcp.id}>
                    <p><b>Free Chlorine ppm: </b>{fcp.ppm}</p>
                    <p><b>Message: </b>{fcp.message}</p>
                    <button type="button" id="deleteFreeChlorineParam" onClick={(e) => {
                        e.preventDefault()
                        handleDelete(fcp.id)
                    }}>Delete</button>
                    <button >
                        <Link to={{
                            pathname: `/params/freechlorine/edit/${fcp.id}`
                        }}>Edit</Link>
                    </button>
                </div>
            )}
            <Link to="/params/freechlorine/create">
                <button className="createTag" type="button">
                    Create Free Chlorine
                </button> 
            </Link>
        </div>
    </>)
}
