const mongoose = require('mongoose');

const ItinerarySchema = new mongoose.Schema({
    activity: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ },
    endTime: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ },
    tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true}
});

const Itinerary = mongoose.model("Itinerary", ItinerarySchema);

module.exports = Itinerary;