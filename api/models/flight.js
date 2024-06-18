const mongoose = require("mongoose");

const FlightSchema = new mongoose.Schema({
    // userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    carrierCode: {type: String, required: true}, 
    flightNumber: {type: String, required: true}, 
    departureDate: {type: String, required: true}, 
})

const Flight = mongoose.model("Flight", FlightSchema);

module.exports = Flight;