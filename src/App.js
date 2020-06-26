import React, { useState, useEffect } from "react";
import "./App.css";
import SearchResult from "./components/SearchResult/SearchResult.jsx";
import { fetchFlightsFromApi } from "./api/flightsApi";
import { Spinner, Alert } from "reactstrap";
import SearchBar from "./components/SearchBar/SearchBar.jsx";

function App() {
  const [flightsData, setFlightsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchBarInputFrom, setSearchBarInputFrom] = useState("PRG");
  const [searchBarInputTo, setSearchBarInputTo] = useState("VLC");
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false);

  const fetchFlightsData = async () => {
    setIsLoading(true);
    const flightsData = await fetchFlightsFromApi(
      searchBarInputFrom,
      searchBarInputTo,
      directFlightsOnly
    );
    console.log(flightsData.data, "console");
    setFlightsData(flightsData.data);
    setIsLoading(false);
  };

  const handleSelectChange = (e, targetSelect) => {
    if (targetSelect === "from") {
      setSearchBarInputFrom(e.target.value);
    } else if (targetSelect === "to") {
      setSearchBarInputTo(e.target.value);
    }
  };

  const handleCheckboxChange = (e) => {
    console.log("e.target.checked", e.target.checked);
    setDirectFlightsOnly(e.target.checked);
  };

  const handleSearch = () => {
    console.log("click");
    fetchFlightsData();
  };

  useEffect(() => {
    fetchFlightsData();
  }, []);

  const generateSearchResults = () => {
    if (flightsData.length <= 0)
      return <Alert color="danger">No flights available</Alert>;
    return flightsData.map((flight) => (
      <SearchResult
        key={flight.id}
        price={flight.price}
        cityFrom={flight.cityFrom}
        flyFrom={flight.flyFrom}
        cityTo={flight.cityTo}
        flyTo={flight.flyTo}
        dTime={flight.dTime}
        aTime={flight.aTime}
      />
    ));
  };

  const generateSpinner = () => (
    <div className="spinner">
      <Spinner />
    </div>
  );

  return (
    <div>
      <SearchBar
        handleSelectChange={handleSelectChange}
        searchBarInputFrom={searchBarInputFrom}
        searchBarInputTo={searchBarInputTo}
        handleCheckboxChange={handleCheckboxChange}
        directFlightsOnly={directFlightsOnly}
        handleSearch={handleSearch}
      />

      {!isLoading ? generateSearchResults() : generateSpinner()}
    </div>
  );
}

export default App;
