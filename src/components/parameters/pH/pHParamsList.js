import React, { useContext, useEffect, useRef, useState } from "react"
import { PHParametersContext } from "./PHParamsProvider"
import { Link, useHistory, useParams } from "react-router-dom"
import "../params.css"

export const PHParamsList = () => {
    const { pHParameters, getPHParams } = useContext(PHParametersContext)
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

    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if (isLoading) return (<div>Loading</div>)

    return (<>
        <div>
            <div>Filter Pressure</div>
            {pHParameters.map(fpp =>
                <div className="post_card" key={fpp.id}>
                    <p><b>pH: </b>{fpp.ph}</p>
                    <p><b>Message: </b>{fpp.message}</p>
                </div>
            )}
        </div>
    </>)
}