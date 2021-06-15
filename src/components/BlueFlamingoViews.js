import React from "react"
import { Route } from "react-router-dom"
import { ParametersProvider } from "./parameters/parameterProvider"
import { AlkalinityParamsList } from "./parameters/alkalinityParamsList"
import { ParamNavBar } from "./paramNav/paramNavBar"


export const BlueFlamingoViews = () => {
    return <>

        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/params">
                <ParamNavBar />
            </Route>
                <ParametersProvider>
                    <Route exact path="/params/alkalinity">
                        <ParamNavBar />
                        <AlkalinityParamsList />
                    </Route>
                </ParametersProvider>
        </main>
    </>
}