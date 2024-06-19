import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const FlightDBCard = (props) => {
    

    return (
        <div className="container mt-5">
            <div className='card'>
                <div className="card-header">
                    {props.flight.departureAirport} to {props.flight.arrivalAirport}
                </div>
                <div className="card-body">
                    <div className="row text-center">
                        <div className="col-md-3"><p className = "card-text">{props.flight.departureDate}</p></div>
                        <div className="col-md-3"><p className = "card-text">{props.flight.airline}</p></div>
                        <div className="col-md-3"><p className = "card-text">{props.flight.airlineCode}{props.flight.flightNumber}</p></div>
                        <div className="col-md-3"><p className = "card-text">{props.flight.flightDuration}</p></div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default FlightDBCard;