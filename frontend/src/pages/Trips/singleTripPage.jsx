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
        const navigate = useNavigate();
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
        const navigate = useNavigate();
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

    return(
        <>
            <h3 data-testid="singleTripHeader">Your Trip</h3>
            <SingleTripItem data={tripInformation} />
            <div>
                <button onClick={() => navigate(`/trips/${tripId}/budget`)}>Budget</button>
            </div>
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
                    {Object.keys(groupedItineraries).map((date) => (
                        <div key={date}>
                            <h4>{date}</h4>
                            {groupedItineraries[date].map((itinerary) => (
                                <Itinerary key={itinerary._id} itinerary={itinerary} token={token} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}