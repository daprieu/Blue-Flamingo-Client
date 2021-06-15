import React from "react"
import { Route } from "react-router-dom"
import { AlkalinityParametersProvider } from "./parameters/alkalinity/alkalinityParamsProvider"
import { AlkalinityParamsList } from "./parameters/alkalinity/alkalinityParamsList"
import { CyanuricAcidParametersProvider } from "./parameters/cyanuricAcid/cyanAcidParamsProvider"
import { CyanAcidParamsList } from "./parameters/cyanuricAcid/cyanAcidParamsList"
import { ParamNavBar } from "./navParams/paramNavBar"
import { FilterPressureParametersProvider } from "./parameters/filterPressure/filterPressureParamsProvider"
import { FilterPressureParamsList } from "./parameters/filterPressure/filterPressureParamsList"
import { FreeChlorineParametersProvider } from "./parameters/freeChlorine/freeChlorinParamsProvider"
import { FreeChlorineParamsList } from "./parameters/freeChlorine/freeChlorineParamsList"
import { HardnessParamsList } from "./parameters/hardness/hardnessParamsList"
import { HardnessParametersProvider } from "./parameters/hardness/hardnessParamsProvider"
import { PHParametersProvider } from "./parameters/pH/pHParamsProvider"
import { PHParamsList } from "./parameters/pH/pHParamsList"
import { SalinityParametersProvider } from "./parameters/salinity/salinityParamsProvider"
import { SalinityParamsList } from "./parameters/salinity/salinityParamsList"
import { TotalChlorineParametersProvider } from "./parameters/totalChlorine/totalChlorineParamsProvider"
import { TotalChlorineParamsList } from "./parameters/totalChlorine/totalChlorineParamsList"


export const BlueFlamingoViews = () => {
    return <>

        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
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