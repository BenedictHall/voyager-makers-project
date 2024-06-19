import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { saveFlight, getFlightFromAPI } from "../../services/flights";
import {Flight} from "../Flight/flight"

export const TrackNewFlight = () => {
    const [formData, setFormData] = useState({
        carrierCode: '',
        flightNumber: '',
        departureDate: '',
    })
    const [APIresponse, setAPIResponse] = useState([]);
    console.log("api response usestate",APIresponse);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const {carrierCode, flightNumber, departureDate} = formData;
        try {
            const response = await getFlightFromAPI(carrierCode, flightNumber, departureDate)
            setAPIResponse(response);
            console.log("actual API response",response);
            
        } catch (err) {
            console.log(err);
            throw new Error("Could not get flight data from external API");
        }
        // const token = localStorage.getItem("token");
        // try {
        //     await saveFlight(token, carrierCode, flightNumber, departureDate);
        //     navigate ("/flights");
        // } catch (err) {
        // console.error(err);
        // // add a redirect here
        // }
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
            <div>
            {APIresponse.length !== 0 && (
                <div>
                    <h3>Flight information</h3>
                        <Flight flight={APIresponse}/>
                </div>
            )}
            {APIresponse.length === 0 && (<p>No results recieved yet.</p>)}
            </div>
        </>
    );
};