import { useState } from "react";
import { toggleCompleteToDo, deleteToDo } from "../../services/toDo";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export const ToDo = (props) => {
    const token = props.token;
    const toDoId = props.toDo._id;
    // const userId = localStorage.getItem("userId");
    const initialIsCompletedStatus = props.toDo.isCompleted;
    const [isCompleted, setIsCompleted] = useState(initialIsCompletedStatus);


    const handleToggleComplete = async () => {
        try {
            const data = await toggleCompleteToDo(token, toDoId);
            setIsCompleted(data.toDo.isCompleted);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteToDo = async () => {
        try {
            await deleteToDo(token, toDoId);
        } catch (err) {
            console.error(err);
        }
        window.location.reload();
    };

    const formatDate = (date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString();
    };

    return (
            <Container>
                <Row>
                    <Col>
                        <h5>{props.toDo.title}</h5>
                        <p>{props.toDo.description}</p>
                    </Col>
                    <Col>
                        <p>{formatDate(props.toDo.dueDate)}</p>
                        <Container><Row>
                        <Col>
                        <Button variant="secondary" onClick={handleToggleComplete}>{isCompleted ? "Mark Incomplete" : "Mark Complete"}</Button>
                        </Col>
                        <Col>
                        <Button variant="secondary" onClick={handleDeleteToDo}>Delete</Button>
                        </Col>
                        </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
    );
};