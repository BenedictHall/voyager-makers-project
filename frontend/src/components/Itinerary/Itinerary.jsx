import { deleteItinerary } from "../../services/itinerary";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

export const Itinerary = (props) => {
    const token = props.token;
    const itineraryId = props.itinerary._id;

    const handleDeleteItinerary = async () => {
        try {
            await deleteItinerary(token, itineraryId);
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
                    <p>{props.itinerary.startTime} - {props.itinerary.endTime}:  {props.itinerary.activity}</p>
                </Col>
                <Col>
                    <Button variant="secondary" onClick={handleDeleteItinerary}>Delete</Button>
                </Col>
            </Row>
        </Container>
    );
};