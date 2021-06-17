import React, { useContext, useEffect, useRef, useState } from "react"
import { TotalChlorineParametersContext } from "./TotalChlorineParamsProvider"
import { Link, useHistory, useParams } from "react-router-dom"
import "../params.css"

export const TotalChlorineParamsList = () => {
    const { totalChlorineParameters, getTotalChlorineParams, deleteTotalChlorineParam } = useContext(TotalChlorineParametersContext)
    // console.log('posts: ', posts);
    const session_user_id = parseInt(localStorage.getItem("rare_user_id"))
    // const sortedPosts = posts.sort((a, b) => a.publication_date > b.publication_date ? 1 : -1)
    const CurrentUserId = localStorage.getItem("userId")
    const isStaff = JSON.parse(localStorage.getItem("isStaff"))

    const { userId } = useParams()
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
