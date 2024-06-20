import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export const Trip = (props) => {
    const navigate = useNavigate()

    
    const tripId = props.trip._id 

    const viewTrip = () => {
        navigate(`/trips/${tripId}`)
    }
    
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="../../../../public/depositphotos_404572958-stock-photo-perfect-beach-view-summer-holiday.jpg" />
            <Card.Body>
                <Card.Title>
                <div key={tripId}/>
                    <h4>{props.trip.location}</h4>
                </Card.Title>
                    <Card.Text>
                    <p>{props.trip.startDate} {props.trip.endDate}</p>
                    </Card.Text>
                    <Button variant="primary" onClick={viewTrip}>Trip details</Button>
                </Card.Body>
        </Card>
        
    )

};