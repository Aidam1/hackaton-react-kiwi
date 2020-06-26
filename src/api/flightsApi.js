const baseUrl = "https://api.skypicker.com/flights";


export const fetchFlightsFromApi = async (fly_from, fly_to, direct_flights, date_from, date_to) => {
  const dateFromFormated = formatDate(date_from);
  const dateToFormated = formatDate(date_to);
  const url = `${baseUrl}?fly_from=${fly_from}&fly_to=${fly_to}&date_from=${dateFromFormated}&date_to=${dateToFormated}&direct_flights=${direct_flights}&limit=5&partner=picky`;
  console.log('url', url)
  const flightsResponse = await fetch(url);
  const flightsData = await flightsResponse.json();
  return flightsData;
};







const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  return `${("0" + date.getDate()).slice(-2)}/${("0" + (date.getMonth()+1)).slice(-2)}/${date.getFullYear()}`;
};

