import { useState } from "react";
import { isDate } from "validator";
import { createToDo } from "../../services/todo";
import { useRef } from "react";

export const CreateToDo = (props) => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();
    // const [description, setDescription] = useState("");
    // const [dueDate, setDueDate] = useState("");
    const isCompleted = false;
    const tripId = props.tripId
    const userId = localStorage.getItem("userId");
    const token = props.token;
    const [error, setError] = useState("");
    console.log("!!!!!token: ", token);
    

    const handleSubmit = async (event) => {
        event.preventDefault();
        let title = titleRef.current.value;
        let description = descriptionRef.current.value;
        let dueDate = dueDateRef.current.value;
        if (title.length < 1) {
            setError("Please enter a title.");
            return;
        }
        if (description.length < 1) {
            setError("Please enter a description.");
            return;
        }
        if (!isDate(dueDate)) {
            setError("Please enter a valid due date.");
            return;
        }

        const dueDateObj = new Date(dueDate);
        const now = new Date();
        if (dueDateObj < now) {
            setError("Please enter a future date.");
            return;
        }
        

        try {
            const newToDo = await createToDo(token, title, description, dueDate, isCompleted, tripId, userId);
            props.onToDoCreated(newToDo);
            // setTitle("");
            titleRef.current.value = "";
            descriptionRef.current.value = "";
            dueDateRef.current.value = "";
            setError("");
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again later.");
        }
    };

    // const handleTitleChange = (event) => {
    //     setTitle(event.target.value);
    // };

    // const handleDescriptionChange = (event) => {
    //     setDescription(event.target.value);
    // };

    // const handleDueDateChange = (event) => {
    //     setDueDate(event.target.value);
    // };

    return (
        <div>
            <h1>Create ToDo</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        ref={titleRef}
                        // value={title}
                        // onChange={handleTitleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        ref={descriptionRef}
                        // value={description}
                        // onChange={handleDescriptionChange}
                    />
                </div>
                <div>
                    <label htmlFor="dueDate">Due Date:</label>
                    <input
                        type="date"
                        id="dueDate"
                        ref={dueDateRef}
                        // value={dueDate}
                        // onChange={handleDueDateChange}
                    />
                </div>
                {error && <p role="error" className="error">{error}</p>}
                <button type="submit" role="submit-button">Create ToDo</button>
            </form>
        </div>
    );          
};