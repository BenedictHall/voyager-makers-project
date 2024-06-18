import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { trackNewFlight } from "../../services/flights";

export const TrackNewFlight = () => {
    const [formData, setFormData] = useState({
        carrierCode: '',
        flightNumber: '',
        departureDate: '',
    })
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {carrierCode, flightNumber, departureDate} = formData;
        const token = localStorage.getItem("token");
        try {
            await trackNewFlight(token, carrierCode, flightNumber, departureDate);
            navigate ("/flights");
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
        <h2>Track Flight</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="carrierCode">Carrier code:</label>
                <input
                    id="carrierCode"
                    type="text"
                    name ="carrierCode"
                    value={formData.carrierCode}
                    onChange={handleChange}
                />
            <label htmlFor="flightNumber">Flight Number: </label>
                <input
                    id="flightNumber"
                    type="text"
                    name ="flightNumber"
                    value={formData.flightNumber}
                    onChange={handleChange}
                />
            <label htmlFor="departureDate">Departure Date: </label>
                <input
                    id="departureDate"
                    type="date"
                    name ="departureDate"
                    value={formData.departureDate}
                    onChange={handleChange}
                />
                <input role="submit-button" id="submit" type="submit" value="Submit" />
        </form>
        </>
    );
};