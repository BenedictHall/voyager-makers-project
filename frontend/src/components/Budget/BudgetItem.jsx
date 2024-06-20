import moment from 'moment'
import { deleteBudget, calculateRemainingBudget } from '../../services/budget'
import { useParams } from "react-router-dom";
import { useState , useEffect} from "react"

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';


export function BudgetItem (props) {
    const token = props.token;
    const budgetId = props.budget._id;
    const amount = props.budget.amount;
    const title = props.budget.title;
    let tripId = useParams().tripId;
    const [remaining, setRemaining] = useState(0);
    

    
    const handleDeleteBudget = async () => {
        try {
            await deleteBudget(token, budgetId);
        } catch (err) {
            console.error(err);
        }
        window.location.reload();
    }

    useEffect(() => {
        if (token) {

            calculateRemainingBudget(token, budgetId)
                .then((data) => {
                    setRemaining(data.remainingBudget);
                    localStorage.setItem("token", data.token);
                })
                .catch((error) => {
                    console.error("Failed to fetch budgets:", error);
                });
        }
    }, []);
    
    return(
        <>
            <ListGroup.Item>
            <Container>
            <Row>
                
            <Col><h5>{title}</h5></Col>
                
            <Col><p>Total: £{amount}</p></Col>
            <Col><p>Remaining: £{remaining} </p></Col>
            <Col><a href={`/trips/${tripId}/budget/${budgetId}`}><Button variant="secondary">View</Button></a>
            <Button variant="secondary" onClick={handleDeleteBudget}>Delete</Button>
            </Col>


                
                </Row>
                </Container>
                </ListGroup.Item>
        </>
    )
}

export default BudgetItem