const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref:'User', required: true},
    location: {type: String, required: true}, 
    startDate: {type: String, required: true}, 
    endDate: {type: String, required: true}, 
    flight: {type: String},
    flightNumber: {type: String},
    accommodation: {type: String},
    accommodationAddress: {type: String},
})

const Trip = mongoose.model("Trip", TripSchema);

module.exports = Trip;