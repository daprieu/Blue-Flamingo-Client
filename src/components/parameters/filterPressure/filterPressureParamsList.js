import React, { useContext, useEffect, useRef, useState } from "react"
import { FilterPressureParametersContext } from "./FilterPressureParamsProvider"
import { Link, useHistory, useParams } from "react-router-dom"
import "../params.css"

export const FilterPressureParamsList = () => {
    const { filterPressureParameters, getFilterPressureParams, deleteFilterPressureParam } = useContext(FilterPressureParametersContext)
    // console.log('posts: ', posts);
    const session_user_id = parseInt(localStorage.getItem("rare_user_id"))
    // const sortedPosts = posts.sort((a, b) => a.publication_date > b.publication_date ? 1 : -1)
    const CurrentUserId = localStorage.getItem("userId")
    const isStaff = JSON.parse(localStorage.getItem("isStaff"))

    const { userId } = useParams()
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