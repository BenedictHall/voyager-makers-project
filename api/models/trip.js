const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
    // userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    location: {type: String, required: true}, 
    startDate: {type: String, required: true}, 
    endDate: {type: String, required: true}, 
    flight: {type: String, required: false},
    flightNumber: {type: String, required: false},
    accommodation: {type: String, required: false},
    accommodationAddress: {type: String, required: false},
})

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;