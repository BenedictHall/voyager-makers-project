const flightAPIService = require("../services/flightAPIService.js");

const getFlight = async (req,res) => {
    const {carrierCode, flightNumber, scheduledDepartureDate} = req.params;
    console.log("PARAMS: ", req.params)
    try {
        const data = await flightAPIService.getFlightData(carrierCode, flightNumber, scheduledDepartureDate);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: 'error fetching flight data'});
    }
};

const FlightsController = {
    getFlight: getFlight
};

module.exports = FlightsController;