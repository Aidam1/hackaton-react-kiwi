import React from "react";
import { Card, CardText, Button, CardBody } from "reactstrap";
import "./SearchResult.css";

const SearchResult = (props) => {
  const { price, cityFrom, flyFrom, cityTo, flyTo, dTime, aTime, route } = props;

  const formatDateToString = (dateInSeconds) => {
    const date = new Date(dateInSeconds * 1000);
    return `${date.getDate()}.${date.getMonth()+1}.${date.getFullYear()} ${date.getHours()}:${(
      "0" + date.getMinutes()
    ).slice(-2)}`;
  };
  

  const departureDateString = formatDateToString(dTime);
  const arrivalDateString = formatDateToString(aTime);

  return (
    <Card>
      <CardBody>
        <CardText>{departureDateString}</CardText>
        <CardText>{arrivalDateString}</CardText>

        <CardText>
          From {cityFrom} ({flyFrom}) To {cityTo} ({flyTo})
        </CardText>
        <CardText>{price} EUR</CardText>
        <CardText>Number of stopovers: {route.length >1 ? route.length : "0"}</CardText>

        <Button size="sm">See details</Button>
      </CardBody>
    </Card>
  );
};

export default SearchResult;
