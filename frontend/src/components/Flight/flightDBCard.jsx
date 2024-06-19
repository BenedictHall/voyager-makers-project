import React from 'react';

export const FlightDBCard = (props) => {
    

    console.log("flightDBcard rendering", props)

    return (
        <div className="card">
        <h3>{props.flight.departureAirport} to {props.flight.arrivalAirport}</h3>
        <p>{props.flight.departureDate}</p>
        <p>Airline: {props.flight.airline}</p>
        <p>Flight Number: {props.flight.airlineCode}{props.flight.flightNumber}</p>
        <p>Duration: {props.flight.flightDuration}</p>
        
    </div>
    )

};

export default FlightDBCard;