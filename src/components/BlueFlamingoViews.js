import React from "react"
import { Route } from "react-router-dom"
import { AlkalinityParametersProvider } from "./parameters/alkalinity/AlkalinityParamsProvider"
import { AlkalinityParamsList } from "./parameters/alkalinity/AlkalinityParamsList"
import { CyanuricAcidParametersProvider } from "./parameters/cyanuricAcid/CyanAcidParamsProvider"
import { CyanAcidParamsList } from "./parameters/cyanuricAcid/CyanAcidParamsList"
import { ParamNavBar } from "./navParams/ParamNavBar"
import { FilterPressureParametersProvider } from "./parameters/filterPressure/FilterPressureParamsProvider"
import { FilterPressureParamsList } from "./parameters/filterPressure/FilterPressureParamsList"
import { FreeChlorineParametersProvider } from "./parameters/freeChlorine/FreeChlorinParamsProvider"
import { FreeChlorineParamsList } from "./parameters/freeChlorine/FreeChlorineParamsList"
import { HardnessParamsList } from "./parameters/hardness/HardnessParamsList"
import { HardnessParametersProvider } from "./parameters/hardness/HardnessParamsProvider"
import { PHParametersProvider } from "./parameters/pH/PHParamsProvider"
import { PHParamsList } from "./parameters/pH/PHParamsList"
import { SalinityParametersProvider } from "./parameters/salinity/SalinityParamsProvider"
import { SalinityParamsList } from "./parameters/salinity/SalinityParamsList"
import { TotalChlorineParametersProvider } from "./parameters/totalChlorine/TotalChlorineParamsProvider"
import { TotalChlorineParamsList } from "./parameters/totalChlorine/TotalChlorineParamsList"
import { DailyDataProvider } from "./dailyData/DailyDataProvider"
import { DailyDataList } from "./dailyData/DailyDataList"
import { PumphouseProvider } from "./pumphouse/PumphouseProvider"
import { PumphouseList } from "./pumphouse/PumphouseList"
import { DailyDataForm } from "./dailyData/DailyDataForm"
import { AlkalinityForm } from "./parameters/alkalinity/AlkalinityParamForm"
import { CyanuricAcidForm } from "./parameters/cyanuricAcid/CyanAcidParamForm"
import { FilterPressureForm } from "./parameters/filterPressure/FilterPressureParamForm"


export const BlueFlamingoViews = () => {
    return <>

        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <HardnessParametersProvider>
                <TotalChlorineParametersProvider>
                    <FreeChlorineParametersProvider>
                        <PHParametersProvider>
                            <AlkalinityParametersProvider>
                                <CyanuricAcidParametersProvider>
                                    <SalinityParametersProvider>
                                        <FilterPressureParametersProvider>
                                            <PumphouseProvider>
                                                <DailyDataProvider>
                                                    <Route path="/enter_daily_data">
                                                        <DailyDataForm />
                                                    </Route>
                                                    <Route exact path="/daily_logs">
                                                        <DailyDataList />
                                                    </Route>
                                                </DailyDataProvider>
                                                <Route exact path="/pumphouse">
                                                    <PumphouseList />
                                                </Route>
                                            </PumphouseProvider>
                                            <Route exact path="/params">
                                                <ParamNavBar />
                                            </Route>
                                            <Route exact path="/params/alkalinity">
                                                <ParamNavBar />
                                                <AlkalinityParamsList />
                                            </Route>
                                            <Route exact path="/params/alkalinity/create">
                                                <AlkalinityForm />
                                            </Route>
                                            <Route exact path="/params/alkalinity/edit/:paramId(\d+)">
                                                <AlkalinityForm />
                                            </Route>
                                            <Route exact path="/params/cyanuricacid">
                                                <ParamNavBar />
                                                <CyanAcidParamsList />
                                            </Route>
                                            <Route exact path="/params/cyanuricacid/create">
                                                <CyanuricAcidForm />
                                            </Route>
                                            <Route exact path="/params/cyanuricacid/edit/:paramId(\d+)">
                                                <CyanuricAcidForm />
                                            </Route>
                                            <Route exact path="/params/filterpressure">
                                                <ParamNavBar />
                                                <FilterPressureParamsList />
                                            </Route>
                                            <Route exact path="/params/filterpressure/create">
                                                <FilterPressureForm />
                                            </Route>
                                            <Route exact path="/params/filterpressure/edit/:paramId(\d+)">
                                                <FilterPressureForm />
                                            </Route>
                                            <Route exact path="/params/freechlorine">
                                                <ParamNavBar />
                                                <FreeChlorineParamsList />
                                            </Route>
                                            <Route exact path="/params/hardness">
                                                <ParamNavBar />
                                                <HardnessParamsList />
                                            </Route>
                                            <Route exact path="/params/ph">
                                                <ParamNavBar />
                                                <PHParamsList />
                                            </Route>
                                            <Route exact path="/params/salinity">
                                                <ParamNavBar />
                                                <SalinityParamsList />
                                            </Route>
                                            <Route exact path="/params/totalchlorine">
                                                <ParamNavBar />
                                                <TotalChlorineParamsList />
                                            </Route>
                                        </FilterPressureParametersProvider>
                                    </SalinityParametersProvider>
                                </CyanuricAcidParametersProvider>
                            </AlkalinityParametersProvider>
                        </PHParametersProvider>
                    </FreeChlorineParametersProvider>
                </TotalChlorineParametersProvider>
            </HardnessParametersProvider>
        </main>
    </>
}