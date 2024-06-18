import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { Trip } from "../../components/Trip/trip";
import { getTrips } from "../../services/trips"


export const ShowAllTrips = () => {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    useEffect(()=> {
        const token = localStorage.getItem("token");
        if(token) {
            getTrips(token)
            .then((data) => {
                setTrips(data.trips);
                localStorage.setItem("token", data.token);
            })
            .catch((error)=>{
                console.error(error);
                navigate("/")
            });
        }
    }, [navigate]);
    
    const token = localStorage.getItem("token");
    if(!token) {
        navigate("/");
        return;
    }

    return (
        <>
            <h2>show all my trips</h2>
            <div> 
                {trips.map((trip)=>(
                    <Trip trip={trip} token={token} key={trip._id}/>
                ))}
            </div>

        </>
    );
};