import { useState, useEffect } from "react";
import SingleTripItem from "../../components/Trip/SingleTripItem";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleTrip } from "../../services/trips";
import { getAllItineraries } from "../../services/itinerary";
import { Itinerary } from "../../components/Itinerary/Itinerary";
import { CreateToDo } from "../../components/ToDo/CreateToDo";
import { getAllToDos } from "../../services/todo";
import { ToDo } from "../../components/ToDo/ToDo";


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
                    setItineraries(data.itineraries);
                    localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                    navigate("/login");
                });
                console.log("HELLO");
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
                    navigate("/login");
                });
        }
    }, []);

    const handleToDoCreated = (newToDo) => {
        setToDos((prevToDos) => [newToDo, ...prevToDos]);
        window.location.reload();
    };

    return(
        <>
            <h3 data-testid="singleTripHeader">Your Trip</h3>
            <SingleTripItem data={tripInformation} />
            <div>
                <h3>Trip ToDo List:</h3>
                <CreateToDo token={token} tripId={tripId} onToDoCreated={handleToDoCreated}/>
                <div>
                    {toDos.filter((toDo) => {return toDo.tripId == tripId}).map((toDo) => (
                        <ToDo key={toDo._id} toDo={toDo} token={token} />   
                    ))}
                </div>
            </div>

            <div>
                <h3>Trip Itinerary:</h3>
                <button onClick={() => navigate(`/trips/${tripId}/createitinerary`)}>Add to Itinerary</button>
                <div>
                    {itineraries.filter((itinerary) => {return itinerary.tripId == tripId}).map((itinerary) => (
                        <Itinerary key={itinerary._id} itinerary={itinerary} token={token} />
                    ))}
                </div>
            </div>
        </>
    )
}