import React, { useState, useEffect } from "react";
import "./App.css";
import SearchResult from "./components/SearchResult/SearchResult.jsx";
import { fetchFlightsFromApi } from "./api/flightsApi";

function App() {
  const [flightsData, setFlightsData] = useState([]);

  const fetchFlightsData = async () => {
    const flightsData = await fetchFlightsFromApi();
    console.log(flightsData.data, "console");
    setFlightsData(flightsData.data);
  };

  useEffect(() => {
    fetchFlightsData();
  }, []);

  console.log(flightsData, "flights");
  return (
    <div>
      {flightsData.map((flight) => (
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
      ))}
    </div>
  );
}

export default App;
