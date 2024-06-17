import { useNavigate } from "react-router-dom";
import { CreateItinerary } from "../../components/Itinerary/CreateItinerary";

export const CreateItineraryPage = () => {
    const token = localStorage.getItem("token");
    const tripId = "666c2470e3b00654ff076db8";
    const navigate = useNavigate();

    return (
        <>
            <h2>Create Itinerary</h2>
            <CreateItinerary token={token} tripId={tripId} />
        </>)
};