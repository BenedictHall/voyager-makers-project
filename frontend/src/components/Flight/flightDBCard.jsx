import React from 'react';

export const FlightDBCard = (props) => {
    

    console.log("flightDBcard rendering", props)

    return (
        <div className="card">
        <p>Airline: {props.flight.airline}</p>
        <p>Airline Code: {props.flight.airlineCode}</p>
        <p>Arrival Airport: {props.flight.arrivalAirport}</p>
        <p>Departure Airport: {props.flight.departureAirport}</p>
        <p>Flight Duration: {props.flight.flightDuration}</p>
        <p>Flight Number: {props.flight.flightNumber}</p>
        <p>Departure Date: {props.flight.departureDate}</p>
    </div>
    )

};

export default FlightDBCard;