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

// {
//     "meta": {
//         "count": 1, // how many flights in the data
//         "links": {
//             "self": "https://test.api.amadeus.com/v2/schedule/flights?carrierCode=KL&flightNumber=1772&scheduledDepartureDate=2024-11-07"
//         }
//     },
//     "data": [
//         {
//             "type": "DatedFlight",
//             "scheduledDepartureDate": "2024-11-07",
//             "flightDesignator": {
//                 "carrierCode": "KL", //airline
//                 "flightNumber": 1772 //flight number
//             },
//             "flightPoints": [ //array of the different flight points
//                 {
//                     "iataCode": "BER", //IATA airport code
//                     "departure": { //for departure
//                         "timings": [
//                             {
//                                 "qualifier": "STD",
//                                 "value": "2024-11-07T10:10+01:00" //scheduled departure time
//                             }
//                         ]
//                     }
//                 },
//                 {
//                     "iataCode": "AMS", //arrival airport
//                     "arrival": {
//                         "timings": [
//                             {
//                                 "qualifier": "STA",
//                                 "value": "2024-11-07T11:35+01:00" //scheduled arrival time
//                             }
//                         ]
//                     }
//                 }
//             ],
//             "segments": [ // array for segments of the flight (just one in this example)
//                 {
//                     "boardPointIataCode": "BER",
//                     "offPointIataCode": "AMS",
//                     "scheduledSegmentDuration": "PT1H25M", //iso 8601 format - duration of segment
//                     "partnership": {
//                         "operatingFlight": {
//                             "carrierCode": "AM", //operating airline code
//                             "flightNumber": 6554 //flight number code
//                         }
//                     }
//                 }
//             ],
//             "legs": [ //array for each leg of the journey
//                 {
//                     "boardPointIataCode": "BER",
//                     "offPointIataCode": "AMS",
//                     "aircraftEquipment": {
//                         "aircraftType": "E90"
//                     },
//                     "scheduledLegDuration": "PT1H25M"
//                 }
//             ]
//         }
//     ]
// }