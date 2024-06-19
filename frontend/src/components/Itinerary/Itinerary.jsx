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

    const formatDate = (date) => {
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString();
    };

    return (
        <div>
            {/* <p>{formatDate(props.itinerary.date)}</p> */}
            <p>{props.itinerary.startTime} - {props.itinerary.endTime}:  {props.itinerary.activity}</p>
            <button onClick={handleDeleteItinerary}>Delete</button>
        </div>
    );
};