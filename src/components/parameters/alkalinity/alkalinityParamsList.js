import React, { useContext, useEffect, useRef, useState } from "react"
import { AlkalinityParametersContext } from "./AlkalinityParamsProvider"
import { Link, useHistory, useParams } from "react-router-dom"
import "../params.css"

export const AlkalinityParamsList = () => {
    const { alkParameters, getAlkalinityParams, deleteAlkalinityParam } = useContext(AlkalinityParametersContext)
    console.log('parameters: ', alkParameters);
   
    // console.log('posts: ', posts);
    const session_user_id = parseInt(localStorage.getItem("rare_user_id"))
    // const sortedPosts = posts.sort((a, b) => a.publication_date > b.publication_date ? 1 : -1)
    const CurrentUserId = localStorage.getItem("userId")
    const isStaff = JSON.parse(localStorage.getItem("isStaff"))

    const { paramId } = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

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