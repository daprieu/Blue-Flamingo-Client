import React, { useContext, useEffect, useRef, useState } from "react"
import { PHParametersContext } from "./PHParamsProvider"
import { Link, useHistory, useParams } from "react-router-dom"
import "../params.css"

export const PHParamsList = () => {
    const { pHParameters, getPHParams, deletePHParam } = useContext(PHParametersContext)
    // console.log('posts: ', posts);
    const session_user_id = parseInt(localStorage.getItem("rare_user_id"))
    // const sortedPosts = posts.sort((a, b) => a.publication_date > b.publication_date ? 1 : -1)
    const CurrentUserId = localStorage.getItem("userId")
    const isStaff = JSON.parse(localStorage.getItem("isStaff"))

    const { userId } = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getPHParams()
                .then(() => setIsLoading(false))
    }, [])

    const handleDelete = (id) => {

        if (window.confirm("Confirm Deletion")) {
            deletePHParam(id)
                .then(() => history.push(`/params/ph`))
        }
    }
    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if (isLoading) return (<div>Loading</div>)

    return (<>
        <div>
            <div>pH</div>
            {pHParameters.map(ph =>
                <div className="post_card" key={ph.id}>
                    <p><b>pH: </b>{ph.ph}</p>
                    <p><b>Message: </b>{ph.message}</p>
                    <button type="button" id="deletePHParam" onClick={(e) => {
                        e.preventDefault()
                        handleDelete(ph.id)
                    }}>Delete</button>
                    <button >
                        <Link to={{
                            pathname: `/params/ph/edit/${ph.id}`
                        }}>Edit</Link>
                    </button>
                </div>
            )}
            <Link to="/params/ph/create">
                <button className="createTag" type="button">
                    Create pH
                </button> 
            </Link>
        </div>
    </>)

}