const axios = require('axios');
const FLIGHT_API_KEY = require('dotenv');

const getFlightData = async (carrierCode, flightNumber, scheduledDepartureDate) => {
    try {
        console.log("trying to get flight data")
        console.log(FLIGHT_API_KEY)
        const response = await axios.get(`https://test.api.amadeus.com/v2/schedule/flights?carrierCode=${carrierCode}&flightNumber=${flightNumber}&scheduledDepartureDate=${scheduledDepartureDate}`, {
            headers: {
                'Authorization' : `Bearer ${process.env.FLIGHT_API_KEY}`
            }
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching flight data: ', error);
        throw error;
    }
};

module.exports = {getFlightData};