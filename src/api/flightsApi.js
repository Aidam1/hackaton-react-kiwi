const baseUrl = "https://api.skypicker.com/flights";

export const fetchFlightsFromApi = async (fly_from, fly_to, direct_flights) => {
  const url = `${baseUrl}?fly_from=${fly_from}&fly_to=${fly_to}&date_from=08/08/2020&date_to=09/08/2020&direct_flights=${direct_flights}&limit=10&partner=picky`;
  const flightsResponse = await fetch(url);
  const flightsData = await flightsResponse.json();
  return flightsData;
};
