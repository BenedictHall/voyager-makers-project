const mongoose = require("mongoose");

const SegmentSchema = new mongoose.Schema({
    departureAirport: String,
    arrivalAirport: String,
    flightDuration: String,
    carrier: String,
    segmentFlightNumber: Number
});

const FlightSchema = new mongoose.Schema({
    airline: String,
    airlineCode: String,
    flightNumber: Number,
    segments: [SegmentSchema] 
});

const Flight = mongoose.model("Flight", FlightSchema);

module.exports = Flight;