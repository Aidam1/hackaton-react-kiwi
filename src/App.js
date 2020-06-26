import React, { useState, useEffect } from "react";
import "./App.css";
import SearchResult from "./components/SearchResult/SearchResult.jsx";
import { fetchFlightsFromApi } from "./api/flightsApi";
import { Spinner, Alert, Button } from "reactstrap";
import SearchBar from "./components/SearchBar/SearchBar.jsx";
import { DateTime } from "luxon";

const btnStyle = {
  width: "7rem",
  margin: "2rem auto",
};

function App() {
  const [flightsData, setFlightsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [searchBarInputFrom, setSearchBarInputFrom] = useState("PRG");
  const [searchBarInputTo, setSearchBarInputTo] = useState("VLC");
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false);
  const [searchBarDateFrom, setSearchBarDateFrom] = useState(
    DateTime.fromMillis(Date.now()).toFormat("yyyy-MM-dd")
  );
  const [searchBarDateTo, setSearchBarDateTo] = useState(
    DateTime.fromMillis(Date.now() + 86400000).toFormat("yyyy-MM-dd")
  );
  const [resultsNumber, setResultsNumber] = useState(5);
  console.log(
    'DateTime.fromMillis(Date.now()).toFormat("yyyy-MM-dd")',
    DateTime.fromMillis(Date.now()).toFormat("yyyy-MM-dd")
  );
  const fetchFlightsData = async () => {
    setIsLoading(true);
    const flightsData = await fetchFlightsFromApi(
      searchBarInputFrom,
      searchBarInputTo,
      directFlightsOnly,
      searchBarDateFrom,
      searchBarDateTo
    );
    console.log(flightsData.data, "console");
    setFlightsData(flightsData.data);
    setResultsNumber(
      flightsData.data.length >= 5 ? 5 : flightsData.data.length
    );
    setIsLoading(false);
  };

  const handleSelectChange = (e, targetSelect) => {
    if (targetSelect === "from") {
      setSearchBarInputFrom(e.target.value);
    } else if (targetSelect === "to") {
      setSearchBarInputTo(e.target.value);
    }
  };

  const handleDateChange = (e, targetInput) => {
    if (targetInput === "from") {
      setSearchBarDateFrom(e.target.value);
    } else if (targetInput === "to") {
      setSearchBarDateTo(e.target.value);
    }
    console.log("e.target.value", e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setDirectFlightsOnly(e.target.checked);
  };

  const handleSearch = () => {
    fetchFlightsData();
  };

  const handleLoadMore = () => {
    console.log(flightsData.length, "le", resultsNumber);
    if (resultsNumber + 5 <= flightsData.length) {
      setResultsNumber(resultsNumber + 5);
    } else if (resultsNumber < flightsData.length) {
      setResultsNumber(flightsData.length);
    }
  };

  useEffect(() => {
    fetchFlightsData();
  }, []);

  const generateSearchResults = () => {
    if (flightsData.length <= 0)
      return <Alert color="danger">No flights available</Alert>;
    return (
      <>
        {flightsData.map((flight, index) => {
          return index < resultsNumber ? (
            <SearchResult
              key={flight.id}
              price={flight.price}
              cityFrom={flight.cityFrom}
              flyFrom={flight.flyFrom}
              cityTo={flight.cityTo}
              flyTo={flight.flyTo}
              dTime={flight.dTime}
              aTime={flight.aTime}
              route={flight.route}
            />
          ) : null;
        })}

        {flightsData.length > resultsNumber ? (
          <Button style={btnStyle} onClick={handleLoadMore}>
            Load more
          </Button>
        ) : null}
      </>
    );
  };

  const generateSpinner = () => (
    <div className="spinner">
      <Spinner />
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>🥝</h1>

      <SearchBar
        handleSelectChange={handleSelectChange}
        searchBarInputFrom={searchBarInputFrom}
        searchBarInputTo={searchBarInputTo}
        handleCheckboxChange={handleCheckboxChange}
        directFlightsOnly={directFlightsOnly}
        handleSearch={handleSearch}
        handleDateChange={handleDateChange}
        searchBarDateFrom={searchBarDateFrom}
        searchBarDateTo={searchBarDateTo}
      />

      {!isLoading ? generateSearchResults() : generateSpinner()}
    </div>
  );
}

export default App;
