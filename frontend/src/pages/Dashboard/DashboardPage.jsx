import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateToDo } from "../../components/ToDo/CreateToDo";
import { getAllToDos } from "../../services/todo";
import { ToDo } from "../../components/ToDo/ToDo";


export const DashboardPage = () => {
    const token = localStorage.getItem("token");
    const tripId = "666ac35161b167f06308d3f3";
    const navigate = useNavigate();
    const [toDos, setToDos] = useState([]);

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
    
    if (!token) {
        navigate("/login");
    }

    const handleToDoCreated = (newToDo) => {
        setToDos((prevToDos) => [newToDo, ...prevToDos]);
        window.location.reload();
    };

    return (
        <>
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard</p>
            <CreateToDo token={token} tripId={tripId} onToDoCreated={handleToDoCreated}/>
            <h2>My Todo List:</h2>
            <div>
                {toDos.map((toDo) => (
                    <ToDo key={toDo._id} toDo={toDo} token={token} />
                ))}
            </div>
        </>
    );
};
