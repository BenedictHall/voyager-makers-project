export const Trip = (props) => {
    
    const tripId = props.trip._id 
    
    return (
        <div key={tripId}>
            <h2>{props.trip.location}</h2>
            <p>{props.trip.startDate} {props.trip.endDate}</p>

        </div>
    )

};