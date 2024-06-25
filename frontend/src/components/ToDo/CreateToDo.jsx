import { useState } from "react";
import { isDate } from "validator";
import { createToDo } from "../../services/todo";
import { useRef } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import Button from 'react-bootstrap/Button';

export const CreateToDo = (props) => {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const dueDateRef = useRef();
    const isCompleted = false;
    const tripId = props.tripId
    const userId = localStorage.getItem("userId");
    const token = props.token;
    const [error, setError] = useState("");
    const [createToDoClicked, setCreateToDoClicked] = useState(false);
    console.log(createToDoClicked, "is createToDoClicked")
    

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

    const handleCreate=() => {
        setCreateToDoClicked(!createToDoClicked);
    }

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
                <Button onClick={handleCreate}>Create</Button>
                {createToDoClicked ? (
                    <form onSubmit={handleSubmit}>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="title">Title</InputGroup.Text>
                        <Form.Control
                        id="Title"
                        ref={titleRef}
                        aria-describedby="title"
                        onSubmit={handleSubmit}
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="description">Description</InputGroup.Text>
                        <Form.Control
                        id="Description"
                        ref={descriptionRef}
                        aria-describedby="description"
                        />
                        </InputGroup>
                        <InputGroup className="mb-3">
                        <label htmlFor="dueDate">Due Date:</label>
                        <input
                            type="date"
                            id="dueDate"
                            ref={dueDateRef}
                            // value={dueDate}
                            // onChange={handleDueDateChange}
                        />
                        </InputGroup>
                    {error && <p role="error" className="error">{error}</p>}
                    <Button variant="secondary" type="submit" role="submit-button" onClick={createToDo}>Create ToDo</Button>
                    </form>
                ) : (<p></p>)}
        </div>
    );          
};