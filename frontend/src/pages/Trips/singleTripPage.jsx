import { useState, useEffect } from "react";
import SingleTripItem from "../../components/Trip/SingleTripItem";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleTrip } from "../../services/trips";
import { getAllItineraries } from "../../services/itinerary";
import { Itinerary } from "../../components/Itinerary/Itinerary";
import { CreateToDo } from "../../components/ToDo/CreateToDo";
import { getAllToDos } from "../../services/todo";
import { ToDo } from "../../components/ToDo/ToDo";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



export function SingleTripPage () {
    const [ tripInformation, setTripInformation ] = useState(null);
    let { tripId } = useParams();
    const navigate = useNavigate();
    const [itineraries, setItineraries] = useState([]);
    const [toDos, setToDos] = useState([]);

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (tripId && token) {
            getTripInformation(token);
        }
    }, []);

    console.log(tripId);

    async function getTripInformation() {
        const response = await getSingleTrip(token,tripId);
        console.log(response);
        if(response){
            setTripInformation(response.singleTrip);
        }
        console.log(tripInformation)
    }

    const token = localStorage.getItem("token");
    if(!token || !tripId) {
        navigate("/");
        // return;
    }

    useEffect(() => {


        if (token) {
            getAllItineraries(token)
                .then((data) => {
                    setItineraries(data.itineraries.filter((itinerary) => {return itinerary.tripId == tripId}));
                    localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                    // navigate("/login");
                });
                
        }
    }, []);

    useEffect(() => {


        if (token) {
            getAllToDos(token)
                .then((data) => {
                    setToDos(data.toDos);
                    localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                    // navigate("/login");
                });
        }
    }, []);

    const handleToDoCreated = (newToDo) => {
        setToDos((prevToDos) => [newToDo, ...prevToDos]);
        window.location.reload();
    };

    const groupByDate = (itineraries) => {
        return itineraries.reduce((acc, itinerary) => {
            const date = new Date(itinerary.date).toLocaleDateString();
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(itinerary);
            return acc;
        }, {});
    };

    const groupedItineraries = groupByDate(itineraries);

    return(
        <>
            <div data-testid="singleTripHeader"><SingleTripItem data={tripInformation} /></div>
            <Container>
            <Row>
            <Col xs={6}>
            <Card style={{ width: '32rem'}}>
            <Card.Body>
            <div>
                <button onClick={() => navigate(`/trips/${tripId}/budget`)}>Budget</button>
            </div>
            </Card.Body>
            </Card>
            </Col>
            <Col xs={6}>
            <Card style={{ width: '32rem' }}>
                <Card.Body>
            <div>
                <h3>To do</h3>
                
                <ListGroup>
                    {toDos.filter((toDo) => {return toDo.tripId == tripId}).map((toDo) => (
                        <ListGroup.Item>
                            <ToDo key={toDo._id} toDo={toDo} token={token} /> 
                        </ListGroup.Item>  
                    ))}
                </ListGroup>
                <CreateToDo token={token} tripId={tripId} onToDoCreated={handleToDoCreated}/>
            </div>
            </Card.Body>
            </Card >
            </Col>
            </Row>
            <Card style={{ width:'32rem' }}>
                <Card.Body>
            <div>
                <h3>Trip Itinerary:</h3>
                <button onClick={() => navigate(`/trips/${tripId}/createitinerary`)}>Add to Itinerary</button>
                <div>
                    {Object.keys(groupedItineraries).map((date) => (
                        <div key={date}>
                            <h4>{date}</h4>
                            {groupedItineraries[date].map((itinerary) => (
                                <Itinerary key={itinerary._id} itinerary={itinerary} token={token} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            </Card.Body>
            </Card>
            </Container>
        </>
    )
}