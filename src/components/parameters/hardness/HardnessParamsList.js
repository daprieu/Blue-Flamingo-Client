import React, { useContext, useEffect, useRef, useState } from "react"
import { HardnessParametersContext } from "./HardnessParamsProvider"
import { Link, useHistory, useParams } from "react-router-dom"
import "../params.css"

export const HardnessParamsList = () => {
    const { hardnessParameters, getHardnessParams, deleteHardnessParam } = useContext(HardnessParametersContext)
    // console.log('posts: ', posts);
    const session_user_id = parseInt(localStorage.getItem("rare_user_id"))
    // const sortedPosts = posts.sort((a, b) => a.publication_date > b.publication_date ? 1 : -1)
    const CurrentUserId = localStorage.getItem("userId")
    const isStaff = JSON.parse(localStorage.getItem("isStaff"))

    const { userId } = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getHardnessParams()
                .then(() => setIsLoading(false))
    }, [])

    const handleDelete = (id) => {

        if (window.confirm("Confirm Deletion")) {
            deleteHardnessParam(id)
                .then(() => history.push(`/params/hardness`))
        }
    }
    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if (isLoading) return (<div>Loading</div>)

    return (<>
        <div>
            <div>Hardness</div>
            {hardnessParameters.map(h =>
                <div className="post_card" key={h.id}>
                    <p><b>Hardness ppm: </b>{h.ppm}</p>
                    <p><b>Message: </b>{h.message}</p>
                    <button type="button" id="deleteHardnessParam" onClick={(e) => {
                        e.preventDefault()
                        handleDelete(h.id)
                    }}>Delete</button>
                    <button >
                        <Link to={{
                            pathname: `/params/hardness/edit/${h.id}`
                        }}>Edit</Link>
                    </button>
                </div>
            )}
            <Link to="/params/hardness/create">
                <button className="createTag" type="button">
                    Create Hardness Parameter
                </button> 
            </Link>
        </div>
    </>)
}
