const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    location: {type: String, required: true}, 
    startDate: {type: String, required: true}, 
    endDate: {type: String, required: true}, 
    flight: {type: String, required: true},
    flightNumber: {type: String, required: true},
    accommodation: {type: String, required: true},
})

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;