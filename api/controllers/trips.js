const Trip = require ("../models/trip");
const User = require("../models/user");
const { generateToken } = require("../lib/token.js");
const mongoose = require('mongoose');

const getAllTrips = async (req, res) => {
    const trips = await Trip.find();
    const token = generateToken(req.user_id);
    res.status(200).json({ trips: trips, token: token });
};

const getOneTrip = async (req, res) => {
    const trip = await Trip.find({_id:req.trip_id});
    const token = generateToken(req.trip_id);
    res.status(200).json({ trip: trip, token: token });
};



const create = async (req, res) => {
    const location = req.body.location;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const flight = req.body.flight;
    const flightNumber = req.body.flightNumber;
    const accommodation = req.body.accommodation;
    const accommodationAddress = req.body.accommodationAddress;
    // const userId = req.user_id;



    const trip = new Trip({ 
        // user: userId,
        location: location, 
        startDate: startDate, 
        endDate: endDate,
        flight: flight, 
        flightNumber: flightNumber, 
        accommodation: accommodation, 
        accommodationAddress: accommodationAddress
    });
    await trip
        .save()
        .then((trip) => {
            console.log("Trip created, id: ", trip._id.toString());
            res.status(201).json({ message: "OK"});
        })
        .catch((err) => {
            console.error(err);
        
            res.status(400).json({message: "Something went wrong"});
        });
        console.log("has the trip created",req.body)
};


const TripsController = {
    create: create,
    getAllTrips: getAllTrips,
    getOneTrip: getOneTrip, 
}

module.exports = TripsController;