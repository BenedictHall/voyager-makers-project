import { useNavigate } from "react-router-dom";

export const Trip = (props) => {
    const navigate = useNavigate()
    
    const tripId = props.trip._id 

    const viewTrip = () => {
        navigate(`/trips/${tripId}`)
    }
    
    return (
        <div key={tripId} onClick={viewTrip}>
            <h2>{props.trip.location}</h2>
            <p>{props.trip.startDate} {props.trip.endDate}</p>

        </div>
    )

};