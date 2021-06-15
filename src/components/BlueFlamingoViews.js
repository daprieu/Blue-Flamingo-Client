import React from "react"
import { Route } from "react-router-dom"
import { AlkalinityParametersProvider } from "./parameters/alkalinity/alkalinityParamsProvider"
import { AlkalinityParamsList } from "./parameters/alkalinity/alkalinityParamsList"
import { CyanuricAcidParametersProvider } from "./parameters/cyanuricAcid/cyanAcidParamsProvider"
import { CyanAcidParamsList } from "./parameters/cyanuricAcid/cyanAcidParamsList"
import { ParamNavBar } from "./navParams/paramNavBar"


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
        </main>
    </>
}