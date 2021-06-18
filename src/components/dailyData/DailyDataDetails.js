import { Link, useParams, useHistory } from "react-router-dom"
import React, { useContext, useEffect, useState } from "react"
import { DailyDataContext } from "./DailyDataProvider"

export const DailyDataDetail = () => {
    const { dailyData, getDailyDataById, deleteDailyData } = useContext(DailyDataContext)
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

    const [isLoading, setIsLoading] = useState(true)
    const userId = localStorage.getItem("userId")
    const { dataId } = useParams();

    useEffect(() => {
        getDailyDataById(dataId)
            .then((response) => {
                console.log('response: ', response);
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
            {/* <div class="modal fade" id="dataDetails" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Data entry {data?.id} details</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body"> */}
                            <section className="data">
                                <label>Data entry {data?.id} details</label><br />
                                <label>Entered on {data?.date}</label>
                                <div className="data__content">{data?.hardness?.ppm}</div>
                                <div className="data__content">{data?.hardness_note}</div>
                                <div className="data__content">{data?.total_chlorine?.ppm}</div>
                                <div className="data__content">{data?.free_chlorine?.ppm}</div>
                                <div className="data__content">{data?.chlorine_note}</div>
                                <div className="data__content">{data?.ph?.ph}</div>
                                <div className="data__content">{data?.ph_note}</div>
                                <div className="data__content">{data?.alkalinity?.ppm}</div>
                                <div className="data__content">{data?.alkalinity_note}</div>
                                <div className="data__content">{data?.cyanuric_acid?.ppm}</div>
                                <div className="data__content">{data?.cyanuric_acid_note}</div>
                                <div className="data__content">{data?.salinity?.ppm}</div>
                                <div className="data__content">{data?.salinity_note}</div>
                                <div className="data__content">{data?.filter_pressure?.psi}</div>
                                <div className="data__content">{data?.filter_pressure_note}</div>
                            </section>
                            <button type="button" id="deleteDailyData" onClick={(e) => {
                      e.preventDefault()
                      handleDelete(data.id)
                    }}>Delete</button>
                
                    <Link className="navbar__link" type="link" data-toggle="modal" data-target="#exampleModal" to={{
                        pathname: `/daily_logs/edit/${data.id}`
                    }}>Edit</Link>
                        {/* </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )

}