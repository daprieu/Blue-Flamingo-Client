import React, { useContext, useEffect, useRef, useState } from "react"
import { SalinityParametersContext } from "./SalinityParamsProvider"
import { Link, useHistory, useParams } from "react-router-dom"
import "../params.css"

export const SalinityParamsList = () => {
    const { salinityParameters, getSalinityParams, deleteSalinityParam } = useContext(SalinityParametersContext)
    // console.log('posts: ', posts);
    const session_user_id = parseInt(localStorage.getItem("rare_user_id"))
    // const sortedPosts = posts.sort((a, b) => a.publication_date > b.publication_date ? 1 : -1)
    const CurrentUserId = localStorage.getItem("userId")
    const isStaff = JSON.parse(localStorage.getItem("isStaff"))

    const { userId } = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getSalinityParams()
                .then(() => setIsLoading(false))
    }, [])

    const handleDelete = (id) => {

        if (window.confirm("Confirm Deletion")) {
            deleteSalinityParam(id)
                .then(() => history.push(`/params/salinity`))
        }
    }
    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if (isLoading) return (<div>Loading</div>)

    return (<>
        <div>
            <div>Salinity</div>
            {salinityParameters.map(sp =>
                <div className="post_card" key={sp.id}>
                    <p><b>Salinity: </b>{sp.ppm}</p>
                    <p><b>Message: </b>{sp.message}</p>
                    <button type="button" id="deleteSalinityParam" onClick={(e) => {
                        e.preventDefault()
                        handleDelete(sp.id)
                    }}>Delete</button>
                    <button >
                        <Link to={{
                            pathname: `/params/salinity/edit/${sp.id}`
                        }}>Edit</Link>
                    </button>
                </div>
            )}
            <Link to="/params/salinity/create">
                <button className="createTag" type="button">
                    Create Salinity
                </button> 
            </Link>
        </div>
    </>)
}
