import { deleteItinerary } from "../../services/itinerary";

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

    return (
        <div>
            <h2>{props.itinerary.activity}</h2>
            <p>{props.itinerary.date}</p>
            <p>{props.itinerary.startTime} - {props.itinerary.endTime}</p>
            <button onClick={handleDeleteItinerary}>Delete</button>
        </div>
    );
};