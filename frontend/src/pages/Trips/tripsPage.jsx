import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Trip } from "../../components/Trip/Trip";
import { getTrips } from "../../services/trips"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export const ShowAllTrips = () => {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        const token = localStorage.getItem("token");
        if(token) {
            getTrips(token)
            .then((data) => {
                setTrips(data.trips);
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

    return (
        <>
            <h2>My trips</h2>
                <Container>
                    <Row>
                        {trips.map((trip) => (
                            <Col sm key={trip._id}>
                                <Trip trip={trip} token={token} />
                            </Col>
                        ))}
                    </Row>
                </Container>

        </>
    );
};