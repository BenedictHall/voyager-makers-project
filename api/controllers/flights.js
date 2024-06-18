const flightAPIService = require("../services/flightAPIService.js");
const dateFormatting = require("../utils/dateFormatting.js");
const IATAtoCity = require("../data/IATAtoCity.js");
const Flight = require ("../models/flight.js");
const { generateToken } = require("../lib/token.js");

const getAirlineFromAPI = async (req, res) => {
    const airlineCodes = req.params.airlineCodes;
    try {
        const data = await flightAPIService.getAirlineName(airlineCodes);
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message: 'error fetching flight data', error});
    }
}

const getFlightFromAPI = async (req,res) => {
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

const getAllTrackedFlights  = async (req, res) => {
    const flights = await Flight.find();
    const token = generateToken(req.user_id);
    res.status(200).json({ flights: flights, token: token });
};

const create = (req, res) => {
    const carrierCode = req.body.carrierCode;
    const flightNumber = req.body.flightNumber;
    const departureDate = req.body.departureDate;
    console.log("Now trying to save", carrierCode, flightNumber, departureDate)
    const flight = new Flight({ carrierCode, flightNumber, departureDate });
    flight
        .save()
        .then((flight) => {
            console.log("Flight added to your saved flights, id: ", flight._id.toString());
            res.status(201).json({ message: "OK"});
        })
        .catch((err) => {
            // console.error(err);
        
            res.status(400).json({message: "Something went wrong with flight controller"});
        });
};

const FlightsController = {
    getFlightFromAPI: getFlightFromAPI,
    getAirlineFromAPI: getAirlineFromAPI,
    getAllTrackedFlights: getAllTrackedFlights,
    create: create
};

module.exports = FlightsController;