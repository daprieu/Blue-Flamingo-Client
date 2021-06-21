import React, { useContext, useEffect, useState } from "react"
import { PumphouseContext } from "./PumphouseProvider"
import { Link, useHistory } from "react-router-dom"


export const PumphouseList = () => {
    const { pumphouse, getPumphouse, deletePumphouse} = useContext(PumphouseContext)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
            getPumphouse()
                .then(() => setIsLoading(false))
    }, [])

    const handleDelete = (id) => {

      if (window.confirm("Confirm Deletion")) {
          deletePumphouse(id)
              .then(() => history.push(`/pumphouse`))
      }
  }
    // So we wouldn't have to worry about missing ?'s in the return component
    // and avoid the "cannot find label of undefined" error.
    if (isLoading) return (<div>Loading</div>)

    return (<>
        <div>
          <div>Pumphouse List</div>
            {pumphouse.map(ph =>
                  <div className="post_card" key={ph.id}>
                  <p><b>Pumphouse Name: </b>{ph.name}</p>
                  <button type="button" id="deletePumphouse" onClick={(e) => {
                        e.preventDefault()
                        handleDelete(ph.id)
                    }}>Delete</button>
                    <button >
                        <Link to={{
                            pathname: `/pumphouse/edit/${ph.id}`
                        }}>Edit</Link>
                    </button>
                </div>
            )}
            <Link to="/pumphouse/create">
                <button className="createTag" type="button">
                    Create Pumphouse
                </button> 
            </Link>
        </div>
    </>)
}