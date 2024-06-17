const Trip = require ("../models/trip");
const { generateToken } = require("../lib/token.js");
const mongoose = require('mongoose');

const getAllTrips = async (req, res) => {
    const trips = await Trip.find();
    const token = generateToken(req.user_id);
    res.status(200).json({ trips: trips, token: token });
};

const getSingleTrip = async (req, res) => {
    const singleTrip = await Trip.findOne({_id:req.params.tripId});
    const token = generateToken(req.tripId);
    res.status(200).json({ singleTrip: singleTrip, token: token });
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
            // console.error(err);
        
            res.status(400).json({message: "Something went wrong"});
        });
};


const TripsController = {
    create: create,
    getAllTrips: getAllTrips,
    getSingleTrip: getSingleTrip, 
}

module.exports = TripsController;