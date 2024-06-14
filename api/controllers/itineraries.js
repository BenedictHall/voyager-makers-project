const Itinerary = require('../models/itinerary');
const { generateToken } = require('../lib/token');

const getAllItineraries = async (req, res) => {
    const itineraries = await Itinerary.find().sort({ date: 1 });
    const token = generateToken(req.user_id);
    // console.log("token!!!!", token);
    res.status(200).json({ itineraries: itineraries, token: token });
};

const createItinerary = async (req, res) => {
    const activity = req.body.activity;
    const date = req.body.date;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const tripId = req.body.tripId;

    try {
        const itinerary = new Itinerary({
            activity: activity,
            date: date,
            startTime: startTime,
            endTime: endTime,
            tripId: tripId,
        });
        await itinerary.save();
        const newToken = generateToken(req.user_id);
        res.status(201).json({ message: 'Itinerary Created', token: newToken, itinerary: itinerary });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Internal server error' });
    }
};

const deleteItinerary = async (req, res) => {
    const itineraryId = req.body.itineraryId;
    const newToken = generateToken(req.user_id);
    try {
        const itinerary = await Itinerary.findByIdAndDelete(itineraryId);
        if (!itinerary) {
            return res.status(404).json({ message: 'Itinerary not found' });
        }
        res.status(200).json({ message: 'Itinerary Deleted', token: newToken });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: 'Internal server error' });
    }
};

const ItinerariesController = {
    getAllItineraries: getAllItineraries,
    createItinerary: createItinerary,
    deleteItinerary: deleteItinerary,
};

module.exports = ItinerariesController;