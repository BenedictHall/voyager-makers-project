import { useState } from "react";
import { toggleCompleteToDo, deleteToDo } from "../../services/todo";

export const ToDo = (props) => {
    const token = props.token;
    const toDoId = props.toDo._id;
    // const userId = localStorage.getItem("userId");
    const initialIsCompletedStatus = props.toDo.isCompleted;
    const [isCompleted, setIsCompleted] = useState(initialIsCompletedStatus);

    const handleToggleComplete = async () => {
        try {
            const data = await toggleCompleteToDo(token, toDoId);
            setIsCompleted(data.toDo.isCompleted);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteToDo = async () => {
        try {
            await deleteToDo(token, toDoId);
        } catch (err) {
            console.error(err);
        }
        window.location.reload();
    };

    return (
        <div>
            <h1>ToDo:</h1>
            <h2>{props.toDo.title}</h2>
            <p>{props.toDo.description}</p>
            <p>{props.toDo.dueDate}</p>
            <button onClick={handleToggleComplete}>{isCompleted ? "Mark Incomplete" : "Mark Complete"}</button>
            <button onClick={handleDeleteToDo}>Delete</button>
        </div>
    );
};