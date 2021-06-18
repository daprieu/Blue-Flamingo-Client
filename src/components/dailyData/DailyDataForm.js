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
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { getDefaultNormalizer } from "@testing-library/dom";
// import VolumeDown from '@material-ui/icons/VolumeDown';
// import VolumeUp from '@material-ui/icons/VolumeUp';



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
        pumphouse: null,
        hardness: null,
        hardness_note: "",
        total_chlorine:null,
        free_chlorine:null,
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
console.log('dailyData: ', dailyData);
    const history = useHistory();
    const { dataId } = useParams();

    const userId = localStorage.getItem("userId")


    const handleControlledInputChange = (event) => {
        //When changing a state object or array,
        //always create a copy make changes, and then set state.
        const newDailyData = { ...dailyData }
        //DailyData is an object with properties.
        //set the property to the new value
        newDailyData[event.target.id] = event.target.value
        //update state
        setDailyData(newDailyData)
    }


    const handleSaveDailyData = () => {
        if (dailyData.filter_basket === false) {
            window.alert("Please clean baskets")
        } if (dataId > 0) {
            editDailyDataById({
                id: parseInt(dataId),
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
            .then(() => history.push("/daily_logs"))
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
        }}
    
    

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
                console.log('dataasdf: ', data);
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
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">{dataId > 0 ? "Edit Daily Data" : "Enter Daily Data"}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form className="dailyDataForm">
                                {/* <h2 className="postForm__title">{postId > 0 ? "Edit a post" : "Make a post"}</h2> */}
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="pumphouse">Pumphouse:</label>
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
                                {/* {dailyData.hardness === undefined ? <></> :  */}
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="hardness">Hardness:</label>
                                        <select value={dailyData.hardness} id="hardness" className="form-control" onChange={handleControlledInputChange}>
                                            <option value="0">Select a Hardness</option>
                                            {hardnessParameters?.map(h => (
                                                <option key={h.id} value={h.id}>
                                                    {h.ppm}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="hardness_note">Hardness note:</label>
                                        <input type="text" id="hardness_note" onChange={handleControlledInputChange} autoFocus 
                                        className="form-control" 
                                        placeholder="Hardness Note" 
                                        value={dailyData.hardness_note}/>
                                    </div>
                                    </fieldset>
                                    {/* } */}

                                <fieldset> 
                                    <div className="form-group">
                                        <label htmlFor="total_chlorine">Total Chlorine:</label>
                                        <select value={dailyData.total_chlorine} id="total_chlorine" className="form-control" onChange={handleControlledInputChange}>
                                            <option value="0">Select Total Chlorine</option>
                                            {totalChlorineParameters?.map(tc => (
                                                <option key={tc.id} value={tc.id}>
                                                    {tc.ppm}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="free_chlorine">Free Chlorine:</label>
                                        <select value={dailyData.free_chlorine} id="free_chlorine" className="form-control" onChange={handleControlledInputChange}>
                                            <option value="0">Select a Free Chlorine</option>
                                            {freeChlorineParameters?.map(fc => (
                                                <option key={fc.id} value={fc.id}>
                                                    {fc.ppm}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="chlorine_note">Chlorine note:</label>
                                        <input type="text" id="chlorine_note" onChange={handleControlledInputChange} autoFocus 
                                        className="form-control" 
                                        placeholder="Chlorine Note" 
                                        value={dailyData.chlorine_note}/>
                                    </div>
                                    </fieldset>

                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="ph">pH:</label>
                                        <select value={dailyData.ph} id="ph" className="form-control" onChange={handleControlledInputChange}>
                                            <option value="0">Select a pH</option>
                                            {pHParameters?.map(ph => (
                                                <option key={ph.id} value={ph.id}>
                                                    {ph.ph}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="ph_note">pH note:</label>
                                        <input type="text" id="ph_note" onChange={handleControlledInputChange} autoFocus 
                                        className="form-control" 
                                        placeholder="pH Note" 
                                        value={dailyData.ph_note}/>
                                    </div>
                                    </fieldset>

                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="alkalinity">Alkalinity:</label>
                                        <select value={dailyData.alkalinity} id="alkalinity" className="form-control" onChange={handleControlledInputChange}>
                                            <option value="0">Select a Alkalinity</option>
                                            {alkParameters?.map(a => (
                                                <option key={a.id} value={a.id}>
                                                    {a.ppm}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="alkalinity_note">Alkalinity note:</label>
                                        <input type="text" id="alkalinity_note" onChange={handleControlledInputChange} autoFocus 
                                        className="form-control" 
                                        placeholder="Alkalinity Note" 
                                        value={dailyData.alkalinity_note}/>
                                    </div>
                                    </fieldset>

                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="cyanuric_acid">Cyanuric Acid:</label>
                                        <select value={dailyData.cyanuric_acid} id="cyanuric_acid" className="form-control" onChange={handleControlledInputChange}>
                                            <option value="0">Select a Cyanuric Acid</option>
                                            {cyanAcidParameters?.map(ca => (
                                                <option key={ca.id} value={ca.id}>
                                                    {ca.ppm}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="cyanuric_acid_note">Cyanuric Acid note:</label>
                                        <input type="text" id="cyanuric_acid_note" onChange={handleControlledInputChange} autoFocus 
                                        className="form-control" 
                                        placeholder="Cyanuric Acid Note" 
                                        value={dailyData.cyanuric_acid_note}/>
                                    </div>
                                    </fieldset>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="salinity">Salinity:</label>
                                        <select value={dailyData.salinity} id="salinity" className="form-control" onChange={handleControlledInputChange}>
                                            <option value="0">Select a Salinity</option>
                                            {salinityParameters?.map(s => (
                                                <option key={s.id} value={s.id}>
                                                    {s.ppm}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="salinity_note">Salinity note:</label>
                                        <input type="text" id="salinity_note" onChange={handleControlledInputChange} autoFocus 
                                        className="form-control" 
                                        placeholder="Salinity Note" 
                                        value={dailyData.salinity_note}/>
                                    </div>
                                    </fieldset>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="filter_pressure">Filter Pressure:</label>
                                        <select value={dailyData.filter_pressure} id="filter_pressure" className="form-control" onChange={handleControlledInputChange}>
                                            <option value="0">Select a Filter Pressure</option>
                                            {filterPressureParameters?.map(fp => (
                                                <option key={fp.id} value={fp.id}>
                                                    {fp.psi}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </fieldset>
                                <fieldset>
                                    <div className="form-group">
                                        <label htmlFor="filter_pressure_note">Filter Pressure note:</label>
                                        <input type="text" id="filter_pressure_note" onChange={handleControlledInputChange} autoFocus 
                                        className="form-control" 
                                        placeholder="Filter Pressure Note" 
                                        value={dailyData.filter_pressure_note}/>
                                    </div>
                                    </fieldset>
                                <fieldset>
                                <label>Filter Baskets Cleaned?</label>
                                <div class="form-check">
                                    <input type="checkbox" readonly class="form-check-input" aria-label="Text input with checkbox" 
                                      onChange={handleControlledInputChange} id="filter_basket" value={!dailyData.filter_basket} />
                                    <label class="form-check-label" for="defaultCheck1">
                                        True
                                    </label>
                                    </div>
                                </fieldset>
                            </form>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-primary" onClick={event => {
                                        event.preventDefault()
                                        handleSaveDailyData()
                                    }} data-dismiss="modal" >{dataId > 0 ? "Edit Data Entry" : "Save Data Entry"}</button>
                                </div>
                    </div>
                        </div>
                    </div>
        </>
    )
}