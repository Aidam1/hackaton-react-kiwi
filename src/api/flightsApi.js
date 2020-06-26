const baseUrl = "https://api.skypicker.com/flights";

export const fetchFlightsFromApi = async () => {
  const url = `${baseUrl}?fly_from=PRG&fly_to=VLC&date_from=08/08/2020&date_to=09/08/2020&limit=10&partner=picky`;
  const flightsResponse = await fetch(url);
  const flightsData = await flightsResponse.json();
  return flightsData;
};
