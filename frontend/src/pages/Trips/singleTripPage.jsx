import { useState, useEffect } from "react";
import SingleTripItem from "../../components/Trip/SingleTripItem";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleTrip } from "../../services/trips";
import { getAllItineraries } from "../../services/itinerary";
import { Itinerary } from "../../components/Itinerary/Itinerary";
import { CreateToDo } from "../../components/ToDo/CreateToDo";
import { getAllToDos } from "../../services/todo";
import { ToDo } from "../../components/ToDo/ToDo";
import { CreateItinerary } from "../../components/Itinerary/CreateItinerary.jsx";
import {AddBudgetForm} from "../../components/Budget/BudgetForm.jsx"
import {BudgetItem} from "../../components/Budget/BudgetItem.jsx"
import { getBudgets } from "../../services/budget"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';



export function SingleTripPage () {
    const [ tripInformation, setTripInformation ] = useState(null);
    let { tripId } = useParams();
    const navigate = useNavigate();
    const [itineraries, setItineraries] = useState([]);
    const [toDos, setToDos] = useState([]);
    const [addClicked, setAddClicked] = useState(false);
    const [budgets, setBudgets] = useState([]);
    const [addBudgetClicked, setAddBudgetClicked] = useState(false);
    console.log("budget clicked? ", addBudgetClicked);

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

    const handleAddClicked = () => {
        setAddClicked(!addClicked);
    }

    const handleAddBudgetClicked = () => {
        setAddBudgetClicked(!addClicked)
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {

            getBudgets(token)
                .then((data) => {
                    // console.log('this is data', data)
                    setBudgets(data.budgets.filter((budget) => {return budget.tripId == tripId}));
                    localStorage.setItem("token", data.token);
                })
                .catch((error) => {
                    console.error("Failed to fetch budgets:", error);
                });
        }
    }, []);

    const handleBudgetCreated = (newBudget) => {
        setBudgets((prevBudgets) => [newBudget, ...prevBudgets]);
        window.location.reload();
    };

    return(
        <>
            <div style={{ overflow: 'hidden', height: '300px', width: '100%', position: 'relative' }}>
            <Image src="../../../../public/david-vives-ELf8M_YWRTY-unsplash.jpg" fluid style={{
                    width: '100%',
                    height: 'auto',
                    position: 'absolute',
                    top: '10%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}/>;
            </div>
            <div data-testid="singleTripHeader"><SingleTripItem data={tripInformation} /></div>
            <Container>
            <Row>
            <Col xs={6}>
            <Card style={{ width: '32rem'}}>
            <Card.Body>
                <div className="InnerLayout">
                <h3>Budgets</h3>
                <div >
                    <ListGroup>
                    {budgets && budgets.length > 0 ? (
                        budgets.map((budget)=>(
                        <BudgetItem token={token} key={budget._id} budget={budget}/>
                    ))
                    
                    ): (
                    <p>No budgets to display.</p>
                    )} 
                    </ListGroup>
                </div>
                <Button onClick = {handleAddBudgetClicked}>Add budget</Button>
                {addBudgetClicked ? (<AddBudgetForm tripId={tripId} onBudgetCreated={handleBudgetCreated}/>) : (<p></p>)}
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
                <h3>Trip Itinerary</h3>
                
                    {Object.keys(groupedItineraries).map((date) => (
                        <ListGroup>
                        <div key={date}>
                            <h6>{date}</h6>
                            
                            {groupedItineraries[date].map((itinerary) => (
                                <ListGroup.Item>
                                <Itinerary key={itinerary._id} itinerary={itinerary} token={token} />
                                </ListGroup.Item>
                            ))}
                            
                        </div>
                        </ListGroup>
                    ))}
                    <Button onClick = {handleAddClicked}>Add</Button>
                {addClicked ? (
                    <div>
                    <CreateItinerary token={token} tripId={tripId} />
                    <a href={`/trips/${tripId}`}>Back to Trip</a>
                    </div>

                    ) : (<p></p>)}
                </div>
                
                

            </Card.Body>
            </Card>
            </Container>
        </>
    )
}