import { useParams } from "react-router-dom";
import { CreateItinerary } from "../../components/Itinerary/CreateItinerary";

export const CreateItineraryPage = () => {
    const token = localStorage.getItem("token");
    let { tripId } = useParams();


    return (
        <>
            <h2>Create Itinerary</h2>
            <CreateItinerary token={token} tripId={tripId} />
            <a href={`/trips/${tripId}`}>Back to Trip</a>
        </>)
};