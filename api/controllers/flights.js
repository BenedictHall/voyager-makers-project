const flightAPIService = require("../services/flightAPIService.js");
const dateFormatting = require("../utils/dateFormatting.js");
const IATAtoCity = require("../data/IATAtoCity.js")

const getAirline = async (req, res) => {
    const airlineCodes = req.params.airlineCodes;
    try {
        const data = await flightAPIService.getAirlineName(airlineCodes);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: 'error fetching flight data', error});
    }
}

const getFlight = async (req,res) => {
    const {carrierCode, flightNumber, scheduledDepartureDate} = req.params;

    try {
        const data = await flightAPIService.getFlightData(carrierCode, flightNumber, scheduledDepartureDate);
        const numberOfFlights = data.data.length;
        const flightData = [];
        for (let i=0; i<numberOfFlights; i++) {
            const airlineCode = data.data[i].flightDesignator.carrierCode;
            const airlineData = await flightAPIService.getAirlineName(airlineCode);
            const airline = airlineData.data[0].commonName;

            const flightNumberResponse = data.data[i].flightDesignator.flightNumber;
            let segments = [];
            for (let n=0; n<data.data[i].segments.length; n++) {
                const departureAirportIATA = data.data[i].segments[n].boardPointIataCode;
                const arrivalAirportIATA = data.data[i].segments[n].offPointIataCode;
                console.log(departureAirportIATA, arrivalAirportIATA);
                const departureAirport = IATAtoCity(departureAirportIATA);
                const arrivalAirport = IATAtoCity(arrivalAirportIATA);
                console.log(departureAirport, arrivalAirport)

                const carrierCode = data.data[i].segments[n].partnership.operatingFlight.carrierCode;
                const carrierData = await flightAPIService.getAirlineName(carrierCode);
                const carrier = carrierData.data[0].commonName;
                const segmentFlightNumber = data.data[i].segments[n].partnership.operatingFlight.flightNumber;

                const flightDurationISO = data.data[i].segments[n].scheduledSegmentDuration;
                const flightDuration = dateFormatting(flightDurationISO)

                segments.push({
                    "departureAirport":departureAirport,
                    "arrivalAirport":arrivalAirport,
                    "flightDuration":flightDuration,
                    "carrier" : carrier,
                    "segmentFlightNumber" : segmentFlightNumber
                });
            }
            flightData.push({
                "airline" : airline,
                "airlineCode" : airlineCode,
                "flightNumber" : flightNumberResponse,
                "segments" : segments});
        }

        res.status(200).json(flightData)
    } catch (error) {
        res.status(500).json({message: 'error fetching flight data', error});
    }
};

const FlightsController = {
    getFlight: getFlight,
    getAirline: getAirline
};

module.exports = FlightsController;