import React, { useState, useEffect } from "react";
import "./App.css";
import SearchResult from "./components/SearchResult/SearchResult.jsx";
import { fetchFlightsFromApi } from "./api/flightsApi";
import { Spinner } from "reactstrap";
import SearchBar from "./components/SearchBar/SearchBar.jsx";

function App() {
  const [flightsData, setFlightsData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const [searchBarInputFrom, setSearchBarInputFrom] =useState("");
  const [searchBarInputTo, setSearchBarInputTo] =useState("");

  const fetchFlightsData = async () => {
    setIsLoading(true);
    const flightsData = await fetchFlightsFromApi();
    console.log(flightsData.data, "console");
    setFlightsData(flightsData.data);
    setIsLoading(false);
  };

  const handleSelectChange = (e) => {
    setSearchBarInputFrom(e.target.value);
    console.log(e.target.value)
  }



  useEffect(() => {
    fetchFlightsData();
  }, []);

  return (
    <div>
      <SearchBar
      handleSelectChange={handleSelectChange}
      searchBarInputFrom={searchBarInputFrom}
      />
  
      {!isLoading ? flightsData.map((flight) => (
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
      )) : <div className="spinner"> <Spinner /> </div>} 
    </div>
  );
}

export default App;
