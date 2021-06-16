import React, { useContext, useEffect, useRef, useState } from "react"
import { PumphouseContext } from "./PumphouseProvider"
import { Link, useHistory, useParams } from "react-router-dom"
import { PHParametersContext } from "../parameters/pH/PHParamsProvider"
// import "/params.css"

export const PumphouseList = () => {
    const { pumphouse, getPumphouse } = useContext(PumphouseContext)
    console.log('Pumphouse: ', pumphouse);
   
    // console.log('posts: ', posts);
    const session_user_id = parseInt(localStorage.getItem("rare_user_id"))
    // const sortedPosts = posts.sort((a, b) => a.publication_date > b.publication_date ? 1 : -1)
    const CurrentUserId = localStorage.getItem("userId")
    const isStaff = JSON.parse(localStorage.getItem("isStaff"))

    const { userId } = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
            getPumphouse()
                .then(() => setIsLoading(false))
    }, [])

    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if (isLoading) return (<div>Loading</div>)

    return (<>
        <div>
          <div>Pumphouse List</div>
            {pumphouse.map(ph =>
                  <div className="post_card" key={ph.id}>
                  <p><b>Pumphouse Name: </b>{ph.name}</p>
              </div>
                    )}
        </div>
    </>)
}