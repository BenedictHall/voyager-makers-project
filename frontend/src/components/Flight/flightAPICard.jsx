import React from 'react';

export const FlightAPICard = (props) => {
    
    return (
        <div>
        <p>Airline: {props.flight[0].airline}</p>
        <p>Airline Code: {props.flight[0].airlineCode}</p>
        <p>Flight Number: {props.flight[0].flightNumber}</p>
        {props.flight[0].segments.map((segment) => (
            <div>
            <p>{segment.arrivalAirport}</p>
            <p>{segment.carrier}</p>
            <p>{segment.departureAirport}</p>
            <p>{segment.flightDuration}</p>
            <p>{segment.flightNumber}</p>
            </div>
        ))}
    </div>
    )

};

export default FlightAPICard;