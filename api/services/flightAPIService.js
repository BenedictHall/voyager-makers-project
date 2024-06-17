const axios = require('axios');
const FLIGHT_API_KEY = require('dotenv');

const getFlightData = async (carrierCode, flightNumber, scheduledDepartureDate) => {
    try {
        const response = await axios.get(`https://test.api.amadeus.com/v2/schedule/flights?carrierCode=${carrierCode}&flightNumber=${flightNumber}&scheduledDepartureDate=${scheduledDepartureDate}`, {
            headers: {
                'Authorization' : `Bearer ${process.env.FLIGHT_API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching flight data: ', error);
        throw error;
    }
};

const getAirlineName = async (airlineCodes) => {
    try {
        const response = await axios.get(`https://test.api.amadeus.com/v1/reference-data/airlines?airlineCodes=${airlineCodes}`, {
            headers: {
                'Authorization' : `Bearer ${process.env.FLIGHT_API_KEY}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching airline data: ', error);
        throw error;
    }
};

module.exports = {getFlightData, getAirlineName};