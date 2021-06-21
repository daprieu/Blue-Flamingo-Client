import React, { useContext, useEffect, useState } from "react"
import { CyanuricAcidParametersContext } from "./CyanAcidParamsProvider"
import { Link, useHistory } from "react-router-dom"
import "../params.css"

export const CyanAcidParamsList = () => {
    const { cyanAcidParameters, getCyanuricAcidParams, deleteCyanuricAcidParam } = useContext(CyanuricAcidParametersContext)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getCyanuricAcidParams()
                .then(() => setIsLoading(false))
    }, [])

    const handleDelete = (id) => {

        if (window.confirm("Confirm Deletion")) {
            deleteCyanuricAcidParam(id)
                .then(() => history.push(`/params/cyanuricacid`))
        }
    }
    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if (isLoading) return (<div>Loading</div>)

    return (<>
        <div>
            <div>Cyanuric Acid</div>
            {cyanAcidParameters.map(cap =>
                <div className="post_card" key={cap.id}>
                    <p><b>Cyanuric Acid ppm: </b>{cap.ppm}</p>
                    <p><b>Message: </b>{cap.message}</p>
                    <button type="button" id="deleteCyanuricAcidParam" onClick={(e) => {
                        e.preventDefault()
                        handleDelete(cap.id)
                    }}>Delete</button>
                    <button >
                        <Link to={{
                            pathname: `/params/cyanuricacid/edit/${cap.id}`
                        }}>Edit</Link>
                    </button>
                </div>
            )}
            <Link to="/params/cyanuricacid/create">
          <button className="createTag" type="button">
            Create Cyanuric Acid
          </button>
        </Link>
        </div>
    </>)
}
