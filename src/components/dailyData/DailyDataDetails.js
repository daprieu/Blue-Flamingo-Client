import { Link, useParams, useHistory } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react"
import { DailyDataContext } from "./DailyDataProvider"
import "./DataDetails.css"

export const DailyDataDetail = () => {
    const { getDailyDataById, deleteDailyData } = useContext(DailyDataContext)
    const history = useHistory()

    const [data, setData] = useState({
        user: 0,
        pumphouse: "",
        hardness: "",
        hardness_note: "",
        total_chlorine: "",
        free_chlorine: "",
        chlorine_note: "",
        ph: "",
        ph_note: "",
        alkalinity: "",
        alkalinity_note: "",
        cyanuric_acid: "",
        cyanuric_acid_note: "",
        salinity: "",
        salinity_note: "",
        filter_pressure: "",
        filter_pressure_note: "",
        filter_basket: ""
    })

    const { dataId } = useParams();

    useEffect(() => {
        getDailyDataById(dataId)
            .then((response) => {
                setData(response)
            })
    }, [])

    
    const handleDelete = (id) => {

        if (window.confirm("Confirm Deletion")) {
            deleteDailyData(id)
                .then(() => history.push(`/daily_logs`))
        }
    }
    

    return (
        <>
            
                <div class="modal fade bd-example-modal-lg container" id="dataDetails" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg container">
                    <div class="modal-content container">
                        <div class="modal-header">
                            <h5 class="modal-title" id="dataDetails">Details for Data entry {data?.id}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close" onClick={(e) => {
                                e.preventDefault()
                                history.push(`/daily_logs`)
                                }}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div>
            <div>Daily Data</div>
                <table class="tableDetail table-bordered table-dark table-hover " id="tableDetails" >
                <thead>
                  <tr>
                    <th scope="col" id="colDetails" style={{width: '.25em'}} >#</th>
                    <th scope="col" id="colDetails" >Date</th>
                    <th scope="col" id="colDetails" >Pump House</th>
                    <th scope="col" id="colDetails" >Hardness</th>
                    <th scope="col" id="colDetails" >Total Chlorine</th>
                    <th scope="col" id="colDetails" >Free Chlorine</th>
                    <th scope="col" id="colDetails" style={{width: '.75em'}}>pH</th>
                    <th scope="col" id="colDetails" >Alkalinity</th>
                    <th scope="col" id="colDetails" >Cyanuric Acid</th>
                    <th scope="col" id="colDetails" >Salinity</th>
                    <th scope="col" id="colDetails" >Filter Pressure</th>
                    {/* <th scope="col">Filter Baskets Cleaned</th> */}
                  </tr>
                  </thead>
                <tbody>
                  <tr>
                    <th scope="row" key={data.id}>{data.id}</th>
                    <td>{new Date(data.date).toLocaleDateString()}</td>
                    <td>{data.pumphouse?.name}</td>
                    <td>{data.hardness?.ppm}</td>
                    <td>{data.total_chlorine?.ppm}</td>
                    <td>{data.free_chlorine?.ppm}</td>
                    <td>{data.ph?.ph}</td>
                    <td>{data.alkalinity?.ppm}</td>
                    <td>{data.cyanuric_acid?.ppm}</td>
                    <td>{data.salinity?.ppm}</td>
                    <td>{data.filter_pressure?.psi}</td>
                  </tr>
                  </tbody>
            </table>
        </div>
                        <div class="modal-body">
                            <section className="data">
                               {data?.hardness_note === "" ? <></> : <div>
                                    <div id="noteTitle">Hardness Note:</div>
                                    <div>{data?.hardness_note}</div>
                                </div>}
                                {data?.chlorine_note === "" ? <></> :<div>
                                    <div id="noteTitle">Chlorine Note:</div>
                                    <div className="data__content">{data?.chlorine_note}</div>
                                </div>}
                                {data?.ph_note === "" ? <></> :<div>
                                    <div id="noteTitle">pH Note:</div>
                                <div className="data__content">{data?.ph_note}</div>
                                </div>}
                                {data?.alkalinity_note === "" ? <></> :<div>
                                    <div id="noteTitle">Alkalinity Note:</div>
                                <div className="data__content">{data?.alkalinity_note}</div>
                                </div>}
                                {data?.cyanuric_acid_note === "" ? <></> :<div>
                                    <div id="noteTitle">Cyanuric Acid Note:</div>
                                <div className="data__content">{data?.cyanuric_acid_note}</div>
                                </div>}
                                {data?.salinity_note === "" ? <></> :<div>
                                    <div id="noteTitle">Salinity Note:</div>
                                <div className="data__content">{data?.salinity_note}</div>
                                </div>}
                                {data?.filter_pressure_note === "" ? <></> :<div>
                                    <div id="noteTitle">Filter Pressure Note:</div>
                                <div className="data__content">{data?.filter_pressure_note}</div>
                                </div>}
                            </section>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal" onClick={(e) => {
                                e.preventDefault()
                                history.push(`/daily_logs`)
                                }}>Close</button>
                            <Link  type="link" data-toggle="modal" data-target="#exampleModal" data-backdrop='false' to={{
                        pathname: `/daily_logs/edit/${data.id}`
                    }}>
                        <button type="button" class="btn btn-primary" >Edit Data</button></Link>
                    <button type="button" class="btn btn-danger" id="deleteDailyData" onClick={(e) => {
                      e.preventDefault()
                      handleDelete(data.id)
                    }}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}