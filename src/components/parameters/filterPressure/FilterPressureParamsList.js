import React, { useContext, useEffect, useState } from "react"
import { FilterPressureParametersContext } from "./FilterPressureParamsProvider"
import { Link, useHistory } from "react-router-dom"
import "../params.css"

export const FilterPressureParamsList = () => {
    const { filterPressureParameters, getFilterPressureParams, deleteFilterPressureParam } = useContext(FilterPressureParametersContext)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getFilterPressureParams()
            .then(() => setIsLoading(false))
    }, [])

    const handleDelete = (id) => {

        if (window.confirm("Confirm Deletion")) {
            deleteFilterPressureParam(id)
                .then(() => history.push(`/params/filterpressure`))
        }
    }
    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if (isLoading) return (<div>Loading</div>)

    return (<>
        <div>
            <div>Filter Pressure</div>
            {filterPressureParameters.map(fpp =>
                <div className="post_card" key={fpp.id}>
                    <p><b>Filter Psi: </b>{fpp.psi}</p>
                    <p><b>Message: </b>{fpp.message}</p>
                    <button type="button" id="deleteFilterPressureParam" onClick={(e) => {
                        e.preventDefault()
                        handleDelete(fpp.id)
                    }}>Delete</button>
                    <button >
                        <Link to={{
                            pathname: `/params/filterpressure/edit/${fpp.id}`
                        }}>Edit</Link>
                    </button>
                </div>
            )}
            <Link to="/params/filterpressure/create">
                <button className="createTag" type="button">
                    Create Filter Pressure
                </button> 
            </Link>
        </div>
    </>)
}
