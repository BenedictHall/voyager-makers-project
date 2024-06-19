// import {Flight} from "../../components/Flight/flight"
import {TrackNewFlight} from "../../components/Flight/trackNewFlight"
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {getTrackedFlights } from "../../services/flights"
import {FlightDBCard} from "../../components/Flight/flightDBCard";

export const FlightTracker = () => {
    const [flights, setFlights] = useState([]);
    console.log("flights usestate", flights)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            getTrackedFlights(token)
            .then((data) => {
                setFlights(data.flights);
                console.log("Flights", data.flights)
                localStorage.setItem("token", data.token);
            })
            .catch((error) => {
                console.error(error);
                navigate("/")
            });
        }
    }, [navigate]);

    const token = localStorage.getItem("token");
    if(!token) {
        navigate("/");
        return;
    }
return (
    <div>
        <TrackNewFlight/>
        <h2>Your upcoming flights</h2>
        <div>
            {flights.map((flight)=> (
                <FlightDBCard flight={flight} token={token} key={flight._id}/>
                // <p>{flight.airline}</p>
            ))}
        </div>
    </div>
)
}