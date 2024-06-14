import { useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import {newTrip} from "../../services/trips"


export const AddNewTrip = () => {
// fields go here
    const [formData, setFormData] = useState({
        location: '',
        startDate: '',
        endDate: '',
    })
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {location, startDate, endDate} = formData;
        const token = localStorage.getItem("token");
        try {
            await newTrip(token, location, startDate, endDate);
            navigate ("/trips");
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
        {/* <Navbar/> */}
        <h2>Add New Trip</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="location">Location:</label>
                <input
                    id="location"
                    type="text"
                    name ="location"
                    value={formData.location}
                    onChange={handleChange}
                />
            <label htmlFor="startDate">Start Date: </label>
                <input
                    id="startDate"
                    type="date"
                    name ="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />
            <label htmlFor="endDate">End Date: </label>
                <input
                    id="endDate"
                    type="date"
                    name ="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                />
                <input role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
        </>
    );
};