import React, { useContext, useEffect, useRef, useState } from "react"
import { DailyDataContext } from "./DailyDataProvider"
import { Link, Route, useHistory, useParams } from "react-router-dom"
// import "/params.css"

export const DailyDataList = () => {
    const { dailyData, getDailyData, deleteDailyData } = useContext(DailyDataContext)
    console.log('dailyData: ', dailyData);
   
    // console.log('posts: ', posts);
    const session_user_id = parseInt(localStorage.getItem("rare_user_id"))
    // const sortedPosts = posts.sort((a, b) => a.publication_date > b.publication_date ? 1 : -1)
    const CurrentUserId = localStorage.getItem("userId")
    const isStaff = JSON.parse(localStorage.getItem("isStaff"))

    const { userId } = useParams()
    const { dataId } = useParams();
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")

    useEffect(() => {
            getDailyData()
                .then(() => setIsLoading(false))
    }, [])
    const handleDetailLink = (ddId) => {
            // <Link type="button" class="btn btn-primary" data-toggle="modal" data-target="dataDetails" to={{pathname: `/daily_logs/detail/${dataId}`}}>
            // Launch demo modal {
            history.push(`/daily_logs/detail/${ddId}`)
            // }
            // </Link>
        
    }

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
                    {/* <th scope="col">Filter Baskets Cleaned</th> */}
                  </tr>
                  </thead>
                <tbody>
            {dailyData.map(dd =>
                  <tr onClick={(e) => {
                    e.preventDefault()
                    handleDetailLink(dd.id)
                  }}>
                    <th scope="row" key={dd.id}>{dd.id}</th>
                    <td>{dd.date}</td>
                    <td>{dd.pumphouse?.name}</td>
                    <td>{dd.hardness?.ppm}</td>
                    <td>{dd.total_chlorine?.ppm}</td>
                    <td>{dd.free_chlorine?.ppm}</td>
                    <td>{dd.ph?.ph}</td>
                    <td>{dd.alkalinity?.ppm}</td>
                    <td>{dd.cyanuric_acid?.ppm}</td>
                    <td>{dd.salinity?.ppm}</td>
                    <td>{dd.filter_pressure?.psi}</td>
                  </tr>
                    )}
                  </tbody>
            </table>
        </div>
    </>)
}