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


export const BlueFlamingoViews = () => {
    return <>

        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <DailyDataProvider>
                <Route exact path="/dailylogs">
                    <DailyDataList />
                </Route>
            </DailyDataProvider>
            <Route exact path="/params">
                <ParamNavBar />
            </Route>
                <AlkalinityParametersProvider>
                    <Route exact path="/params/alkalinity">
                        <ParamNavBar />
                        <AlkalinityParamsList />
                    </Route>
                </AlkalinityParametersProvider>
                <CyanuricAcidParametersProvider>
                    <Route exact path="/params/cyanuricacid">
                        <ParamNavBar />
                        <CyanAcidParamsList />
                    </Route>
                </CyanuricAcidParametersProvider>
                <FilterPressureParametersProvider>
                    <Route exact path="/params/filterpressure">
                        <ParamNavBar />
                        <FilterPressureParamsList />
                    </Route>
                </FilterPressureParametersProvider>
                <FreeChlorineParametersProvider>
                    <Route exact path="/params/freechlorine">
                        <ParamNavBar />
                        <FreeChlorineParamsList />
                    </Route>
                </FreeChlorineParametersProvider>
                <HardnessParametersProvider>
                    <Route exact path="/params/hardness">
                        <ParamNavBar />
                        <HardnessParamsList />
                    </Route>
                </HardnessParametersProvider>
                <PHParametersProvider>
                    <Route exact path="/params/ph">
                        <ParamNavBar />
                        <PHParamsList />
                    </Route>
                </PHParametersProvider>
                <SalinityParametersProvider>
                    <Route exact path="/params/salinity">
                        <ParamNavBar />
                        <SalinityParamsList />
                    </Route>
                </SalinityParametersProvider>
                <TotalChlorineParametersProvider>
                    <Route exact path="/params/totalchlorine">
                        <ParamNavBar />
                        <TotalChlorineParamsList />
                    </Route>
                </TotalChlorineParametersProvider>
        </main>
    </>
}