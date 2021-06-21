import React, { useContext, useEffect, useState } from "react"
import { AlkalinityParametersContext } from "./AlkalinityParamsProvider"
import { Link, useHistory } from "react-router-dom"
import "../params.css"

export const AlkalinityParamsList = () => {
    const { alkParameters, getAlkalinityParams, deleteAlkalinityParam } = useContext(AlkalinityParametersContext)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
            getAlkalinityParams()
                .then(() => setIsLoading(false))
    }, [])

    const handleDelete = (id) => {

        if (window.confirm("Confirm Deletion")) {
            deleteAlkalinityParam(id)
                .then(() => history.push(`/params/alkalinity`))
        }
    }
    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if (isLoading) return (<div>Loading</div>)

    return (<>
        <div>
            <div>Alkalinity</div>
            {alkParameters.map(ap =>
                <div className="post_card" key={ap.id}>
                    <p><b>Alkalinity ppm: </b>{ap.ppm}</p>
                    <p><b>Message: </b>{ap.message}</p>
                    <button type="button" id="deleteAlkalinityParam" onClick={(e) => {
                        e.preventDefault()
                        handleDelete(ap.id)
                    }}>Delete</button>
                    <button >
                        <Link to={{
                            pathname: `/params/alkalinity/edit/${ap.id}`
                        }}>Edit</Link>
                    </button>
                </div>
                )}
        </div>
        <Link to="/params/alkalinity/create">
          <button className="createTag" type="button">
            Create Alkalinity
          </button>
        </Link>
    </>)
}
