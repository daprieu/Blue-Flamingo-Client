import React, { useContext, useEffect, useState } from "react"
import { DailyDataContext } from "./DailyDataProvider"
import { useHistory, useParams } from 'react-router-dom';
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
        newDailyData[a] = event.target.value
        //update state
        setDailyData(newDailyData)
    }


    const handleSaveDailyData = () => {
        if (dailyData.filter_basket === false || dailyData.pumphouse === "") {
            window.alert("Make sure to select a pump house and clean baskets")
        } if (dataId > 0) {
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
                .then(() => history.push(`/daily_logs`))
                
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
                .then(() => history.push("/daily_logs")) //This link string might be different for posts. Hasn't been coded yet.
                
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
        <div class="modal bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{dataId > 0 ? "Edit Daily Data" : "Enter Daily Data"}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form className="dailyDataForm">
                                <fieldset>
                                    <div className="form-group">
                                        <h3 htmlFor="pumphouse">Pumphouse:</h3>
                                        <select value={dailyData.pumphouse} id="pumphouse" className="form-control" onChange={handleControlledInputChange}>
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
                                <fieldset class="paramField">
                                    <div class="hardnessRadio">
                                        {hardnessParameters?.map(h => (
                                            <>
                                                <input class="radio__input" type="radio" key={h.id} onChange={handleControlledInputChange} checked={h.id == dailyData.hardness}  value={h.id}
                                                    name="hardnessRadio" id={`hardness--${h.id}`} />
                                                    <label value={dailyData.hardness} class={`paramRadio__label radio__label`} for={`hardness--${h.id}`}>{h.ppm}</label>
                                            </>
                                            ))}
                                    </div>
                                    </fieldset>
                                            <div class="paramMessageParent">
                                            {dailyData.hardness != null ? <>Hardness value is:<div class="paramMessage"> {hardnessParameters.find(hp => hp.id === parseInt(dailyData.hardness)).message}</div></> : "" }
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
                                <fieldset class="paramField">
                                <div class="tChlorineRadio">
                                        {totalChlorineParameters?.map(tc => (
                                            <>
                                                <input class="radio__input" type="radio" key={tc.id} onChange={handleControlledInputChange} checked={tc.id == dailyData.total_chlorine}  value={tc.id}
                                                     name="tChlorineRadio" id={`total_chlorine--${tc.id}`} />
                                                     <label value={dailyData.total_chlorine} class="paramRadio__label radio__label" for={`total_chlorine--${tc.id}`}>{tc.ppm}</label>
                                            </>
                                        ))}
                                    </div>
                                    </fieldset>
                                        <div class="paramMessageParent">
                                            {dailyData.total_chlorine != null ? <>Total Chlorine Value is:<div class="paramMessage">{totalChlorineParameters.find(hp => hp.id === parseInt(dailyData.total_chlorine)).message}</div></> : "" }
                                            </div>
                                    <h3 htmlFor="free_chlorine">Free Chlorine:</h3>
                                    <fieldset class="paramField">
                                        <div class="fChlorineRadio">
                                        {freeChlorineParameters?.map(fc => (
                                            <>
                                                <input class="radio__input" type="radio" key={fc.id} onChange={handleControlledInputChange} checked={fc.id == dailyData.free_chlorine}  value={fc.id}
                                                     name="fChlorineRadio" id={`free_chlorine--${fc.id}`} />
                                                     <label value={dailyData.free_chlorine}class="paramRadio__label radio__label" for={`free_chlorine--${fc.id}`}>{fc.ppm}</label>
                                            </>
                                        ))}
                                    </div>
                                    </fieldset>
                                        <div class="paramMessageParent">
                                            {dailyData.free_chlorine != null ? <>Free Chlorine Value is:<div class="paramMessage">{freeChlorineParameters.find(hp => hp.id === parseInt(dailyData.free_chlorine)).message}</div></> : "" }
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
                                <fieldset class="paramField">
                                        <div class="pHRadio">
                                        {pHParameters?.map(ph => (
                                            <>
                                                <input class="radio__input" type="radio" key={ph.id} onChange={handleControlledInputChange} checked={ph.id == dailyData.ph}  value={ph.id}
                                                     name="pHRadio" id={`ph--${ph.id}`} />
                                                     <label value={dailyData.ph}class="paramRadio__label radio__label" for={`ph--${ph.id}`}>{ph.ph}</label>
                                            </>
                                        ))}
                                    </div>
                                    </fieldset>
                                        <div class="paramMessageParent">
                                            {dailyData.ph != null ? <>pH value is:<div class="paramMessage">{pHParameters.find(hp => hp.id === parseInt(dailyData.ph)).message}</div></> : "" }
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
                                <fieldset class="paramField">
                                        <div class="alkalinityRadio">
                                        {alkParameters?.map(a => (
                                            <>
                                                <input class="radio__input" type="radio" key={a.id} onChange={handleControlledInputChange} checked={a.id == dailyData.alkalinity}  value={a.id}
                                                     name="alkalinityRadio" id={`alkalinity--${a.id}`} />
                                                     <label value={dailyData.alkalinity}class="paramRadio__label radio__label" for={`alkalinity--${a.id}`}>{a.ppm}</label>
                                            </>
                                        ))}
                                    </div>
                                    </fieldset>
                                        <div class="paramMessageParent">
                                            {dailyData.alkalinity != null ? <>Alkalinity value is:<div class="paramMessage">{alkParameters.find(hp => hp.id === parseInt(dailyData.alkalinity)).message}</div></> : "" }
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
                                <fieldset class="paramField">
                                        <div class="cyanuricAcidRadio">
                                        {cyanAcidParameters?.map(ca => (
                                            <>
                                                <input class="radio__input" type="radio" key={ca.id} onChange={handleControlledInputChange} checked={ca.id == dailyData.cyanuric_acid}  value={ca.id}
                                                    name="cyanuricAcidRadio" id={`cyanuric_acid--${ca.id}`} />
                                                    <label value={dailyData.cyanuric_acid}class="paramRadio__label radio__label" for={`cyanuric_acid--${ca.id}`}>{ca.ppm}</label>
                                            </>
                                        ))}
                                    </div>
                                    </fieldset> 
                                        <div class="paramMessageParent">
                                            {dailyData.cyanuric_acid != null ? <>Cyanuric Acid Value is:<div class="paramMessage">{cyanAcidParameters.find(hp => hp.id === parseInt(dailyData.cyanuric_acid)).message}</div></> : "" }
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
                                <fieldset class="paramField">
                                        <div class="salinityRadio">
                                        {salinityParameters?.map(s => (
                                            <>
                                                <input class="radio__input" type="radio" key={s.id} onChange={handleControlledInputChange} checked={s.id == dailyData.salinity}  value={s.id}
                                                     name="salinityRadio" id={`salinity--${s.id}`} />
                                                     <label value={dailyData.salinity}class="paramRadio__label radio__label" for={`salinity--${s.id}`}>{s.ppm}</label>
                                            </>
                                        ))}
                                    </div>
                                    </fieldset>
                                        <div class="paramMessageParent">
                                            {dailyData.salinity != null ? <>Salinity Value is:<div class="paramMessage">{salinityParameters.find(hp => hp.id === parseInt(dailyData.salinity)).message}</div></> : "" }
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
                                <fieldset class="paramField">
                                        <div class="filterPressureRadio">
                                        {filterPressureParameters?.map(fp => (
                                            <>
                                                <input class="radio__input" type="radio" key={fp.id} onChange={handleControlledInputChange} checked={fp.id == dailyData.filter_pressure}  value={fp.id}
                                                    name="filterPressureRadio" id={`filter_pressure--${fp.id}`} />
                                                    <label value={dailyData.filter_pressure} class="paramRadio__label radio__label" for={`filter_pressure--${fp.id}`}>{fp.psi}</label>
                                            </>
                                        ))}
                                    </div>
                                </fieldset>
                                        <div class="paramMessageParent">
                                            {dailyData.filter_pressure != null ? <>Filter Presure Value is:<div class="paramMessage">{filterPressureParameters.find(hp => hp.id === parseInt(dailyData.filter_pressure)).message}</div></> : "" }
                                            </div>
                                <fieldset>
                                    <div className="form-group">
                                        
                                        <input type="text" id="filter_pressure_note" onChange={handleControlledInputChange} autoFocus
                                            className="form-control"
                                            placeholder="Filter Pressure Note"
                                            value={dailyData.filter_pressure_note} />
                                    </div>
                                </fieldset>
                                <fieldset class="row ml-1">
                                    <label class="mr-3 mb-0">Did you clean the filter baskets?</label>
                                    <div class="form-check pt-1">

                                        <input type="checkbox" readonly class="form-check-input pt-1" aria-label="Text input with checkbox"
                                            onChange={handleControlledInputChange} id="filter_basket" checked={dailyData.filter_basket} value={!dailyData.filter_basket} />
                                    </div>
                                </fieldset>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={event => {
                                event.preventDefault()
                                handleSaveDailyData()
                            }} data-target="#dataDetails" data-backdrop="static" >{dataId > 0 ? "Edit Data Entry" : "Save Data Entry"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}