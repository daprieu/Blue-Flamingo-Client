import React, { useContext, useEffect, useRef, useState } from "react"
import { FreeChlorineParametersContext } from "./FreeChlorineParamsProvider"
import { Link, useHistory, useParams } from "react-router-dom"
import "../params.css"

export const FreeChlorineParamsList = () => {
    const { freeChlorineParameters, getFreeChlorineParams, deleteFreeChlorineParam } = useContext(FreeChlorineParametersContext)
    // console.log('posts: ', posts);
    const session_user_id = parseInt(localStorage.getItem("rare_user_id"))
    // const sortedPosts = posts.sort((a, b) => a.publication_date > b.publication_date ? 1 : -1)
    const CurrentUserId = localStorage.getItem("userId")
    const isStaff = JSON.parse(localStorage.getItem("isStaff"))

    const { userId } = useParams()
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
