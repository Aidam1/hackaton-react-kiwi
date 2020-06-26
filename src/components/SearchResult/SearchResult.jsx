import React from "react";
import { Card, CardText, CardTitle, CardHeader } from "reactstrap";

const SearchResult = (props) => {
  const { price, cityFrom, flyFrom, cityTo, flyTo, dTime, aTime } = props;

  const formatDateToString = (dateInSeconds) => {
    const date = new Date(dateInSeconds * 1000);
    return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  const departureDateString = formatDateToString(dTime);
  const arriavalDateString = formatDateToString(aTime);

  return (
    <Card>
      <CardHeader>
        From {cityFrom} ({flyFrom}) To {cityTo} ({flyTo})
      </CardHeader>
      <CardTitle>{price} EUR</CardTitle>
      <CardText>{departureDateString}</CardText>

      <CardText>Test</CardText>
    </Card>
  );
};

export default SearchResult;
