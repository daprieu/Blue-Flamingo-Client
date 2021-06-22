import React, { useContext, useEffect, useState } from "react"
import { DailyDataContext } from "./DailyDataProvider"
import { Link, Route } from "react-router-dom"
// import "/params.css"

export const DailyDataList = () => {
    const { dailyData, getDailyData } = useContext(DailyDataContext)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
            getDailyData()
                .then(() => setIsLoading(false))
    }, [])
    const handleDetailLink = (ddId) => {
        <Route type="button" class="btn btn-primary" data-toggle="modal" data-target="#dataDetails" to={`/daily_logs/detail/${ddId}`}></Route>
    }

    if (isLoading) return (<div>Loading</div>)

    return (<>
        <div>
            <div>Daily Data</div>
                <table class="table table-bordered table-dark table-hover" >
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date</th>
                    <th scope="col">Pump House</th>
                    <th scope="col">Hardness</th>
                    <th scope="col">Total Chlorine</th>
                    <th scope="col">Free Chlorine</th>
                    <th scope="col">pH</th>
                    <th scope="col">Alkalinity</th>
                    <th scope="col">Cyanuric Acid</th>
                    <th scope="col">Salinity</th>
                    <th scope="col">Filter Pressure</th>
                  </tr>
                  </thead>
                <tbody>
            {dailyData.map(dd =>
                  <tr onClick={(e) => {
                    e.preventDefault()
                    handleDetailLink(dd.id)
                  }}>
                    <th scope="row" key={dd.id}>{dd.id}</th>
                    <td>{new Date(dd.date).toLocaleDateString()}</td>
                    <td>{dd.pumphouse?.name}</td>
                    <td>{dd.hardness?.ppm}</td>
                    <td>{dd.total_chlorine?.ppm}</td>
                    <td>{dd.free_chlorine?.ppm}</td>
                    <td>{dd.ph?.ph}</td>
                    <td>{dd.alkalinity?.ppm}</td>
                    <td>{dd.cyanuric_acid?.ppm}</td>
                    <td>{dd.salinity?.ppm}</td>
                    <td>{dd.filter_pressure?.psi}</td>
                    <Link type="button" class="btn btn-primary" data-toggle="modal" data-backdrop='false' data-target="#dataDetails" to={`/daily_logs/detail/${dd.id}`}>Details</Link>
                  </tr>
                    )}
                  </tbody>
            </table>
        </div>
    </>)
}