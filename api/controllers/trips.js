const Trip = require ("../models/trip");

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

const find = (req, res) => {
    const location = req.body.location;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    
}

const TripsController = {
    create: create,
}

module.exports = TripsController;