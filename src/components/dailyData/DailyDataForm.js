import React, { useContext, useEffect, useState } from "react"
import { DailyDataContext } from "./DailyDataProvider"
import { Link, useHistory, useParams } from 'react-router-dom';
import { PumphouseContext } from "../pumphouse/PumphouseProvider";
import { HardnessParametersContext } from "../parameters/hardness/HardnessParamsProvider";
import { TotalChlorineParametersContext } from "../parameters/totalChlorine/TotalChlorineParamsProvider";
import { FreeChlorineParametersContext } from "../parameters/freeChlorine/FreeChlorineParamsProvider";
import { PHParametersContext } from "../parameters/pH/PHParamsProvider";
import { AlkalinityParametersContext } from "../parameters/alkalinity/AlkalinityParamsProvider";
import { CyanuricAcidParametersContext } from "../parameters/cyanuricAcid/CyanAcidParamsProvider";
import { SalinityParametersContext } from "../parameters/salinity/SalinityParamsProvider";
import { FilterPressureParametersContext } from "../parameters/filterPressure/FilterPressureParamsProvider";
import "./ParamRadio.css"




export const DailyDataForm = () => {
    const { addDailyData, getDailyDataById, editDailyDataById } = useContext(DailyDataContext)
    const { pumphouse, getPumphouse } = useContext(PumphouseContext)
    const { hardnessParameters, getHardnessParams } = useContext(HardnessParametersContext)
    const { totalChlorineParameters, getTotalChlorineParams } = useContext(TotalChlorineParametersContext)
    const { freeChlorineParameters, getFreeChlorineParams } = useContext(FreeChlorineParametersContext)
    const { pHParameters, getPHParams } = useContext(PHParametersContext)
    const { alkParameters, getAlkalinityParams } = useContext(AlkalinityParametersContext)
    const { cyanAcidParameters, getCyanuricAcidParams } = useContext(CyanuricAcidParametersContext)
    const { salinityParameters, getSalinityParams } = useContext(SalinityParametersContext)
    const { filterPressureParameters, getFilterPressureParams } = useContext(FilterPressureParametersContext)

    const session_user_id = parseInt(localStorage.getItem("userId"))


    const [dailyData, setDailyData] = useState({

        user: session_user_id,
        pumphouse: "",
        hardness: null,
        hardness_note: "",
        total_chlorine: null,
        free_chlorine: null,
        chlorine_note: "",
        ph: null,
        ph_note: "",
        alkalinity: null,
        alkalinity_note: "",
        cyanuric_acid: null,
        cyanuric_acid_note: "",
        salinity: null,
        salinity_note: "",
        filter_pressure: null,
        filter_pressure_note: "",
        filter_basket: false
    })
    const history = useHistory();
    const { dataId } = useParams();

    const userId = localStorage.getItem("userId")


    const handleControlledInputChange = (event) => {
        //When changing a state object or array,
        //always create a copy make changes, and then set state.
        const newDailyData = { ...dailyData }
        //DailyData is an object with properties.
        //set the property to the new value
        let [a, b] = event.target.id.split("--")
        if (event.target.id === "filter_basket") {
            newDailyData[event.target.id] = event.target.checked
        } else {
        newDailyData[a] = event.target.value
        }
        //update state
        setDailyData(newDailyData)
    }


    const handleSaveDailyData = () => {
        if (dataId > 0) {
            editDailyDataById({
                id: parseInt(dataId),
                pumphouse: parseInt(dailyData.pumphouse),
                hardness: parseInt(dailyData.hardness),
                hardness_note: dailyData.hardness_note,
                total_chlorine: parseInt(dailyData.total_chlorine),
                free_chlorine: parseInt(dailyData.free_chlorine),
                chlorine_note: dailyData.chlorine_note,
                ph: parseInt(dailyData.ph),
                ph_note: dailyData.ph_note,
                alkalinity: parseInt(dailyData.alkalinity),
                alkalinity_note: dailyData.alkalinity_note,
                cyanuric_acid: parseInt(dailyData.cyanuric_acid),
                cyanuric_acid_note: dailyData.cyanuric_acid_note,
                salinity: parseInt(dailyData.salinity),
                salinity_note: dailyData.salinity_note,
                filter_pressure: parseInt(dailyData.filter_pressure),
                filter_pressure_note: dailyData.filter_pressure_note,
                filter_basket: Boolean(dailyData.filter_basket)
            })
                // .then(() => history.push(`/daily_logs`))
                
        } else {
            addDailyData({
                pumphouse: dailyData.pumphouse,
                hardness: dailyData.hardness,
                hardness_note: dailyData.hardness_note,
                total_chlorine: dailyData.total_chlorine,
                free_chlorine: dailyData.free_chlorine,
                chlorine_note: dailyData.chlorine_note,
                ph: dailyData.ph,
                ph_note: dailyData.ph_note,
                alkalinity: dailyData.alkalinity,
                alkalinity_note: dailyData.alkalinity_note,
                cyanuric_acid: dailyData.cyanuric_acid,
                cyanuric_acid_note: dailyData.cyanuric_acid_note,
                salinity: dailyData.salinity,
                salinity_note: dailyData.salinity_note,
                filter_pressure: dailyData.filter_pressure,
                filter_pressure_note: dailyData.filter_pressure_note,
                filter_basket: Boolean(dailyData.filter_basket)
            })
                // .then(() => history.push("/daily_logs")) //This link string might be different for posts. Hasn't been coded yet.
                
            }
        
        
    }



    useEffect(() => {
        getPumphouse()
        getHardnessParams()
        getTotalChlorineParams()
        getFreeChlorineParams()
        getPHParams()
        getAlkalinityParams()
        getCyanuricAcidParams()
        getSalinityParams()
        getFilterPressureParams()
        if (dataId) {
            getDailyDataById(dataId)
                .then(data => {
                    setDailyData({
                        user: userId,
                        pumphouse: data.pumphouse.id,
                        hardness: data.hardness?.id,
                        hardness_note: data.hardness_note,
                        total_chlorine: data.total_chlorine?.id,
                        free_chlorine: data.free_chlorine?.id,
                        chlorine_note: data.chlorine_note,
                        ph: data.ph?.id,
                        ph_note: data.ph_note,
                        alkalinity: data.alkalinity?.id,
                        alkalinity_note: data.alkalinity_note,
                        cyanuric_acid: data.cyanuric_acid?.id,
                        cyanuric_acid_note: data.cyanuric_acid_note,
                        salinity: data.salinity?.id,
                        salinity_note: data.salinity_note,
                        filter_pressure: data.filter_pressure?.id,
                        filter_pressure_note: data.filter_pressure_note,
                        filter_basket: Boolean(data.filter_basket)
                    })
                })
        } 

    }, [])

    return (
        <>
        <div className="modal bd-example-modal-lg" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{dataId > 0 ? "Edit Daily Data" : "Enter Daily Data"}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="dailyDataForm">
                                <fieldset>
                                    <div className="form-group">
                                        <h3 htmlFor="pumphouse">Pumphouse:</h3>
                                        <select value={dailyData.pumphouse} id="pumphouse" className="form-control" required onChange={handleControlledInputChange}>
                                            <option value="0">Select a Pumphouse</option>
                                            {pumphouse.map(ph => (
                                                <option key={ph.id} value={ph.id}>
                                                    {ph.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </fieldset>
                                    <h3 htmlFor="hardness">Hardness:</h3>
                                <fieldset className="paramField">
                                    <div className="hardnessRadio">
                                        {hardnessParameters?.map(h => (
                                            <div key={h.id} className="radio__label">
                                                <input className="radio__input" type="radio" key={`hardness--${h.id}`} onChange={handleControlledInputChange} checked={h.id === +dailyData.hardness}  value={h.id}
                                                    name="hardnessRadio" id={`hardness--${h.id}`} />
                                                    <label value={dailyData.hardness} className={`paramRadio__label radio__label`} htmlFor={`hardness--${h.id}`}>{h.ppm}</label>
                                            </div>
                                            ))}
                                    </div>
                                    </fieldset>
                                            <div className="paramMessageParent">
                                            {dailyData.hardness != null ? <>Hardness value is:<div className="paramMessage"> {hardnessParameters.find(hp => hp.id === parseInt(dailyData.hardness)).message}</div></> : "" }
                                            </div>
                                    <fieldset>
                                    <div className="form-group">
                                        <input type="text" id="hardness_note" onChange={handleControlledInputChange} autoFocus
                                            className="form-control"
                                            placeholder="Hardness Note"
                                            value={dailyData.hardness_note} />
                                    </div>
                                </fieldset>
                                <h3 htmlFor="free_chlorine">Total Chlorine:</h3>
                                <fieldset className="paramField">
                                <div className="tChlorineRadio">
                                        {totalChlorineParameters?.map(tc => (
                                            <div key={tc.id} className="radio__label">
                                                <input className="radio__input" type="radio" key={tc.id} onChange={handleControlledInputChange} checked={tc.id === +dailyData.total_chlorine}  value={tc.id}
                                                     name="tChlorineRadio" id={`total_chlorine--${tc.id}`} />
                                                     <label value={dailyData.total_chlorine} className="paramRadio__label radio__label" htmlFor={`total_chlorine--${tc.id}`}>{tc.ppm}</label>
                                            </div>
                                        ))}
                                    </div>
                                    </fieldset>
                                        <div className="paramMessageParent">
                                            {dailyData.total_chlorine != null ? <>Total Chlorine Value is:<div className="paramMessage">{totalChlorineParameters.find(hp => hp.id === parseInt(dailyData.total_chlorine)).message}</div></> : "" }
                                            </div>
                                    <h3 htmlFor="free_chlorine">Free Chlorine:</h3>
                                    <fieldset className="paramField">
                                        <div className="fChlorineRadio">
                                        {freeChlorineParameters?.map(fc => (
                                            <div key={fc.id} className="radio__label">
                                                <input className="radio__input" type="radio" key={fc.id} onChange={handleControlledInputChange} checked={fc.id === +dailyData.free_chlorine}  value={fc.id}
                                                     name="fChlorineRadio" id={`free_chlorine--${fc.id}`} />
                                                     <label value={dailyData.free_chlorine}className="paramRadio__label radio__label" htmlFor={`free_chlorine--${fc.id}`}>{fc.ppm}</label>
                                            </div>
                                        ))}
                                    </div>
                                    </fieldset>
                                        <div className="paramMessageParent">
                                            {dailyData.free_chlorine != null ? <>Free Chlorine Value is:<div className="paramMessage">{freeChlorineParameters.find(hp => hp.id === parseInt(dailyData.free_chlorine)).message}</div></> : "" }
                                            </div>
                                    <fieldset>
                                    <div className="form-group">
                                        
                                        <input type="text" id="chlorine_note" onChange={handleControlledInputChange} autoFocus
                                            className="form-control"
                                            placeholder="Chlorine Note"
                                            value={dailyData.chlorine_note} />
                                    </div>
                                </fieldset>

                                <h3 htmlFor="ph">pH:</h3>
                                <fieldset className="paramField">
                                        <div className="pHRadio">
                                        {pHParameters?.map(ph => (
                                            <div key={ph.id} className="radio__label">
                                                <input className="radio__input" type="radio" key={ph.id} onChange={handleControlledInputChange} checked={ph.id === +dailyData.ph}  value={ph.id}
                                                     name="pHRadio" id={`ph--${ph.id}`} />
                                                     <label value={dailyData.ph}className="paramRadio__label radio__label" htmlFor={`ph--${ph.id}`}>{ph.ph}</label>
                                            </div>
                                        ))}
                                    </div>
                                    </fieldset>
                                        <div className="paramMessageParent">
                                            {dailyData.ph != null ? <>pH value is:<div className="paramMessage">{pHParameters.find(hp => hp.id === parseInt(dailyData.ph)).message}</div></> : "" }
                                            </div>
                                    <fieldset>
                                    <div className="form-group">
                                        <input type="text" id="ph_note" onChange={handleControlledInputChange} autoFocus
                                            className="form-control"
                                            placeholder="pH Note"
                                            value={dailyData.ph_note} />
                                    </div>
                                </fieldset>

                                <h3 htmlFor="alkalinity">Alkalinity:</h3>
                                <fieldset className="paramField">
                                        <div className="alkalinityRadio">
                                        {alkParameters?.map(a => (
                                            <div key={a.id} className="radio__label">
                                                <input className="radio__input" type="radio" key={a.id} onChange={handleControlledInputChange} checked={a.id === +dailyData.alkalinity}  value={a.id}
                                                     name="alkalinityRadio" id={`alkalinity--${a.id}`} />
                                                     <label value={dailyData.alkalinity}className="paramRadio__label radio__label" htmlFor={`alkalinity--${a.id}`}>{a.ppm}</label>
                                            </div>
                                        ))}
                                    </div>
                                    </fieldset>
                                        <div className="paramMessageParent">
                                            {dailyData.alkalinity != null ? <>Alkalinity value is:<div className="paramMessage">{alkParameters.find(hp => hp.id === parseInt(dailyData.alkalinity)).message}</div></> : "" }
                                            </div>
                                    <fieldset>
                                    <div className="form-group">
                                        <input type="text" id="alkalinity_note" onChange={handleControlledInputChange} autoFocus
                                            className="form-control"
                                            placeholder="Alkalinity Note"
                                            value={dailyData.alkalinity_note} />
                                    </div>
                                </fieldset>
                                <h3 htmlFor="cyanuric_acid">Cyanuric Acid:</h3>
                                <fieldset className="paramField">
                                        <div className="cyanuricAcidRadio">
                                        {cyanAcidParameters?.map(ca => (
                                            <div key={ca.id} className="radio__label">
                                                <input className="radio__input" type="radio" key={ca.id} onChange={handleControlledInputChange} checked={ca.id === +dailyData.cyanuric_acid}  value={ca.id}
                                                    name="cyanuricAcidRadio" id={`cyanuric_acid--${ca.id}`} />
                                                    <label value={dailyData.cyanuric_acid}className="paramRadio__label radio__label" htmlFor={`cyanuric_acid--${ca.id}`}>{ca.ppm}</label>
                                            </div>
                                        ))}
                                    </div>
                                    </fieldset> 
                                        <div className="paramMessageParent">
                                            {dailyData.cyanuric_acid != null ? <>Cyanuric Acid Value is:<div className="paramMessage">{cyanAcidParameters.find(hp => hp.id === parseInt(dailyData.cyanuric_acid)).message}</div></> : "" }
                                            </div>
                                    <fieldset>       
                                    <div className="form-group">

                                        <input type="text" id="cyanuric_acid_note" onChange={handleControlledInputChange} autoFocus
                                            className="form-control"
                                            placeholder="Cyanuric Acid Note"
                                            value={dailyData.cyanuric_acid_note} />
                                    </div>
                                </fieldset>
                                <h3 htmlFor="salinity">Salinity:</h3>
                                <fieldset className="paramField">
                                        <div className="salinityRadio">
                                        {salinityParameters?.map(s => (
                                            <div key={s.id} className="radio__label">
                                                <input className="radio__input" type="radio" key={s.id} onChange={handleControlledInputChange} checked={s.id === +dailyData.salinity}  value={s.id}
                                                     name="salinityRadio" id={`salinity--${s.id}`} />
                                                     <label value={dailyData.salinity}className="paramRadio__label radio__label" htmlFor={`salinity--${s.id}`}>{s.ppm}</label>
                                            </div>
                                        ))}
                                    </div>
                                    </fieldset>
                                        <div className="paramMessageParent">
                                            {dailyData.salinity != null ? <>Salinity Value is:<div className="paramMessage">{salinityParameters.find(hp => hp.id === parseInt(dailyData.salinity)).message}</div></> : "" }
                                            </div>
                                    <fieldset>
                                    <div className="form-group">
                                        <input type="text" id="salinity_note" onChange={handleControlledInputChange} autoFocus
                                            className="form-control"
                                            placeholder="Salinity Note"
                                            value={dailyData.salinity_note} />
                                    </div>
                                </fieldset>
                                <h3 htmlFor="filter_pressure">Filter Pressure:</h3>
                                <fieldset className="paramField">
                                        <div className="filterPressureRadio">
                                        {filterPressureParameters?.map(fp => (
                                            <div key={fp.id} className="radio__label">
                                                <input className="radio__input" type="radio" key={fp.id} onChange={handleControlledInputChange} checked={fp.id === +dailyData.filter_pressure}  value={fp.id}
                                                    name="filterPressureRadio" id={`filter_pressure--${fp.id}`} />
                                                    <label value={dailyData.filter_pressure} className="paramRadio__label radio__label" htmlFor={`filter_pressure--${fp.id}`}>{fp.psi}</label>
                                            </div>
                                        ))}
                                    </div>
                                </fieldset>
                                        <div className="paramMessageParent">
                                            {dailyData.filter_pressure != null ? <>Filter Presure Value is:<div className="paramMessage">{filterPressureParameters.find(hp => hp.id === parseInt(dailyData.filter_pressure)).message}</div></> : "" }
                                            </div>
                                <fieldset>
                                    <div className="form-group">
                                        
                                        <input type="text" id="filter_pressure_note" onChange={handleControlledInputChange} autoFocus
                                            className="form-control"
                                            placeholder="Filter Pressure Note"
                                            value={dailyData.filter_pressure_note} />
                                    </div>
                                </fieldset>
                                <fieldset className="row ml-1">
                                    <label className="mr-3 mb-0">Did you clean the filter baskets?</label>
                                    <div className="form-check pt-1">

                                        <input type="checkbox" readOnly className="form-check-input pt-1" aria-label="Text input with checkbox" required
                                            onChange={handleControlledInputChange} id="filter_basket" checked={dailyData.filter_basket} value={!dailyData.filter_basket} />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            {dailyData.filter_basket === false || dailyData.pumphouse === "" ? <button type="button" className="btn btn-primary" onClick={event => {
                                event.preventDefault()
                                window.alert("Make sure to select a pump house and clean baskets")
                            }}>{dataId > 0 ? "Edit Data Entry" : "Save Data Entry"}</button>
                            :
                            <button type="button" className="btn btn-primary" onClick={event => {
                                event.preventDefault()
                                handleSaveDailyData()
                                history.push(`/daily_logs`)
                            }} data-dismiss='modal'>{dataId > 0 ? "Edit Data Entry" : "Save Data Entry"}</button>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}