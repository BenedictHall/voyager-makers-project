const Trip = require ("../models/trip");
//const User - require("../models/user");
const { generateToken } = require("../lib/token.js");

// const getAllTrips = async (req, res) => {
//     const trips = await Trip.find().sort({ createdAt: -1 }); //sorts post in decending order of createdAt
//     const token = generateToken(req.user_id);
//     res.status(200).json({ trips: trips, token: token });
// };

const getOneTrip = async (req, res) => {
    const trip = await Trip.find({_id:req.trip_id});
    const token = generateToken(req.trip_id);
    res.status(200).json({ trip: trip, token: token });
};

const create = (req, res) => {
    const location = req.body.location;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const trip = new Trip({ location, startDate, endDate });
    trip
        .save()
        .then((trip) => {
            console.log("Trip created, id: ", trip._id.toString());
            res.status(201).json({ message: "OK"});
        })
        .catch((err) => {
            console.error(err);
            res.status(400).json({message: "Something went wrong"});
        });
};



    
const TripsController = {
    create: create,
    // getAllTrips: getAllTrips,
    getOneTrip: getOneTrip, 

}

module.exports = TripsController;