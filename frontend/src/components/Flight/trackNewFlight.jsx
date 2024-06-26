import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { saveFlight, getFlightFromAPI } from "../../services/flights";
import {FlightAPICard} from "../../components/Flight/flightAPICard"

export const TrackNewFlight = () => {
    const [formData, setFormData] = useState({
        carrierCode: '',
        flightNumber: '',
        departureDate: '',
    })
    const [APIresponse, setAPIResponse] = useState([]);
    console.log("api response usestate",APIresponse);
    const navigate = useNavigate();
    const [myError, setMyError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMyError("")
        const {carrierCode, flightNumber, departureDate} = formData;
        try {
            const response = await getFlightFromAPI(carrierCode, flightNumber, departureDate)
            setAPIResponse(response);
            console.log("actual API response",response);
            
        } catch (err) {
            console.log(err);
            setMyError(err);
            throw new Error("Could not get flight data from external API");
        }
    };

    const handleSave = async (event) => {
        event.preventDefault();
        // const {carrierCode, flightNumber, departureDate} = formData;
        const token = localStorage.getItem("token");
        const airline = APIresponse[0].airline;
        const airlineCode = APIresponse[0].airlineCode;
        const flightNumber = APIresponse[0].flightNumber;
        const flightDuration = APIresponse[0].segments[0].flightDuration;
        const departureAirport = APIresponse[0].segments[0].departureAirport;
        const arrivalAirport = APIresponse[0].segments[0].arrivalAirport;
        const departureDate = formData.departureDate;
        // const segments = APIresponse[0].segments;
        try {
            await saveFlight(token, airline, airlineCode, flightNumber, flightDuration, departureAirport, arrivalAirport, departureDate);
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
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h2>Track New Flight</h2>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="carrierCode">Carrier code:</label>
                                <input
                                    id="carrierCode"
                                    type="text"
                                    name ="carrierCode"
                                    value={formData.carrierCode}
                                    onChange={handleChange}
                                />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="flightNumber">Flight Number: </label>
                                <input
                                    id="flightNumber"
                                    type="text"
                                    name ="flightNumber"
                                    value={formData.flightNumber}
                                    onChange={handleChange}
                                />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="departureDate">Departure Date: </label>
                                <input
                                    id="departureDate"
                                    type="date"
                                    name ="departureDate"
                                    value={formData.departureDate}
                                    onChange={handleChange}
                                />
                        </div>
                        <input role="submit-button" id="submit" type="submit" value="Submit" />
                    </form>
                    <div>
                    {myError !== "" && (
                        <p>Could not get data from external API</p>
                    )}
                    {APIresponse.length !== 0 && (
                        <div>
                            <h3>Flight information</h3>
                                <FlightAPICard flight={APIresponse}/>
                                <button role="save-button" id="save" type="save" value="Save" onClick={handleSave}> Save </button>
                        </div>
                    )}
                    </div>
                    </div>
                </div>
            </div>
        </>
    );
};