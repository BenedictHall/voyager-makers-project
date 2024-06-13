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
        flightNumber: '',
        accommodation: '',
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

    const handleFlightChange = (event) => {
        const {value} = event.target;
        setFormData({
            ...formData,
            flight: value
        })
    }

    const handleAccommodationChange = (event) => {
        const {value} = event.target;
        setFormData({
            ...formData,
            accommodation: value
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
            <input type="radio" id="flight-yes" name="option" value="yes" onChange={handleFlightChange}/>
            <label htmlFor="yes">Yes</label><br/>
            
            <input type="radio" id="flight-no" name="option" value="no" onChange={handleFlightChange}/>
            <label htmlFor="no">No</label><br/>
            {formData.flight === "yes" &&
                <div>
                <label htmlFor="flightNumber">Flight Number:</label>
                <br/>
                <input
                id="flightNumber"
                type="text"
                name ="flightNumber"
                value={formData.flightNumber}
                onChange={handleChange}
                />
                <br/>
                </div>}
            {/* HERE WE NEED TO AUTOMATICALLY CREATE A TODO IF NO */}

            <label htmlFor="accommodation">Have you booked accommodation?</label>
            <br/>
            <input type="radio" id="accommodation-yes" name="option" value="yes" onChange={handleAccommodationChange}/>
            <label htmlFor="yes">Yes</label><br/>
            
            <input type="radio" id="accommocation-no" name="option" value="no" onChange={handleAccommodationChange}/>
            <label htmlFor="no">No</label><br/>
            {formData.accommodation === "yes" &&
                <div>
                <label htmlFor="accommodation-address">Address:</label>
                <br/>
                <input
                id="accommodation-address"
                type="text"
                name ="accommodation-address"
                value={formData.accommodation}
                onChange={handleChange}
                />
                <br/>
                </div>}
            {/* HERE WE NEED TO AUTOMATICALLY CREATE A TODO IF NO */}
                
                
                <input role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
        </>
    );
};