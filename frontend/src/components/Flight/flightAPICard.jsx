import React from 'react';

export const FlightAPICard = (props) => {
    
    return (
        <div className = "card">
        <p>Airline: {props.flight[0].airline}</p>
        <p>Flight {props.flight[0].airlineCode}{props.flight[0].flightNumber}</p>
        {props.flight[0].segments.map((segment) => (
            <div>
            <p>{segment.departureAirport} to {segment.arrivalAirport} </p>
            <p>Duration {segment.flightDuration}</p>
            </div>
        ))}
    </div>
    )

};

export default FlightAPICard;