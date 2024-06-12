
const express = require("express");

const TripsController = require("../controllers/trips");

const router = express.Router();

// router.get("/", TripsController.getAllTrips);

router.post("/newtrip", TripsController.create);

module.exports = router;