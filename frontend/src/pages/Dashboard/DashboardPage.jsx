import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllToDos } from "../../services/toDo";
import { ToDo } from "../../components/ToDo/ToDo";
import { Trip } from "../../components/Trip/Trip";
import { getTrips } from "../../services/trips";
import {getTrackedFlights } from "../../services/flights"
import {FlightDBCard} from "../../components/Flight/flightDBCard";
import ExpenseItem from "../../components/Expense/ExpenseItem"
import { getExpenses } from "../../services/expense"
import { useParams } from "react-router-dom";
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto'

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup'
import Card from 'react-bootstrap/Card';


export const DashboardPage = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [toDos, setToDos] = useState([]);
    const [trips, setTrips] = useState([]);
    const [flights, setFlights] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        if (token) {
            getAllToDos(token)
                .then((data) => {
                    setToDos(data.toDos.slice(0, 3));
                    localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                    navigate("/login");
                });
        }
    }, []);

    useEffect(()=> {
        const token = localStorage.getItem("token");
        if(token) {
            getTrips(token)
            .then((data) => {
                const sortedTrips = data.trips.sort((a, b) => a.startDate.localeCompare(b.startDate)).slice(0, 3);
                setTrips(sortedTrips);
                localStorage.setItem("token", data.token);
            })
            .catch((error)=>{
                console.error(error);
                navigate("/")
            });
        }
    }, []);
    
    if (!token) {
        navigate("/login");
    }

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

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {

            getExpenses(token)
                .then((data) => {
                    setExpenses(data.expenses);
                    localStorage.setItem("token", data.token);
                })
                .catch((error) => {
                    console.error("Failed to fetch expenses:", error);
                });
        }
    }, []);

    const aggregateExpensesByCategory = () => {
        const categoryTotals = {};
        expenses.forEach(expense => {
            const category = expense.category;
            if (categoryTotals[category]) {
                categoryTotals[category] += expense.amount;
            } else {
                categoryTotals[category] = expense.amount;
            }
        });
        return categoryTotals;
    };

    const categoryTotals = aggregateExpensesByCategory();
    const chartData = {
        labels: Object.keys(categoryTotals),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(categoryTotals),
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                    '#FF6633',
                    '#FF33FF',
                    '#33FF33',
                    // Add more colors if there are more categories
                ],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
        },
        layout: {
            padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
            },
        },
    };

    const navigateNewTrip = () => {
        navigate("../trips/newtrip")
    }

    const navigateTrips = () => {
        navigate("/trips")
    }

    const navigateFlight = () => {
        navigate("/flights")
    }

    return (
        <>
            <h1>At a glance</h1>
            <div style={{height:'50px'}}/>
            <h2>Upcoming Trips:</h2>
            
                <Container>
                    <Row>
                    <Col>
                        <Card id = "trip-card" style={{width: "18rem", height: "21rem"}} >
                            <Card.Img id = "trip-card-image" variant="top" src="../../../../public/plus.png" style = {{width: "50px", margin: "0 auto", padding:"3rem"}}/>
                            <Card.Body>
                                <Card.Title>
                                
                                    <h4>Add new trip</h4>
                                </Card.Title>
                                <Button variant="primary" onClick={navigateNewTrip}>Create</Button>
                                </Card.Body>
                        </Card>
                        </Col>
                        {trips.map((trip) => (
                            <Col sm key={trip._id}>
                                <Trip style={{ width: '18rem' }} trip={trip} token={token} />
                            </Col>
                        ))}
                        </Row>
                        <Row>
                        <Button variant="secondary" style={{width: "10rem", margin: "0 auto"}}onClick={navigateTrips}>View all</Button>
                        </Row>
                    <div style={{height:'50px'}}/>
                    <Row>
                        
                        <Col>
            <h2>What to do next</h2>
                    <ListGroup>
                    {toDos.map((toDo) => (
                        <ListGroup.Item>
                            <ToDo key={toDo._id} toDo={toDo} token={token} /> 
                        </ListGroup.Item>  
                    ))}
                </ListGroup>
                </Col>
                <Col>
                <div>

                
                <h2>Your next flight</h2>
                <div>
                    {flights.slice(0,1).map((flight)=> (
                        <FlightDBCard flight={flight} token={token} key={flight._id}/>
                    ))}
                </div>
                <Button variant="secondary" style={{width: "10rem", margin: "0 auto"}}onClick={navigateFlight}>View all</Button>
                
            </div>
            {/* <Button onClick={nagivateFlight}>View all</Button> */}
            </Col>

                </Row>
                <div style={{height:'50px'}}/>
                <Row>
                    <h2>Your purchases</h2>
                    <div>
                    <Col>
                    {expenses && expenses.length > 0 && (
                        <div >
                            <Pie data={chartData} options={chartOptions}/>
                        </div>
                    )}
                    </Col>
                    
                    </div>
                    <Col>
                    <div >
                        <ListGroup>
                        {expenses && expenses.length > 0 ? (
                            expenses.slice(0,3).map((expense)=>(
                            <ListGroup.Item>
                            <ExpenseItem 
                            expense={expense}
                            token={token}
                            key={expense._id}
                            title={expense.title}
                            amount={expense.amount}
                            date={expense.date}
                            description={expense.description}
                            // deleteItem={deleteBudget}
                            />
                        </ListGroup.Item>
                        ))
                        ): (
                        <p>No expenses to display.</p>
                        
                        )} 
                        </ListGroup>
                        
                    </div>
                    </Col>
                    
                </Row>
                </Container>
            
        </>
    );
};
