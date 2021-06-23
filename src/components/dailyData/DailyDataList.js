import React, { useContext, useEffect, useState } from "react"
import { DailyDataContext } from "./DailyDataProvider"
import { Link, Route, useHistory } from "react-router-dom"
// import "/params.css"

export const DailyDataList = () => {
    const { dailyData, getDailyData } = useContext(DailyDataContext)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
            getDailyData()
                .then(() => setIsLoading(false))
    }, [])
    const showDataDetail = (dataId) => {
      history.push(`/daily_logs/detail/${dataId}`)
  }
    const history = useHistory()
    if (isLoading) return (<div>Loading</div>)

    return (<>
        <div>
            <div>Daily Data</div>
                <table className="table table-bordered table-dark table-hover" >
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
                    <th scope="col"></th>
                    <th scope='col'>Employee</th>
                  </tr>
                  </thead>
                <tbody>
            {dailyData?.map(dd =>
                  <tr key={dd.id}>
                    <th scope="row" >{dd.id}</th>
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
                    <td><button type="button" className="btn btn-primary" data-toggle="modal" data-backdrop='false' data-target="#dataDetails" onClick={(e) => {
                      showDataDetail(dd.id)}}>Details</button></td>
                    <td>{dd.user?.first_name} {dd.user?.last_name}</td>
                  </tr>
                    )}
                  </tbody>
            </table>
        </div>
    </>)
}