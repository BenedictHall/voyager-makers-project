
const express = require("express");

const TripsController = require("../controllers/trips");

const router = express.Router();

router.get("/", TripsController.getAllTrips);

router.post("/newtrip", TripsController.create);

router.get("/:tripId", TripsController.getSingleTrip);

module.exports = router;