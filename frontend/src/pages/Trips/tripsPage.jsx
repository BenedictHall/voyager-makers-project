import { useState, useEffect} from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Trip } from "../../components/Trip/Trip";
import { getTrips } from "../../services/trips"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export const ShowAllTrips = () => {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        const token = localStorage.getItem("token");
        if(token) {
            getTrips(token)
            .then((data) => {
                const sortedTrips = data.trips.sort((a, b) => a.startDate.localeCompare(b.startDate));
                setTrips(sortedTrips);
                localStorage.setItem("token", data.token);
            })
            .catch((error)=>{
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

    const newTripButton = () => {
        navigate("../trips/newtrip")
    }

    return (
        <>
            <h2>My trips</h2>
                <Container>
                    <Row>
                        <Col>
                        <Card id = "trip-card" style={{width: "18rem", height: "21rem"}} >
                            <Card.Img id = "trip-card-image" variant="top" src="../../../../public/plus.png" style = {{width: "50px", margin: "0 auto", padding:"3rem"}}/>
                            <Card.Body>
                                <Card.Title>
                                
                                    <h4>Add new trip</h4>
                                </Card.Title>
                                <Button variant="primary" onClick={newTripButton}>Create</Button>
                                </Card.Body>
                        </Card>
                        </Col>
                        {trips.map((trip) => (
                            <Col sm key={trip._id}>
                                <Trip style={{ width: '18rem' }} trip={trip} token={token} />
                            </Col>
                        ))}
                    </Row>
                </Container>

        </>
    );
};