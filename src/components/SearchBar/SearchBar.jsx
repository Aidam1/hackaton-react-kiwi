import React from "react";
import { Button } from "reactstrap";

const SearchBar = (props) => {
  const {
    handleSelectChange,
    searchBarInputFrom,
    searchBarInputTo,
    handleSearch,
    handleCheckboxChange,
    directFlightsOnly,
  } = props;
  return (
    <div>
      <select
        onChange={(e) => handleSelectChange(e, "from")}
        value={searchBarInputFrom}
      >
        <option disabled value="" style={{ display: "none" }}>
          Select from
        </option>
        <option value="VLC">Valencia</option>
        <option value="BCN">Barcelona</option>
        <option value="MAD">Madrid</option>
        <option value="MXP">Milano</option>
      </select>
      <select
        onChange={(e) => handleSelectChange(e, "to")}
        value={searchBarInputTo}
      >
        <option disabled value="" style={{ display: "none" }}>
          Select to
        </option>
        <option value="PRG">Prague</option>
        <option value="TXL">Berlin</option>
        <option value="WAW">Warsaw</option>
        <option value="PED">Pardubice</option>
      </select>
      <label>
        Direct flights only
        <input
          type="checkbox"
          name="directFlights"
          checked={directFlightsOnly}
          onChange={handleCheckboxChange}
        />
      </label>
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default SearchBar;
