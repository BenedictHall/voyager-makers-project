const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
    airline: String,
    airlineCode: String,
    flightNumber: Number,
    flightDuration: String,
    departureAirport: String,
    arrivalAirport: String,
    departureDate: String
});

const Flight = mongoose.model("Flight", FlightSchema);

module.exports = Flight;