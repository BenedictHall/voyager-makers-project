import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {newTrip} from "../../services/trips"

export const AddNewTrip = () => {
// fields go here
    const [formData, setFormData] = useState({
        location: '',
        startDate: '',
        endDate: '',
        flight: '',
    })
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {location, startDate, endDate} = formData;
        const token = localStorage.getItem("token");
        try {
            await newTrip(token, location, startDate, endDate);
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

    const handleOptionChange = (event) => {
        const {value} = event.target;
        setFormData({
            ...formData,
            flight: value
        })
    }


    return (
        <>
        <h2>Add New Trip</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="location">Location:</label>
            <br/>
                <input
                    id="location"
                    type="text"
                    name ="location"
                    value={formData.location}
                    onChange={handleChange}
                />
                <br/>
            <label htmlFor="startDate">Start Date: </label>
            <br/>
                <input
                    id="startDate"
                    type="date"
                    name ="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                />
                <br/>
            <label htmlFor="endDate">End Date: </label>
            <br/>
                <input
                    id="endDate"
                    type="date"
                    name ="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                />
                <br/>
            <label htmlFor="flight">Have you booked a flight?</label>
            <br/>
            <input type="radio" id="yes" name="option" value="yes" onChange={handleOptionChange}/>
            <label htmlFor="yes">Yes</label><br/>
            <input type="radio" id="no" name="option" value="no" onChange={handleOptionChange}/>
            <label htmlFor="no">No</label><br/>
            
                
                
                <input role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
        </>
    );
};