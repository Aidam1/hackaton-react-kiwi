import React from 'react'
import { Alert, Button } from "reactstrap"

const SearchBar = ({handleSelectChange,searchBarInputFrom}) => {

    return (
        <div>
            <select onChange={handleSelectChange} value={searchBarInputFrom}>
                <option disabled value="">-- select an option --</option>
                <option value="Valencia">Valencia</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Madrid">Madrid</option>
                <option value="Milano">Milano</option>
            </select>
            <select>
                <option disabled value="">-- select an option --</option>
                <option value="Prague">Prague</option>
                <option value="Berlin">Berlin</option>
                <option value="Warsaw">Warsaw</option>
                <option value="Pardubice">Pardubice</option>
            </select>

            <Button>Search</Button>

        </div>
    )
}


const alert = (props) => {
    return (
      <div>
        <Alert color="primary">
          This is it
        </Alert>
      </div>
    )
  }

export default SearchBar
