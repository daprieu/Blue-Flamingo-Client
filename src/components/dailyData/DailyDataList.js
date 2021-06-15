import React, { useContext, useEffect, useRef, useState } from "react"
import { DailyDataContext } from "./DailyDataProvider"
import { Link, useHistory, useParams } from "react-router-dom"
// import "/params.css"

export const DailyDataList = () => {
    const { dailyData, getDailyData } = useContext(DailyDataContext)
    console.log('parameters: ', dailyData);
   
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
            getDailyData()
                .then(() => setIsLoading(false))
    }, [])

    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if (isLoading) return (<div>Loading</div>)

    return (<>
        <div>
            <div>Daily Data</div>
                <table class="table table-bordered table-dark table-hover" >
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">date</th>
                    <th scope="col">Pump House</th>
                    <th scope="col">Hardness</th>
                    <th scope="col">Total Chlorine</th>
                    <th scope="col">Free Chlorine</th>
                    <th scope="col">pH</th>
                    <th scope="col">Alkalinity</th>
                    <th scope="col">Cyanuric Acid</th>
                    <th scope="col">Salinity</th>
                    <th scope="col">Filter Pressure</th>
                    <th scope="col">Filter Baskets Cleaned</th>
                  </tr>
                  </thead>
            {dailyData.map(dd =>
                <tbody>
                  <tr>
                    <th scope="row" key={dd.id}>{dd.id}</th>
                    <td>{dd.date}</td>
                    <td>{dd.pumphouse}</td>
                    <td>{dd.hardness}</td>
                    <td>{dd.total_chlorine}</td>
                    <td>{dd.free_chlorine}</td>
                    <td>{dd.ph}</td>
                    <td>{dd.alkalinity}</td>
                    <td>{dd.cyanuric_acid}</td>
                    <td>{dd.salinity}</td>
                    <td>{dd.filter_pressure}</td>
                    <td>{dd.filter_basket}</td>
                  </tr>
                  </tbody>
            )}
            </table>
        </div>
    </>)
}