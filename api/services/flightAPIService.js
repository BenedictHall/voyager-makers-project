const axios = require('axios');

const getFlightData = async () => {
    try {
        const response = await axios.getAdapter('https://test.api.amadeus.com/v1/shopping/flight-destinations?origin=PAR&maxPrice=200', {
            headers: {
                'Authorization' : `Bearer ubWDWKcdKEuR6mp1612Dv7g5tR3l`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching flight data: ', error);
        throw error;
    }
};

module.exports = {getFlightData};