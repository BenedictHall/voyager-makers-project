import React from 'react';

export const FlightDBCard = (props) => {
    
    // const { carrierCode, flightNumber, departureDate } = flight;
    // console.log("props.flight", props.flight[0])
    // console.log("airline", props.flight[0].carrierCode)
    console.log("flightDBcard rendering", props)

    return (
        <div>
        <p>Airline: {props.flight.airline}</p>
        <p>Airline Code: {props.flight.airlineCode}</p>
        <p>Arrival Airport: {props.flight.arrivalAirport}</p>
        <p>Departure Airport: {props.flight.departureAirport}</p>
        <p>Flight Duration: {props.flight.flightDuration}</p>
        <p>Flight Number: {props.flight.flightNumber}</p>
    </div>
    )

};

export default FlightDBCard;