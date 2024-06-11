import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {newTrip} from "../../services/trips"

export const AddNewTrip = () => {
// fields go here
    const [formData, setFormData] = useState({
        location: '',
        startDate: '',
        endDate: ''
    })
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await newTrip(location, startDate, endDate);
            navigate ("/trip/:id");
        } catch (err) {
        console.error(err);
        // add a redirect here
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };


    return (
        <>
        <h2>Add New Trip</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="location">Location:</label>
            <input
            id="location"
            type="text"
            value={location}
            onChange={handleChange}
            />
            <label htmlFor="startDate">Start Date: </label>
            <input
            id="startDate"
            type="text"
            value={startDate}
            onChange={handleChange}
            />
            <label htmlFor="endDate">End Date: </label>
            <input
            id="endDate"
            type="text"
            value={endDate}
            onChange={handleChange}
            />
            <input role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
        </>
    );
};