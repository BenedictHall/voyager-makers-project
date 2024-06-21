import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllToDos } from "../../services/toDo";
import { ToDo } from "../../components/ToDo/ToDo";
import { Trip } from "../../components/Trip/Trip";
import { getTrips } from "../../services/trips";


export const DashboardPage = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [toDos, setToDos] = useState([]);
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        if (token) {
            getAllToDos(token)
                .then((data) => {
                    setToDos(data.toDos.slice(0, 3));
                    localStorage.setItem("token", data.token);
                })
                .catch((err) => {
                    console.error(err);
                    navigate("/login");
                });
        }
    }, []);

    useEffect(()=> {
        const token = localStorage.getItem("token");
        if(token) {
            getTrips(token)
            .then((data) => {
                const sortedTrips = data.trips.sort((a, b) => a.startDate.localeCompare(b.startDate)).slice(0, 3);
                setTrips(sortedTrips);
                localStorage.setItem("token", data.token);
            })
            .catch((error)=>{
                console.error(error);
                navigate("/")
            });
        }
    }, []);
    
    if (!token) {
        navigate("/login");
    }

    return (
        <>
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard</p>
            <h2>Upcoming Trips:</h2>
            <div>
                {trips.map((trip) => (
                    <Trip key={trip._id} trip={trip} token={token} />
                ))}
            </div>
            <h2>Upcoming ToDo&lsquo;s:</h2>
            <div>
                {toDos.map((toDo) => (
                    <ToDo key={toDo._id} toDo={toDo} token={token} />
                ))}
            </div>
        </>
    );
};
