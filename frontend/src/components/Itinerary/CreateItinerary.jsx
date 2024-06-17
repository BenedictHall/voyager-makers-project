import {  useState } from "react";
// import { useNavigate } from "react-router-dom";
import { createItinerary } from "../../services/itinerary";
import { useRef } from "react";
import { isDate } from "validator";

export const CreateItinerary = (props) => {
    const token = props.token;
    const tripId = props.tripId;
    const activityRef = useRef();
    const dateRef = useRef();
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [error, setError] = useState("");
    // const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();

        let activity = activityRef.current.value;
        let date = dateRef.current.value;
        const startDateTime = new Date(date);
        const [startHour, startMinute] = startTime.split(':').map(Number);
        startDateTime.setHours(startHour, startMinute);

        const endDateTime = new Date(date);
        const [endHour, endMinute] = endTime.split(':').map(Number);
        endDateTime.setHours(endHour, endMinute);

        if (activity.length < 1) {
            setError("Please enter an activity.");
            return;
        }

        if (!isDate(date)) {
            setError("Please enter a valid date.");
            return;
        }

        const activityDateObject = new Date(date);
        const now = new Date();
        if (activityDateObject < now) {
            setError("Please enter a future date.");
            return;
        }

        if (startDateTime > endDateTime) {
            setError("Please enter a valid time range.");
            return;
        }

        try {
            // console.log("date!!!!!: ", date);
            // console.log("startDateTime!!!!!: ", startDateTime);
            // console.log("endDateTime!!!!!: ", endDateTime);
            // console.log("startTime!!!!!: ", startTime);
            // console.log("endTime!!!!!: ", endTime);
            await createItinerary(token, activity, date, startTime, endTime, tripId);
            activityRef.current.value = "";
            dateRef.current.value = "";
            setStartTime("");
            setEndTime("");
            setError("");
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again later.");
        }

    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Activity</label>
                <input type="text" id="activity" role="activity" ref={activityRef} />
            </div>
            <div>
                <label>Date:</label>
                <input type="date" id="date" role="date" ref={dateRef} />
            </div>
            <div>
                <label>Start Time:</label>
                <input type="time" id="startTime" role="start-time" value={startTime} onChange={handleStartTimeChange} />
            </div>
            <div>
                <label>End Time:</label>
                <input type="time" id="endTime" role="end-time" value={endTime} onChange={handleEndTimeChange} />
            </div>
            {error && <p role="error" className="error">{error}</p>}
            <button type="submit" role="submit-button">Create Itinerary</button>
        </form>
    );

};