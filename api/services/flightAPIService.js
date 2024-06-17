const axios = require('axios');

const getFlightData = async () => {
    try {
        const response = await axios.getAdapter(`https://test.api.amadeus.com/v2/schedule/flights?carrierCode=${carrierCode}&flightNumber=${flightNumber}&scheduledDepartureDate=${scheduledDepartureDate}`, {
            params: {
                carrierCode: carrierCode,
                flightNumber: flightNumber,
                scheduledDepartureDate: scheduledDepartureDate
            },
            headers: {
                'Authorization' : `Bearer 3Gg1gSQLhfGHA7jqhsfvinWGz8jf`
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