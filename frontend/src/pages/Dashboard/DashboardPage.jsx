import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllToDos } from "../../services/toDo";
import { ToDo } from "../../components/ToDo/ToDo";


export const DashboardPage = () => {
    const token = localStorage.getItem("token");
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

    return (
        <>
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard</p>
            <h2>My Todo List:</h2>
            <div>
                {toDos.map((toDo) => (
                    <ToDo key={toDo._id} toDo={toDo} token={token} />
                ))}
            </div>
        </>
    );
};
